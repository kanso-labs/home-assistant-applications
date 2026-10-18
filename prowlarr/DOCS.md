# Home Assistant Application: Prowlarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Prowlarr" application.
3. Start it, then select **Open Web UI**, or open port 9696.

## Configuration

Almost everything is configured from Prowlarr's own web interface, and the
settings live in the application's configuration directory so they survive
restarts and updates. The one application option is below.

**Send Anonymous Usage Data**, under Settings → General, is kept off for you,
and turning it on there has no effect. With it off, Prowlarr sends Servarr no
crash reports, apart from an error early in a start, before it has read its
settings.

### `ipv4_only`

Makes Prowlarr connect over IPv4 only. It is off by default, and Prowlarr then
tries IPv6 first whenever your network has it.

Turn it on when indexers behind Cloudflare keep failing with "blocked by
CloudFlare Protection", even through FlareSolverr or Byparr. On a network with
IPv6, Cloudflare has been seen to challenge Prowlarr's request again over IPv6,
even with the cookies the solver had just earned. The same request over IPv4 got
through.

### Connecting Radarr and Sonarr

Add Radarr and Sonarr under Settings → Apps. Prowlarr reaches them over Home
Assistant's internal network by hostname, not at `localhost`: for the Radarr and
Sonarr in this repository, **Radarr Server** is `http://2dd33fbd-radarr:7878`
and **Sonarr Server** is `http://2dd33fbd-sonarr:8989`. They reach Prowlarr the
same way, so set **Prowlarr Server** to `http://2dd33fbd-prowlarr:9696` in each.
`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. An application from another repository has another
prefix, shown as **Hostname** on that application's **Info** tab.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Prowlarr when it stops answering, not only when it exits. The image asks
for Prowlarr's `/ping` every 30 seconds, through nginx so that both are checked,
and five failures in a row count as a hang. It is off by default.

## Ingress

Prowlarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Prowlarr: the indexers it syncs into Sonarr and Radarr,
and the **Prowlarr Server** address under Settings → Apps, need no change.

Both reach Prowlarr through nginx. Ingress puts Prowlarr under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Prowlarr writes one
URL base into every page it serves, so the application makes that path the URL
base and keeps Prowlarr itself on the loopback address. nginx answers on 9696,
puts the path back onto whatever arrives without it, and takes it out again of
whatever goes back to the published port.

Three things follow from that:

- **The published port shows Prowlarr's addresses without the ingress path**, as
  it did before ingress, the download links in its Torznab and Newznab feeds
  included. A page opened there under the path, from a bookmark made while it
  showed, is sent to the same page without it. Download links that Sonarr and
  Radarr stored with the path still work, until a reinstall gives ingress a new
  path.
- **URL Base, Port and Bind Address under Settings → General are set by the
  application** and changing them there has no effect. URL Base shows empty on
  the published port and the ingress path through ingress. A URL Base saved
  before ingress, such as `/prowlarr`, is ignored, and the log says so at start:
  whatever called `http://<host>:9696/prowlarr` has to call
  `http://<host>:9696`. Saving Settings → General on the published port clears
  it.
- **"Disabled for Local Addresses" decides as it did before ingress.** A browser
  calling the published port is judged by its own address, and anything reaching
  it through Traefik, Nginx Proxy Manager or a tunnel has to sign in.
  Supervisor's own address is local, which is why ingress opens without
  Prowlarr's sign-in when that setting is on; Home Assistant has already asked
  for one.

Phone apps such as nzb360 and LunaSea cannot use ingress, because it needs a
Home Assistant session in a browser. They still work on the published port.

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

The log files are left out of backups, and so is `logs.db`, which holds the last
week of entries under **System → Events**. Prowlarr starts both afresh after a
restore.

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

The icon is Prowlarr's own, from its repository. The logo sets the same icon
beside Prowlarr's name.
