# Home Assistant Application: Notifiarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Notifiarr" application.
3. Put your Notifiarr.com API key in the application options.
4. Start it, then select **Open Web UI**, or open port 5454.

Without an API key Notifiarr still starts and serves its web interface, but it
cannot reach Notifiarr.com. The log says so on every start until one is set.

## Configuration

### `api_key`

Your API key from [notifiarr.com](https://notifiarr.com), found under your
profile. It reaches Notifiarr through the environment, which wins over any key
saved in `notifiarr.conf`, and the application never writes it to disk itself.
Notifiarr does: your first sign-in, and every save under Configuration, rewrite
`notifiarr.conf` with every setting in effect, this key included, and keep a
copy of the earlier file under `backups/` beside it. Both are in the
application's configuration directory, so Home Assistant's backups carry the key
too. Removing it from the options does not take it out of `notifiarr.conf`, and
Notifiarr goes on using the copy saved there. A different key in the options
replaces it.

Everything else is configured from Notifiarr's own web interface, and those
settings live in the application's configuration directory so they survive
restarts and updates.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Notifiarr when it stops answering, not only when it exits. The image
asks for `/ui/ws` every 30 seconds, through nginx so that both are checked, at
the one address Notifiarr leaves out of its log, and five failures in a row
count as a hang. It is off by default.

## First login

The username is `admin`. Notifiarr leaves its web interface password unset,
which makes it fall back to using your API key as the login password. This
application generates a separate one on first start instead, so the key does not
do double duty, and writes it to the log:

```
Web interface username: admin
Web interface password: <password>
```

Read it from the log and sign in. It is written once, near the top of the first
start's log. Until your first sign-in, it is also `ui_password` in
`notifiarr.conf`, in the application's configuration directory. Signing in
stores it hashed, but Notifiarr keeps the file as it was under `backups/` beside
it, so changing the password in the web interface is still worth doing.

## Ingress

Notifiarr is served through Home Assistant's ingress, so its web interface opens
inside Home Assistant and comes along wherever Home Assistant does, Home
Assistant Cloud included. Turn on **Show in sidebar** on the application's page
to keep it a click away. Ingress is authenticated by Home Assistant, which lets
only administrators in, and Notifiarr then asks for its own sign-in as well.

The published port keeps working alongside it, for the browser at home and for
everything that calls Notifiarr directly: scripts using its API under `/api`,
Plex's webhook and Prometheus need no change. Notifiarr.com reaches the client
through its own tunnel rather than the port, and is not affected either.

Both reach Notifiarr through nginx. Ingress puts Notifiarr under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Notifiarr's web
interface builds every address from one URL base, so the application makes that
path the URL base and keeps Notifiarr itself on the loopback address. nginx
answers on 5454, puts the path back onto whatever arrives without it, and takes
it out again of whatever goes back to the published port.

Four things follow from that:

- **The published port shows the web interface's addresses without the ingress
  path**, as it did before ingress. A page opened there under the path, from a
  bookmark made while it showed, is sent to the same page without it.
- **Bind Address and URL Base under Configuration → Network are set by the
  application**, and changing them there has no effect. Saving the configuration
  writes the application's values into `notifiarr.conf`, as it does every other
  setting, and the application sets them again on every start. URL Base shows
  `/` on the published port and the ingress path through ingress.
- **The webhook address on the Plex page is built from the page it is shown
  on**, so under ingress it names Home Assistant, which Plex cannot use. Take it
  from the page on the published port instead, or point Plex at
  `http://<host>:5454/plex?token=<token>`, as before.
- **Notifiarr sees every request as coming from nginx**, at 127.0.0.1, so its
  HTTP log shows that address rather than the client's, and the networks under
  Upstreams no longer match a proxy in front of the port. Do not add the
  loopback address there: everything arrives from it, so Notifiarr would take
  any client's word for who is signed in, and with authentication set to none
  would let anyone in.

Notifiarr's own HTTPS settings would put it out of nginx's reach, so leave the
certificate and key files under Configuration empty.

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

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. Notifiarr ships no updater of its own.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Notifiarr itself rather than this packaging, see the
[Notifiarr wiki](https://notifiarr.wiki).

## Credits

[zanyraspi/home-assistant-addons](https://github.com/zanyraspi/home-assistant-addons)
served as a reference for what a Home Assistant Notifiarr needs. That add-on
runs Notifiarr's own prebuilt container image; this one packages the project's
published binary instead, so the version is tracked and released the same way as
every other application here.

Notifiarr itself is developed by
[Notifiarr](https://github.com/Notifiarr/notifiarr) and is licensed under MIT.
The icon is the one its macOS application ships, and the logo sets it beside
Notifiarr's name.
