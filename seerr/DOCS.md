# Home Assistant Application: Seerr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Seerr" application.
3. Start it, then select **Open Web UI**, or open port 5055.
4. Follow the setup wizard: sign in with Plex or Jellyfin, then connect your
   Radarr and Sonarr instances.

There is nothing to configure before the first start. Everything Seerr needs is
asked for by its own setup wizard.

Seerr reaches Radarr and Sonarr over Home Assistant's internal network by
hostname, not at `localhost`, which inside Seerr's container is Seerr itself.
For the Radarr and Sonarr in this repository, enter `2dd33fbd-radarr` with port
7878 and `2dd33fbd-sonarr` with port 8989, with SSL off and the URL base empty.
Each one's API key is under its own **Settings → General**. `2dd33fbd` is Home
Assistant's name for this repository when it was added by the address in the
README. A Radarr or Sonarr installed any other way has another prefix, shown as
**Hostname** on its **Info** tab.

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

## Ingress

Seerr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in, so the people you share Seerr with keep using the published
port.

The published port is unchanged and keeps working alongside it, for everyone
requesting from a browser or phone, for a reverse proxy such as Traefik, and for
anything that calls Seerr's API. Radarr and Sonarr need no change.

Ingress puts Seerr under a path of Supervisor's choosing,
`/api/hassio_ingress/<token>`, and Seerr cannot be given one: it writes root
addresses such as `/discover` throughout its pages. nginx answers ingress on
port 5056, inside the application only. It gives the path to the addresses in
each page, to the folder Seerr's scripts load from, to Seerr's redirects and to
its session cookie, and loads a short script first in the page that gives the
path to every address the page asks for after that. Seerr itself still serves at
the root on 5055, which is why the published port sees no difference.

Three things follow from that:

- **Seerr's own sign-in still applies inside ingress**, after Home Assistant's.
  The session is kept to the ingress path, so signing in there and on the
  published port are separate.
- **There are no push notifications through ingress.** Seerr delivers them
  through a service worker, which inside ingress would belong to Home
  Assistant's address rather than Seerr's, so none is registered there. Turn
  them on from the published port.
- **A link opened in a new tab opens Seerr outside Home Assistant's frame**,
  under the ingress path. It works while you are signed in to Home Assistant in
  that browser.

Phone apps and other tools cannot use ingress, because it needs a Home Assistant
session in a browser. They still work on the published port.

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

Many applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. Seerr starts from the image its own project publishes
instead.

Seerr ships no release asset and is not an npm package, so the alternative is
cloning the repository and running its pnpm and Next.js build, including the
native-module pruning upstream does for musl. Building on what upstream already
publishes keeps that parity without repeating it. s6-overlay and bashio are
installed on top, and the service layout is unchanged.
