# Home Assistant Application: Profilarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Profilarr" application.
3. Start it, then select **Open Web UI**, or open port 6868.

On first start Profilarr asks you to create an account. Everything after that is
configured from its own web interface — the four options below are the ones it
reads from the environment at startup instead.

### Configarr is in this store too

[Configarr](https://github.com/kanso-labs/home-assistant-applications/tree/main/configarr)
manages the same quality profiles and custom formats in Radarr and Sonarr, and
this repository ships it as an application of its own. **Pick one for each
instance.** Pointed at the same Radarr or Sonarr, each overwrites the other's
changes on every sync, and whichever synced last wins.

## Configuration

### Option: `enable_authentication`

Whether Profilarr requires its own username and password. On by default, and
worth leaving on: port 6868 is published on your network, and Home Assistant's
login does not cover it. Turning it off is for a network where you would rather
not have a second password than a media stack.

### Option: `external_url`

The public address of this application when a reverse proxy is in front of it,
such as `https://profilarr.example.com`. Leave it empty if you open Profilarr on
port 6868.

Profilarr refuses a form sent from a page at an address other than the one the
request arrived at, and that includes the login. Behind a proxy that serves
`https://`, or that changes the host name, the two differ, and signing in fails
with `403 Cross-site POST form submissions are forbidden` until this is set.
Profilarr also marks its session cookie secure when the address starts with
`https://`.

Once it is set, Profilarr takes every request as arriving at that address, so
sign in there. A login sent from port 6868 is refused the same way.

**Leave Local Bypass off behind a reverse proxy or tunnel.** Profilarr's
**Settings → Security** page has a **Local Bypass** switch, off by default, that
skips the login for any request from a local network address. Profilarr judges
that by the address the connection comes from and ignores `X-Forwarded-For`. A
proxy or tunnel on this Home Assistant, such as Traefik, Nginx Proxy Manager or
Cloudflared, connects from its internal network, and a proxy elsewhere on your
network from a private address. With the switch on, everyone they let through
therefore counts as local and skips the login, with the Radarr and Sonarr API
keys Profilarr holds in reach. This repository's Radarr and Sonarr do not work
that way with **Disabled for Local Addresses**: they judge a browser by its own
address, and anything that comes through a proxy has to sign in.

### Options: `parser_host` and `parser_port`

Where to find a Profilarr parser. See the section below.

### Setting the rest up

Add your Radarr and Sonarr instances under **Settings → Arr**, then link a
database — [Dictionarry](https://github.com/Dictionarry-Hub/database),
[TRaSH Guides](https://github.com/Dictionarry-Hub/trash-pcd), or your own — and
sync. Profilarr reaches the arr applications over the internal network, so use
their hostnames inside Home Assistant rather than `localhost`:
`http://2dd33fbd-radarr:7878` for Radarr and `http://2dd33fbd-sonarr:8989` for
Sonarr.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. A Radarr or Sonarr installed any other way has another
prefix, shown as **Hostname** on its Info page.

Schedules and log timestamps follow the Home Assistant system time zone, which
Supervisor passes to the application.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Profilarr when it stops answering, not only when it exits. The image
asks Profilarr's `/api/v1/health` every 30 seconds, which fails when Profilarr
cannot read its own database or when every database linked to it is disabled,
and three failures in a row count as a hang. It is off by default.

Profilarr disables a linked database itself when it cannot build it, and it
stays disabled across a restart. With Watchdog on and no other database enabled,
Home Assistant then restarts Profilarr every few minutes until that database is
unlinked.

## Ingress

Profilarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port is unchanged and keeps working alongside it, for the browser
at home, for a reverse proxy such as Traefik, and for anything that calls
Profilarr's API.

Ingress puts Profilarr under a path of Supervisor's choosing,
`/api/hassio_ingress/<token>`, and Profilarr has no setting for one: it writes
root addresses such as `/arr` throughout its pages. nginx answers ingress on
port 6869, inside the application only. It gives the path to the addresses in
each page, to Profilarr's redirects and to its session cookie, and loads a short
script first in the page that gives the path to every address the page asks for
after that. Profilarr itself still serves at the root on 6868, which is why the
published port sees no difference.

Four things follow from that:

- **Profilarr's own login still applies inside ingress**, after Home
  Assistant's, unless `enable_authentication` is off. The session is kept to the
  ingress path, so signing in there and on the published port are separate.
- **Local Bypass lets ingress in without Profilarr's login**, because ingress
  reaches Profilarr from inside the application. It already lets in everything
  the section on `external_url` above warns about, so leave it off for the same
  reasons.
- **With `external_url` set, ingress signs in as that address.** Profilarr takes
  every request to have arrived there, and nginx tells it the login came from
  there. When the address starts with `https://`, Profilarr's session cookie is
  marked secure, so signing in through ingress then needs Home Assistant on
  `https://` as well.
- **The onboarding tour under Settings → Onboarding checks the page's address**,
  which under ingress carries the path, so it may not move on from a step that
  waits for a page. Take it on the published port.

Phone apps and other tools cannot use ingress, because it needs a Home Assistant
session in a browser. They still work on the published port.

## The testing pages need a parser

Profilarr has three parts: building configurations, testing them, and deploying
them. Building and deploying work here as they do anywhere. Testing — trying a
custom format against a release title, or simulating how a quality profile would
score one — does not, and the reason is structural rather than an oversight.

Those pages are served by a separate C# service that matches Radarr and Sonarr's
own parsing logic, which upstream publishes as a second image and runs beside
Profilarr. A Home Assistant application is one container, so there is no parser
in this one.

If you already run the parser somewhere reachable, set `parser_host` and
`parser_port` and the testing pages come back. Otherwise leave `parser_host`
empty; nothing else in Profilarr depends on it, and syncing a database you have
not tested locally is the ordinary way to use it.

## Storage

| Path              | Access     | Holds                                                                                                    |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `/config/backups` | read/write | Configuration backups Profilarr takes                                                                    |
| `/config/data`    | read/write | Profilarr's SQLite database, `profilarr.db`, and under `databases`, git clones of the databases you link |
| `/config/logs`    | read/write | Application logs                                                                                         |

Nothing else is mapped. Profilarr reaches every application it manages over its
API, and that includes the renames — they are issued as Radarr and Sonarr
commands rather than carried out against the files — so it needs neither
`/media` nor `/share`. Prowlarr is mapped the same way for the same reason.

## Backups

Backups are taken cold, so Home Assistant stops Profilarr for the duration.
Profilarr keeps its state in SQLite, and copying a database that is being
written to can produce a backup that will not restore. The application is
briefly unavailable while a backup runs.

The logs, in `/config/logs`, are left out of backups: Profilarr starts new ones,
and a restore needs none of them. The backups Profilarr takes of its own, into
`/config/backups`, stay in.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. Profilarr lists its newer releases under
**Settings → About**, but it ships no updater of its own: the version is built
into the image, so updating this application is the only route to one.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Profilarr itself rather than this packaging, see
[dictionarry.dev](https://dictionarry.dev) or its
[Discord](https://discord.gg/2A89tXZMgA).

## Credits

[123marvin123](https://github.com/123marvin123/ha-addons) packaged Profilarr for
Home Assistant first, under the Apache 2.0 licence. That packaging stopped at
Profilarr 1.0.1; this one follows the 2.x line and is built to the shape the
rest of this repository uses.

Profilarr itself is developed by
[Dictionarry](https://github.com/Dictionarry-Hub/profilarr) and is licensed
under AGPL-3.0.

The icon and logo are Profilarr's own, from its repository: the icon is scaled
down from `logo-512.png`, and the logo is its banner.
