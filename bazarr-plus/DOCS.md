# Home Assistant Application: Bazarr+

## This is a fork, and Bazarr is also in this store

Bazarr+ is a fork of [Bazarr](../bazarr), which this repository ships as its own
application. They are the same program underneath, and everything Bazarr does,
this does too.

What the fork adds:

- **A provider marketplace** — a plugin catalogue of subtitle providers, rather
  than only the set compiled in.
- **AI translation** through OpenRouter, and translation from embedded tracks.
- **Bilingual and trilingual subtitles** in one file.
- **Multi-engine subtitle synchronisation.**

**Pick one.** Both write subtitle files next to your media, so running them over
the same library means two applications editing the same files with different
settings, and whichever ran last wins. Install this _or_ Bazarr, not both.

If you are moving from Bazarr, treat it as a fresh install rather than a
migration: the two keep separate configuration directories, and the fork's
database schema has diverged from the one Bazarr writes.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Bazarr+" application.
3. Start it, then open the web interface on port **6768**.
4. Work through the setup wizard: Sonarr and Radarr, then languages and
   providers.

### Why 6768

Bazarr+ listens on 6767 inside its container, which is the port Bazarr uses too.
Publishing both on the host's 6767 is a conflict Supervisor reports only when
the second one starts, so this application is published on **6768** instead.

Change it under the application's **Network** settings if 6768 is taken. Nothing
inside the container moves — only the port the host answers on.

## Configuration

There are no application options. Everything is configured from the web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Point it at Radarr and Sonarr under Settings, then choose the subtitle languages
and providers you want. It reaches them over the internal network, so use their
application hostnames rather than `localhost`.

Translation through OpenRouter needs an API key, which you supply under the
translation settings. It is a paid third-party service and nothing here sends
anything to it until you configure one.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The database, settings, logs and backups      |
| `/media`  | read/write | Your library, where subtitles are written     |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because subtitle files are saved next to the
media they belong to. Read-only mappings would let it search and find subtitles
it could never save.

## Backups

Backups are taken cold, so Home Assistant stops Bazarr+ for the duration. It
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

**Take one before a major update.** The fork's own migrations warn that some
schema changes are one-way and cannot be rolled back — its log says so during
the upgrade, and restoring the backup is the only route down.

## Updates

The application is started with `--no-update`, so its own updater is disabled by
design. It will report that a newer version exists and refuse to install it,
which is why this packaging is the only route to one.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Bazarr+ itself rather than this packaging, see its
[repository](https://github.com/LavX/bazarr).

## Credits

Bazarr+ is developed by [LavX](https://github.com/LavX/bazarr) as a fork of
[Bazarr](https://github.com/morpheus65535/bazarr) by the Bazarr team. Both are
licensed under GPLv3.

This packaging is new rather than a port, and its shape follows the other
applications in this repository — including the Bazarr beside it, whose mappings
and reasoning it borrows.
