# Home Assistant Application: Authentik

## Before you install

Authentik is heavier than anything else in this repository. Upstream asks for
**two CPU cores and 2GB of RAM**, and that is for Authentik alone — this
application also runs the PostgreSQL it needs, in the same container. A
Raspberry Pi with 2GB total, already running Home Assistant, is not enough.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Authentik" application.
3. Set `bootstrap_password`, and optionally `bootstrap_email`, before the first
   start. See below if you would rather not.
4. Start it. The first boot runs every database migration and imports the
   default flows, which takes a few minutes; later ones are much quicker.
5. Open the web interface on port 9000 and log in as `akadmin`.
6. Clear `bootstrap_password` from the configuration.

If you start it without a bootstrap password, go to
`http://<host>:9000/if/flow/initial-setup/` instead and set one there. That page
exists only until the account has a password.

## Configuration

### Option: `bootstrap_password` and `bootstrap_email`

The first administrator's credentials, read **only** when that account is
created on the very first start. Setting them afterwards changes nothing, which
is why step 6 above says to clear the password — it stops being useful the
moment you have logged in, and until you clear it your administrator password is
sitting in the application's configuration in plain text.

### Option: `cookie_domain`

The domain the session cookie is issued for, such as `example.com`. Set it when
Authentik sits in front of several subdomains, so a login on one is accepted by
the others. Leave it empty when you reach Authentik by address.

### Option: `log_level`

How much detail Authentik writes to its log. `info` by default.

### What is not an option

The secret key is generated on first start and kept in `/data/secret_key`.
Sessions, tokens and every encrypted field are tied to it, so it is not
something to retype into a configuration box — losing it logs everyone out and
makes what it encrypted unreadable.

Everything else is configured from Authentik's own interface. Two things are set
for you and are not offered as options: the update check and the startup
analytics are both switched off, because the packaging is the only route to a
new version here, exactly as it is for the arr applications.

Email is not exposed either. Authentik reads its mail settings from the
environment rather than its interface, so recovery emails need a change here
before they work; open an issue if you want that.

## Three containers, one application

Upstream runs Authentik as three containers: PostgreSQL, a server and a worker.
A Home Assistant application is one container, and this is how that is squared:

| Upstream     | Here                                                      |
| ------------ | --------------------------------------------------------- |
| `postgresql` | PostgreSQL 17, installed in the image, cluster in `/data` |
| `server`     | `ak allinone`, upstream's own combined mode               |
| `worker`     | the same process                                          |

`allinone` is not a workaround — it is a mode Authentik's own entrypoint
supports, and it is what makes the rest of this reasonable.

Redis is absent because Authentik no longer needs it. The task queue moved to
PostgreSQL in the 2026 releases, and upstream's own compose file dropped the
service.

The embedded outpost is included and works. Separate LDAP, RADIUS and RAC
outposts are their own images upstream and are not part of this application; you
can still run them elsewhere and point them here.

## Storage

| Path                | Access     | Holds                                     |
| ------------------- | ---------- | ----------------------------------------- |
| `/config/certs`     | read/write | Certificates you drop in to be discovered |
| `/config/templates` | read/write | Custom email templates                    |
| `/data/postgresql`  | read/write | The PostgreSQL cluster                    |
| `/data/media`       | read/write | Icons and backgrounds people upload       |
| `/data/secret_key`  | read/write | The key everything encrypted is tied to   |

`/config` is the part you are expected to put files into. `/data` is private
state that Home Assistant backs up without it being mapped, which is where the
database belongs.

Two directories are deliberately **not** mapped. The media library is one:
Authentik uses `/media` for its own uploads, so mapping Home Assistant's media
there would mount a film collection on top of it. Blueprints are the other —
they ship inside the image and are what the default flows are built from, so
pointing them at an empty mapped directory would start a fresh install with no
login flow at all.

## Backups

Backups are taken cold, so Home Assistant stops Authentik for the duration. The
database is stopped with it, which is what makes the copy consistent — a hot
backup of a running PostgreSQL is a backup that may not restore. Single sign-on
is unavailable while a backup runs, and so is anything behind it.

## Updates

Authentik's own update check is switched off, so it will not advertise a version
it cannot install. Updates arrive by updating this application.

Read Authentik's release notes before taking a major one. Its releases sometimes
carry migrations that cannot be rolled back, and restoring the Home Assistant
backup you took first is the only way down.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Authentik itself rather than this packaging, see
[the Authentik documentation](https://docs.goauthentik.io/) or its
[Discord](https://goauthentik.io/discord).

## Credits

[ddcash](https://github.com/ddcash/ha-authentik-addon) packaged Authentik for
Home Assistant first, under the Apache 2.0 licence, and found the trap this
packaging also had to work around: Authentik's entrypoint chowns all of `/data`
to its own user when it runs as root, which takes the PostgreSQL cluster with
it. This application avoids it by never running Authentik as root rather than by
replacing the health check.

Authentik itself is developed by
[Authentik Security Inc.](https://github.com/goauthentik/authentik) and is MIT
licensed, with its enterprise components under a separate licence of their own.
