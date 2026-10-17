# Home Assistant Application: Sonarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Sonarr" application.
3. Start it, then open it from the sidebar, or on port 8989.

## Configuration

Sonarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

## Ingress

Sonarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Sonarr's API: Prowlarr, Bazarr, Seerr and the rest need no
change.

Both reach Sonarr through nginx. Ingress puts Sonarr under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Sonarr writes one URL
base into every page it serves, so the application makes that path the URL base
and keeps Sonarr itself on the loopback address. nginx answers on 8989, puts the
path back onto whatever arrives without it, and takes it out again of whatever
goes back to the published port.

Three things follow from that:

- **The published port shows Sonarr's addresses without the ingress path**, as
  it did before ingress. A page opened there under the path, from a bookmark
  made while it showed, is sent to the same page without it.
- **URL Base, Port and Bind Address under Settings → General are set by the
  application** and changing them there has no effect. URL Base shows empty on
  the published port and the ingress path through ingress. A URL Base saved
  before ingress, such as `/sonarr`, is ignored, and the log says so at start:
  whatever called `http://<host>:8989/sonarr` has to call `http://<host>:8989`.
  Saving Settings → General on the published port clears it.
- **"Disabled for Local Addresses" decides as it did before ingress.** A browser
  calling the published port is judged by its own address, and anything reaching
  it through Traefik, Nginx Proxy Manager or a tunnel has to sign in.
  Supervisor's own address is local, which is why ingress opens without Sonarr's
  sign-in when that setting is on; Home Assistant has already asked for one.

Phone apps such as nzb360 and LunaSea cannot use ingress, because it needs a
Home Assistant session in a browser. They still work on the published port.

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

Posters and fan art, in `MediaCover`, and the log files are left out of backups,
since they can take gigabytes and keep Sonarr stopped for longer. After a
restore Sonarr downloads the artwork again as it refreshes each series, or for
every series at once with **Update All** on the Series page.

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
