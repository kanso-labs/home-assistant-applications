# Home Assistant Application: qBittorrent

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "qBittorrent" application.
3. Start it, then select **Open Web UI**, or open port 8080.

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

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart qBittorrent when it stops answering, not only when it exits. The image
asks qBittorrent directly for its web interface every 30 seconds, and five
failures in a row count as a hang. It is off by default.

## Ingress

qBittorrent is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls qBittorrent's API: Radarr, Sonarr and the rest reach
qBittorrent directly, as before, and need no change.

qBittorrent names every address in its pages relatively, so it needs no URL base
under ingress. Ingress still reaches it through nginx, on a port of its own that
only Supervisor may call, which makes three adjustments on the way and changes
none of your settings. qBittorrent turns away a request that names a port other
than its own, and ingress names Home Assistant's, so nginx gives it
qBittorrent's own address. A request from the page you are on in Home Assistant
then names that address as where it came from too, while one from any other site
keeps its own, so qBittorrent still turns it away. And qBittorrent's page
expects to be the whole window, so nginx tells it that it is, inside Home
Assistant's frame too. qBittorrent's own protections, against requests from
other sites and against being framed by them, stay on.

Three things follow from that:

- **qBittorrent sees ingress as coming from the loopback address.** It still
  asks for its own password there. Turning on **Bypass authentication for
  clients on localhost** under Tools → Options → WebUI skips that for ingress
  alone, since Home Assistant has already asked for one, and the published port
  keeps asking.
- **Failed sign-ins through ingress all count against that one address.** Too
  many wrong passwords there bans ingress as a whole for the ban duration set
  under Tools → Options → WebUI, while the published port keeps working.
  Restarting the application lifts the ban.
- **Phone apps cannot use ingress**, because it needs a Home Assistant session
  in a browser. They still work on the published port.

## Ports

| Port       | Purpose                                                     |
| ---------- | ----------------------------------------------------------- |
| `6881/tcp` | Peer connections. Forward this on your router to seed well. |
| `6881/udp` | Peer connections and DHT.                                   |
| `8080/tcp` | Web interface and API, which Radarr and Sonarr call.        |

## Storage

| Path      | Access     | Holds                                    |
| --------- | ---------- | ---------------------------------------- |
| `/config` | read/write | The qBittorrent configuration and state  |
| `/media`  | read/write | Your media library                       |
| `/share`  | read/write | Downloads, under `qbittorrent/downloads` |

Downloads still land in `/share` by default, and letting Radarr and Sonarr file
them into `/media` remains the tidier arrangement. `/media` is mapped so that
qBittorrent can also be pointed straight at a library path when you want it to
save there, and so that seeding from a file already in the library works without
a second copy.

## Backups

Backups are taken cold, so Home Assistant stops qBittorrent for the duration.
Torrent state is written continuously while it runs, and copying it mid-write
can produce a backup that restores into a broken session.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. qBittorrent ships no updater of its own.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about qBittorrent itself rather than this packaging, see the
[qBittorrent wiki](https://github.com/qbittorrent/qBittorrent/wiki).

## Credits

The icon comes from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
also served as a reference for what a Home Assistant qBittorrent needs. That
packaging is considerably broader than this one — it carries VPN support, CIFS
mounts and hardware device access. This application deliberately ships none of
that, and asks for no elevated privileges.

The logo sets the same icon beside qBittorrent's name.

qBittorrent itself is developed by the
[qBittorrent team](https://github.com/qbittorrent/qBittorrent). Its source is
GPLv2 or later, while the binary distribution is GPLv3 or later, since it
carries GPLv3 assets. What ships here is Alpine's `qbittorrent-nox` package.
