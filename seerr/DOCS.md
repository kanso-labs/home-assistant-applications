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

This application has no options. Seerr is configured entirely from its web
interface, and those settings live in the application's configuration directory
so they survive restarts and updates.

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

The icon and logo come from that packaging.

## A note on the base image

Every other application here starts from a Home Assistant base image, which
supplies s6-overlay and bashio. Seerr starts from the image its own project
publishes instead.

Seerr ships no release asset and is not an npm package, so the alternative is
cloning the repository and running its pnpm and Next.js build, including the
native-module pruning upstream does for musl. Building on what upstream already
publishes keeps that parity without repeating it. s6-overlay and bashio are
installed on top, and the service layout is unchanged.
