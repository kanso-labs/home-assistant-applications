// Kanso Labs Home Assistant Application: Seerr
//
// Loaded first in every page served through ingress, see nginx.conf.
//
// Ingress serves Seerr under /api/hassio_ingress/<token>, on Home Assistant's
// own address. Seerr writes root addresses such as "/discover" and
// "/api/v1/request" throughout its scripts, and the browser would take each one
// to Home Assistant's root instead. Rewriting the scripts would mean matching
// hundreds of strings that change with every release, so this script gives the
// ingress path to those addresses as the page uses them instead:
//
// - fetch and XMLHttpRequest, for what the page asks Seerr's API;
// - history.pushState and replaceState, so that the address in the frame stays
//   under the ingress path and a reload comes back to the same page;
// - the address of every image, link and script, as Seerr sets it, so that an
//   avatar or a poster is asked for under the ingress path from the start;
// - window.open, for the window that signing in with Plex opens;
// - any other navigation to a root address, such as a script setting
//   window.location, which is sent on under the ingress path.
//
// It also refuses to register a service worker: through ingress one would
// belong to Home Assistant's address rather than Seerr's.
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

  // "/discover" becomes "<base>/discover". Anything that is not a root path,
  // such as "https://…" or "//host/…", is returned as it is.
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

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register = function () {
      return Promise.reject(
        new Error('Seerr registers no service worker through ingress'),
      )
    }
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

  var nativeWindowOpen = window.open
  window.open = function (url) {
    if (url !== undefined && url !== null) arguments[0] = rewrite(url) || url
    return nativeWindowOpen.apply(window, arguments)
  }

  ;['pushState', 'replaceState'].forEach(function (name) {
    var native = history[name]
    history[name] = function (state, title, url) {
      if (url !== undefined && url !== null) url = rewrite(url) || url
      return native.call(history, state, title, url)
    }
  })

  // A navigation this script did not otherwise catch, such as
  // location.href = '/login' when Seerr signs someone out, is stopped and made
  // again under the ingress path. Browsers without the Navigation API skip
  // this, and such a navigation then lands on Home Assistant's root.
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
  // Setting it, whether as an attribute or as a property, is caught before the
  // browser starts loading anything from it.
  var attributes = {
    A: 'href',
    AREA: 'href',
    FORM: 'action',
    IFRAME: 'src',
    IMG: 'src',
    LINK: 'href',
    SCRIPT: 'src',
    SOURCE: 'src',
  }

  var nativeSetAttribute = Element.prototype.setAttribute
  Element.prototype.setAttribute = function (name, value) {
    if (String(name).toLowerCase() === attributes[this.tagName]) {
      value = rewrite(value) || value
    }
    return nativeSetAttribute.call(this, name, value)
  }

  ;[
    [HTMLAnchorElement, 'href'],
    [HTMLAreaElement, 'href'],
    [HTMLFormElement, 'action'],
    [HTMLIFrameElement, 'src'],
    [HTMLImageElement, 'src'],
    [HTMLLinkElement, 'href'],
    [HTMLScriptElement, 'src'],
    [HTMLSourceElement, 'src'],
  ].forEach(function (entry) {
    var descriptor = Object.getOwnPropertyDescriptor(
      entry[0].prototype,
      entry[1],
    )
    if (!descriptor || !descriptor.set) return
    Object.defineProperty(entry[0].prototype, entry[1], {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: descriptor.get,
      set: function (value) {
        descriptor.set.call(this, rewrite(value) || value)
      },
    })
  })
})()
