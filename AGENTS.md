# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

A Home Assistant **app repository**. Home Assistant calls these apps; they were
called add-ons until 2026, and both names still appear in its own tooling. This
repository says "application" in everything it writes, and keeps Home
Assistant's spelling wherever its API surface demands it.

Every top-level directory containing a `config.yaml` is one application. Home
Assistant reads `repository.yaml` to discover the repository, then each
`config.yaml` to discover what it can install.

The authorities, in the order you should trust them:

1. **[Home Assistant Supervisor](https://github.com/home-assistant/supervisor)**
   — the code that actually runs these. When the documentation and the source
   disagree, the source is right.
2. **[home-assistant/apps-example](https://github.com/home-assistant/apps-example)**
   — the reference implementation. Match its shape unless there is a reason not
   to, and record the reason.
3. **[The apps documentation](https://developers.home-assistant.io/docs/apps)**
   — correct in the large, occasionally behind in the details.
4. **`frenck/action-addon-linter`** — not an authority, but it is the gate. It
   has had no release since 2025-11 and rejects things Supervisor accepts. See
   Traps.

## Commands

There is no `package.json` here, so nothing is an npm script. Everything below
is run directly from the repository root.

| Task                  | Command                                      | Notes                                            |
| --------------------- | -------------------------------------------- | ------------------------------------------------ |
| Format                | `npx prettier --write .`                     | YAML, JSON and Markdown; changelogs are exempt   |
| Check formatting      | `npx prettier --check .`                     | `Check formatting` runs this at a pinned version |
| Verify release wiring | `./.github/scripts/verify-release-wiring.sh` | Runs in CI as `Verify release wiring`            |
| Build the site        | `./.github/scripts/build-pages.sh`           | Assembles `_site/`; nothing is committed         |

Building and booting an application image is the other thing worth running by
hand, and it has its own step under Adding an application.

## Adding an application

### 1. Start from existing packaging

Someone has usually packaged it already, most often under
[hassio-addons](https://github.com/orgs/hassio-addons/repositories) as
`app-<name>` or `addon-<name>`. Port that rather than inventing one: the service
scripts, icon, and logo are all reusable, and it is MIT licensed.

Credit the original in the application's `DOCS.md`, and credit the upstream
project separately — the packaging and the software it packages have different
authors and usually different licences.

Do not copy the pinned version. Check what the project has actually released;
the community packaging is often behind, which is usually why an application is
being added here at all.

### 2. Create the directory

Match what the existing applications have:

```
<slug>/
├── CHANGELOG.md      Keep a Changelog format
├── DOCS.md           installation, configuration, storage, backups, credits
├── Dockerfile
├── README.md         short intro, shown in the store
├── config.yaml
├── icon.png          square, 128×128
├── logo.png          landscape, around 250×100
├── rootfs/           s6 service definition
└── translations/     en.yaml, pt-BR.yaml
```

`README.md` and `DOCS.md` are different documents. The store shows the README as
the intro and DOCS as the full documentation.

### 3. `config.yaml`

Keys are ordered by name. Required: `name`, `version`, `slug`, `description`,
`arch`.

```yaml
arch:
  - aarch64
  - amd64
backup: cold
image: 'ghcr.io/kanso-labs/home-assistant-application-<slug>'
init: false
version: '1.0.0' # x-release-please-version
```

- **`image`** is the generic multi-architecture name, with no `{arch}`
  placeholder. See "Image naming" below.
- **`init: false`** because the base image supplies s6-overlay.
- **`backup: cold`** for anything storing state in SQLite, which is most of
  them. A hot backup copies the database while it is being written and can
  restore into a corrupt file.
- **`version`** starts at `1.0.0` and is never edited by hand afterwards. The
  annotation is load-bearing; see Releases.

Map the least you can. Grant write access only where the application actually
writes, and omit a mapping entirely when it is never touched. Radarr and Sonarr
need `/media` and `/share` because organising files is their job. Prowlarr
manages indexer definitions and gets neither, even though its upstream packaging
maps both.

### 4. `Dockerfile`

```dockerfile
# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=<Org>/<Repo>
ARG <APP>_VERSION=1.2.3
```

- **`BUILD_FROM` must carry a default.** Supervisor stopped supplying it in
  2026.04, so `FROM $BUILD_FROM` with no default expands to `FROM ` and fails.
- **There is no `build.yaml`.** It is deprecated. The base image and the OCI
  labels live in the Dockerfile.
- **`BUILD_ARCH` and `BUILD_VERSION` are injected** by the build action, along
  with the `io.hass.*` labels. Do not duplicate those labels.
- The `# renovate:` annotation is load-bearing; see Releases.

`ghcr.io/home-assistant/base` is Alpine and supplies s6-overlay, bashio, curl,
and jq. `base-ubuntu` is the Debian-family equivalent. Both are multi-arch, so
one tag covers every architecture.

### 5. `rootfs/`

Copy the upstream service definition. The layout Supervisor expects:

```
rootfs/etc/s6-overlay/s6-rc.d/<slug>/run          executable
rootfs/etc/s6-overlay/s6-rc.d/<slug>/finish       executable
rootfs/etc/s6-overlay/s6-rc.d/<slug>/type         contains "longrun"
rootfs/etc/s6-overlay/s6-rc.d/<slug>/dependencies.d/base    empty
rootfs/etc/s6-overlay/s6-rc.d/user/contents.d/<slug>        empty
```

`run` and `finish` need the executable bit. The empty marker files must exist
and stay empty.

### 6. Register it

- Add a row to the applications table in the repository `README.md`, in
  alphabetical order. One line on what it does, and the port it serves its web
  interface on, or `Ingress`, or `None`.
- Add the package to `release-please-config.json` and
  `.release-please-manifest.json`, both alphabetically.
- The website needs nothing. It is generated from every `config.yaml` and
  `icon.png` at deploy time, so the directory existing is enough — see The
  website.

### 7. Verify before pushing

Every one of these has caught a real failure. Run them.

**Validate against the linter's own schema**, rather than waiting for CI to tell
you:

```shell
gh api repos/frenck/action-addon-linter/contents/src/config.schema.json \
  --jq '.content' | base64 -D > /tmp/addon.schema.json
```

Then check your `config.yaml`'s map types and top-level keys against it. This
exists because the linter rejects values Supervisor documents as current.

**Build and boot it.** A green build proves nothing about whether the thing
starts:

```shell
docker build --platform linux/arm64 --build-arg BUILD_ARCH=aarch64 \
  --build-arg BUILD_VERSION=1.0.0 -t <slug>-test .
```

Run it with `/config` and `/data` mounted, then check the logs for the version
and a listening port, and probe the port for a response. Build for the
architecture you are actually on — see Traps.

**Run `npx prettier --check .`** from the repository root. Prettier formats
YAML, JSON and Markdown here, and `Check formatting` runs the same check at the
version `lint.yaml` pins in `PRETTIER_VERSION` — match it if the two ever
disagree. There is no `package.json` here, so there is no `format` script.

Changelogs are exempt, in `.prettierignore`. release-please writes them in a
style of its own and reads them back to place the next entry, so formatting one
lasts until the next release and risks confusing the tool that owns it.

**Verify the release wiring**, which catches a registration you forgot in step 6
and an annotation you dropped:

```shell
./.github/scripts/verify-release-wiring.sh
```

CI runs this too, as `Verify release wiring`.

## Conventions

Shared with the other `kanso-labs` repositories:

- **Keys in JSON and YAML are ordered by name.** Files whose order carries
  meaning are exempt: workflows, where step order is execution order;
  changelogs, which are chronological; and `package.json`, where the npm
  ecosystem expects `name` and `version` first.
- **A workflow's filename is the kebab-case of its `name:` field.** Reusable
  workflows, meaning those triggered only by `workflow_call`, take a leading
  underscore.
- **Job names and step names are imperative verb phrases.** Job ids, step ids,
  and matrix keys are exempt.
- **Actions are pinned to exact release tags**, `actions/checkout@v7.0.1`, never
  a moving major or `@main`. Renovate opens the bump pull requests.
- **Dependency versions are pinned exactly.** Every `dependencies`,
  `devDependencies`, and `optionalDependencies` entry is a bare version,
  `1.2.3`, never `^1.2.3`, `~1.2.3`, `>=1.2.3`, `*`, `1.x`, or an `||` union.
  Renovate opens those bumps too. `peerDependencies` are the deliberate
  exception: they state what the consumer's own installed copy must satisfy, so
  ranges are correct there and stay.
- **`.tool-versions` pins a fully-specified version on every line**,
  `nodejs 24.19.0`, never `nodejs 24` or `nodejs lts`.

Both of those rules land in one place here: `n8n/rootfs/usr/src/n8n/`, the only
application carrying a `package.json` and a `.tool-versions`. Neither is
cosmetic there, because that directory has no lockfile. The Dockerfile runs
`mise install` and then `npm install` at build time, so the pin in
`package.json` is the only thing deciding which version an image resolves, and
`.tool-versions` is the only thing deciding which Node and npm resolve it. A
caret would let an image built today and the same image rebuilt next month ship
different n8n versions off an unchanged commit.

**Prettier formats the YAML, JSON and Markdown here**, and CI checks it. There
is no `package.json`, so there is no `format` script — run
`npx prettier --write .` before pushing. `github-actions` formats the same three
with Prettier and does have that script; see that repository's `AGENTS.md` for
what the rest of the organization does.

### Image naming

An application's `image` is the generic multi-architecture name with no
placeholder. The per-architecture images published underneath it are named
`{arch}-<image>`, architecture first — that order is fixed by the build action
and is not ours to choose.

## Releases

Home Assistant decides an update exists by comparing `config.yaml`'s `version`
against the installed one — a plain inequality, so the string only has to move.
If it never moves, nothing you change inside an image ever reaches anyone.

Nobody edits that field by hand. release-please owns it.

How it runs is shared with the other `kanso-labs` repositories rather than
configured here:
[`kanso-labs/github-actions`](https://github.com/kanso-labs/github-actions)
holds the workflow, and `.github/workflows/release-please.yaml` calls it at a
pinned tag. Changing the token, the auto-merge behaviour, or the release-please
version means changing it there and bumping the pin here, which Renovate opens a
pull request for.

```mermaid
flowchart TD
    A[Renovate finds a newer application version] --> B[PR bumping ARG in the Dockerfile]
    B --> C{Merged to main?}
    C -- no --> D([Nothing released])
    C -- yes --> E[release-please opens the release PR]
    E --> F[Bumps config.yaml version, writes the CHANGELOG]
    F --> G{Release PR merged?}
    G -- no --> D
    G -- yes --> H[Build publishes the image at the new version]
    H --> I([Home Assistant offers the update])
```

Each application is its own release-please package. A commit is attributed to
one by the files it touches, so a change under `radarr/` releases Radarr alone.

**Which commit types release.** `feat` takes a minor; `fix` and `deps` take a
patch; everything else releases nothing. `release-please-config.json` spells the
list out in `changelog-sections`, so removing `feat` or `fix` from it would
silently stop those releases too — for the reason the paragraph below gives.

**Renovate commits are typed `deps:`, and that is what makes them release.**
release-please computes a patch bump for any commit that is not a `feat` or a
breaking change, but it only opens a release pull request when the notes it
generates are non-empty — a run whose every commit falls in a hidden changelog
section is skipped as "No user facing commits found". Renovate's default,
`chore(deps):`, lands in exactly such a section, so an upgrade never cut a
release of its own: it shipped only when a feature happened to land beside it,
and a run of nothing but upgrades published nothing at all.

`.github/renovate.json` therefore sets `semanticCommits: enabled` and
`semanticCommitScope: null` at the top level, and `semanticCommitType: deps` in
a `packageRule` rather than beside them. `release-please-config.json` spells out
`changelog-sections` with `deps` visible under a `Dependencies` heading. The two
move together: that list replaces release-please's defaults wholesale, so a type
missing from it is invisible rather than merely unstyled, and `deps` with no
matching section would put the upgrades back where they started.

**This widened what releases, and that is the intended effect.** A bump inside
an application directory that is not one of the curated `depNames` below — a
Home Assistant base image, most obviously — used to be `chore(deps)` and
released nothing, so it reached users silently, folded into whatever `fix`
happened to land next. It now reads `deps` and cuts a patch of its own.

A bump outside every application directory still releases nothing, because there
is no root package for it to be attributed to. That is what keeps a Prettier or
`actions/checkout` bump from versioning thirteen applications.

**Both `semanticCommitType` settings are `packageRules`, and neither can be a
top-level key.** `config:recommended` extends
`:semanticPrefixFixDepsChoreOthers`, which sets the type through `packageRules`
of its own, and `packageRules` beat top-level config. The catch-all `deps` rule
is therefore first, so the curated rule below still overrides it for the
applications it names.

**The curated `semanticCommitType: "fix"` rule in `.github/renovate.json` stays,
and is not now redundant.** A `packageRule` overrides the global type for the
packages it matches, so the application versions users actually see keep landing
under **Bug Fixes** exactly as before, rather than moving to **Dependencies**.
Deleting the rule would not stop them releasing — it would re-file them, which
is the part worth keeping.

**There is one release pull request, not one per application.** Each application
still gets its own version, tag and changelog inside it; what is shared is the
pull request carrying them. `separate-pull-requests` was `true` until several
applications first became releasable at once, and the reason it cannot go back
is in Traps.

Its title reads `chore: release main`, which names the branch every release
already targets and so says nothing. Leave it alone anyway; the reason is in
Traps.

**Two annotations hold this together, and removing either fails silently.**

- `# x-release-please-version` beside `version` in `config.yaml` tells
  release-please which line to rewrite.
- `# renovate: datasource=… depName=…` above the `ARG` in the Dockerfile tells
  Renovate what to watch.

Neither produces an error when missing. The application simply stops receiving
updates, and nobody notices until someone checks.

`.github/scripts/verify-release-wiring.sh` is that check for the first one, and
for the registrations in step 6. It runs in CI as `Verify release wiring`.
Nothing yet guards the Renovate annotation.

## The website

[kanso-labs.github.io/home-assistant-applications](https://kanso-labs.github.io/home-assistant-applications/)
is built by `.github/scripts/build-pages.sh` and published by
`.github/workflows/deploy-pages.yaml` on every push to `main`. Pull requests
build it without publishing, so a generator that has stopped working is caught
while it is still someone's branch.

**Nothing about the site is built here.** No generated HTML is in the tree — the
script assembles `_site/` at deploy time and that is uploaded straight to Pages.
`_site/` is git-ignored. Do not add a checked-in copy; it would be one more
thing to keep in step, which is the problem this arrangement exists to avoid.

`docs/CNAME` is the one committed file the site left behind, and it is a
leftover rather than part of the build. It declares
`home-assistant.kansolabs.org` for the branch-based Pages build that preceded
this workflow. An Actions deployment reads the custom domain from the Pages
configuration and never sees the file, since it is not part of `_site/`, so
deleting it changes nothing today — and re-picking a branch source in the UI
would rewrite it anyway. Leave it be.

**Every fact on the page is read from the applications themselves**, so the page
cannot describe something the repository does not ship:

| On a card   | Read from                                            |
| ----------- | ---------------------------------------------------- |
| Title       | `name`                                               |
| Sentence    | the first sentence of `description`                  |
| Access chip | `ingress: true`, else the port in `webui`, else none |
| Icon        | `icon.png`                                           |

That makes `config.yaml` load-bearing for the website as well as for the store.
Rewording a `description` changes both, and its first sentence has to stand on
its own as a tagline — which is how every application here already writes it.
Adding an application needs nothing done to the site, and removing one is the
same in reverse.

The repository `README.md` is the part that does need a hand, because its
applications table is written rather than generated. Nothing checks it, so a
change to what an application is or how it is reached means editing that row in
the same pull request. The page and the README are the two places a reader meets
an application before installing it, and only one of them keeps itself honest.

## Commits and pull requests

Pull requests are squash-merged, with the pull request title as the commit
subject and an empty body. That title becomes the only commit on `main`, and
branch commit messages are discarded by the squash and never reach history.

That title is therefore the single input to everything below, and it is a
Conventional Commit. Its type decides whether users see the change:

| Type of the pull request title | Effect                                               |
| ------------------------------ | ---------------------------------------------------- |
| `feat`                         | releases the application, minor bump                 |
| `fix`                          | releases the application, patch bump                 |
| anything else                  | no release, so nothing reaches an installed instance |

Write branch commits conventionally anyway. They are what a reviewer reads while
the pull request is open, even though only the title survives the merge.

## Traps

**Merge commits are disabled, and re-enabling them duplicates every changelog
entry.** A merge commit carries the pull request title in its body, where it
parses as a Conventional Commit, and it brings the branch's own commit onto
`main` alongside it. release-please counts both and writes two entries with
different SHAs and identical text. That is not hypothetical: it produced 10
duplicated pairs across four open release pull requests before merge commits
were turned off. Squashing writes one commit, so it cannot double-count, and it
is the only strategy this repository allows — rebase merging is disabled too.
Rebasing would be equally safe for the same reason if it were ever turned on.

**A stale release pull request cannot merge, and release-please will not refresh
it.** release-please rewrites a release pull request only when the release it
computes changes. One whose release is unchanged keeps its original base for
good, so everything merged to main since then leaves it behind.
`.release-please-manifest.json` is enough to make that fatal on its own: its
keys are one per application in alphabetical order, so releasing an
application's alphabetical neighbour is an adjacent-line change and git refuses
to merge it. Releasing qbittorrent and seerr is what stranded Radarr.

`separate-pull-requests: false` is what keeps it from recurring. One release
pull request at a time means nothing can land a competing manifest edit while it
is open, so the neighbours it would have collided with no longer exist. The cost
is that releases batch: you cannot hold one application back while shipping
another.

**Setting `separate-pull-requests` back to `true` brings the conflicts back the
same day**, and the flag alone will not fix them. What that needs is a workflow
step merging main into each open release pull request after every run and
resolving the manifest itself: take main's copy and overlay the keys the pull
request changed against its own merge base. That is always correct, because a
release pull request only ever moves the versions it is releasing. Conflicts
anywhere else are not worth guessing at and should be left to a human.

What remains is narrow enough to fix by hand. It needs a commit that both
changes no computed release, so `chore`, `docs`, `ci` or `refactor`, and touches
a line next to one the open release pull request is editing. Registering a new
application under a non-releasing type is the realistic way in.

**The release pull request title is parsed back, so it cannot be a fixed
string.** release-please reads the merged pull request's title to work out what
to tag. `generateMatchPattern` compiles the configured pattern straight into a
regex, turning each `${…}` into a named capture group — `${version}` becomes
`v?(?<version>[0-9].*)`. A pattern carrying no placeholders compiles to a regex
with no groups, the parse returns nothing, and release-please logs
`Bad pull request title` and creates no release.

Nothing recovers on its own from there. The merged pull request keeps its
`autorelease: pending` label, and every later run stops at
`There are untagged, merged release PRs outstanding - aborting`, so no
application can be released until the title parses again.

Setting `group-pull-request-title-pattern` to `chore: release applications` is
what did that, to make the title say something more than the branch name. It
cost n8n 1.1.1 its tag and blocked the queue until the pattern was reverted and
the merged pull request retitled by hand. If a better title is wanted, the
pattern has to keep `${version}`, and the way to check is
`src/util/pull-request-title.ts` in the release-please version the workflow pins
— not the schema, which accepts any string.

**Concurrent release-please runs race each other.** Every release merge pushes
main and every push starts a run. Five auto-merges landing inside a minute
started five overlapping runs that tried to cut the same tags and strip the same
labels; one died on `Label does not exist`. The workflow has a `concurrency`
group now. Do not add `cancel-in-progress` — the last push must still get a run.

That group has to stay in `release-please.yaml` here, even though the rest of
that workflow moved out. GitHub documents `concurrency` at the caller and says
nothing either way about a group declared in a called workflow, so keeping it
here is the difference between a guard that is known to work and one that might
quietly be doing nothing until the race above happens again.

**The Pages configuration outlived the files it served.** Removing the Spotify
to Plex application took `docs/spotify-to-plex/` with it, and that was the only
thing Pages served. The configuration was never turned off, so it went on
building a branch path that no longer existed and erroring, silently, for as
long as nobody thought to look. Building from a workflow removes that particular
failure — there is no branch path left to go missing — but the shape is worth
keeping in mind: what Pages is set to serve lives in repository settings, and
nothing in the tree tells you it is there.

**Nothing enforces the commit conventions.** There is no commitlint in this
repository — no configuration, no dependency, no hook — and nothing reads the
pull request title. A malformed one reaches `main` unchallenged and either lands
in a changelog exactly as written or silently skips a release that should have
happened.

`.github/workflows/lint.yaml` covers the application configuration, the release
wiring and the formatting, and none of those look at a commit message.

**One pull request, one application.** Attribution is by the files a commit
touches, and squashing makes a pull request exactly one commit. So a pull
request touching two applications writes a line into both changelogs and
releases both, at whatever bump its single title implies — there is no way to
say `feat` for one and `fix` for the other. Keeping a pull request to one
application is what keeps changelogs clean.

**The linter is behind Supervisor.** Supervisor deprecated `addon_config` for
`app_config` in 2026.07, but `frenck/action-addon-linter` only accepts the old
spelling and has had no release since 2025-11. Home Assistant's own apps-example
runs the same linter. Use `addon_config` and leave the comment explaining why.
Validate against the linter's schema locally rather than discovering this in CI.

**Every arr project names its release assets differently.** These cannot be
copied between applications:

| Project  | Asset pattern                                             |
| -------- | --------------------------------------------------------- |
| Radarr   | `Radarr.master.<version>.linux-musl-core-<arch>.tar.gz`   |
| Sonarr   | `Sonarr.main.<version>.linux-musl-<arch>.tar.gz`          |
| Prowlarr | `Prowlarr.master.<version>.linux-musl-core-<arch>.tar.gz` |

Check the published assets for the version you are pinning. A wrong URL fails
only at build time.

**Every `curl` of a GitHub release asset needs retries and `-f`.** Release
downloads return 503, or die mid-transfer, often enough to redden several builds
an hour during a bad spell, and each architecture of each application is another
draw. Plain `curl -L -o` handles neither: without `--retry` the first failure is
fatal, and without `-f` a 503 body is written to the file and curl exits 0, so
the build fails later in `tar` or `gunzip` with something that reads like a
corrupt release. Use
`curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o`.

`--retry-all-errors` is the load-bearing flag — bare `--retry` covers 5xx but
not the connection dying mid-transfer, which is half of what is seen. The window
has to be minutes rather than seconds: a fixed five-second delay across five
retries covers under thirty seconds, and a spell outlasted that in three jobs of
one run. Leave `--retry-delay` off so the backoff stays exponential, and bound
it with `--retry-max-time` instead.

The same spell leaves most jobs of the same run untouched, so it is throttling
rather than an outage, and firing every application at once is what draws it.
That is why `build.yaml` caps `max-parallel`.

**amd64 images cannot be booted on an arm64 host.** The build succeeds, then x64
.NET dies at startup with a `NullReferenceException` inside NLog. It is
emulation, not your port. Build and boot `aarch64` natively, and let CI cover
amd64 on a native runner.

**A green build is not a working application.** Radarr, Sonarr and Prowlarr all
built cleanly while failing to start. Boot the container and probe the port.

**The build cache is scoped per application on purpose.** `build-image` scopes
its GitHub Actions cache to the architecture alone unless told otherwise, so a
repository building more than one image has every application writing `mode=max`
into the same two scopes and evicting whatever built last. Nothing fails, the
builds are just slower than they look. `cache-gha-scope` is set to the
application in `_build-application.yaml`, and removing it puts the eleven
applications back to sharing two scopes.

**`UpdateMethod=docker` disables the application's own updater.** These images
write it into `/opt/package_info` deliberately. The application will show that a
newer version exists and refuse to install it, which is why the packaging is the
only route to an update, and why the release chain above matters.

**`apparmor.txt` is not free.** n8n carries the apps-example template verbatim,
profile named `example` and referencing `/usr/bin/my_program`. Supervisor
rewrites the profile name to the slug so it loads, but it describes nothing
about n8n. Ship a real profile or ship none; do not copy that file.
