# Home Assistant Application: Sonarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Sonarr" application.
3. Start it, then open the web interface on port 8989.

## Configuration

Sonarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

## Storage

| Path      | Access     | Holds                                                     |
| --------- | ---------- | --------------------------------------------------------- |
| `/config` | read/write | The Sonarr database and settings                          |
| `/media`  | read/write | Your television library, where Sonarr files what it grabs |
| `/share`  | read/write | Shared storage, typically where downloads land            |

`/media` and `/share` are writable because organising files is what Sonarr does:
it moves completed downloads out of `/share` and renames them into `/media`.
Read-only mappings would leave it able to see files but not act on them.

## Backups

Backups are taken cold, so Home Assistant stops Sonarr for the duration. Sonarr
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore. The application is briefly unavailable
while a backup runs.

## Updates

The image sets `UpdateMethod=docker`, so Sonarr's own updater is disabled by
design. Sonarr may show that a newer version exists, but it will not install it.
Updates arrive by updating this application instead.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Sonarr itself rather than this packaging, see the
[Sonarr wiki](https://wiki.servarr.com/sonarr).

## Credits

This packaging began as a port of the
[Home Assistant Community app](https://github.com/hassio-addons/app-sonarr) by
Franck Nijhof, used under the MIT licence.

Sonarr itself is developed by the
[Sonarr team](https://github.com/Sonarr/Sonarr) and is licensed under GPLv3.
