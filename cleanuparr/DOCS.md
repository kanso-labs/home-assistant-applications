# Home Assistant Application: Cleanuparr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Cleanuparr" application.
3. Start it, then select **Open Web UI**, or open port 11011.
4. Create Cleanuparr's account, then connect your download clients and arr
   applications from the web interface.

There is nothing to configure before the first start. Cleanuparr asks for
everything it needs from its own interface.

## Configuration

This application has no options. Cleanuparr is configured entirely from its web
interface, and those settings live in the application's configuration directory
so they survive restarts and updates.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Cleanuparr when it stops answering, not only when it exits. The image
asks Cleanuparr's `/health` every 30 seconds, which reports only whether
Cleanuparr itself is running, so a download client or arr application being down
never counts against it. It is off by default.

## Ingress

Cleanuparr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port is unchanged and keeps working alongside it, for the browser
at home and for everything that calls Cleanuparr: health checks on `/health` and
dashboards reading `/api/v2/stats` need no change. Cleanuparr calls the arr
applications and download clients rather than the other way round, so nothing
there needs changing either.

Ingress puts Cleanuparr under a path of Supervisor's choosing,
`/api/hassio_ingress/<token>`, and Cleanuparr builds every address in its
interface from one URL base it writes into the page. nginx answers ingress on
port 11012, inside the application only, and writes that path into the page as
the base. Cleanuparr itself still serves at the root on 11011, which is why the
published port sees no difference.

Three things follow from that:

- **Cleanuparr's own sign-in still applies inside ingress**, after Home
  Assistant's. Its username and password work there. Signing in with Plex or
  OpenID Connect leaves for another site and comes back to an address outside
  ingress, so use those on the published port.
- **"Disable Authentication for Local Addresses" lets ingress in without
  Cleanuparr's sign-in**, because ingress reaches Cleanuparr from inside the
  application. That setting already lets in every local address on the published
  port, so turning it on is a choice about your network, not only about ingress.
  With "Trust Forwarded Headers" on as well, Cleanuparr judges an ingress visit
  by the browser's address instead.
- **Cleanuparr's own `BASE_PATH` is not used.** Setting it would move every
  address on the published port under the ingress token, and answer 404 outside
  it.

Phone apps and other tools cannot use ingress, because it needs a Home Assistant
session in a browser. They still work on the published port.

## Storage

| Path      | Access     | Holds                                       |
| --------- | ---------- | ------------------------------------------- |
| `/config` | read/write | Settings, the strike database, and the logs |
| `/media`  | read/write | Your media library, and downloads kept here |
| `/share`  | read/write | Downloads kept here                         |

Most of what Cleanuparr does needs neither `/media` nor `/share`. Striking
stalled downloads, cleaning finished ones and blocking unwanted files all happen
through the download client and arr APIs, and those applications do the writing.

**Two features read the disk instead, and they are why both are mapped.**

- **Unlinked download handling** counts the hard links of every file in a
  download, to tell whether an arr application still uses it. It only reads.
- **The orphaned files cleanup** reads the directories you point it at, moves
  anything no longer claimed by a download into a directory of its own, and
  deletes those entries once they are older than the age you set. It is why both
  paths are writable.

Both are off until you configure them, so an installation that never turns them
on touches nothing on disk.

**Both find files at the path the download client reports**, so that path has to
be under `/media` or `/share`. This repository's qBittorrent saves to
`/share/qbittorrent/downloads` by default, and plenty of installations point it
at `/media` instead; either works as it is. A download client whose paths differ
from Cleanuparr's, such as one on another machine, needs them mapped under the
client's **Download Directory Source and Target** in Cleanuparr, or the orphaned
files cleanup can mistake files still in use for orphans.

**Give the orphaned files cleanup the download client's own folder**, such as
`/share/qbittorrent/downloads`, never `/share` or `/media` itself. Other
applications keep their files there too, NZBGet's downloads among them, and
nothing a torrent does not claim is safe in a scan directory.

## Backups

`backup: cold` stops the application before the backup is taken. Cleanuparr
keeps its state in SQLite, and copying that file while it is being written can
restore into a corrupt database.

The logs, in `/config/logs`, are left out of backups: Cleanuparr starts new
ones, and a restore needs none of them.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. Cleanuparr's own updater is not used.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Cleanuparr itself rather than this packaging, see
[its own repository](https://github.com/Cleanuparr/Cleanuparr).

## Credits

The packaging is adapted from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
is MIT licensed.

Cleanuparr itself is
[a separate project](https://github.com/Cleanuparr/Cleanuparr) and is licensed
under GPL-3.0. The icon comes from that project, and the logo sets it beside
Cleanuparr's name.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. This one starts from the image Cleanuparr publishes,
which is the same choice Seerr makes and for a related reason.

Cleanuparr does publish a release archive, and it carries the application on its
own. The published image also carries Apprise, which is what Cleanuparr sends
its notifications through, so building on the archive would quietly drop
notifications. Building on the image keeps them.

s6-overlay and bashio are installed on top, and the service layout is unchanged
from every other application here.
