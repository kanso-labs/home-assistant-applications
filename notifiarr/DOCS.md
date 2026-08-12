# Home Assistant Application: Notifiarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Notifiarr" application.
3. Put your Notifiarr.com API key in the application options.
4. Start it, then open the web interface on port 5454.

Without an API key Notifiarr still starts and serves its web interface, but it
cannot reach Notifiarr.com. The log says so on every start until one is set.

## Configuration

### `api_key`

Your API key from [notifiarr.com](https://notifiarr.com), found under your
profile. It is passed to Notifiarr through the environment and is never written
into the configuration file on disk.

Everything else is configured from Notifiarr's own web interface, and those
settings live in the application's configuration directory so they survive
restarts and updates.

## First login

The username is `admin`. Notifiarr leaves its web interface password unset,
which makes it fall back to using your API key as the login password. This
application generates a separate one on first start instead, so the key does not
do double duty, and writes it to the log:

```
Web interface username: admin
Web interface password: <password>
```

Read it from the log and sign in. Changing it in the web interface stores it
encrypted, which is worth doing.

## Storage

| Path      | Access     | Holds                                   |
| --------- | ---------- | --------------------------------------- |
| `/config` | read/write | The Notifiarr configuration             |
| `/share`  | read-only  | Storage Notifiarr reports free space on |

`/share` is mapped read-only because Notifiarr reports on disk usage but never
writes. `/media` is not mapped at all — Notifiarr talks to Radarr and Sonarr
over their APIs rather than touching their libraries.

## Backups

Backups are taken cold, so Home Assistant stops Notifiarr for the duration.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Notifiarr itself rather than this packaging, see the
[Notifiarr wiki](https://notifiarr.wiki).

## Credits

The icon and logo come from
[zanyraspi/home-assistant-addons](https://github.com/zanyraspi/home-assistant-addons),
which also served as a reference for what a Home Assistant Notifiarr needs. That
add-on runs Notifiarr's own prebuilt container image; this one packages the
project's published binary instead, so the version is tracked and released the
same way as every other application here.

Notifiarr itself is developed by
[Notifiarr](https://github.com/Notifiarr/notifiarr) and is licensed under MIT.
