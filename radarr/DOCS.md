# Home Assistant Application: Radarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Radarr" application.
3. Start it, then select **Open Web UI**, or open port 7878.

## Configuration

Radarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Add a download client under Settings → Download Clients. Radarr reaches the
qBittorrent and NZBGet in this repository over Home Assistant's internal network
by hostname, not at `localhost`: qBittorrent is `2dd33fbd-qbittorrent` on port
8080, and NZBGet is `2dd33fbd-nzbget` on port 6789. Both download under
`/share`, which Radarr sees at the same path, so no remote path mapping is
needed. Indexers can come from
[Prowlarr](https://github.com/kanso-labs/home-assistant-applications/tree/main/prowlarr),
which adds them to Radarr itself once Radarr is added under Prowlarr's Settings
→ Apps. `2dd33fbd` is Home Assistant's name for this repository when it was
added by the address in the README. An application from another repository has
another prefix, shown as **Hostname** on that application's **Info** tab.

**Send Anonymous Usage Data**, under Settings → General, is kept off for you,
and turning it on there has no effect. With it off, Radarr sends Servarr no
crash reports, apart from an error early in a start, before it has read its
settings.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Radarr when it stops answering, not only when it exits. The image asks
for Radarr's `/ping` every 30 seconds, through nginx so that both are checked,
and five failures in a row count as a hang. It is off by default.

## Ingress

Radarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Radarr's API: Prowlarr, Bazarr, Seerr and the rest need no
change.

Both reach Radarr through nginx. Ingress puts Radarr under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Radarr writes one URL
base into every page it serves, so the application makes that path the URL base
and keeps Radarr itself on the loopback address. nginx answers on 7878, puts the
path back onto whatever arrives without it, and takes it out again of whatever
goes back to the published port.

Three things follow from that:

- **The published port shows Radarr's addresses without the ingress path**, as
  it did before ingress. A page opened there under the path, from a bookmark
  made while it showed, is sent to the same page without it.
- **URL Base, Port and Bind Address under Settings → General are set by the
  application** and changing them there has no effect. URL Base shows empty on
  the published port and the ingress path through ingress. A URL Base saved
  before ingress, such as `/radarr`, is ignored, and the log says so at start:
  whatever called `http://<host>:7878/radarr` has to call `http://<host>:7878`.
  Saving Settings → General on the published port clears it.
- **"Disabled for Local Addresses" decides as it did before ingress.** A browser
  calling the published port is judged by its own address, and anything reaching
  it through Traefik, Nginx Proxy Manager or a tunnel has to sign in.
  Supervisor's own address is local, which is why ingress opens without Radarr's
  sign-in when that setting is on; Home Assistant has already asked for one.

Phone apps such as nzb360 and LunaSea cannot use ingress, because it needs a
Home Assistant session in a browser. They still work on the published port.

## Storage

| Path      | Access     | Holds                                                |
| --------- | ---------- | ---------------------------------------------------- |
| `/config` | read/write | The Radarr database and settings                     |
| `/media`  | read/write | Your movie library, where Radarr files what it grabs |
| `/share`  | read/write | Shared storage, typically where downloads land       |

`/media` and `/share` are writable because organising files is what Radarr does:
it moves completed downloads out of `/share` and renames them into `/media`.
Read-only mappings would leave it able to see files but not act on them.

## Backups

Backups are taken cold, so Home Assistant stops Radarr for the duration. Radarr
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore. The application is briefly unavailable
while a backup runs.

Posters and fan art, in `MediaCover`, are left out of backups, since they can
take gigabytes and keep Radarr stopped for longer. So are the log files, and
`logs.db`, which holds the last week of entries under **System → Events**.
Radarr starts both afresh after a restore, and downloads the artwork again as it
refreshes each movie, or for every movie at once with **Update All** on the
Movies page.

## Updates

The image sets `UpdateMethod=docker`, so Radarr's own updater is disabled by
design. Radarr may show that a newer version exists, but it will not install it.
Updates arrive by updating this application instead.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Radarr itself rather than this packaging, see the
[Radarr wiki](https://wiki.servarr.com/radarr).

## Credits

This packaging began as a port of the
[Home Assistant Community app](https://github.com/hassio-addons/app-radarr) by
Franck Nijhof, used under the MIT licence.

Radarr itself is developed by the
[Radarr team](https://github.com/Radarr/Radarr) and is licensed under GPLv3.

The icon and logo are the community app's, unchanged.
