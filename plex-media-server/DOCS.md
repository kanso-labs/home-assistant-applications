# Home Assistant Application: Plex Media Server

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Plex Media Server" application.
3. Get a claim code from [plex.tv/claim](https://plex.tv/claim) and put it in
   the application options. A code expires four minutes after it is issued, so
   fetch it when you are ready to start.
4. Start the application, then open the web interface on port 32400.

Claiming links the server to your Plex account, and is what lets you reach it.
An unclaimed server starts, but answers nothing. Set `allowed_networks` instead
if you would rather not use a Plex account.

## Configuration

### `allowed_networks`

Networks Plex answers without anyone signing in, as a list of addresses and
masks, such as `192.168.1.0/24`. Empty by default, which means none.

Use it instead of a claim code to run the server without a Plex account.
Everyone on a listed network gets full control of it, so list only networks you
would hand the server to.

**Reach the server by the address of your Home Assistant machine, not by its
name.** Plex refuses a host name it does not recognise as one of its own
addresses, before it looks at the network the request came from, and the name of
a container is never one of its own addresses. `http://192.168.1.10:32400` works
where `http://homeassistant.local:32400` is refused. Claiming the server does
not have this problem.

### `claim_code`

A claim code from [plex.tv/claim](https://plex.tv/claim), used once on first
start to link the server to your account.

It is only read while the server is unclaimed, so it can be left in place
afterwards. Claiming again means clearing the server's identity first, which is
why the option is not removed for you.

Everything else is configured from Plex's own web interface, and those settings
live in the application's configuration directory.

## Storage

| Path      | Access     | Holds                                        |
| --------- | ---------- | -------------------------------------------- |
| `/config` | read/write | Settings, the library database, and metadata |
| `/media`  | read/write | Your library                                 |
| `/share`  | read-only  | Anything shared between applications         |

**`/media` is writable so Plex can act on your library.** Plex reads your media
and writes nothing back to it on its own — artwork and metadata live in its own
directory — but the features that do touch it, such as deleting a file from the
web interface and recording live TV to the library, need somewhere to write.

`/share` stays read-only, because nothing Plex does writes there. Applications
that organise files, such as Radarr and Sonarr, are what write to it.

**Plex runs as root here, and what it writes under `/media` is owned by root.**
Home Assistant owns the shares it hands out, so an application that writes to
one has to run as the user that owns it. Plex's own image would otherwise drop
to its `plex` user, which owns nothing on those shares and cannot write to them.

Add your libraries from paths under `/media` or `/share` when Plex asks where
your media is.

## Backups

`backup: cold` stops the application before the backup is taken, because Plex
keeps its library in SQLite and copying that while it is being written can
restore into a corrupt database.

Metadata, caches, logs and crash reports are excluded from backups. They are
large, they are rebuilt from your media, and including them turns a small backup
into a very large one.

## Hardware transcoding

The render devices under `/dev/dri` are offered to the container, so Plex can
use them if your hardware and your Plex subscription both support it. Nothing
breaks when they are absent — Plex falls back to transcoding on the processor.

## Updating

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

Plex's own updater does not run here. Only its `beta` and `public` images update
themselves; a version-tagged image has the version built in, which is what makes
the packaging the single route to a new one.

## Credits

The packaging is adapted from
[hassio-addons/app-plex](https://github.com/hassio-addons/app-plex), which is
MIT licensed.

The icon and logo come from that packaging.

## A note on licensing

Plex Media Server is proprietary software, unlike everything else in this
repository. It is used here under
[Plex's terms of service](https://www.plex.tv/about/privacy-legal/), and this
packaging claims no rights over it.

The image published for this application contains Plex Media Server as its base,
taken from the image Plex publishes. Installing this application means accepting
Plex's terms, not only this repository's licence.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. This one starts from the image Plex publishes.

Plex has no source to build and no versioned release feed that Renovate can
read. The published image carries the full version in its tag, which is what
keeps the update chain working.

That image already runs s6-overlay and already starts Plex, so unlike the other
applications built this way, none of that is installed here. Only bashio is
added, and one start-up script that passes the options above to Plex before it
starts.
