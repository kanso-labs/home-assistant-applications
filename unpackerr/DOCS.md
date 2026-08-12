# Home Assistant Application: Unpackerr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Unpackerr" application.
3. Start it once. It will write an example configuration and tell you it has
   nothing to do.
4. Edit that configuration, then restart it.

## There is no web interface

Unpackerr is a background service. It has no user interface, exposes no ports,
and does not appear in the sidebar. Everything it does shows up in its log and
in the arr applications it works for.

## Configuration

Unpackerr has no application options, because its own configuration describes
several applications at once and does not reduce to a handful of fields. On
first start it writes the upstream example to `/config/unpackerr.conf`, comments
and all, and leaves it alone from then on.

To make it useful, fill in a block for each application it should watch:

```toml
[[radarr]]
  url = "http://addon_local_radarr:7878"
  api_key = "your radarr api key"
  paths = ['/share/qbittorrent/downloads', '/share/nzbget']

[[sonarr]]
  url = "http://addon_local_sonarr:8989"
  api_key = "your sonarr api key"
  paths = ['/share/qbittorrent/downloads', '/share/nzbget']
```

Take each API key from that application, under Settings then General. Restart
Unpackerr after editing.

`paths` must be where the downloads actually land, and must match what the arr
application sees. If Unpackerr and Radarr disagree about a path, extraction
appears to do nothing.

## Storage

| Path      | Access     | Holds                                 |
| --------- | ---------- | ------------------------------------- |
| `/config` | read/write | `unpackerr.conf`                      |
| `/share`  | read/write | Downloads, which it extracts in place |

`/media` is deliberately not mapped. Unpackerr unpacks where the download landed
and leaves importing to Radarr and Sonarr, which have that access.

## Backups

Backups are taken hot, unlike most applications here, so Unpackerr keeps running
while one is taken. It stores no database — `/config` holds a single text file —
and stopping it mid-extraction would be the more disruptive choice.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Unpackerr itself rather than this packaging, see
[unpackerr.zip](https://unpackerr.zip).

## Credits

The icon and logo come from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
also served as a reference for what a Home Assistant Unpackerr needs. That
packaging is broader than this one, carrying VPN support, CIFS mounts and
elevated privileges. This application asks for none of it.

Unpackerr itself is developed by
[the Unpackerr project](https://github.com/Unpackerr/unpackerr) and is licensed
under MIT. The binary is the project's own official release.
