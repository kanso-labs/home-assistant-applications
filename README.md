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

| Application                                          | What it does                                                                                                             | Web interface       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| [Authentik](./authentik)                             | Identity provider for single sign-on, fronting your applications with OAuth2, OIDC, SAML, LDAP and proxy auth.           | Port 9000           |
| [Avahi Publisher](./avahi-publisher)                 | Publishes extra .local names and Bonjour services on your network, using the official Avahi.                             | None                |
| [Bazarr](./bazarr)                                   | Subtitle manager for Radarr and Sonarr, keeping subtitles alongside the media.                                           | Ingress, port 6767  |
| [Bazarr+](./bazarr-plus)                             | Bazarr fork adding a subtitle provider marketplace, bilingual subtitles and AI translation.                              | Ingress, port 6767  |
| [Byparr](./byparr)                                   | Proxy that gets past anti-bot challenges for the arr applications, answering the same requests as FlareSolverr.          | None                |
| [Cleanuparr](./cleanuparr)                           | Strikes stuck and unwanted downloads from the arr queues and asks for replacements.                                      | Ingress, port 11011 |
| [Configarr](./configarr)                             | Syncs TRaSH Guides and Recyclarr templates into Sonarr, Radarr and Prowlarr.                                             | None                |
| [FlareSolverr](./flaresolverr)                       | Proxy that solves the challenges standing between the arr applications and their indexers.                               | Ingress             |
| [Flight Finder](./flight-finder)                     | Tracks flight, hotel and car rental prices, with price history and alerts when they drop.                                | Port 3003           |
| [Grimmory](./grimmory)                               | Library for your ebooks, comics and audiobooks, with a browser reader and Kobo and KOReader sync.                        | Port 6060           |
| [Immich](./immich)                                   | Backs up the photos and videos on your phones, grouping faces and finding photos by what is in them.                     | Port 2283           |
| [Immich Machine Learning](./immich-machine-learning) | Face recognition and smart search for Immich, on an Intel GPU through OpenVINO.                                          | None                |
| [Immich Power Tools](./immich-power-tools)           | Bulk tools for Immich: merging people, filling in missing locations and finding albums to make.                          | Port 3000           |
| [Lingarr](./lingarr)                                 | Translates the subtitles your library is missing, through LibreTranslate, DeepL or an AI service.                        | Ingress, port 9876  |
| [Muxarr](./muxarr)                                   | Strips unwanted audio and subtitle tracks from your media, remuxing rather than re-encoding.                             | Port 8183           |
| [n8n](./n8n)                                         | Workflow automation connecting your services and Home Assistant, with a visual editor, code steps and AI nodes.          | Ingress             |
| [NAT Gateway](./nat-gateway)                         | Shares this host's network connection with a device plugged straight into a spare Ethernet port, such as a NAS.          | None                |
| [Nginx Proxy Manager](./nginx-proxy-manager)         | Reverse proxy with a web interface and free Let's Encrypt certificates for the services behind it.                       | Port 81             |
| [Notifiarr](./notifiarr)                             | Unified client for Notifiarr.com, reporting on the stack and letting Discord drive it.                                   | Ingress, port 5454  |
| [NZBGet](./nzbget)                                   | Usenet downloader, fetching from your news servers into shared storage.                                                  | Ingress, port 6789  |
| [Plex Media Server](./plex-media-server)             | Serves recorded media, live TV, online news and podcasts to the Plex apps.                                               | Port 32400          |
| [Profilarr](./profilarr)                             | Builds quality profiles and custom formats, tracks them against curated databases, and syncs them to every arr instance. | Port 6868           |
| [Prowlarr](./prowlarr)                               | Indexer manager, pushing one set of definitions out to the whole arr stack.                                              | Ingress, port 9696  |
| [qBittorrent](./qbittorrent)                         | BitTorrent client, downloading into shared storage for the rest of the stack.                                            | Ingress, port 8080  |
| [Radarr](./radarr)                                   | Movie collection manager that grabs, sorts and renames what your indexers turn up.                                       | Ingress, port 7878  |
| [Seadexerr](./seadexerr)                             | Prowlarr indexer offering the SeaDex release of each anime, built on your Home Assistant.                                | None                |
| [Seerr](./seerr)                                     | Request and discovery front end for Jellyfin, Plex and Emby, feeding Radarr and Sonarr.                                  | Port 5055           |
| [Sonarr](./sonarr)                                   | Smart PVR that follows the shows you watch and grabs new episodes as they appear.                                        | Ingress, port 8989  |
| [Tdarr](./tdarr)                                     | Runs your library through flows of FFmpeg, HandBrake and MKVToolNix steps, built on your Home Assistant.                 | Ingress, port 8265  |
| [Traefik](./traefik)                                 | Reverse proxy that sends each request to the application its host name belongs to, routed from the Configuration tab.    | Ingress             |
| [Unpackerr](./unpackerr)                             | Extracts completed downloads in place, then cleans up once the arr applications import.                                  | None                |
| [Wallos](./wallos)                                   | Tracks your subscriptions and what they cost, with a notification before each payment.                                   | Ingress, port 8282  |

## How these are packaged

- **Two architectures, one image name.** Each application publishes a
  multi-architecture image to
  `ghcr.io/kanso-labs/home-assistant-application-<slug>`, covering `aarch64` and
  `amd64`. A version is published once and never pushed over, so it is the same
  image on every install. Tdarr and Seadexerr publish none, because neither may
  be passed on: your Home Assistant builds each from its Dockerfile when you
  install or update it, from the image its author publishes.

- **As little mapped as possible.** An application is given write access only
  where it actually writes. Radarr and Sonarr get `/media` and `/share`, because
  moving and renaming files is their job. Prowlarr manages indexer definitions
  and gets neither, even though its upstream packaging maps both.

- **Cold backups where the state is a database.** Most of these keep their
  settings in SQLite, so Home Assistant stops them for the duration of a backup.
  Copying a database while it is being written produces a backup that will not
  restore.

- **Updates that arrive.** Renovate watches each upstream project's releases,
  release-please cuts a version, and Home Assistant offers the update. A major
  release, or a minor one of a project still below 1.0, waits for a person to
  read upstream's notes before it ships. The arr applications' own updaters are
  switched off deliberately — they would announce a new version and then refuse
  to install it — so this packaging is the one route in.

## Contributing

Issues and pull requests are welcome. The organization's contributing guide
lives in
[kanso-labs/.github](https://github.com/kanso-labs/.github/blob/main/CONTRIBUTING.md)
and covers how to report, propose and submit.

[AGENTS.md](./AGENTS.md) is the working reference for anything specific to this
repository: the directory layout, what belongs in `config.yaml`, how releases
reach an installed instance, and the traps that have already caught someone. It
is written for people and coding agents alike.

Participation is governed by the organization's
[code of conduct](https://github.com/kanso-labs/.github/blob/main/CODE_OF_CONDUCT.md).

## License

This packaging is MIT licensed. See [LICENSE.md](./LICENSE.md).

The applications it packages are not covered by that and keep their own terms —
mostly a GNU licence or MIT, with some worth knowing before you install. n8n is
fair-code, under its Sustainable Use License. Plex Media Server is proprietary
and used under Plex's terms. Tdarr is free for personal use under a licence that
forbids redistributing it, and Seadexerr carries no licence at all, which is why
neither has an image here. Each application's `DOCS.md` records its licence and
credits the packaging it was ported from, most often from
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
