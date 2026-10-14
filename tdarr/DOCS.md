# Home Assistant Application: Tdarr

[Tdarr](https://tdarr.io/) works through a media library file by file, running
each one through a flow of steps: FFmpeg, HandBrake and MKVToolNix commands,
checks and conditions. A flow can remux a file to drop tracks, extract its
subtitles, fix its metadata, transcode it, or check it for corruption.

This application runs the Tdarr server and one node together, so a single
installation does the work itself.

## Why it is built on your Home Assistant

Tdarr is free for personal use, but its licence forbids redistributing it, so
this repository publishes no image of it. Your Home Assistant builds the
application itself when it is installed or updated, starting from the image
Tdarr publishes.

That makes installing and updating take longer than for other applications, as
the image is over a gigabyte, and it needs internet access at the time. Using
Tdarr means accepting
[its licence](https://github.com/HaveAGitGat/Tdarr/blob/master/LICENSE.md).

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Tdarr" application. Home Assistant builds it first.
3. Start it, then open the web interface on port 8265.
4. Add a library: the folder to watch, under `/media` or `/share`, and the
   transcode cache, `/temp`.
5. Build a flow, attach it to the library, and test it on a few files before
   letting it loose on the whole library.

**Test a flow on copies first.** Tdarr replaces the files it processes, and a
flow that removes the wrong tracks removes them from every file it reaches.

## Configuration

| Option               | What it sets                                                               |
| -------------------- | -------------------------------------------------------------------------- |
| Sign-in              | Whether the web interface asks for Tdarr's own login. On by default        |
| File permission mask | The permissions processed files land with. 022 by default; 002 for a group |

Turn the sign-in off only when something else stands in front of Tdarr, such as
an authenticating reverse proxy, and close port 8265 when you do. With the
sign-in off and the port open, anyone who can reach it can rewrite your library.

The internal node authenticates with an API key the application generates on
first start and keeps in its configuration directory, so it keeps working
whether the sign-in is on or off.

## Network

| Port | What it is                                                                       |
| ---- | -------------------------------------------------------------------------------- |
| 8265 | The web interface and API                                                        |
| 8266 | The server port external nodes connect to. Closed by default; open it to add one |

## Storage

| Path      | Access     | Holds                                                         |
| --------- | ---------- | ------------------------------------------------------------- |
| `/config` | read/write | Tdarr's settings, database, logs, API key and transcode cache |
| `/media`  | read/write | Your library, where files are processed in place              |
| `/share`  | read/write | Shared storage, when your library lives there                 |

The transcode cache is at `/temp` inside the application, which is
`/config/cache` on the Home Assistant disk. Point a library's cache there rather
than at the network share the library may be on: Tdarr writes each file there in
full before replacing the original.

## Hardware transcoding

This application asks Home Assistant for no GPU access, because remuxing and
subtitle work need none. A flow that transcodes runs on the processor.

## Backups

Backups are taken cold, so Home Assistant stops Tdarr for the duration. The
transcode cache and the logs are left out of them.

Stopping Tdarr part way through a file abandons that file, and the original is
left as it was.

## Updates

Updates arrive by updating this application, which rebuilds it from the newer
Tdarr image. Tdarr's own auto-updater stays off.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Tdarr itself rather than this packaging, see
[tdarr.io](https://tdarr.io/) and its [documentation](https://docs.tdarr.io/).

## Credits

This packaging started from
[alexbelgium's Tdarr add-on](https://github.com/alexbelgium/hassio-addons/tree/master/tdarr),
which is MIT licensed, and the icon and logo are taken from it. It runs Tdarr's
own image and service scripts unchanged, adding only what Home Assistant needs.

Tdarr itself is developed by [HaveAGitGat](https://github.com/HaveAGitGat/Tdarr)
and is distributed under its own end-user licence. It builds on
[FFmpeg](https://ffmpeg.org/), [HandBrake](https://handbrake.fr/) and
[MKVToolNix](https://mkvtoolnix.download/), which carry their own licences.
