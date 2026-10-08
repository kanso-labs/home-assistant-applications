# Home Assistant Application: Grimmory

[Grimmory](https://grimmory.org) is a self-hosted library for your ebooks,
comics and audiobooks. It reads EPUB, PDF and comics in the browser, keeps
shelves and reading progress for each person, fills in metadata and covers, and
syncs with Kobo and KOReader devices. It grew out of BookLore.

Upstream runs Grimmory as two containers, Grimmory and MariaDB. Here they are
one application, with MariaDB inside it.

## Installation

1. Add this repository to your Home Assistant instance.
2. Put your books under `/media`, for example in `/media/books`, through the
   Samba share or network storage.
3. Install the "Grimmory" application, and start it. The first start creates the
   database and runs every migration, which takes a minute or so.
4. Open the web interface on port `6060` and create the first account. It
   becomes the administrator.
5. Add a library, and choose `/media/books` as its folder.

## Where your books live

**The library can be anywhere under `/media` or `/share`.** You choose its
folders when you add a library in Grimmory. Grimmory moves and renames the files
it organizes, so both are mapped read/write.

**BookDrop is a folder Grimmory watches.** Files put there are queued for
review, with the metadata Grimmory found for them, and filed into a library once
you import them. It is `/share/grimmory/bookdrop` until you choose another under
`/media` or `/share`. Importing moves a file out of it, so do not point it at a
folder a torrent client is still seeding from.

**Turn on Library on network storage when the library is on a NAS.** Home
Assistant's network storage mounts it over SMB or NFS, where moving and renaming
are not reliable, and Grimmory then leaves the files where they are.

## Configuration

| Option                               | What it sets                                                |
| ------------------------------------ | ----------------------------------------------------------- |
| BookDrop folder                      | The folder Grimmory imports new books from                  |
| Library on network storage           | Stops Grimmory moving and renaming files; see above         |
| Allow OIDC providers on your network | Lets sign-in use a provider at a private address; see below |
| Hosts                                | Extra names for Grimmory to resolve, and their addresses    |
| Disable OIDC                         | Turns off sign-in through a provider, to recover from one   |

Everything else is set in Grimmory's own settings.

## Devices and readers

Everything is served on port `6060`.

- **Kobo** devices sync through an address Grimmory gives each person, in their
  Kobo settings.
- **KOReader** syncs reading progress with `http://<address>:6060/api/koreader`
  as its custom sync server, signed in with an account from Grimmory's KOReader
  settings.
- **OPDS** readers browse the library at `http://<address>:6060/api/v1/opds`,
  signed in with an account from Grimmory's OPDS settings.

## Signing in through Authentik

**This has not yet been proven with a sign-in.** What follows is the approach
this application is built for, the one the Immich application uses.

Grimmory signs people in through Authentik over OpenID Connect, set up in its
own settings. Two things stand in the way inside Home Assistant, and an option
handles each:

- **Grimmory refuses a provider at a private address**, to keep its requests
  from being turned against your own network. Authentik inside Home Assistant is
  at one, so turn on **Allow OIDC providers on your network**.
- **Grimmory cannot resolve the `.local` name Authentik is reached at**, which
  your browser can. Add it under **Hosts**, mapped to `172.30.32.1`, this Home
  Assistant host as an application sees it, where Traefik answers on port 80.
  Grimmory then fetches the same address your browser opens.

| Name              | Address       |
| ----------------- | ------------- |
| `authentik.local` | `172.30.32.1` |

Then, in Authentik, create an OAuth2/OpenID provider and an application for
Grimmory, with the redirect URI
`http://<address Grimmory is opened at>/oauth2-callback`. In Grimmory's
authentication settings, give the issuer URL
`http://authentik.local/application/o/<slug>/` with the client ID and secret
Authentik shows.

**If a provider locks everyone out**, turn on **Disable OIDC** and restart.
Grimmory then signs people in with its own accounts alone, until you clear it.

## Ports

| Port   | Serves                                                       |
| ------ | ------------------------------------------------------------ |
| `6060` | The web interface, the API, OPDS, and Kobo and KOReader sync |

MariaDB listens inside the application alone, and no port is published for it.

Two applications cannot publish the same port, and Home Assistant reports the
conflict only when the second one starts. If `6060` is already taken, change the
one Grimmory is published on under its **Network** settings.

## Storage

| Path               | Holds                                                               |
| ------------------ | ------------------------------------------------------------------- |
| `/data/mariadb`    | The database: books, shelves, reading progress, people and settings |
| `/data/grimmory`   | Covers, author photos, fonts, and Grimmory's caches                 |
| `/media`, `/share` | Your library and the BookDrop folder                                |

Grimmory uses about 500 MB of memory at rest, MariaDB included.

## Backups

Backups are taken cold, so Home Assistant stops Grimmory and its database
together for the duration. That is what makes the copy consistent; a copy of a
running database may not restore. Its caches are left out, because Grimmory
rebuilds them.

**Your library is not part of this application's backup.** It lives in `/media`
or `/share`, and restoring a backup brings back the database alone.

## Updates

Updates arrive by updating this application. Grimmory migrates its database on
the first start of a new version and cannot migrate it back, so the Home
Assistant backup taken before updating is the only way down.

MariaDB stays on 11.8. Moving to a new major version is a dump and restore, done
deliberately rather than by an update.

## Security

Grimmory runs as root inside its container, where upstream's image runs it as an
unprivileged user. Home Assistant mounts network storage writable by root alone,
and Grimmory has to write to the library. Keep port `6060` on your own network.
Reach it from outside through a reverse proxy or a VPN rather than by forwarding
the port.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Grimmory itself rather than this packaging, see
[its documentation](https://grimmory.org/docs) or
[its repository](https://github.com/grimmory-tools/grimmory).

## Credits

This packaging is new. It starts from Grimmory's own image and adds s6-overlay
and bashio by hand, as the Byparr application here does, and runs MariaDB beside
it, as the Immich application runs PostgreSQL.

The software it runs, each under its own licence:

- [Grimmory](https://github.com/grimmory-tools/grimmory), by the Grimmory
  contributors, under the GNU Affero General Public License v3.0. Parts of it
  come from [BookLore](https://github.com/booklore-app/booklore) and its
  contributors. The icon and logo are Grimmory's own, from its repository.
- [MariaDB](https://mariadb.org/), under the GNU General Public License v2.0.
