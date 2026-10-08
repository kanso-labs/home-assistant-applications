# Home Assistant Application: Flight Finder

[Flight Finder](https://github.com/affromero/flight-finder) tracks flight, hotel
and car rental prices over time. It searches on a schedule, reads the results
with an AI model you choose, keeps the price history, and alerts you when a
price drops.

Upstream runs it as separate containers for the application, PostgreSQL and
Redis. This application runs all three in one, with Valkey, the open-source fork
of Redis, in Redis's place.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Flight Finder" application.
3. Decide how Flight Finder should keep people out. Out of the box it is open to
   your whole network; see Signing in below.
4. Start it, and open its web interface on port `3003`.
5. Choose an AI provider in Flight Finder's admin settings. See AI providers
   below.

The first start creates the database, which takes a moment.

## Configuration

| Option          | What it sets                                                     |
| --------------- | ---------------------------------------------------------------- |
| Access password | A sign-in in front of every page and API. At least 16 characters |

Everything else is set inside Flight Finder, in its admin settings.

## Signing in

**Out of the box, Flight Finder trusts whoever reaches it.** It starts with no
sign-in of any kind, not even for its admin pages, so anyone who can reach port
`3003` can use it and change its settings, including the API keys it uses. The
log says so on every start until an access password is set.

Two things change that, and they can be combined.

**Flight Finder's multi user mode gives each person an account.** Turn it on in
its settings, under Multi user mode. Everyone then signs in and keeps their own
trackers, and only admins reach the admin pages. It works over plain `http://`.

Multi user mode is meant for a household rather than as a lock. An account can
have no password, in which case signing in is picking a face, and share links
stay public either way.

**The access password puts one sign-in in front of everything.** Every page and
API then asks for it first, and a browser stays signed in for 12 hours. An admin
can also hand out invite links, which a phone can open from a QR code.

- **It needs at least 16 characters.** Flight Finder quietly ignores a shorter
  one and stays open, so this application refuses to start with one instead.
- **It needs HTTPS.** The sign-in is kept in a cookie browsers only accept from
  a secure site. Over plain `http://<address>:3003` you are sent back to the
  sign-in page every time, so reach Flight Finder through a reverse proxy with a
  certificate, such as the Nginx Proxy Manager or Traefik application.

Changing the access password signs everyone out.

## AI providers

Flight Finder reads the prices it finds with an AI model. Choose one in its
admin settings:

- **An API key** from Anthropic, OpenAI or Google. Flight Finder stores it in
  its database, encrypted with a secret this application generates once and
  keeps.
- **A local model** served by Ollama, llama.cpp or vLLM, reached at an address
  you give it.

The Claude Code and Codex subscriptions upstream supports are not available
here. Their logins can only be copied in from a computer's home folder, which a
Home Assistant application has no way to reach, and sharing one login between
two places signs one of them out.

## Searching

Flight Finder searches every three hours by default, which its admin settings
can change. It drives a Chromium browser inside the application to do it, so a
search uses more memory than the rest of the time.

## Ports

| Port   | Serves                        |
| ------ | ----------------------------- |
| `3003` | The web interface and its API |

PostgreSQL and Valkey listen inside the application alone, and no port is
published for either.

## Storage

| Path               | Holds                                                         |
| ------------------ | ------------------------------------------------------------- |
| `/data/postgresql` | The PostgreSQL database: searches, price history and settings |
| `/data/secrets`    | The secrets Flight Finder is started with                     |
| `/data/app`        | Flight Finder's own analytics                                 |

**Keep `/data/secrets`.** The stored API keys are encrypted with one of those
secrets, and losing it makes them unreadable. It is part of every backup of this
application.

Valkey keeps nothing on disk. It holds Flight Finder's rate limits and cache,
which expire on their own.

## Backups

Backups are taken cold, so Home Assistant stops Flight Finder for the duration.
Copying a PostgreSQL database while it is being written to can produce a backup
that will not restore.

## Updates

Updates arrive by updating this application. Flight Finder's version is pinned,
so a new one arrives as a release of this application rather than silently.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Flight Finder itself rather than this packaging, see its
[repository](https://github.com/affromero/flight-finder).

## Credits

This packaging is new, and its shape follows the other applications in this
repository: it builds on Flight Finder's own image, as Seerr's does, and runs
PostgreSQL alongside it, as Authentik's does.

Flight Finder is developed by [affromero](https://github.com/affromero) and is
licensed under the MIT License. The icon is Flight Finder's own, and the logo is
built from it.
