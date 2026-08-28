# Home Assistant Application: Cleanuparr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Cleanuparr" application.
3. Start it, then open the web interface on port 11011.
4. Connect your download clients and arr applications from the web interface.

There is nothing to configure before the first start. Cleanuparr asks for
everything it needs from its own interface.

## Configuration

This application has no options. Cleanuparr is configured entirely from its web
interface, and those settings live in the application's configuration directory
so they survive restarts and updates.

## Storage

| Path      | Access     | Holds                                       |
| --------- | ---------- | ------------------------------------------- |
| `/config` | read/write | Settings, the strike database, and the logs |
| `/media`  | read/write | Your media library                          |

Most of what Cleanuparr does needs neither. Striking stalled downloads, cleaning
finished ones and blocking unwanted files all happen through the download client
and arr APIs, and those applications do the writing.

**One feature is different, and it is why `/media` is writable.** The orphaned
files cleanup works on disk instead: it reads the directories you point it at,
moves anything no longer claimed by a download into a directory of its own, and
deletes those entries once they are older than the age you set.

That feature is off until you configure it. It skips any download client with no
scan directories set, so an installation that never fills those in touches
nothing.

**The directories you give it have to be under `/media`.** `/share` is not
mapped, so a scan directory there is invisible to Cleanuparr and the cleanup
skips it. Which of the two your downloads land in is set by the download client,
not by Cleanuparr — the qBittorrent and NZBGet documentation here suggests paths
under `/share`, and plenty of installations point them at `/media` instead.

Everything else works either way, since it never reads the disk.

## Backups

`backup: cold` stops the application before the backup is taken. Cleanuparr
keeps its state in SQLite, and copying that file while it is being written can
restore into a corrupt database.

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
under GPL-3.0. The icon and logo come from that project.

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
