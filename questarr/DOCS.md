# Home Assistant Application: Questarr

[Questarr](https://github.com/Doezer/Questarr) does for games what Radarr and
Sonarr do for films and shows. It finds the games you want through IGDB, tracks
them, searches your indexers or Prowlarr for releases, sends them to your
downloaders, and imports what arrives into your library.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Questarr" application.
3. Start it, then select **Open Web UI**, or open port 5000.
4. Create the administrator account, then work through the setup wizard, which
   asks for the IGDB credentials Questarr finds games with.

IGDB credentials come from a Twitch developer application, registered for free
at [dev.twitch.tv/console](https://dev.twitch.tv/console). The wizard asks for
its client ID and secret.

Port 5000 is published on your network, so create the administrator account
straight after the first start, whether through ingress or the port.

## Configuration

### Option: `umask`

The permissions Questarr gives the games it imports. `022` is the default and
leaves them writable by their owner alone. `002` makes them group-writable,
which is what a library shared with other applications or users needs.

This is the only application option. Everything else — indexers, downloaders,
the library, notifications — is configured from Questarr's own interface and
kept in its database.

### Setting the rest up

Reach the other applications on this Home Assistant by their hostnames rather
than `localhost`. Prowlarr is `http://2dd33fbd-prowlarr:9696`, and **Indexers →
Sync from Prowlarr** imports its indexers. qBittorrent is
`http://2dd33fbd-qbittorrent:8080` and NZBGet is `http://2dd33fbd-nzbget:6789`,
both added under **Downloaders**.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. An application installed any other way has another
prefix, shown as **Hostname** on its Info tab.

Questarr sends a downloader's password or API key over plain HTTP only when that
downloader has **Allow insecure LAN** turned on. The addresses above are plain
HTTP inside this Home Assistant, so turn it on for each of them.

To import completed downloads, turn on **Post-Processing** under **Settings →
Import** and type a **Library Root** under `/media` or `/share`, such as
`/media/games`. Questarr's folder browser only lists its own directory, so the
path has to be typed. qBittorrent and NZBGet in this store download under
`/share` by default and map `/media` and `/share` as Questarr does, so the paths
they report are the ones Questarr sees, and no path mapping is needed.

### HTTPS

Leave Questarr's own HTTPS setting turned off. It listens on port 9898, which
this application does not publish, so turning it on with the HTTP redirect
leaves the interface unreachable. Put Questarr behind
[Nginx Proxy Manager](https://github.com/kanso-labs/home-assistant-applications/tree/main/nginx-proxy-manager)
or
[Traefik](https://github.com/kanso-labs/home-assistant-applications/tree/main/traefik)
instead.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Questarr when it stops answering, not only when it exits. The image asks
for Questarr's `/api/health` every 30 seconds, which answers without signing in
and without asking IGDB, the indexers or the downloaders anything, so none of
them being down counts against it. After a start, failures count only once
Questarr has answered or two minutes have passed, because after an update it
migrates its database before it answers. It is off by default.

## Ingress

Questarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port, 5000, keeps working alongside it, for a browser on your
network, for a reverse proxy such as Traefik, and for anything that calls
Questarr's API.

Ingress puts Questarr under a path of Supervisor's choosing,
`/api/hassio_ingress/<token>`. Questarr is built to be served under a path a
proxy strips: its pages load everything by relative address, and its client
works out the path from where its own script was loaded. nginx answers ingress
on port 5001, inside the application only, and gives the path to the two things
the browser keeps outside the page, Questarr's redirects and its session
cookies. Questarr itself still serves at the root on 5000, which is why the
published port sees no difference.

Two things follow from that:

- **Questarr's own sign-in still applies inside ingress**, after Home
  Assistant's. The session is kept to the ingress path, so signing in there and
  on the published port are separate, and signing out of one leaves the other
  signed in. That holds when Home Assistant and the published port share a
  hostname too, although the browser then sends the published port's cookies to
  ingress as well: nginx forwards only ingress's own.
- **A link opened in a new tab opens Questarr outside Home Assistant's frame**,
  under the ingress path. It works while you are signed in to Home Assistant in
  that browser.

Tools that call Questarr's API cannot use ingress, because it needs a Home
Assistant session in a browser. They still work on the published port.

## Forgotten password

Questarr has no email reset. Its reset script runs inside the container: from
the [Advanced SSH & Web Terminal](https://github.com/hassio-addons/app-ssh)
application, with its protection mode off, run

```shell
docker exec -it addon_2dd33fbd_questarr node /app/dist/scripts/reset-password.js <username>
```

and it prompts for a new password.

## Storage

| Path      | Access     | Holds                                                          |
| --------- | ---------- | -------------------------------------------------------------- |
| `/config` | read/write | The Questarr database, its `config.yaml` and its own backups   |
| `/media`  | read/write | Your library, where downloads are imported                     |
| `/share`  | read/write | Shared storage, when your library or your downloads live there |

`/media` and `/share` are writable because importing a download into the library
is the job. Read-only mappings would let Questarr find a completed download and
then fail at the point of moving it.

Questarr keeps its data in `/app/data`, which is linked to `/config`. Its
**Backups** page writes to `/config/backups`, so those backups are part of every
Home Assistant backup too.

## Backups

Backups are taken cold, so Home Assistant stops Questarr for the duration. It
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

A backup made from Questarr's own **Backups** page is restored the same way:
Questarr stages it, exits, and is started again on its own to apply it.

## Updates

Updates arrive by updating this application. Only Questarr's stable releases are
offered; its weekly `-dev` builds never are.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Questarr itself rather than this packaging, see its
[repository](https://github.com/Doezer/Questarr) and its
[documentation](https://github.com/Doezer/Questarr/tree/main/docs).

## Credits

Questarr's repository carries a Home Assistant application of its own, for
`amd64` only. This packaging is new rather than a port of it: its shape follows
the other applications in this repository, and it runs on `aarch64` too.

Questarr itself is developed by [Doezer](https://github.com/Doezer/Questarr) and
is licensed under GPL-3.0. Its image carries
[Apprise](https://github.com/caronc/apprise) and
[7-Zip](https://www.7-zip.org/), and this application adds
[UnRAR](https://www.rarlab.com/), built from RARLAB's source, and
[nginx](https://nginx.org/) for ingress. Each has a licence of its own. The icon
is Questarr's own, from its repository, and the logo is Questarr's own logo,
which sets that icon beside its name.
