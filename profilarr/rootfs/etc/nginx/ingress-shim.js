// Kanso Labs Home Assistant Application: Profilarr
//
// Loaded first in every page served through ingress, see nginx.conf.
//
// Ingress serves Profilarr under /api/hassio_ingress/<token>, on Home
// Assistant's own address. Profilarr writes root addresses such as "/arr" and
// "/api/v1/backups" throughout its scripts, and the browser would take each one
// to Home Assistant's root instead. Rewriting the scripts would mean matching
// hundreds of strings that change with every release, so this script gives the
// ingress path to those addresses as the page uses them instead:
//
// - fetch, XMLHttpRequest and EventSource, for what the page asks the server;
// - history.pushState and replaceState, so that the address in the frame stays
//   under the ingress path and a reload comes back to the same page;
// - links, forms and images, as Profilarr adds them to the page, so that
//   SvelteKit sees each link as its own and moves between pages without
//   loading them again;
// - any other navigation to a root address, such as a script setting
//   window.location, which is sent on under the ingress path.
//
// An address that already carries the path, or names another site, is left as
// it is, so nothing is rewritten twice.
;(function () {
  'use strict'

  // The path is this script's own address without its name, so nginx writes
  // it into the page once and nothing here has to be told it.
  var script = document.currentScript
  var match =
    script &&
    /^(\/api\/hassio_ingress\/[A-Za-z0-9_-]+)\/_ingress\/shim\.js$/.exec(
      new URL(script.src).pathname,
    )
  if (!match) return
  var base = match[1]

  // "/arr" becomes "<base>/arr". Anything that is not a root path, such as
  // "https://…", "//host/…" or "../_app/…", is returned as it is.
  function withBase(path) {
    if (
      typeof path !== 'string' ||
      path.charAt(0) !== '/' ||
      path.charAt(1) === '/'
    )
      return path
    if (
      path === base ||
      path.indexOf(base + '/') === 0 ||
      path.indexOf(base + '?') === 0
    )
      return path
    return base + path
  }

  // The same for a full or relative URL: the rewritten address when it is on
  // this site and lacks the path, otherwise null.
  function rewrite(url) {
    var parsed
    try {
      parsed = new URL(String(url), location.href)
    } catch (error) {
      return null
    }
    if (parsed.origin !== location.origin) return null
    var path = withBase(parsed.pathname)
    return path === parsed.pathname ? null : path + parsed.search + parsed.hash
  }

  var nativeFetch = window.fetch
  window.fetch = function (input, init) {
    if (typeof input === 'string' || input instanceof URL) {
      input = rewrite(input) || input
    } else if (input && input.url) {
      var url = rewrite(input.url)
      if (url) input = new Request(url, input)
    }
    return nativeFetch.call(this, input, init)
  }

  var nativeOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url) {
    var rewritten = rewrite(url)
    if (rewritten) arguments[1] = rewritten
    return nativeOpen.apply(this, arguments)
  }

  if (window.EventSource) {
    var NativeEventSource = window.EventSource
    var IngressEventSource = function (url, options) {
      return new NativeEventSource(rewrite(url) || url, options)
    }
    IngressEventSource.prototype = NativeEventSource.prototype
    window.EventSource = IngressEventSource
  }

  ;['pushState', 'replaceState'].forEach(function (name) {
    var native = history[name]
    history[name] = function (state, title, url) {
      if (url !== undefined && url !== null) url = rewrite(url) || url
      return native.call(history, state, title, url)
    }
  })

  // A navigation this script did not otherwise catch, such as
  // window.location.href = '/auth/login', is stopped and made again under the
  // ingress path. Browsers without the Navigation API skip this, and such a
  // navigation then lands on Home Assistant's root.
  if (window.navigation) {
    window.navigation.addEventListener('navigate', function (event) {
      if (!event.cancelable || event.hashChange) return
      var url = rewrite(event.destination.url)
      if (!url) return
      event.preventDefault()
      location.assign(url)
    })
  }

  // The attribute that holds an address, for each element that has one.
  var attributes = {
    A: 'href',
    AREA: 'href',
    FORM: 'action',
    IFRAME: 'src',
    IMG: 'src',
    LINK: 'href',
    SOURCE: 'src',
  }
  var selector =
    'a[href^="/"], area[href^="/"], form[action^="/"], iframe[src^="/"], img[src^="/"], link[href^="/"], source[src^="/"]'

  function fixElement(element) {
    var attribute = attributes[element.tagName]
    if (!attribute) return
    var value = element.getAttribute(attribute)
    var fixed = withBase(value)
    if (fixed !== value) element.setAttribute(attribute, fixed)
  }

  function fixTree(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return
    fixElement(node)
    node.querySelectorAll(selector).forEach(fixElement)
  }

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') fixElement(mutation.target)
      else mutation.addedNodes.forEach(fixTree)
    })
  }).observe(document.documentElement, {
    attributeFilter: ['action', 'href', 'src'],
    attributes: true,
    childList: true,
    subtree: true,
  })
})()
