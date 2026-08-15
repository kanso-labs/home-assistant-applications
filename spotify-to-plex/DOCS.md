# Home Assistant Application: Spotify to Plex

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Spotify to Plex" application.
3. Create a Spotify application, as described below, and put its client id and
   secret in the application options.
4. Start it, then open the web interface on port 9030 and connect your Plex
   server.

The interface starts without Spotify credentials, but it cannot reach Spotify
until they are set. The log says so on every start until then.

## Creating the Spotify application

Spotify requires each installation to register its own application, so there is
no shared credential to hand out.

1. Sign in at
   [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
   and create an app.
2. Set its redirect URI to exactly:

```
https://jjdenhertog.github.io/spotify-to-plex/callback.html
```

3. Copy the client id and secret into this application's options.

That redirect page is hosted by the project. Spotify sends the browser there
after sign-in, which is what avoids needing a page reachable from the internet.

## Configuration

### `spotify_client_id`

The client id of the Spotify application you created.

### `spotify_client_secret`

Its client secret. Stored by Home Assistant and passed to the application at
start.

Everything else is configured from the web interface, including the Plex server
to sync with and whatever you use to fetch missing tracks.

## Storage

| Path      | Access     | Holds                                        |
| --------- | ---------- | -------------------------------------------- |
| `/config` | read/write | Settings, sync state, and stored credentials |

The application stores everything in one directory, which it keeps inside the
image by default — where an update would discard it. This application points it
at `/config` instead.

No media or share mapping is granted. Spotify to Plex reads and writes nothing
on disk beyond that directory: it talks to Plex, Spotify and the download tools
over their APIs.

## The encryption key

Credentials stored by the application are encrypted with a key generated on
first start and kept at `/config/.encryption_key`.

It is generated once and kept because the credentials cannot be read back
without it. Deleting that file means reconnecting Spotify and Plex from the
interface.

## Backups

`backup: cold` stops the application before the backup is taken, so the sync
state is not copied while it is being written.

The backup includes the encryption key, which is what lets a restored backup
still read its own stored credentials.

## Updating

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

## Credits

Spotify to Plex is
[a separate project](https://github.com/jjdenhertog/spotify-to-plex) by
jjdenhertog, licensed under Apache-2.0. Its
[documentation](https://jjdenhertog.github.io/spotify-to-plex/) covers the parts
configured from the web interface.

The logo comes from that project.

There is no community Home Assistant packaging for this one, so nothing here is
adapted from an existing application.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. This one starts from the image the project publishes.

It builds a Next.js application, a Python scraper and a scheduler into one image
and runs all three under supervisord. Reproducing that build would mean
maintaining a copy of it.

No s6-overlay is installed, because supervisord is already the init this image
runs. Only bashio is added, along with an entrypoint that puts the options above
into the environment before handing over to the entrypoint the image already
had.
