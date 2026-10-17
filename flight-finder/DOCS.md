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
3. In its Configuration tab, set a shared password of at least 12 characters,
   and rename the Admin profile if you like. See Signing in below.
4. Start it, and open its web interface on port `3003`. Enter the shared
   password, then choose the Admin profile.
5. Choose an AI provider in Flight Finder's admin settings. See AI providers
   below.

The first start creates the database, which takes a moment, and then the Admin
profile. Until that is done, the web interface asks for a command to be run in a
terminal. Reload it instead.

## Configuration

| Option          | What it sets                                                                     |
| --------------- | -------------------------------------------------------------------------------- |
| Admin profile   | The name of the Admin profile the first start creates. Only read then            |
| Shared password | The password everyone enters to open Flight Finder. At least 12 characters       |
| Other addresses | Addresses that reach Flight Finder besides this machine's own, such as a proxy's |

Everything else is set inside Flight Finder, in its admin settings.

## Signing in

**Nobody gets in without the shared password.** Flight Finder has one password
for the whole household. Whoever enters it then chooses a profile: the Admin
profile, which reaches the admin pages, or, once multi user mode is on in its
settings, a member profile the Admin creates under Users. A browser stays signed
in for 12 hours, and it all works over plain `http://`.

**A profile is not a lock.** Anyone who knows the shared password can choose the
Admin profile, and with it change Flight Finder's settings, including the API
keys it uses. Member profiles keep their own trackers, and have no password of
their own.

**This application creates the Admin profile.** Upstream has it created by
running `flight-finder access setup` in a terminal, and shows nothing but a page
asking for that command until someone has. Here the first start with a shared
password set runs the same setup with the options instead, a few seconds after
the web interface answers. Without a shared password it creates nothing, and the
log says so on every start.

**Setting a new shared password replaces the old one** on the next start. It
signs everyone out and removes the passkeys saved for the old one, as upstream's
own `flight-finder access reset` does. The password can also be changed inside
Flight Finder, on its App access page at `/access/security`, and a change made
there is kept across restarts until the option changes. To go back to the
password the option already holds, clear the option and restart once before
setting it again.

An installation updated from an earlier version of this application keeps the
access password it had, which becomes the shared password on the first start.
That replaces a shared password created by hand in a terminal, so clear the
option first to keep that one.

### Addresses

**Flight Finder signs people in only at addresses it knows.** At any other, its
sign-in page says "This address is not configured for login". This application
tells it this machine's own, on the port Flight Finder is published on: its
name, as in `http://homeassistant.local:3003` and `http://homeassistant:3003`,
and its IPv4 addresses, as in `http://192.168.1.10:3003`. The Open Web UI button
leads to one of those whenever Home Assistant itself was opened by this
machine's name or address, and the log lists them all on every start. Reading
the IPv4 addresses is why this application asks Supervisor for network
information.

**Add any other address under Other addresses**, such as a reverse proxy's, like
the Nginx Proxy Manager or Traefik application, or a Tailscale or Cloudflare
address. Give the scheme, the host and the port alone, as in
`https://flights.example.com`, without a path.

The first `https://` address under Other addresses becomes Flight Finder's main
address. Without one, the first address there does, or with none at all, this
machine's `.local` name. Alerts link to the main address, and passkeys work
there alone, and only over HTTPS. Behind a reverse proxy, the main address is
also what lets Flight Finder believe the proxy about which address the browser
asked for, so a proxy's address should be an `https://` one.

A Public URL saved in Flight Finder's own settings takes over as the main
address, and is accepted too. Save it as a scheme, a host and a port alone as
well: while it holds one with a path, Flight Finder cannot sign anyone in at
all.

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

| Path               | Holds                                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| `/data/postgresql` | The PostgreSQL database: searches, price history, settings and profiles       |
| `/data/secrets`    | The secrets Flight Finder is started with, and the shared password's checksum |
| `/data/app`        | Flight Finder's own analytics                                                 |

**Keep `/data/secrets`.** The stored API keys are encrypted with one of those
secrets, and losing it makes them unreadable. It is part of every backup of this
application. The checksum is a salted scrypt hash of the shared password this
application applied last, which is how a restart tells whether the option has
changed. It never holds the password itself.

Valkey keeps nothing on disk. It holds Flight Finder's rate limits and cache,
which expire on their own.

## Backups

Backups are taken cold, so Home Assistant stops Flight Finder for the duration.
Copying a PostgreSQL database while it is being written to can produce a backup
that will not restore.

Stopping, for a backup or for anything else, gives Flight Finder and then
PostgreSQL two minutes between them before Home Assistant forces them to, rather
than its default of 10 seconds, so the database is shut down cleanly.

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
