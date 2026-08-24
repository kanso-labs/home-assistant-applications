#!/usr/bin/env bash
#
# Builds the GitHub Pages site into _site/.
#
# The site is a React Router SPA in docs/, built with @kanso-labs/kanso-ui. Its
# catalogue is generated from each application's own config.yaml at build time,
# so the page cannot drift from what the repository ships — adding an
# application directory is enough to put it on the site, and there is nothing
# generated to commit.
#
# SITE_BASE is the path the site will be served from. `actions/configure-pages`
# reports it as base_path, which is '' for a custom domain and
# '/home-assistant-applications' for the project domain. Both Vite's asset URLs
# and the router's basename are built from it, so the same tree works at either.
#
# Run from the repository root.

set -euo pipefail

out='_site'
app='docs'

export SITE_BASE="${SITE_BASE:-/}"

# configure-pages reports a bare path with no trailing slash, and '' at a domain
# root. Vite needs both ends.
[[ "${SITE_BASE}" != /* ]] && SITE_BASE="/${SITE_BASE}"
[[ "${SITE_BASE}" != */ ]] && SITE_BASE="${SITE_BASE}/"

printf 'Building the site for base %s\n' "${SITE_BASE}"

rm -rf "${out}"

npm --prefix "${app}" ci
npm --prefix "${app}" run build

cp -R "${app}/build/client" "${out}"

# One route, and GitHub Pages has no rewrite rule — so any other path is served
# this same document and the router takes it from there.
cp "${out}/index.html" "${out}/404.html"

# Jekyll skips directories beginning with an underscore, which is where Vite
# puts nothing today but is one dependency bump away from being wrong.
touch "${out}/.nojekyll"

# The custom domain has to travel with the artifact. Pages serves whatever the
# workflow uploads, so a CNAME that only exists in the repository is not applied
# to the published site.
if [[ -f "${app}/CNAME" ]]; then
  cp "${app}/CNAME" "${out}/CNAME"
fi

printf 'Built %s.\n' "${out}"
