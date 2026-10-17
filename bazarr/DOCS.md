# Home Assistant Application: Bazarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Bazarr" application.
3. Start it, then open the web interface on port 6767.

### Turn on a login

Bazarr starts with no authentication, and port 6767 is published on your
network. Until you add a login, anyone who can reach the port has the whole
interface, including the provider passwords and the Sonarr and Radarr API keys
it stores.

Set **Settings → General → Security → Authentication** to **Form** and choose a
username and password. Anything that talks to Bazarr through its API key keeps
working.

### Bazarr+ is in this store too

[Bazarr+](../bazarr-plus) is a fork of Bazarr, and this repository ships it as
an application of its own. **Pick one.** Both write subtitle files next to your
media, so running them over the same library means two applications editing the
same files with different settings, and whichever ran last wins.

They also publish the same port, 6767. Two applications cannot publish one port,
and Home Assistant reports the conflict only when the second one starts. If
Bazarr+ or anything else already has it, change the port Bazarr is published on
under its **Network** settings. Nothing inside the container moves — only the
port the host answers on.

## Configuration

Bazarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Point it at Radarr and Sonarr under Settings, then choose the subtitle languages
and providers you want. Bazarr reaches them over Home Assistant's internal
network by hostname, not at `localhost`: the Radarr and Sonarr in this
repository are `2dd33fbd-radarr` on port 7878 and `2dd33fbd-sonarr` on
port 8989. `2dd33fbd` is Home Assistant's name for this repository when it was
added by the address in the README. A Radarr or Sonarr from another repository
has another prefix, shown as **Hostname** on that application's **Info** page.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The Bazarr database, settings, cache and logs |
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

The cache and the logs are left out of backups: Bazarr fills its cache again as
it searches, and a restore needs neither. The backups Bazarr takes itself, in
`/config/backup`, stay in.

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

The icon is Bazarr's own, from its web interface. The logo sets the same icon
beside Bazarr's name, in the purple Bazarr uses as its theme colour.
