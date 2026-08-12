#!/usr/bin/env bash
#
# Verifies that every application is wired into release-please correctly.
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

failures=0

fail() {
  printf '  ✗ %s\n' "$1" >&2
  failures=$((failures + 1))
}

for path in */config.yaml; do
  app="${path%/config.yaml}"
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
  fi
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

printf '\nEvery application is wired into release-please correctly.\n'
