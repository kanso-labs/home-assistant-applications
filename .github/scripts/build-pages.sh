#!/usr/bin/env bash
#
# Builds the GitHub Pages site into _site/.
#
# Every fact on the page is read from the applications themselves, so the page
# cannot drift from what the repository actually ships. Adding an application
# directory is enough to put it on the site; there is nothing to remember and
# nothing generated to commit.
#
# Run from the repository root.

set -euo pipefail

out='_site'
repo='https://github.com/kanso-labs/home-assistant-applications'

rm -rf "${out}"
mkdir -p "${out}/icons"

# Reads one scalar out of a config.yaml. Home Assistant wraps long values as
# plain scalars across the indented lines beneath the key, so the value has to
# be gathered until the next top-level key rather than read off one line.
yaml_scalar() {
  awk -v key="$2" '
    $0 ~ "^" key ":" {
      sub("^" key ":[[:space:]]*", "")
      value = $0
      reading = 1
      next
    }
    reading && /^[[:space:]]+[^[:space:]#]/ {
      line = $0
      sub(/^[[:space:]]+/, "", line)
      value = (value == "" ? line : value " " line)
      next
    }
    reading { exit }
    END { print value }
  ' "$1"
}

escape() {
  sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'
}

cards=''
count=0
for path in */config.yaml; do
  slug="${path%/config.yaml}"

  name=$(yaml_scalar "${path}" 'name' | escape)
  description=$(yaml_scalar "${path}" 'description')

  # The store shows the whole description; a card only has room for the
  # opening sentence, which is written as the tagline in every application.
  summary="${description%%. *}."
  summary=$(printf '%s' "${summary}" | escape)

  # How the application is reached, in the order Home Assistant resolves it:
  # ingress replaces a published port, and some applications serve no web
  # interface at all.
  if grep -qE '^ingress:[[:space:]]*true' "${path}"; then
    access='Ingress'
    access_class='chip chip--ingress'
  elif grep -qE '^webui:' "${path}"; then
    port=$(sed -nE 's/.*\[PORT:([0-9]+)\].*/\1/p' <<< "$(grep -E '^webui:' "${path}")")
    access=":${port}"
    access_class='chip chip--port'
  else
    access='no web interface'
    access_class='chip chip--none'
  fi

  if [[ -f "${slug}/icon.png" ]]; then
    cp "${slug}/icon.png" "${out}/icons/${slug}.png"
  fi

  count=$((count + 1))

  cards+=$(cat <<CARD

        <a class="app" href="${repo}/tree/main/${slug}">
          <div class="app__head">
            <img class="app__icon" src="icons/${slug}.png" alt="" width="40" height="40" loading="lazy" />
            <h3 class="app__name">${name}</h3>
          </div>
          <p class="app__desc">${summary}</p>
          <span class="${access_class}">${access}</span>
        </a>
CARD
  )
done

cat > "${out}/index.html" <<PAGE
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kanso Labs Applications</title>
    <meta
      name="description"
      content="A media, download and automation stack packaged as Home Assistant applications, for aarch64 and amd64."
    />
    <link rel="icon" href="icons/radarr.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,300;6..72,400&display=swap"
    />
    <style>
$(cat .github/scripts/pages.css)
    </style>
  </head>
  <body>
    <div class="wrap">
      <header class="row hero">
        <div class="rail"><span>Kanso Labs</span></div>
        <div>
          <p class="eyebrow rise">Home Assistant applications</p>
          <h1 class="rise">A media stack your Home Assistant can install.</h1>
          <p class="lede rise">
            A media, download and automation stack, packaged as Home Assistant
            applications &mdash; add-ons, if your Home Assistant still calls
            them that. Built for aarch64 and amd64, and kept in step with their
            upstream projects automatically.
          </p>

          <div class="install rise">
            <a
              class="btn"
              href="https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fkanso-labs%2Fhome-assistant-applications"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add to Home Assistant
            </a>
            <div class="urlbox">
              <code id="repo-url">${repo}</code>
              <button class="copy" id="copy-btn" type="button">Copy</button>
            </div>
          </div>

          <p class="install-note">
            The button works if you use My Home Assistant. Otherwise paste the
            URL under <kbd>Settings</kbd> &rarr; <kbd>Add-ons</kbd> &rarr;
            <kbd>Add-on store</kbd> &rarr; <kbd>&#8942;</kbd> &rarr;
            <kbd>Repositories</kbd>.
          </p>
        </div>
      </header>

      <section class="row">
        <div class="rail"><span>Applications</span></div>
        <div>
          <div class="grid">${cards}
          </div>
        </div>
      </section>

      <section class="row">
        <div class="rail"><span>Packaging</span></div>
        <div class="notes">
          <div class="note">
            <h3>Two architectures, one image name</h3>
            <p>
              Each application publishes a multi-architecture image to
              <code>ghcr.io/kanso-labs/home-assistant-application-&lt;slug&gt;</code>,
              covering aarch64 and amd64.
            </p>
          </div>
          <div class="note">
            <h3>As little mapped as possible</h3>
            <p>
              An application is given write access only where it actually
              writes. Radarr and Sonarr get <code>/media</code> and
              <code>/share</code>, because moving and renaming files is their
              job. Prowlarr manages indexer definitions and gets neither, even
              though its upstream packaging maps both.
            </p>
          </div>
          <div class="note">
            <h3>Cold backups where the state is a database</h3>
            <p>
              Most of these keep their settings in SQLite, so Home Assistant
              stops them for the duration of a backup. Copying a database while
              it is being written produces a backup that will not restore.
            </p>
          </div>
          <div class="note">
            <h3>Updates that arrive</h3>
            <p>
              Renovate watches each upstream project's releases, release-please
              cuts a version, and Home Assistant offers the update. The arr
              applications' own updaters are switched off deliberately &mdash;
              they would announce a new version and then refuse to install it
              &mdash; so this packaging is the one route in.
            </p>
          </div>
        </div>
      </section>

      <footer class="row">
        <div class="rail"><span>Elsewhere</span></div>
        <div>
          <ul class="flinks">
            <li><a href="${repo}">Repository</a></li>
            <li><a href="${repo}/blob/main/CONTRIBUTING.md">Contributing</a></li>
            <li><a href="${repo}/issues">Issues</a></li>
            <li><a href="${repo}/blob/main/LICENSE.md">Licence</a></li>
          </ul>
          <p class="colophon">
            This packaging is MIT licensed. The applications it packages keep
            their own terms &mdash; mostly GPLv3 or MIT, with Plex Media Server
            proprietary and used under Plex's. Each application's docs record
            its licence and credit the packaging it was ported from.
          </p>
        </div>
      </footer>
    </div>

    <script>
      (function () {
        var btn = document.getElementById('copy-btn');
        var url = document.getElementById('repo-url');
        if (!btn || !url) return;
        btn.addEventListener('click', function () {
          var text = url.textContent.trim();
          var done = function () {
            btn.textContent = 'Copied';
            btn.setAttribute('data-done', '1');
            setTimeout(function () {
              btn.textContent = 'Copy';
              btn.removeAttribute('data-done');
            }, 1800);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            done();
          }
        });
      })();
    </script>
  </body>
</html>
PAGE

printf 'Built %s with %s application(s).\n' "${out}" "${count}"
