#!/usr/bin/env bash
#
# Verifies that every application is wired into release-please and Renovate
# correctly.
#
# Two annotations and two registrations hold the release chain together, and
# none of them fails loudly on its own. An application with a missing piece
# simply stops receiving updates, and nobody notices until someone checks by
# hand. This is that check.
#
# Run from the repository root.

set -euo pipefail

config='release-please-config.json'
manifest='.release-please-manifest.json'
renovate='.github/renovate.json'

# The two shapes the Dockerfile custom managers in .github/renovate.json match:
# a datasource and a depName, and for distribution packages a registryUrl after
# them. Nothing else may follow on the line.
annotation='^# renovate: datasource=[^[:space:]]+ depName=[^[:space:]]+( registryUrl=[^[:space:]]+)?[[:space:]]*$'

failures=0

fail() {
  printf '  ✗ %s\n' "$1" >&2
  failures=$((failures + 1))
}

for path in */config.yaml; do
  app="${path%/config.yaml}"
  dockerfile="${app}/Dockerfile"
  printf '%s\n' "${app}"

  # The annotation marks the line release-please rewrites. Without it the
  # version is never bumped, so Home Assistant is never offered the update.
  if ! grep -qE '^version:.*#[[:space:]]*x-release-please-version' "${path}"; then
    fail "${path} has no '# x-release-please-version' on its version line"
  fi

  if ! jq -e --arg a "${app}" '.packages | has($a)' "${config}" > /dev/null; then
    fail "${app} is not registered in ${config}"
    continue
  fi

  # The object form selects release-please's annotation-only updater. The bare
  # string form runs a YAML round-trip that strips every comment in the file,
  # including the annotation checked above.
  if ! jq -e --arg a "${app}" '
        .packages[$a]["extra-files"] // []
        | any(type == "object" and .path == "config.yaml" and .type == "generic")
      ' "${config}" > /dev/null; then
    fail "${app} must declare extra-files as {\"path\": \"config.yaml\", \"type\": \"generic\"} in ${config}; the bare string form strips comments on release"
  fi

  if ! jq -e --arg a "${app}" 'has($a)' "${manifest}" > /dev/null; then
    fail "${app} is not registered in ${manifest}"
  else
    # release-please moves both in the same release pull request, so a
    # difference means one was edited by hand. The next release is computed
    # from the manifest alone and written over config.yaml, whatever either
    # said before.
    version=$(sed -nE "s/^version:[[:space:]]*['\"]?([^'\"[:space:]#]+).*/\1/p" "${path}")
    released=$(jq -r --arg a "${app}" '.[$a]' "${manifest}")
    if [[ "${version}" != "${released}" ]]; then
      fail "${path} has version ${version:-(none)}, but ${manifest} has ${released}; release-please sets both, so put back whichever was edited by hand"
    fi
  fi

  if [[ ! -f "${dockerfile}" ]]; then
    continue
  fi

  # The other annotation. Renovate finds a version only through a comment
  # above its ARG that one of the managers matches, so a version without one
  # is never updated, and nothing says so. This asks for it on the line
  # directly above, as every Dockerfile here writes it. BUILD_VERSION is the
  # build action's to set, not a pin.
  while IFS=: read -r line arg; do
    fail "${dockerfile}:${line} pins ${arg}, but the line directly above it is not a '# renovate: datasource=<datasource> depName=<name> [registryUrl=<url>]' annotation, so Renovate never updates it"
  done < <(awk -v annotation="${annotation}" '
      /^ARG [A-Za-z0-9_]+_VERSION=/ && !/^ARG BUILD_VERSION=/ && previous !~ annotation {
        name = $2
        sub(/=.*/, "", name)
        print FNR ":" name
      }
      { previous = $0 }
    ' "${dockerfile}")

  # A custom datasource is only a name until .github/renovate.json defines it,
  # and Renovate skips a dependency whose datasource it cannot find.
  while read -r datasource; do
    if ! jq -e --arg d "${datasource}" '.customDatasources // {} | has($d)' "${renovate}" > /dev/null; then
      fail "${dockerfile} names datasource=custom.${datasource}, which ${renovate} does not define under customDatasources"
    fi
  done < <(sed -nE 's/^# renovate: datasource=custom\.([^[:space:]]+) .*/\1/p' "${dockerfile}" | sort -u)
done

# A package naming a directory that no longer exists silently releases nothing.
while read -r app; do
  if [[ ! -f "${app}/config.yaml" ]]; then
    fail "${config} lists '${app}', which has no ${app}/config.yaml"
  fi
done < <(jq -r '.packages | keys[]' "${config}")

if ((failures > 0)); then
  printf '\n%s release wiring problem(s) found.\n' "${failures}" >&2
  exit 1
fi

printf '\nEvery application is wired into release-please and Renovate correctly.\n'
