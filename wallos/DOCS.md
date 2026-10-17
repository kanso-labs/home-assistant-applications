# Home Assistant Application: Wallos

[Wallos](https://github.com/ellite/Wallos) keeps track of your subscriptions:
what each costs, how often it renews, and when the next payment is due. It
converts every price into your main currency, totals them by month and year, and
sends a notification before each payment, by email, push, Telegram, Discord or a
webhook.

**This application is at 0.x** until it has run on a real Home Assistant. It was
built and booted locally, and its notifications were sent from cron, but signing
in through an identity provider has not yet been proven end to end.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Wallos" application.
3. Start it. There is nothing to configure first.
4. Open it from the sidebar, or on port `8282`, and register.

**The first account you register is the administrator.** Register it before
anyone else can reach the port. Registration then closes, and stays closed until
the administrator opens it under **Admin → Registrations**.

The log of the very first start shows a setup token. The registration page asks
for it only when you restore a Wallos backup onto a fresh installation instead
of registering, and it is kept in `/data/db` if you need it later.

## Configuration

Every option is optional, and Wallos runs with none of them set. Each one
becomes the environment variable Wallos itself reads, and only when it has a
value.

**An option that is set owns its field.** It overrides what Wallos's admin page
saved, and the admin page shows the field locked. Clear the option, and restart,
to manage the field from the admin page again.

### Sign-in through an identity provider

Wallos signs people in through any OpenID Connect provider, such as the
Authentik application in this repository. The options, in the order you fill
them in:

| Option                        | What it is                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `oidc_enabled`                | Turns sign-in through the provider on or off                                   |
| `oidc_provider_name`          | The name on the login button, such as `Authentik`                              |
| `oidc_client_id`              | The client ID the provider gave Wallos                                         |
| `oidc_client_secret`          | The client secret the provider gave Wallos                                     |
| `oidc_issuer`                 | The provider's issuer, from which Wallos discovers the three addresses below   |
| `oidc_auth_url`               | Where the **browser** is sent to sign in                                       |
| `oidc_token_url`              | Where **Wallos** exchanges the sign-in for a token                             |
| `oidc_userinfo_url`           | Where **Wallos** reads who signed in                                           |
| `oidc_redirect_url`           | Where the provider sends the browser back, the address of Wallos + `index.php` |
| `oidc_scopes`                 | Scopes to ask for. Wallos asks for `openid email profile` when this is empty   |
| `oidc_auto_create_user`       | Creates a Wallos account for someone signing in for the first time             |
| `oidc_require_email_verified` | Links a sign-in to an existing account only if the provider vouches for email  |
| `oidc_disable_password_login` | Hides the password form, leaving only the provider                             |

An address set on its own wins over the one discovered from `oidc_issuer`.

`oidc_require_email_verified` defaults to on inside Wallos. It stops someone who
controls an unverified email at the provider from taking over the account with
that address. Turn it off only if your provider reports `email_verified` as
false for people whose address you trust, since Wallos then cannot link them to
the accounts they already have.

### `ssrf_allowlist`

Wallos refuses to contact an address on your own network, whether for a webhook,
a mail server, or an identity provider, unless it is on this list. It protects
your network from someone who can save a webhook in Wallos.

Write the entries separated by commas. Each is a host name or an address, with
the port when the URL has one, written exactly as it appears in the URL:

```text
2dd33fbd-authentik:9000,homeassistant:8123
```

Set here, the list replaces the one under **Admin → Security Settings**. Leave
it empty to keep using that one. Only the administrator's webhooks may use a
listed address, unless that same page allows everyone's.

## Signing in through Authentik on the same Home Assistant

This is the part most likely to go wrong, because Wallos and your browser reach
Authentik at different addresses, and neither can use the other's.

- **Your browser** reaches Authentik at the name Avahi Publisher announces and
  Traefik routes, such as `http://authentik.local`.
- **Wallos** cannot resolve `.local` names. It reaches Authentik as
  `2dd33fbd-authentik:9000`, which your browser cannot open.
- **Authentik builds every address in its discovery document from the host it
  was asked on**, so an issuer alone hands either the browser or Wallos an
  address it cannot use.

So give Wallos each address separately, and leave `oidc_issuer` empty:

| Option              | Value                                                         |
| ------------------- | ------------------------------------------------------------- |
| `oidc_auth_url`     | `http://authentik.local/application/o/authorize/`             |
| `oidc_token_url`    | `http://2dd33fbd-authentik:9000/application/o/token/`         |
| `oidc_userinfo_url` | `http://2dd33fbd-authentik:9000/application/o/userinfo/`      |
| `oidc_redirect_url` | Wallos's address on its port, followed by `/index.php`        |
| `ssrf_allowlist`    | `2dd33fbd-authentik:9000`, since Authentik is on your network |

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README.

In Authentik, create an **OAuth2/OpenID provider** with the redirect URI above,
and an application that uses it. Copy its client ID and secret into
`oidc_client_id` and `oidc_client_secret`, set `oidc_provider_name`, turn on
`oidc_enabled`, and restart.

Once signing in through Authentik works, turn on `oidc_disable_password_login`.
If Authentik is down while it is on, clear the option and restart to get the
password form back.

## Notifications and the schedule

Wallos does its regular work from cron, on upstream's own schedule. Home
Assistant passes its time zone to the application, and these times are in it:

| When                    | What                                                        |
| ----------------------- | ----------------------------------------------------------- |
| Every day at 1:00       | Moves the next payment date of each subscription on         |
| Every day at 2:00       | Updates exchange rates                                      |
| Every day at 8:00       | Sends reminders of subscriptions you set to cancel          |
| Every day at 9:00       | Sends the notifications for payments that are coming up     |
| Every two minutes       | Sends verification and password reset emails                |
| Mondays, and each month | Records the yearly total, and refreshes the recommendations |

Moving payment dates on and updating exchange rates also run each time the
application starts, so a Wallos that was stopped when one was due still catches
up.

What each job prints goes to the application's log, so a notification that was
sent, or one that failed, shows up there at 9:00. The jobs that run every two
minutes print nothing when there is nothing to send.

### Sending notifications to Home Assistant

A webhook notification can trigger a Home Assistant automation. In Wallos, under
**Settings → Notifications → Webhook**, use the webhook URL from the
automation's trigger, with Home Assistant's internal name:

```text
http://homeassistant:8123/api/webhook/<webhook id>
```

and add `homeassistant:8123` to `ssrf_allowlist`, since that address is on your
own network.

## Exchange rates

Wallos converts prices with rates from [Fixer](https://fixer.io/), whose free
plan is enough. Add the API key under **Settings → Fixer API Key**. Without one,
every currency keeps a rate of 1, and the log says the update was skipped.

## Ingress

Wallos is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Wallos's API, a calendar app reading its feed included.

Wallos builds every address relative to the page it is on, so nothing stands
between ingress and Wallos. The path Supervisor puts it under,
`/api/hassio_ingress/<token>`, stays in the browser's address, and Wallos serves
the same pages there as on the port.

Three things follow from that:

- **Wallos asks for its own sign-in in the sidebar too.** It has no way to trust
  the one Home Assistant already asked for.
- **Addresses meant for anything but your browser are the port's.** The calendar
  feed under **Calendar → Export** is built from the address of the page, so
  copied in the sidebar it points into ingress, which a calendar app cannot open
  without a Home Assistant session. Copy it from Wallos on the port instead. The
  same goes for the **Server URL** under **Admin**, which verification and
  password reset emails link to.
- **Sign in through an identity provider on the port.** The provider sends the
  browser back to the one address in `oidc_redirect_url`, not to the sidebar, so
  a sign-in started inside Home Assistant ends outside it, and over Home
  Assistant Cloud cannot come back at all. Keep the password form, with
  `oidc_disable_password_login` off, to sign in from the sidebar.

## Storage

| Path          | Holds                                         |
| ------------- | --------------------------------------------- |
| `/data/db`    | The SQLite database, and the setup token      |
| `/data/logos` | The logos and avatars uploaded through Wallos |

Wallos keeps both inside its own web root, which belongs to the image and would
be replaced by an update. Each is a link into `/data` instead, which survives
updates and is backed up. Nothing else is mapped, since Wallos reads and writes
no other files.

## Backups

Backups are cold: Home Assistant stops Wallos while it takes one, because
copying a SQLite database while it is being written can produce a backup that
will not restore. Both directories above are included.

Wallos's own backup, under **Admin → Backup and Restore**, writes the same
database and logos into a zip file to download, which a fresh installation can
restore from its registration page with the setup token.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

Wallos's own version check is not scheduled here. Upstream asks GitHub for its
latest release at every start and every six hours, for a notice on the
administrator's dashboard that links to the release notes but cannot install
anything, since a new version only reaches you through this application.

The notice is still there, under **Admin → Maintenance Tasks**, and off unless
you turn it on. Turning it on, or pressing **Check for Updates** on the same
page, checks once, and the dashboard then shows what that check found until the
application is updated past it.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Wallos itself rather than this packaging, see
[its own repository](https://github.com/ellite/Wallos).

## Credits

This packaging starts from
[Riza-Aslan/Wallos-HA](https://github.com/Riza-Aslan/Wallos-HA), under the MIT
licence, which was read for where Wallos keeps its state. It runs upstream's own
image instead, adds cron, and publishes a port beside ingress, which that
packaging uses alone, so that Wallos also sits behind a reverse proxy like the
other applications here.

Wallos is developed by [ellite](https://github.com/ellite) and is licensed under
the GNU General Public License v3.0. The icon and logo are Wallos's own, from
its repository.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. Wallos starts from the image its own project publishes
instead, `bellamy/wallos`, an Alpine build of PHP 8.3 carrying the extensions
Wallos needs, with nginx in front of it. s6-overlay and bashio are installed on
top.

Upstream's `startup.sh`, which starts PHP-FPM, nginx and cron in the background
and then waits, is replaced by an s6 service for each, so a crash in any one of
them stops the application rather than leaving the others running without it.
What else is different from upstream's image:

- **Cron is BusyBox's.** Upstream runs dcron, which cannot be supervised by s6:
  in the foreground it moves itself into a new process group, which a process
  started the way s6 starts every service is not allowed to do. BusyBox's cron
  is already in the image, and runs upstream's schedule, less the version check.
- **Cron writes to the log** rather than to a file per job inside the container,
  where nobody looking from Home Assistant would find it.
- **Nothing checks GitHub for a new version** on its own, at start or on the
  schedule. See Updates.
- **PHP-FPM does not log every request.** Its access log put the health check in
  the log every two minutes. nginx still keeps an access log of its own.
- **Stopping uses `SIGTERM`.** The PHP base image stops with `SIGQUIT`, which
  s6-overlay ignores, so Home Assistant would have waited out its timeout and
  killed Wallos on every stop.

Upstream's health check is kept. It checks every five seconds until Wallos first
answers, so Home Assistant shows it as started within seconds, then every two
minutes.
