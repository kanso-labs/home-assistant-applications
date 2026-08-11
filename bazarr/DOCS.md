# Home Assistant Application: Bazarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Bazarr" application.
3. Start it, then open the web interface on port 6767.

## Configuration

Bazarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Point it at Radarr and Sonarr under Settings, then choose the subtitle languages
and providers you want. Bazarr reaches them over the internal network, so use
their application hostnames rather than `localhost`.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The Bazarr database and settings              |
| `/media`  | read/write | Your library, where subtitles are written     |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because Bazarr saves subtitle files next to
the media they belong to. Read-only mappings would let it search and find
subtitles it could never save.

## Backups

Backups are taken cold, so Home Assistant stops Bazarr for the duration. Bazarr
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore. The application is briefly unavailable
while a backup runs.

## Updates

The image sets `UpdateMethod=Docker` and starts Bazarr with `--no-update`, so
its own updater is disabled by design. Updates arrive by updating this
application instead.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Bazarr itself rather than this packaging, see the
[Bazarr wiki](https://wiki.bazarr.media).

## Credits

This packaging began as a port of the
[Home Assistant Community add-on](https://github.com/hassio-addons/addon-bazarr)
by Franck Nijhof, used under the MIT licence.

Bazarr itself is developed by the
[Bazarr team](https://github.com/morpheus65535/bazarr) and is licensed under
GPLv3.
