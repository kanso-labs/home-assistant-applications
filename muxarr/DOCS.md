# Home Assistant Application: Muxarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Muxarr" application.
3. Start it, then open the web interface on port 8183.
4. Work through the setup wizard: a username and password, then Sonarr and
   Radarr, then your first profile.

The wizard lets you skip the username and password. Port 8183 is published on
your network, so skipping it leaves anyone who can reach that port able to queue
changes to your library.

## Configuration

### Option: `umask`

The permissions Muxarr gives the files it rewrites. `022` is the default and
leaves them writable by their owner alone. `002` makes them group-writable,
which is what a library shared with other applications or users needs.

This is the only application option. Everything else — profiles, language rules,
the Sonarr and Radarr connections — is configured from Muxarr's own interface
and kept in its database.

### Setting the rest up

Connect Sonarr and Radarr under **Settings → Integrations**. Muxarr uses them
for original-language detection, and they can call its webhook so new imports
are cleaned up as they arrive. Reach them over the internal network by
application hostname rather than `localhost` — `http://<slug>:8989` for Sonarr
and `http://<slug>:7878` for Radarr.

Then create a profile naming the directories to watch and the languages to keep.
Scan, preview what would change, and queue the files.

**Preview before you queue the first run.** Muxarr rewrites files in place, and
a profile that keeps fewer languages than you meant is applied to the whole
library at once.

## What it does to a file

Muxarr remuxes rather than re-encodes: the video and the tracks you keep are
copied bit for bit into a new container, and the tracks you do not are left out.
Nothing is transcoded, so there is no quality loss and a 4GB file takes about a
minute rather than hours.

Matroska is handled with `mkvmerge`, and the MP4 family with `ffmpeg` stream
copy. Both ship inside the image along with `ffprobe`, so nothing is downloaded
at run time.

Supported containers are `.mkv`, `.webm`, `.mp4` and `.m4v`. Anything else is
left alone.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The Muxarr database and its settings          |
| `/media`  | read/write | Your library, where files are rewritten       |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because rewriting the file in place is the
whole job. Read-only mappings would let Muxarr scan a library and show you what
it would strip, then fail at the point of doing it.

Older versions of Muxarr kept the database in `/data`, and the image still
declares that path. Nothing here writes to it, so an installation that started
on this application never has one.

## Backups

Backups are taken cold, so Home Assistant stops Muxarr for the duration. It
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

Stopping Muxarr part way through a conversion is worth avoiding regardless, so
prefer a backup window when the queue is empty.

## Updates

Updates arrive by updating this application.

**Muxarr has never cut a stable release.** Every one of its releases is marked
as a prerelease and the project is pre-1.0, so treat an update the way you would
treat any pre-1.0 software: read what changed, and take a backup first.

## Why this starts at 0.1.0

Every other application in this repository starts at `1.0.0`. This one does not,
because nothing has run it against a real library yet — it has been built,
booted and driven through its setup wizard, and that is all.

It moves to `1.0.0` once it has processed real files on a real instance without
surprises. Until then the version is saying what is actually known about it.

Nothing about the packaging is provisional — the version is a statement about
how much it has been exercised, not about what is in the image.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Muxarr itself rather than this packaging, see
[muxarr.app](https://muxarr.app) or its
[repository](https://github.com/KirovAir/muxarr).

## Credits

Nobody had packaged Muxarr for Home Assistant, so this packaging is new rather
than a port. Its shape follows the other applications in this repository.

Muxarr itself is developed by [KirovAir](https://github.com/KirovAir/muxarr) and
is licensed under GPL-3.0. It builds on [FFmpeg](https://ffmpeg.org/) and
[MKVToolNix](https://mkvtoolnix.download/), which carry their own licences.
