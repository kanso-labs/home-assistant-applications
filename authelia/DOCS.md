# Home Assistant Application: Authelia

[Authelia](https://www.authelia.com/) is an authentication server for the
applications behind your reverse proxy. The proxy asks Authelia about every
request: someone who is not signed in is sent to Authelia's sign-in page, and
someone who is gets through, with a second factor where you ask for one.

It has no settings screen. Everything is in its own `configuration.yml`, which
this application writes for you on first start and then leaves to you.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Authelia" application.
3. Start it. The first start writes a starting configuration, generates the
   secrets and the first user, prints that user's password in the log, and
   stops.
4. Edit `configuration.yml` and replace every `example.com` with your own
   domain. See Configuration below.
5. Start it again.
6. Put its sign-in page behind your reverse proxy. See Behind Nginx Proxy
   Manager below.

**Copy the password from the log in step 3.** It is printed once and never
stored in the clear.

## Configuration

There are no application options. Authelia reads `configuration.yml` from this
application's configuration folder, `addon_configs/<repository>_authelia` on the
host, which the Samba and Studio Code Server applications can reach.

The starting configuration is complete apart from your domain:

- **`session.cookies`** names the domain Authelia signs people in for, such as
  `example.com`, and the address of its sign-in page, such as
  `https://auth.example.com`.
- **`access_control`** asks for a password on everything under your domain and
  refuses everything else. Change `one_factor` to `two_factor` to ask for a
  one-time code or a passkey as well.
- **`authentication_backend`** keeps the users in `users_database.yml`, and
  picks up changes to it without a restart.
- **`storage`** keeps Authelia's state in a SQLite database beside the
  configuration.
- **`notifier`** writes password reset links and one-time codes to
  `notification.txt` until you set up
  [email](https://www.authelia.com/configuration/notifications/smtp/).

The application refuses to start while the configuration still uses
`example.com`, because Authelia would run with it and nobody could sign in. The
log says so.

Every other option is in
[Authelia's documentation](https://www.authelia.com/configuration/prologue/introduction/).

### Secrets

Authelia needs three secrets, and the first start generates each of them into
the `secrets` folder beside the configuration: `jwt_secret`, `session_secret`
and `storage_encryption_key`. The application hands them to Authelia itself, so
they never appear in `configuration.yml`, and they must not be added to it.

**Keep `storage_encryption_key`.** The database is encrypted with it, and
replacing or losing it leaves the database unreadable. It is part of every
backup of this application.

### The first user

The first start creates one user, `admin`, in the `admins` group, and prints its
password in the log. Change its email address in `users_database.yml` to one you
read.

To add users or change a password, add or edit entries in `users_database.yml`
with password hashes from
[Authelia's password guide](https://www.authelia.com/reference/guides/passwords/).
Deleting `users_database.yml` creates a new `admin` with a new password on the
next start, and removes every other user with it.

## Behind Nginx Proxy Manager

Nginx Proxy Manager reaches this application by its hostname inside Home
Assistant, `<repository>-authelia`, on port `9091`. The repository part is the
same eight characters as in its configuration folder: `2dd33fbd-authelia` for
`2dd33fbd_authelia`.

1. Add a proxy host for the sign-in page at the address you gave as
   `authelia_url`, forwarding to `http://<repository>-authelia:9091`, with
   websockets support on and an SSL certificate.
2. Protect each application by following Authelia's
   [Nginx Proxy Manager guide](https://www.authelia.com/integration/proxies/nginx-proxy-manager/),
   which adds the snippets to each proxy host's advanced configuration.

Signing in only works at the address in `authelia_url`, because that is the
address its cookies belong to. Reach the sign-in page through your proxy rather
than on port 9091 directly.

## Storage

| Path      | Access     | Holds                                                         |
| --------- | ---------- | ------------------------------------------------------------- |
| `/config` | read/write | The configuration, users, secrets, database and notifications |

Nothing else is mapped. Authelia makes its decisions from what the proxy sends
it and never needs to read your media or shared storage.

## Backups

Backups are taken cold, so Home Assistant stops Authelia for the duration. It
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

## Updates

Updates arrive by updating this application. Authelia's version is pinned, so a
new one arrives as a release of this application rather than silently.

## Why this starts at 0.1.0

Every other application in this repository starts at `1.0.0`. This one does not,
because it has only been built and booted with a test domain, and has not yet
protected an application behind a real proxy.

It moves to `1.0.0` once it has done that on a real instance without surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Authelia itself rather than this packaging, see its
[documentation](https://www.authelia.com/) or its
[repository](https://github.com/authelia/authelia).

## Credits

This packaging is new rather than a port, and its shape follows the other
applications in this repository.
[BenoitAnastay/authelia-home-assistant-addon](https://github.com/BenoitAnastay/authelia-home-assistant-addon)
packages Authelia for Home Assistant as well, generating its configuration from
application options, where this one leaves `configuration.yml` to you.

Authelia is developed by the [Authelia team](https://github.com/authelia) and is
licensed under the Apache License 2.0. The icon and logo are Authelia's own.
