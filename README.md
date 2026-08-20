# Kanso Labs Home Assistant applications repository

[![Build][build-shield]][build-workflow] [![Lint][lint-shield]][lint-workflow]
![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![License][license-shield]](./LICENSE.md)

A media, download and automation stack packaged for Home Assistant. Everything
here installs from the store, runs on `aarch64` and `amd64`, and follows its
upstream project's releases without anyone having to remember to check.

Home Assistant renamed add-ons to applications in 2026, and both names still
appear in its own tooling. If your Home Assistant says "add-on", these are the
same thing.

## Installation

[![Open your Home Assistant instance and show the add application repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fkanso-labs%2Fhome-assistant-applications)

Or add it by hand, from **Settings → Add-ons → Add-on store → ⋮ →
Repositories**:

```text
https://github.com/kanso-labs/home-assistant-applications
```

The applications below then appear in the store. Install what you want; each
one's `DOCS.md` covers its options, what it maps, and how it is backed up.

## Applications

| Application                              | What it does                                                                                | Web interface      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------ |
| [Bazarr](./bazarr)                       | Subtitle manager for Radarr and Sonarr, keeping subtitles alongside the media.              | Port 6767          |
| [Cleanuparr](./cleanuparr)               | Strikes stuck and unwanted downloads from the arr queues and asks for replacements.         | Port 11011         |
| [FlareSolverr](./flaresolverr)           | Proxy that solves the challenges standing between the arr applications and their indexers.  | Ingress, port 8191 |
| [n8n](./n8n)                             | Workflow and AI automation, built with the precision of code or the speed of drag and drop. | Ingress            |
| [Notifiarr](./notifiarr)                 | Unified client for Notifiarr.com, reporting on the stack and letting Discord drive it.      | Port 5454          |
| [NZBGet](./nzbget)                       | Usenet downloader, fetching from your news servers into shared storage.                     | Port 6789          |
| [Plex Media Server](./plex-media-server) | Serves recorded media, live TV, online news and podcasts to the Plex apps.                  | Port 32400         |
| [Prowlarr](./prowlarr)                   | Indexer manager, pushing one set of definitions out to the whole arr stack.                 | Port 9696          |
| [qBittorrent](./qbittorrent)             | BitTorrent client, downloading into shared storage for the rest of the stack.               | Port 8080          |
| [Radarr](./radarr)                       | Movie collection manager that grabs, sorts and renames what your indexers turn up.          | Port 7878          |
| [Seerr](./seerr)                         | Request and discovery front end for Jellyfin, Plex and Emby, feeding Radarr and Sonarr.     | Port 5055          |
| [Sonarr](./sonarr)                       | Smart PVR that follows the shows you watch and grabs new episodes as they appear.           | Port 8989          |
| [Unpackerr](./unpackerr)                 | Extracts completed downloads in place, then cleans up once the arr applications import.     | None               |

## How these are packaged

- **Two architectures, one image name.** Each application publishes a
  multi-architecture image to
  `ghcr.io/kanso-labs/home-assistant-application-<slug>`, covering `aarch64` and
  `amd64`.

- **As little mapped as possible.** An application is given write access only
  where it actually writes. Radarr and Sonarr get `/media` and `/share`, because
  moving and renaming files is their job. Prowlarr manages indexer definitions
  and gets neither, even though its upstream packaging maps both.

- **Cold backups where the state is a database.** Most of these keep their
  settings in SQLite, so Home Assistant stops them for the duration of a backup.
  Copying a database while it is being written produces a backup that will not
  restore.

- **Updates that arrive.** Renovate watches each upstream project's releases,
  release-please cuts a version, and Home Assistant offers the update. The arr
  applications' own updaters are switched off deliberately — they would announce
  a new version and then refuse to install it — so this packaging is the one
  route in.

## Contributing

Issues and pull requests are welcome. [CONTRIBUTING.md](./CONTRIBUTING.md)
covers the workflow, and [AGENTS.md](./AGENTS.md) is the working reference for
adding an application: the directory layout, what belongs in `config.yaml`, and
the traps that have already caught someone. Both are written for people and
coding agents alike.

Participation is governed by the [code of conduct](./CODE_OF_CONDUCT.md).

## License

This packaging is MIT licensed. See [LICENSE.md](./LICENSE.md).

The applications it packages are not covered by that and keep their own terms —
mostly GPLv3 or MIT, with Plex Media Server proprietary and used under Plex's.
Each application's `DOCS.md` records its licence and credits the packaging it
was ported from, most often from
[hassio-addons](https://github.com/hassio-addons).

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[build-shield]:
  https://github.com/kanso-labs/home-assistant-applications/actions/workflows/build.yaml/badge.svg
[build-workflow]:
  https://github.com/kanso-labs/home-assistant-applications/actions/workflows/build.yaml
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg
[lint-shield]:
  https://github.com/kanso-labs/home-assistant-applications/actions/workflows/lint.yaml/badge.svg
[lint-workflow]:
  https://github.com/kanso-labs/home-assistant-applications/actions/workflows/lint.yaml
