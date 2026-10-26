# Home Assistant Application: Unpackerr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Unpackerr" application.
3. Start it, then select **Open Web UI**. Unpackerr has nothing to do yet, and
   its log says so.
4. Sign in as `admin`, with the temporary password Unpackerr prints in the
   application's **Log** tab on its first start. It is shown once only.
5. Add Radarr and Sonarr under **Configuration** → **Starrs**, then change the
   password under **Configuration** → **Web Server**.

## Ingress

Unpackerr's web interface is served through Home Assistant's ingress, so it
opens inside Home Assistant and comes along wherever Home Assistant does, Home
Assistant Cloud included. Turn on **Show in sidebar** on the application's page
to keep it a click away. Ingress is authenticated by Home Assistant, which lets
only administrators in, and Unpackerr then asks for its own sign-in as well.

The web interface shows the queue and the history as they happen, follows the
log, and edits every setting in `unpackerr.conf`, with a test for each Radarr or
Sonarr before it is saved. Settings that only take effect on a restart are
applied by Unpackerr itself once nothing is extracting.

Unpackerr answers on port 5656 on Home Assistant's internal network, at
`http://2dd33fbd-unpackerr:5656`, for Traefik, Prometheus and anything else
there. The application publishes no port, so nothing outside Home Assistant
reaches it except through ingress or a proxy you put in front of it.

Ingress reaches it through nginx, on a port of its own that only Supervisor may
call. Unpackerr's pages address its API from a URL base it hands them in a
cookie, so nginx hands them the ingress path there, and keeps Unpackerr's
cookies under that path rather than on the root of Home Assistant's address,
which every ingress application shares. Unpackerr itself runs with no URL base,
so 5656 needs none.

Three things follow from that:

- **Listen address and URL base under Configuration → Web Server are set by the
  application**, and shown as fixed there. Leave the certificate and key files
  empty too: Unpackerr would then answer only HTTPS, which nginx and the health
  check do not ask for.
- **Sessions do not survive a restart.** Unpackerr signs its session cookies
  with a key it makes on every start, so the web interface asks you to sign in
  again after one.
- **Unpackerr sees every ingress request as coming from nginx**, at 127.0.0.1,
  so its HTTP log shows that address rather than yours. Do not add the loopback
  address under Upstreams in **Configuration** → **Web Server**: Unpackerr
  trusts the networks listed there to say who the client is, and with proxy
  sign-in, who is signed in.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Unpackerr when it stops answering, not only when it exits. The check
asks the web interface, through nginx, for the address its live updates use. It
is off by default.

## Configuration

Unpackerr has no application options, because its own configuration describes
several applications at once and does not reduce to a handful of fields. It is
`/config/unpackerr.conf`, which the web interface edits. On first start the
application writes the upstream example there, and never touches it again.

Unpackerr itself rewrites the file: on its first start, to store a hash of the
temporary password and the admin API key it generates, and whenever settings are
saved in the web interface. A rewrite keeps every setting and replaces the
comments with its own, so the file stays readable but notes of your own in it do
not last.

For each application it should watch, add it under **Configuration** →
**Starrs**, or in the file:

```toml
[radarr.0]
  url = "http://2dd33fbd-radarr:7878"
  api_key = "your radarr api key"
  paths = ['/share/qbittorrent/downloads']

[sonarr.0]
  url = "http://2dd33fbd-sonarr:8989"
  api_key = "your sonarr api key"
  paths = ['/share/qbittorrent/downloads']
```

Unpackerr 1.0.0 names each instance with a key, as in `[radarr.0]` or
`[sonarr.uhd]`. A file written for an earlier version, with `[[radarr]]` and
`[[sonarr]]`, still loads, and Unpackerr renumbers its blocks from 0 the first
time it rewrites the file.

`url` is where Unpackerr finds that application. On the same Home Assistant,
that is its hostname on the internal network: `http://2dd33fbd-radarr:7878` for
Radarr and `http://2dd33fbd-sonarr:8989` for Sonarr. `127.0.0.1`, which the
upstream example names, is Unpackerr itself here. A Radarr or Sonarr running
anywhere else keeps the address you already use for it.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. A Radarr or Sonarr installed any other way has another
prefix, shown as **Hostname** on its **Info** tab.

Take each API key from that application, under Settings then General.

Unpackerr looks for each download under `paths` first. When a download is not
under any of them, Unpackerr uses the path Radarr or Sonarr reports, which works
here too, since every application on this Home Assistant sees `/share` and
`/media` at the same path. A Radarr or Sonarr elsewhere reports paths on its own
machine, so for one of those `paths` has to be where Unpackerr finds the
downloads, or extraction appears to do nothing.

Unpackerr is for the torrent client. It skips Usenet downloads unless its
`protocols` setting names them, and NZBGet unpacks its own downloads before
Radarr and Sonarr see them, so NZBGet's folder does not belong in `paths`.

To set a password by hand, if the temporary one is lost, write it as
`ui_password = "admin:<new password>"` under `[webserver]` in the file, then
restart. Unpackerr stores a hash of it in its place on that start.

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
| `/config` | read/write | `unpackerr.conf`, and the history     |
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
while one is taken. It stores no database, only `unpackerr.conf` and the history
of what it extracted, `unpackerr.history.jsonl`, both small text files, and
stopping it mid-extraction would be the more disruptive choice.

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
