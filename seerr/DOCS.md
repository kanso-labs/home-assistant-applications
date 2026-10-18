# Home Assistant Application: Seerr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Seerr" application.
3. Start it, then open the web interface on port 5055.
4. Follow the setup wizard: sign in with Plex or Jellyfin, then connect your
   Radarr and Sonarr instances.

There is nothing to configure before the first start. Everything Seerr needs is
asked for by its own setup wizard.

## Configuration

| Option    | What it sets                                               |
| --------- | ---------------------------------------------------------- |
| Log level | How much detail Seerr writes to its log. `info` by default |

Seerr itself defaults to `debug`, and this application to `info`. Seerr's Logs
page, under Settings, shows only what is logged, so its debug lines appear there
only once the level is `debug`.

Everything else is configured from Seerr's web interface, and those settings
live in the application's configuration directory so they survive restarts and
updates.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Seerr when it stops answering, not only when it exits. The image asks
for Seerr's `/api/v1/status/appdata` every 30 seconds, which Seerr answers
without calling GitHub or a media server, and five failures in a row count as a
hang. It is off by default.

## Storage

| Path      | Access     | Holds                                        |
| --------- | ---------- | -------------------------------------------- |
| `/config` | read/write | Settings, the request database, and the logs |

Seerr keeps its settings beside the application by default, which an update
would discard. This application points it at `/config` instead, so both the
database and your settings survive.

No media or share mapping is granted. Seerr never touches the files themselves —
it asks Radarr and Sonarr to fetch them, and they do the writing.

## Backups

`backup: cold` stops the application before the backup is taken. Seerr keeps its
requests in SQLite, and copying that file while it is being written can restore
into a corrupt database.

The logs and the image cache, `logs/` and `cache/` in the configuration
directory, are left out of backups. The cache can grow large once **Enable Image
Caching** is on, and Seerr fetches those images again as they are needed. A
restored install starts with an empty log, and so does Seerr's Logs page.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. Seerr's own updater is not used.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Seerr itself rather than this packaging, see
[its own repository](https://github.com/seerr-team/seerr).

## Credits

The packaging is adapted from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
is MIT licensed.

Seerr itself is [a separate project](https://github.com/seerr-team/seerr) and is
licensed under the MIT licence. It was previously known as Jellyseerr.

The icon comes from that packaging. The logo is Seerr's own wordmark, with its
lettering recoloured from white to the blue of its own gradient so that it reads
on a light background too.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. Seerr starts from the image its own project publishes
instead.

Seerr ships no release asset and is not an npm package, so the alternative is
cloning the repository and running its pnpm and Next.js build, including the
native-module pruning upstream does for musl. Building on what upstream already
publishes keeps that parity without repeating it. s6-overlay and bashio are
installed on top, and the service layout is unchanged.
