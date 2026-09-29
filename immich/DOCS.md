# Home Assistant Application: Immich

[Immich](https://immich.app/) backs up the photos and videos on your phones. It
groups the faces in your library, finds a photo by what is in it, and shares
albums, all on your own hardware.

Upstream runs Immich as four containers: the server, machine learning,
PostgreSQL and Valkey. Here they are two applications. This one runs the server
with its database and Valkey, and the Immich Machine Learning application runs
the machine learning.

## Before you install

Immich asks for **6GB of RAM at least, and 8GB is recommended**, with two
processor cores at least and four recommended. That is for Immich alone, beside
Home Assistant itself.

Install the Immich Machine Learning application first, so the server finds it on
its first start. Immich works without it apart from its machine learning:
searching by what is in a photo fails, and photos uploaded meanwhile get no face
detection, smart search or text recognition until **Missing** is run for those
jobs under Administration → Job Queues.

**Decide where the library lives before the first start.** A photo library only
grows, and moving one later is work. See Keeping the library on a NAS below.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Immich Machine Learning" application, and start it.
3. If the library should live on a NAS, add it now. See below.
4. Install the "Immich" application, and start it. The first start creates the
   database and runs every migration, which takes a minute or two.
5. Open the web interface on port `2283` and create the first account. It
   becomes the administrator.
6. In the Immich phone app, enter the server as `http://<address>:2283`.

### Keeping the library on a NAS

The library is written to `/media/immich`, and Home Assistant's network storage
can put a NAS exactly there. Under **Settings → System → Storage**, add network
storage with the usage **Media** and the name **immich**.

Do it before the first start. Home Assistant mounts network storage only over an
empty folder, so once Immich has written to `/media/immich` the NAS cannot be
mounted there until the folder is moved out of the way.

## Configuration

| Option | What it sets                                                            |
| ------ | ----------------------------------------------------------------------- |
| Hosts  | Extra names for Immich to resolve, and the address each one resolves to |

Everything else is set from Immich's own settings, under Administration →
Settings.

## Signing in through Authentik

**This is the hard part, and it has not yet been proven with a sign-in.** What
follows is the approach this application is built for.

Immich keeps its own login, and signs people in through Authentik over OpenID
Connect. Keep Traefik's forward authentication off Immich's route: the phone app
cannot follow a redirect to Authentik's login page, so forward authentication
would lock it out. Seerr keeps its own login for the same reason.

### Why it is hard

Immich takes a single **issuer URL** for Authentik and discovers every other
endpoint from it. Authentik builds those endpoints from the host name it was
asked on. So the one address has to work for two parties: your browser, which is
sent to Authentik's login page, and the Immich server, which fetches Authentik's
details and exchanges the sign-in behind the scenes.

Your browser reaches Authentik at its `.local` name, published by the Avahi
Publisher application. The Immich server cannot resolve names Avahi publishes;
it reaches Authentik only as `http://2dd33fbd-authentik:9000`, which your
browser cannot open.

### The Hosts option

Each entry in **Hosts** is written to Immich's hosts file when it starts. Map
Authentik's `.local` name to `172.30.32.1`:

| Name              | Address       |
| ----------------- | ------------- |
| `authentik.local` | `172.30.32.1` |

`172.30.32.1` is this Home Assistant host as an application sees it, where
Traefik answers on port 80 and routes by name. The Immich server then fetches
the same URL your browser opens, and Authentik writes the same endpoints for
both.

### Setting it up

1. Add the Hosts entry above, using the name Authentik is reached at, and
   restart Immich.
2. In Authentik, create an OAuth2/OpenID provider and an application for Immich.
   Its redirect URIs are:
   - `app.immich:///oauth-callback`, for the phone apps
   - `http://immich.local/auth/login` and `http://immich.local/user-settings`,
     for the web, using the name Immich is reached at
3. In Immich, under Administration → Settings → Authentication Settings → OAuth,
   set the issuer URL to `http://authentik.local/application/o/<slug>/`, with
   the client ID and secret Authentik shows. Turn on **Allow insecure requests**
   as well, because Immich refuses an `http://` issuer without it. That is
   acceptable here: the issuer is plain HTTP, so there is no TLS for the switch
   to skip, and the server's own requests to it never leave this Home Assistant
   host.
4. Turn on Auto Register only once the provider's bindings limit it to your
   household. Until then anyone Authentik knows could create an account.

If Authentik will not accept `app.immich:///oauth-callback`, use Immich's
**Mobile Redirect URI Override** instead: set it to
`http://immich.local/api/oauth/mobile-redirect`, and give Authentik that address
in its place.

## Two applications, one Immich

| Upstream container        | Here                                            |
| ------------------------- | ----------------------------------------------- |
| `immich-server`           | This application                                |
| `database`, PostgreSQL    | PostgreSQL 17 with VectorChord, inside this one |
| `redis`, Valkey           | Valkey 9, inside this one                       |
| `immich-machine-learning` | The Immich Machine Learning application         |

## Decisions

These were settled before this application was built, and are recorded here with
the reasons.

1. **Immich's own images, as two applications.** Every piece then comes from its
   own project, and an Immich release reaches you without waiting on anyone
   else's rebuild. Neither image carries s6-overlay or bashio, so both are added
   by hand, as the Byparr application adds them.
2. **PostgreSQL and Valkey run inside this application**, as services that start
   before the server, the way Authentik carries PostgreSQL and Flight Finder
   carries both. The server reaches them on the loopback address. The database
   then never depends on another application's hostname resolving, which can
   fail for half an hour after a container restarts, and there is no start order
   between applications to get wrong. One backup holds the database with the
   server.
3. **Machine learning is reached by hostname**, at
   `http://2dd33fbd-immich-machine-learning:3003`. That exposure is acceptable
   where the database's would not be: while machine learning is unreachable, the
   rest of Immich keeps working. Immich runs every job once, so its machine
   learning jobs fail meanwhile rather than wait, and **Missing** under
   Administration → Job Queues runs them again. `2dd33fbd` is Home Assistant's
   name for this repository when it was added by the address in the README.
   Immich's Machine Learning Settings can point elsewhere.
4. **PostgreSQL 17, not the 14 that upstream's compose file pins.** 14 reaches
   the end of its life in November 2026, and Immich accepts 14 and later. It
   comes from the PostgreSQL project's own repository, which Immich's image
   already uses for its client tools, with VectorChord from its release packages
   and loaded as the server starts.
5. **Valkey is copied from its own image**, bound to the loopback address with
   persistence off. The Debian release Immich builds on ships Valkey 8, a major
   behind the 9 upstream's compose file runs. Persistence stays off because a
   dropped queue costs time and not photos: the photos are already in the
   library and the database, and **Missing** queues the jobs each one still
   needs. Upstream keeps its queue across a restart and this application does
   not; see Storage.
6. **Both architectures.** The server image is published for amd64 and arm64 as
   it is. Only machine learning differs by architecture; see its documentation.

## Video transcoding and the GPU

The render devices under `/dev/dri` are offered to the container, the same ones
the Plex Media Server application is given, so Immich can transcode video on an
Intel GPU with Quick Sync. Nothing breaks when they are absent.

Immich does not use them until told to: under Administration → Settings → Video
Transcoding Settings → Hardware Acceleration, choose **Quick Sync**.

## Ports

| Port   | Serves                                        |
| ------ | --------------------------------------------- |
| `2283` | The web interface, the API and the phone apps |

PostgreSQL and Valkey listen inside the application alone, and no port is
published for either.

## Storage

| Path               | Holds                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| `/media/immich`    | The library: originals, thumbnails, encoded video, and Immich's own dumps |
| `/data/postgresql` | The database: albums, faces, the search index, people and settings        |

Without network storage, `/media/immich` is on Home Assistant's own data disk,
and a photo library can fill it.

Immich writes the library as root, as its own image runs. Home Assistant mounts
network storage writable by root alone, so this is also what lets the library
live on a NAS.

**Valkey keeps nothing on disk.** It holds Immich's job queue in memory, so
every stop drops the jobs still waiting, including the stop for each update and
each backup. During a large import those are the thumbnails and faces not yet
worked through. **Missing** under Administration → Job Queues runs them again.

Upstream keeps its queue across a restart, and this application does not. Its
compose file gives Valkey no volume, but Valkey saves a snapshot inside its
container as it stops and loads it again when it starts.

## Backups

Backups are taken cold, so Home Assistant stops Immich and its database together
for the duration. That is what makes the copy consistent; a hot copy of a
running PostgreSQL may not restore. The stop also drops the job queue; see
Storage.

**`/media` is not part of this application's backup.** Restoring one brings back
the database, not the library. Photos uploaded since that backup stay on disk as
files Immich no longer knows about, and the phones upload them again.

Immich also dumps its database every night, under Administration → Settings →
Database Dump Settings, into `/media/immich/backups`. Those dumps travel with
the library, so a NAS holds a copy of both.

## Updates

Updates arrive by updating this application. A new Immich release reaches this
application and Immich Machine Learning in the same update, because Immich
expects the server and its machine learning to be the same version. Update both
together.

Read Immich's release notes before taking one. Immich migrates its database on
the first start of a new version and cannot migrate it back, so the Home
Assistant backup taken before updating is the only way down. Restoring it
restores the database along with the application.

- **PostgreSQL stays on 17.** Updates within 17 arrive as releases of this
  application. Moving to a new major version is a dump and restore, done
  deliberately rather than by an update.
- **VectorChord** updates arrive the same way. Immich updates the extension and
  rebuilds its search indexes on the first start after one, so that start takes
  longer.
- **Valkey stays on 9.**

## Security

Immich runs as root inside its container, as its own image does, while handling
files people upload and links they share. Keep port `2283` on your own network.
Reach it from outside through a reverse proxy or a VPN rather than by forwarding
the port.

## Why this starts at 0.1.0

Most applications in this repository start at `1.0.0`. This one does not,
because it has only been built and run against a stand-in for Home Assistant. It
has not yet held a real library, transcoded on a real GPU, or signed anyone in
through Authentik.

It moves to `1.0.0` once it has done those without surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Immich itself rather than this packaging, see
[Immich's documentation](https://docs.immich.app/) or its
[repository](https://github.com/immich-app/immich).

## Credits

This packaging is new. It starts from Immich's own server image and adds
s6-overlay and bashio by hand, as the Byparr application here does, and runs
PostgreSQL and Valkey beside it, as the Authentik and Flight Finder applications
do.
[alexbelgium](https://github.com/alexbelgium/hassio-addons/tree/master/immich_openvino)'s
Immich packaging, under the MIT licence, was read for its options and its
documentation.

The software it runs, each under its own licence:

- [Immich](https://github.com/immich-app/immich), under the GNU Affero General
  Public License v3.0. The icon and logo are Immich's own, from its repository.
- [PostgreSQL](https://www.postgresql.org/), under the PostgreSQL Licence.
- [pgvector](https://github.com/pgvector/pgvector), under the PostgreSQL
  Licence.
- [VectorChord](https://github.com/tensorchord/VectorChord), under the GNU
  Affero General Public License v3.0 or the Elastic License 2.0.
- [Valkey](https://github.com/valkey-io/valkey), under the BSD 3-Clause Licence.
