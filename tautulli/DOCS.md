# Home Assistant Application: Tautulli

[Tautulli](https://tautulli.com) watches a Plex Media Server and records what is
played on it: who watched what, when, on which device, from where, and whether
Plex streamed the file as it is or transcoded it. It keeps that history in
tables and graphs, and sends a notification when a stream starts, stops or
buffers, or when something is added to the library.

**This application is at 0.x** until it has run on a real Home Assistant. It was
built and booted locally, through the published port and a stand-in for ingress,
but it has not yet been connected to a Plex server or opened through Home
Assistant's own ingress.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Tautulli" application.
3. Start it, then select **Open Web UI**, or open port 8181.
4. Work through the setup wizard, which signs Tautulli in to Plex and asks for
   the server to watch.

### First sign-in

The wizard asks for a username and password before anything else, and will not
go on without them. Until it has them, Tautulli answers only browsers on the
local network, through ingress as well as on the port, so run the wizard from
home. Change them later under **Settings → Web Interface**. Leave **Allow Plex
Admin** on there to sign in with the Plex account that owns the server as well.

## Configuration

There are no application options. Everything is configured from the web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

### Plex Media Server

The wizard looks for servers through your Plex account and lists their public
and local addresses. A Plex Media Server installed from this repository is also
reachable over Home Assistant's internal network at `2dd33fbd-plex-media-server`
on port 32400, with **Use SSL** off, which you can enter under **Settings → Plex
Media Server** instead. `2dd33fbd` is Home Assistant's name for this repository
when it was added by the address in the README. A Plex from another repository
has another prefix, shown as **Hostname** on that application's **Info** tab.

**Plex Logs Folder** under the same settings stays empty. Tautulli can show
Plex's own logs, but Plex keeps them in its own configuration directory, which
this application cannot read.

### Public Tautulli Domain

Images in notifications and the newsletters link back to Tautulli. Set the
address people can reach it at under **Settings → Web Interface → Public
Tautulli Domain**, such as `http://tautulli.local` behind a reverse proxy. The
links carry the ingress path, as `/api/hassio_ingress/<token>/image/…`, and the
published port answers them, see Ingress. Left empty, they name an address only
the container can reach.

### Home Assistant

Two things connect Tautulli and Home Assistant, and neither needs a port opened.

- **The Tautulli integration** in Home Assistant shows who is watching what as
  sensors. Add it with `http://2dd33fbd-tautulli:8181` as the URL and the API
  key from **Settings → Web Interface**, where **Enable API** is on by default.
- **A webhook** sends Tautulli's events, such as playback started, paused and
  stopped, to an automation as they happen. Add a **Webhook** notification agent
  under **Settings → Notification Agents**, with
  `http://homeassistant:8123/api/webhook/<id>` as its URL and the `<id>` of an
  automation's webhook trigger, then choose the triggers and write the JSON it
  sends under **Data**.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Tautulli when it stops answering, not only when it exits. The image asks
for Tautulli's `/status` every 30 seconds, through nginx so that both are
checked, and once it has had five minutes to start, five failures in a row count
as a hang. A restart from inside Tautulli does not count as one. It is off by
default.

## Ingress

Tautulli is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in, and Tautulli asks for its own sign-in after that.

The published port keeps working alongside it, for the browser at home and for
everything that calls Tautulli's API, which needs no change.

Both reach Tautulli through nginx. Ingress puts Tautulli under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Tautulli writes one
HTTP root into every page it serves, so the application makes that path the HTTP
root and moves Tautulli itself to `127.0.0.1:18181`. nginx answers on 8181, puts
the path back onto whatever arrives without it, and takes it back out of
everything it returns to the published port.

Four things follow from that:

- **The published port shows Tautulli's own addresses**, with no path, and its
  API answers at the root, as `http://<host>:8181/api/v2`. A page opened there
  under the path, from a link copied out of ingress, is sent to the same page
  without it.
- **HTTP Root, Enable HTTP Proxy and Enable HTTPS under Settings → Web Interface
  are set by the application**, and written back into `config.ini` on every
  start, as is the address Tautulli listens on. On the published port the root
  shows as `/`. Leave them alone: a value saved there is written over at the
  application's next start, but a restart from inside Tautulli puts it into
  effect first, which for the root and for HTTPS breaks both routes. **HTTP
  Port** cannot be changed at all, as in Tautulli's own image. For HTTPS, put
  Tautulli behind a reverse proxy that serves it.
- **Tautulli knows each client's address.** nginx tells it the address each
  request came from, and the browser's own through ingress, so the sign-in
  history names the right one and ten wrong passwords lock out only that client,
  for five minutes. Everything through Traefik, or any other proxy in front of
  the published port, arrives from the proxy's one address, so ten wrong
  passwords there lock out everyone using it.
- **Requests up to any size get through.** Supervisor refuses anything over 16
  MiB through ingress unless the application streams it, and a database imported
  under **Settings → Import & Backups** is often larger, so this one streams.
  nginx reads an upload whole before handing it to Tautulli.

## Storage

| Path      | Access     | Holds                                                        |
| --------- | ---------- | ------------------------------------------------------------ |
| `/config` | read/write | The database, settings, logs, backups, exports and the cache |

Tautulli reads nothing but Plex's API, so no media or shared storage is mapped.

## Backups

Backups are taken cold, so Home Assistant stops Tautulli for the duration. It
keeps its history in SQLite, and copying a database that is being written to can
produce a backup that will not restore.

**The logs and the cache are left out**, `logs/` and `cache/` in the
configuration directory. Tautulli recreates both at start, and the cache holds
only posters and artwork it fetches from Plex again. The backups Tautulli takes
of its own database and settings, in `backups/`, stay in.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

Tautulli runs as a Docker install, as in its own image, so its updater stands
down. It still checks GitHub and says when a newer version exists, but cannot
install it, since a new version only reaches you through this application.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Tautulli itself rather than this packaging, see
[its own repository](https://github.com/Tautulli/Tautulli) and its
[wiki](https://github.com/Tautulli/Tautulli/wiki).

## Credits

Tautulli is developed by [the Tautulli team](https://github.com/Tautulli) and is
licensed under the GNU General Public License v3.0.

This packaging starts from the Home Assistant Community Apps'
[app-tautulli](https://github.com/hassio-addons/app-tautulli), under the MIT
licence, which was read for how Tautulli runs from its source and where it keeps
its state. It runs on a Home Assistant base image rather than that packaging's
Debian one, as Tautulli's own user rather than root, and adds ingress, with
nginx in front, so that Tautulli also sits behind a reverse proxy like the other
applications here.

The icon is Tautulli's own, from its web interface. The logo sets the same icon
beside Tautulli's name.
