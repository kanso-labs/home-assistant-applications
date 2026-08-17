# Home Assistant Application: Jackett

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Jackett" application.
3. Start it, then open the web interface on port 9117.

## Configuration

Jackett has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Add your trackers under "Add indexer". Each one you configure gets a Torznab
feed, and that feed URL is what you paste into Radarr, Sonarr or whatever else
is searching.

## Connecting the arr applications

Radarr and Sonarr reach Jackett over the local network, so use your Home
Assistant host's address rather than `localhost` — the applications run in
separate containers.

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| URL     | the Torznab feed Jackett shows you          |
| API key | shown at the top of Jackett's web interface |

## Securing it

Jackett ships with no password and its API key alone protects the feeds. Set an
admin password under "Admin password" in the web interface, especially if you
forward the port beyond your own network.

## Storage

| Path      | Access     | Holds                                                       |
| --------- | ---------- | ----------------------------------------------------------- |
| `/config` | read/write | Jackett's settings and indexer definitions, under `Jackett` |

Neither `/media` nor `/share` is mapped. Jackett answers searches and never
touches the files themselves, so it has no reason to see either.

## Updates

Jackett's own updater is disabled. It would replace the binary inside the image
with one that disappears the next time the application updates, so updates
arrive by rebuilding the image instead. Jackett may still report that a newer
version exists.

## The root privileges message

Jackett logs this at error level every time it starts, and nothing is wrong:

```
Jackett is running with root privileges. You should run Jackett as an unprivileged user.
```

Home Assistant applications run as root, which is what Jackett is objecting to.
It is advice aimed at people running Jackett directly on a machine, and it has
no bearing on a container that holds nothing but Jackett's own configuration.

## Backups

Backups are taken cold, so Home Assistant stops Jackett for the duration.
Indexer definitions are rewritten in place as you add and remove trackers, and
copying one mid-write can restore a definition that is only half there.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Jackett itself rather than this packaging, see the
[Jackett documentation](https://github.com/Jackett/Jackett/wiki).

## Credits

[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons/tree/master/jackett)
served as a reference for what a Home Assistant Jackett needs. That packaging is
broader than this one, wrapping the linuxserver.io image and asking for elevated
privileges and a long list of devices. This application asks for none of them,
and builds from Jackett's own release instead.

Jackett itself is developed by the
[Jackett project](https://github.com/Jackett/Jackett) and is licensed under
GPLv2. The binary is the project's own official release.
