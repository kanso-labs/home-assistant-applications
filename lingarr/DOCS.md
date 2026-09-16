# Home Assistant Application: Lingarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Lingarr" application.
3. Start it, then open the web interface on port 9876.

## Configuration

Lingarr is configured from its own web interface, and the settings live in the
application's configuration directory so they survive restarts and updates. Two
options are exceptions, because Lingarr reads them from the environment at
startup and offers no way to change them afterwards.

### Option: `max_concurrent_jobs`

How many translations run at the same time. The default of `1` is Lingarr's own,
and is the right answer on a small host: each extra job costs memory and sends
another stream of requests to whichever translation service you picked, which
paid services meter and rate-limit.

### Option: `job_timeout_minutes`

How long a translation may go quiet before Lingarr assumes it has stalled and
runs it again, in minutes. The default is `30`. Raise it if long files are being
restarted part way through.

### Setting the rest up

The first time you open the web interface, Lingarr asks two questions. The first
is whether to require a username and password; leaving it off is reasonable on a
home network, and turning it on is the safer answer if the port is reachable
from outside one. The second is whether to send anonymous usage statistics, and
it is off unless you turn it on.

Point Lingarr at Radarr and Sonarr under **Settings → Integrations**, and choose
a translation service and your source and target languages under **Settings →
Services**. Lingarr reaches Radarr and Sonarr over the internal network, so use
their application hostnames rather than `localhost` — `http://<slug>:7878` for
Radarr and `http://<slug>:8989` for Sonarr.

Then set the path mappings, which is the part that is easy to miss. Radarr and
Sonarr report the paths they see, and those are not the paths this application
sees. Map each of their media roots onto the equivalent path here, under
**Settings → Integrations → Path mappings**:

| Source path, as Radarr or Sonarr reports it | Destination path, as Lingarr sees it |
| ------------------------------------------- | ------------------------------------ |
| `/media/movies`                             | `/media/movies`                      |
| `/share/tv`                                 | `/share/tv`                          |

The two sides match when Radarr and Sonarr are also installed from this
repository, because every application here maps the same `/media` and `/share`.
They will not match if your Radarr runs elsewhere, and Lingarr will report that
it cannot find the files until they do.

### Translation services

Lingarr translates through LibreTranslate, DeepL, Google, Bing, Microsoft or
Yandex, or through an AI service — OpenAI, Anthropic, Gemini, DeepSeek, Mistral,
xAI, or any OpenAI-compatible endpoint, which is how a local Ollama is reached.
Each is configured in the web interface and most need an API key you supply.

Schedules and every timestamp in the web interface follow the Home Assistant
system time zone, which Supervisor passes to the application.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The Lingarr database, job store and keys      |
| `/media`  | read/write | Your library, where translations are written  |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because a finished translation is a subtitle
file written beside the media it belongs to. Read-only mappings would let
Lingarr translate and then have nowhere to put the result.

Lingarr writes to `/app/config` unless it is told otherwise, and that path is an
anonymous Docker volume: outside `/config`, absent from backups, and discarded
on update. This application points the database, the job store and the data
protection keys at `/config` instead, so `/app/config` stays empty.

## Database

Lingarr supports MySQL, PostgreSQL and SQLite, and defaults to MySQL in a second
container. This application runs it on SQLite, which needs no second container
and matches every other database-backed application here. The database is
`/config/local.db`, and the job store is `/config/Hangfire.db`.

## Backups

Backups are taken cold, so Home Assistant stops Lingarr for the duration.
Lingarr keeps its state in SQLite, and copying a database that is being written
to can produce a backup that will not restore. The application is briefly
unavailable while a backup runs.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Lingarr itself rather than this packaging, see the
[Lingarr documentation](https://docs.lingarr.com) or its
[Discord](https://discord.gg/HkubmH2rcR).

## Credits

Nobody had packaged Lingarr for Home Assistant, so this packaging is new rather
than a port. Its shape follows the other applications in this repository, and
the Dockerfile follows Cleanuparr's, which builds on an upstream image for the
same reason.

Lingarr itself is developed by the
[Lingarr team](https://github.com/lingarr-translate/lingarr) and is licensed
under AGPL-3.0.
