# Kanso Home Assistant application repository

[![Open your Home Assistant instance and show the add application repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fkanso-labs%2Fhome-assistant-applications)

## Applications

This repository contains the following applications

### [Bazarr application](./bazarr)

Subtitle manager for Radarr and Sonarr.

Bazarr watches the libraries they manage, finds subtitles in the languages you
ask for, and keeps them alongside the media.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [FlareSolverr application](./flaresolverr)

Proxy server that solves the challenges standing between the arr applications
and their indexers.

Prowlarr and the rest send a request through FlareSolverr and get the answer
back.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [n8n application](./n8n)

Flexible AI workflow automation for technical teams.

Build with the precision of code or the speed of drag-n-drop. Host with on-prem
control or in-the-cloud convenience. n8n gives you more freedom to implement
multi-step AI agents and integrate apps than any other tool.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Notifiarr application](./notifiarr)

Unified client for Notifiarr.com.

Notifiarr reports on the applications you run and lets Discord drive content
requests, media reports and system health checks.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [NZBGet application](./nzbget)

Usenet downloader with a web interface.

NZBGet fetches from your news servers into shared storage, where the rest of the
stack can pick it up.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Prowlarr application](./prowlarr)

Indexer manager and proxy for the arr stack.

Prowlarr keeps your indexer definitions in one place and pushes them out to
Radarr, Sonarr and the rest, so each one does not have to be configured by hand.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [qBittorrent application](./qbittorrent)

BitTorrent client with a web interface.

qBittorrent downloads torrents into shared storage, where the rest of the stack
can pick them up.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Radarr application](./radarr)

Movie collection manager for Usenet and BitTorrent users.

Radarr monitors multiple RSS feeds for new movies, talks to your download
clients and indexers to grab them, and then sorts and renames what arrives.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Seerr application](./seerr)

Media request and discovery manager for Jellyfin, Plex and Emby.

Seerr lets people ask for films and shows, then hands the approved requests to
Radarr and Sonarr.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Sonarr application](./sonarr)

Smart PVR for Usenet and BitTorrent users.

Sonarr monitors multiple RSS feeds for new episodes of the shows you follow,
grabs them through your download clients and indexers, and then sorts and
renames what arrives.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

### [Unpackerr application](./unpackerr)

Extracts completed downloads for the arr applications.

Unpackerr watches what Radarr and Sonarr are waiting on, unpacks archives in
place, and cleans up once they have been imported.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
