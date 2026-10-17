# Home Assistant Application: Bazarr+

## This is a fork, and Bazarr is also in this store

Bazarr+ is a fork of [Bazarr](../bazarr), which this repository ships as its own
application. They are the same program underneath, and everything Bazarr does,
this does too.

What the fork adds:

- **A provider marketplace** — a plugin catalogue of subtitle providers, rather
  than only the set compiled in.
- **Machine translation** through Lingarr, Gemini, Google Translate or
  OpenRouter, and translation from embedded tracks.
- **Bilingual and trilingual subtitles** in one file.
- **Multi-engine subtitle synchronisation.**

**Pick one.** Both write subtitle files next to your media, so running them over
the same library means two applications editing the same files with different
settings, and whichever ran last wins. Install this _or_ Bazarr, not both.

If you are moving from Bazarr, treat it as a fresh install rather than a
migration: the two keep separate configuration directories, and the fork's
database schema has diverged from the one Bazarr writes.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Bazarr+" application.
3. Start it, then open it from the sidebar, or on port 6767.
4. Work through the setup wizard: Sonarr and Radarr, then languages and
   providers.

### Turn on a login

Bazarr+ starts with no authentication, and port 6767 is published on your
network. Until you add a login, anyone who can reach the port has the whole
interface, including the provider passwords and the Sonarr and Radarr API keys
it stores.

Set **Settings → General → Security → Authentication** to **Form** and choose a
username and password. Anything that talks to Bazarr+ through its API key keeps
working.

### If 6767 is taken

Two applications cannot publish the same port, and Home Assistant reports the
conflict only when the second one starts. Bazarr uses 6767 too, so if it is
installed, or anything else already has the port, change the one Bazarr+ is
published on under its **Network** settings. Nothing inside the container moves
— only the port the host answers on.

## Configuration

There are no application options. Everything is configured from the web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Point it at Radarr and Sonarr under Settings, then choose the subtitle languages
and providers you want. It reaches them over the internal network, so use their
application hostnames rather than `localhost`.

Language profiles are applied automatically only to series and movies Bazarr+
syncs after you set a default under **Settings → Languages**. Anything it synced
before that has no profile and gets no subtitles, so assign one from **Mass
Edit** on the Series and Movies pages.

### Translation

Nothing is translated until you choose a translator under **Settings →
Translator**. [Lingarr](../lingarr), which this repository also ships, needs
only its address and API key here; which service does the translating is set in
Lingarr. Gemini and OpenRouter are paid third-party services with API keys of
their own, and nothing is sent to any of them until you configure one.

To translate automatically, set **Translate From** on a language in a language
profile — Portuguese (Brazil) from English, say. When that language is missing
and a subtitle in the source language exists, Bazarr+'s search for missing
subtitles translates it rather than looking for it on the providers.

## Ingress

Bazarr+ is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Bazarr+'s API, which needs no change.

Both reach Bazarr+ through nginx. Ingress puts Bazarr+ under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Bazarr+ writes one URL
base into every page it serves, so the application makes that path the URL base
and moves Bazarr+ itself to port 16767. nginx answers on 6767, puts the path
back onto whatever arrives without it, and takes it back out of everything it
returns to the published port.

Six things follow from that:

- **Ingress starts working on the second start.** Bazarr+ keeps its URL base in
  `config.yaml`, which a first start has not written yet, and the application
  leaves a new install's file for Bazarr+ to create. Until then Bazarr+ serves
  at the root, ingress included.
- **The published port shows Bazarr+'s own addresses**, with no path, as it did
  before ingress, and its API and webhooks answer at the root. A page opened
  there under the path, from a bookmark made since ingress arrived, is sent to
  the same page without it.
- **Base URL and Port under Settings → General are set by the application.** The
  base is written back into `config.yaml` on every start, and the port Bazarr+
  listens on is passed to it on the command line, which wins over the one saved.
  On the published port the base shows as `/`. Leave it alone: one saved there
  is written over at the application's next start, but a restart from inside
  Bazarr+ would put it into effect first and break both routes.
- **Port 16767 answers on the internal network too**, because Bazarr+'s own
  frontend server always listens on every address. It is not published, and it
  serves the same Bazarr+ as 6767.
- **Everyone behind Traefik shares one login lockout.** Five wrong passwords
  lock an address out of Bazarr+ for five minutes. nginx tells Bazarr+ each
  client's address apart, and the browser's through ingress, so one client's
  mistakes lock out only that client. Bazarr+'s log names a client by 127 and
  the last three numbers of its address, `127.168.1.50` for `192.168.1.50`.
  Everything through Traefik, or any other proxy in front of the published port,
  arrives from the proxy's one address, so five wrong passwords there lock out
  everyone using it for five minutes. So do IPv6 clients, among themselves.
- **A session opened over HTTPS gets a `Secure` cookie**, which the browser then
  sends over HTTPS alone. HTTPS here means Traefik, or Home Assistant through
  ingress, said the request was; the published port itself is plain HTTP.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The database, settings, logs and backups      |
| `/media`  | read/write | Your library, where subtitles are written     |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because subtitle files are saved next to the
media they belong to. Read-only mappings would let it search and find subtitles
it could never save.

## Backups

Backups are taken cold, so Home Assistant stops Bazarr+ for the duration. It
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

**The logs and the cache are left out**, `log/` and `cache/` in the
configuration directory, to keep the time Bazarr+ is stopped short. Bazarr+
recreates both at start, and the cache holds only what it can work out again:
the waveforms and video the subtitle editor plays, subtitles read out of video
files, and the launcher for its synchronisation tool. A restored install starts
with an empty log.

**Take one before a major update.** The fork's own migrations warn that some
schema changes are one-way and cannot be rolled back — its log says so during
the upgrade, and restoring the backup is the only route down.

## Updates

The application is started with `--no-update`, so its own updater is disabled by
design. It will report that a newer version exists and refuse to install it,
which is why this packaging is the only route to one.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Bazarr+ itself rather than this packaging, see its
[repository](https://github.com/LavX/bazarr).

## Credits

Bazarr+ is developed by [LavX](https://github.com/LavX/bazarr) as a fork of
[Bazarr](https://github.com/morpheus65535/bazarr) by the Bazarr team. Both are
licensed under GPLv3.

This packaging is new rather than a port, and its shape follows the other
applications in this repository — including the Bazarr beside it, whose mappings
and reasoning it borrows.
