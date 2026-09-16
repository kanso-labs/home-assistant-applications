# Home Assistant Application: Profilarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Profilarr" application.
3. Start it, then open the web interface on port 6868.

On first start Profilarr asks you to create an account. Everything after that is
configured from its own web interface — the four options below are the ones it
reads from the environment at startup instead.

## Configuration

### Option: `enable_authentication`

Whether Profilarr requires its own username and password. On by default, and
worth leaving on: port 6868 is published on your network, and Home Assistant's
login does not cover it. Turning it off is for a network where you would rather
not have a second password than a media stack.

### Option: `external_url`

The address that reaches this application from outside Home Assistant, such as
`https://profilarr.example.com`. Profilarr uses it only to build OIDC redirects
and to decide whether its session cookie may be marked secure, so leave it empty
unless you have put something in front of the port.

### Options: `parser_host` and `parser_port`

Where to find a Profilarr parser. See the section below.

### Setting the rest up

Add your Radarr and Sonarr instances under **Settings → Arr**, then link a
database — [Dictionarry](https://github.com/Dictionarry-Hub/database),
[TRaSH Guides](https://github.com/Dictionarry-Hub/trash-pcd), or your own — and
sync. Profilarr reaches the arr applications over the internal network, so use
their application hostnames rather than `localhost`: `http://<slug>:7878` for
Radarr and `http://<slug>:8989` for Sonarr.

Schedules and log timestamps follow the Home Assistant system time zone, which
Supervisor passes to the application.

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

| Path                | Access     | Holds                                 |
| ------------------- | ---------- | ------------------------------------- |
| `/config/backups`   | read/write | Configuration backups Profilarr takes |
| `/config/data`      | read/write | Git clones of the databases you link  |
| `/config/databases` | read/write | The SQLite databases                  |
| `/config/logs`      | read/write | Application logs                      |

Nothing else is mapped. Profilarr reaches every application it manages over its
API, and that includes the renames — they are issued as Radarr and Sonarr
commands rather than carried out against the files — so it needs neither
`/media` nor `/share`. Prowlarr is mapped the same way for the same reason.

## Backups

Backups are taken cold, so Home Assistant stops Profilarr for the duration.
Profilarr keeps its state in SQLite, and copying a database that is being
written to can produce a backup that will not restore. The application is
briefly unavailable while a backup runs.

Profilarr also takes backups of its own, into `/config/backups`, which a Home
Assistant backup then includes.

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
