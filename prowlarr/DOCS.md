# Home Assistant Application: Prowlarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Prowlarr" application.
3. Start it, then open the web interface on port 9696.

## Configuration

Prowlarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

To connect it to the rest of the stack, add Radarr and Sonarr under Settings
then Apps. Prowlarr reaches them over the internal network, so use their
application hostnames rather than `localhost`.

## Storage

| Path      | Access     | Holds                              |
| --------- | ---------- | ---------------------------------- |
| `/config` | read/write | The Prowlarr database and settings |

Prowlarr manages indexer definitions rather than files, so it maps nothing else.
The community packaging also maps `/media` and `/share`, which Prowlarr never
reads or writes; those are dropped here rather than granted for nothing.

## Backups

Backups are taken cold, so Home Assistant stops Prowlarr for the duration.
Prowlarr keeps its state in SQLite, and copying a database that is being written
to can produce a backup that will not restore. The application is briefly
unavailable while a backup runs.

## Updates

The image sets `UpdateMethod=docker`, so Prowlarr's own updater is disabled by
design. Prowlarr may show that a newer version exists, but it will not install
it. Updates arrive by updating this application instead.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Prowlarr itself rather than this packaging, see the
[Prowlarr wiki](https://wiki.servarr.com/prowlarr).

## Credits

This packaging began as a port of the
[Home Assistant Community add-on](https://github.com/hassio-addons/addon-prowlarr)
by Franck Nijhof, used under the MIT licence.

Prowlarr itself is developed by the
[Prowlarr team](https://github.com/Prowlarr/Prowlarr) and is licensed under
GPLv3.
