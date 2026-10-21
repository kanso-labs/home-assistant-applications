# Home Assistant Application: Authentik

## Before you install

Authentik is one of the heavier applications here. Upstream asks for **two CPU
cores and 2GB of RAM**, and that is for Authentik alone — this application also
runs the PostgreSQL it needs, in the same container. A Raspberry Pi with 2GB
total, already running Home Assistant, is not enough.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Authentik" application.
3. Set `bootstrap_password`, and optionally `bootstrap_email`, before the first
   start. The email field shows once **Show unused optional configuration
   options** is on. See below if you would rather not.
4. Start it. The first boot runs every database migration and imports the
   default flows, which takes a few minutes; later ones are much quicker.
5. Select **Open Web UI**, which opens Authentik through ingress, or open port
   9000, and log in as `akadmin`.
6. Clear `bootstrap_password` from the configuration.
7. In Authentik's Admin interface, under **System → Settings**, set **Base URL**
   to the address people reach Authentik at, with no path after it, such as
   `https://auth.example.com`, or `http://<host>:9000` when you open it by
   address. Until it is set, Authentik logs `Base URL is not configured` on
   every start, and upstream says it becomes required in 2026.11.

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

Email is not an option either, and recovery emails work without one. An Email
stage can carry its own mail server: in Authentik's interface, turn off **Use
global connection settings** on the stage and enter the server there.
Authentik's global mail settings are what come from the environment, which this
application leaves unset. Notification emails always use those, as does any
stage that keeps **Use global connection settings** on; open an issue if you
want them.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Authentik when it stops answering, not only when it exits. The
application asks Authentik's liveness endpoint every 30 seconds, and five
failures in a row count as a hang. It is off by default.

## Ingress

Authentik is also served through Home Assistant's ingress, so its admin and user
interfaces open inside Home Assistant and come along wherever Home Assistant
does, Home Assistant Cloud included. **Open Web UI** on the application's page
opens it there, and turning on **Show in sidebar** keeps it a click away.
Ingress is authenticated by Home Assistant, which lets only administrators in.

The published ports are unchanged, and everything that signs in through
Authentik keeps using them: a reverse proxy in front of port 9000, the embedded
outpost's forward authentication, and every OAuth2, OIDC and SAML client. The
issuer and endpoint addresses those clients were given stay exactly as they
were.

Ingress puts Authentik under a path of Supervisor's choosing,
`/api/hassio_ingress/<token>`. nginx answers ingress on port 9001, inside the
application only, and writes that path into the addresses Authentik gives the
browser there: the base its pages are built from, its redirects and its cookies.
Authentik itself still serves at the root on 9000 and 9443.

Four things follow from that:

- **Ingress has a login of its own.** Home Assistant's sign-in is not
  Authentik's, and the browser keeps Authentik's session for each address
  separately, so logging in at Authentik's own address does not log you in under
  ingress, or the other way round.
- **Log in with a password, and TOTP if your account has it.** A browser ties a
  passkey or a security key to the address it was registered at, so one
  registered at Authentik's own address is not offered under Home Assistant's.
  An account whose only second factor is a passkey has to log in at Authentik's
  own address.
- **Addresses Authentik shows you under ingress name Home Assistant.** A
  provider's issuer and endpoint addresses, among others, are built from the
  address in the browser, so under ingress they show Home Assistant's host. That
  is only what the page shows: the addresses Authentik gives its clients are
  unchanged. Copy them from Authentik's own address. For the same reason, a
  brand you matched to Authentik's domain is not the one shown under ingress.
- **Authentik's default avatar does not load under ingress.** Authentik shows it
  when **Avatars**, under **System** > **Settings**, is `none`, or when no mode
  listed there finds a picture. nginx leaves its address alone, because a user's
  attributes can hold an `avatar` of their own, which the admin interface saves
  back as it read it. The default, `gravatar,initials`, always finds one.

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
PostgreSQL in 2025.10, and upstream's own compose file dropped the service.

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

`/config` is the part you are expected to put files into:
`app_configs/2dd33fbd_authentik` on the host, which the Samba share application
has inside its `app_configs` share and Studio Code Server under
`/addon_configs`, the older name of `app_configs`. `/data` is private state that
Home Assistant backs up without it being mapped, which is where the database
belongs.

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

On this and every other stop, Home Assistant waits up to two minutes for
Authentik and its database rather than its usual ten seconds, so that PostgreSQL
has time to shut down cleanly.

## Updates

Authentik's own update check is switched off, so it will not advertise a version
it cannot install. Updates arrive by updating this application.

Read Authentik's release notes before taking a major one. Its releases sometimes
carry migrations that cannot be rolled back, and restoring the Home Assistant
backup you took first is the only way down.

Take Authentik's feature releases one at a time. They are numbered by date, such
as 2026.5, 2026.8 and 2026.11, about three months apart, and each one opens only
a database last run by itself or by the feature release before it. Started on an
older database, Authentik refuses to migrate it and logs
`Major version skips are not allowed`. Home Assistant only ever offers the
newest version of this application, so an install left behind while two feature
releases come out has no update left that will start. Take each update when it
is offered, or turn on **Auto update** on the application's Info tab, and start
Authentik after an update if it is not running, since it moves its database
forward only as it starts. Each update that moves Authentik names its version in
the changelog.

If an update does stop on that message, restoring the backup taken before it
brings Authentik back as it was. Open an issue then, since the release in
between can no longer be installed from the store.

PostgreSQL stays on 17, and takes the updates within 17 that come with each
release of this application. A database can only be opened by the major version
that created it. If an update ever starts on a database from another major
version, it stops rather than starting PostgreSQL, and its log says so.
Restoring the backup taken before that update brings back the release that
matches the database.

## The first start is slow, and says so in the log

A first boot runs every database migration and imports the default flows, which
takes minutes rather than seconds on modest hardware. Home Assistant shows the
application as starting for the whole of it.

Two things in that log are expected and need no action. The liveness endpoint
answers 500 until the migrations finish, which is why the health check is given
a long grace period. And a PostgreSQL deadlock between two blueprint tasks can
appear as the default flows are imported:

```text
ERROR:  deadlock detected
DETAIL: Process 426 waits for ShareLock on transaction 3088; blocked by process 428.
        Process 428 waits for ShareLock on transaction 3044; blocked by process 426.
```

Authentik imports its blueprints concurrently and retries the task that lost, so
the import completes either way. It is upstream behaviour rather than something
this packaging causes.

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
it. This application avoids it in both places the image runs `ak` as root: it
drops to Authentik's own user before starting Authentik, and it replaces the
image's health check, which ran `ak healthcheck`.

Authentik itself is developed by
[Authentik Security Inc.](https://github.com/goauthentik/authentik) and is MIT
licensed, with its enterprise components under a separate licence of their own.

The icon and logo are Authentik's own, from its brand assets.
