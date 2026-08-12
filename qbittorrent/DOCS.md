# Home Assistant Application: qBittorrent

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "qBittorrent" application.
3. Start it, then open the web interface on port 8080.

## First login

qBittorrent does not ship with a fixed password. On first start it generates a
temporary one and writes it to the application log:

```
The WebUI administrator username is: admin
The WebUI administrator password was not set. A temporary password is provided
for this session: <password>
```

Read it from the log, sign in, and set your own password under Tools then
Options then Web UI. The temporary password changes every restart until you do.

No credentials are stored in this application's configuration, which is
deliberate.

## Configuration

qBittorrent has no application options. Everything is configured from its own
web interface, and the settings live in the application's configuration
directory so they survive restarts and updates.

Two defaults are seeded on first start, because qBittorrent's own would be wrong
here:

| Setting           | Seeded value                   | Why                                                             |
| ----------------- | ------------------------------ | --------------------------------------------------------------- |
| Default save path | `/share/qbittorrent/downloads` | qBittorrent would otherwise download into its own config volume |
| Peer port         | `6881`                         | qBittorrent would otherwise pick a random port nothing forwards |

Both are only written when no configuration exists, so anything you change
afterwards is left alone.

## Storage

| Path      | Access     | Holds                                    |
| --------- | ---------- | ---------------------------------------- |
| `/config` | read/write | The qBittorrent configuration and state  |
| `/share`  | read/write | Downloads, under `qbittorrent/downloads` |

`/media` is deliberately not mapped. qBittorrent downloads into shared storage,
and moving finished files into a library is the job of Radarr and Sonarr, which
have that access.

## Ports

| Port       | Purpose                                                     |
| ---------- | ----------------------------------------------------------- |
| `6881/tcp` | Peer connections. Forward this on your router to seed well. |
| `6881/udp` | Peer connections and DHT.                                   |
| `8080/tcp` | Web interface.                                              |

## Backups

Backups are taken cold, so Home Assistant stops qBittorrent for the duration.
Torrent state is written continuously while it runs, and copying it mid-write
can produce a backup that restores into a broken session.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about qBittorrent itself rather than this packaging, see the
[qBittorrent wiki](https://github.com/qbittorrent/qBittorrent/wiki).

## Credits

The icon and logo come from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
also served as a reference for what a Home Assistant qBittorrent needs. That
packaging is considerably broader than this one — it carries VPN support, CIFS
mounts and hardware device access. This application deliberately ships none of
that, and asks for no elevated privileges.

qBittorrent itself is developed by the
[qBittorrent team](https://github.com/qbittorrent/qBittorrent). Its source is
GPLv2 or later, while the binary distribution is GPLv3 or later, since it
carries GPLv3 assets. What ships here is Alpine's `qbittorrent-nox` package.
