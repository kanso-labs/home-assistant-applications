# Home Assistant Application: Unpackerr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Unpackerr" application.
3. Start it once. It will write an example configuration and tell you it has
   nothing to do.
4. Edit that configuration, then restart it. It is `unpackerr.conf` in
   `app_configs/2dd33fbd_unpackerr` on the host, which the Samba share and
   Studio Code Server applications can reach.

## There is no web interface

Unpackerr is a background service. It has no user interface, exposes no ports,
and does not appear in the sidebar. Everything it does shows up in its log and
in the arr applications it works for.

The log line `Webserver Disabled` is expected and is not a fault. Unpackerr's
optional web server serves Prometheus metrics only, never a user interface, and
it is off in the upstream default. Nothing here turns it on, which is why the
application declares no ports.

## Configuration

Unpackerr has no application options, because its own configuration describes
several applications at once and does not reduce to a handful of fields. On
first start it writes the upstream example to `/config/unpackerr.conf`, comments
and all, and leaves it alone from then on.

The `[[radarr]]` and `[[sonarr]]` headers are commented out in what gets seeded.
Upstream leaves them uncommented, which makes Unpackerr read a server with no
address and log an error for each one on every start until you configure it.

To make it useful, uncomment the header for each application it should watch and
fill in the block:

```toml
[[radarr]]
  url = "http://2dd33fbd-radarr:7878"
  api_key = "your radarr api key"
  paths = ['/share/qbittorrent/downloads']

[[sonarr]]
  url = "http://2dd33fbd-sonarr:8989"
  api_key = "your sonarr api key"
  paths = ['/share/qbittorrent/downloads']
```

`url` is where Unpackerr finds that application. On the same Home Assistant,
that is its hostname on the internal network rather than `localhost` or the
`127.0.0.1` the seeded example has: `http://2dd33fbd-radarr:7878` for Radarr and
`http://2dd33fbd-sonarr:8989` for Sonarr. A Radarr or Sonarr running anywhere
else keeps the address you already use for it.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. A Radarr or Sonarr installed any other way has another
prefix, shown as **Hostname** on its **Info** tab.

Take each API key from that application, under Settings then General. Restart
Unpackerr after editing.

`paths` must be where the downloads actually land, and must match what the arr
application sees. If Unpackerr and Radarr disagree about a path, extraction
appears to do nothing.

Unpackerr is for the torrent client. It skips Usenet downloads unless its
`protocols` setting names them, and NZBGet unpacks its own downloads before
Radarr and Sonarr see them, so NZBGet's folder does not belong in `paths`.

## Extraction limits

From 0.16.0 Unpackerr caps what it will unpack, and the caps are on by default:
20GB uncompressed for Sonarr, 75GB for Radarr, 4GB for Lidarr, 1GB for Readarr,
plus a fixed 1000 files, 5:1 compression ratio and 8 nested archives for all of
them. Hitting a cap fails that item without retrying. The startup log prints the
whole set, so what is in force is never a guess.

Raise or remove the byte cap with `max_bytes` in the relevant block — a size
such as `"100G"`, or `0` for no limit. The file-count, ratio and nesting caps
are not tunable.

Leftovers from an extract that was interrupted are renamed to `*.remnant` and
the extract retried, which is `remnant_action = "rename"` in what gets seeded.
Set it to `off` to fail instead.

## Storage

| Path      | Access     | Holds                                 |
| --------- | ---------- | ------------------------------------- |
| `/config` | read/write | `unpackerr.conf`                      |
| `/media`  | read/write | Your media library                    |
| `/share`  | read/write | Downloads, which it extracts in place |

`/config` is `app_configs/2dd33fbd_unpackerr` on the host, with the same prefix
as the hostnames above: if this repository was added by another address, it is
the part before the dash in the **Hostname** on this application's **Info** tab.
The Samba share application has it inside its `app_configs` share, and Studio
Code Server under `/addon_configs`, the older name of `app_configs`.

Unpackerr still extracts where the download landed, and leaving the import to
Radarr and Sonarr remains the tidier arrangement. `/media` is mapped so that it
can also reach archives that were downloaded into a library path, which it
otherwise could not see at all.

## Backups

Backups are taken hot, unlike most applications here, so Unpackerr keeps running
while one is taken. It stores no database — `/config` holds a single text file —
and stopping it mid-extraction would be the more disruptive choice.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. Unpackerr ships no updater of its own.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Unpackerr itself rather than this packaging, see
[unpackerr.zip](https://unpackerr.zip).

## Credits

[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons) served
as a reference for what a Home Assistant Unpackerr needs. That packaging is
broader than this one, carrying VPN support, CIFS mounts and elevated
privileges. This application asks for none of it.

Unpackerr itself is developed by
[the Unpackerr project](https://github.com/Unpackerr/unpackerr) and is licensed
under MIT. The binary is the project's own official release, and the icon and
logo are the project's own artwork.
