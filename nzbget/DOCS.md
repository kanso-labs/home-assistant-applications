# Home Assistant Application: NZBGet

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "NZBGet" application.
3. Start it, then open the web interface on port 6789.

## First login

NZBGet ships with the same web interface password as every other NZBGet
installation. This application replaces it on first start with a generated one
and writes it to the log:

```
Web interface username: nzbget
Web interface password: <password>
```

Read it from the log and sign in. You can change it under Settings, then
Security. No credentials are stored in this application's configuration.

## Configuration

NZBGet has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Add your news servers under Settings, then News-Servers. Until you do, the log
reports that no servers are configured, which is expected on a fresh install.

Three defaults are changed on first start, because NZBGet's own would be wrong
here:

| Setting           | Seeded value    | Why                                                                                   |
| ----------------- | --------------- | ------------------------------------------------------------------------------------- |
| `MainDir`         | `/share/nzbget` | NZBGet downloads into its install directory, which is replaced on every update        |
| `ControlPassword` | generated       | The shipped password is identical on every NZBGet in the world                        |
| `WriteLog`        | `none`          | Home Assistant already captures the log, and NZBGet's own file is appended to forever |

All three are written only when no configuration exists, so anything you change
afterwards is left alone.

## Storage

| Path      | Access     | Holds                     |
| --------- | ---------- | ------------------------- |
| `/config` | read/write | The NZBGet configuration  |
| `/media`  | read/write | Your media library        |
| `/share`  | read/write | Downloads, under `nzbget` |

Downloads still land in `/share` by default, and letting Radarr and Sonarr file
them into `/media` remains the tidier arrangement. `/media` is mapped so that a
category or post-processing script can also be pointed straight at a library
path when you want NZBGet to put files there itself.

## Backups

Backups are taken cold, so Home Assistant stops NZBGet for the duration. Queue
state is written continuously while it runs, and copying it mid-write can
produce a backup that restores into a broken queue.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. NZBGet's own updater is not used.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about NZBGet itself rather than this packaging, see the
[NZBGet documentation](https://nzbget.com/documentation/).

## Credits

The logo comes from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
also served as a reference for what a Home Assistant NZBGet needs. That
packaging is broader than this one, carrying CIFS mounts and elevated
privileges. This application asks for neither.

NZBGet itself is developed by [nzbgetcom](https://github.com/nzbgetcom/nzbget)
and is licensed under GPLv2 or later. The binary is the project's own official
release, and the icon is its favicon.
