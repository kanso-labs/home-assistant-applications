# Home Assistant Application: Nginx Proxy Manager

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Nginx Proxy Manager" application.
3. Start it, then open the web interface on port 81.
4. Create your administrator account on the page it opens with.

The first page is a setup form asking for a name, an email address and a
password. Older versions of Nginx Proxy Manager shipped a published default
login instead; 2.15 and later do not, so there is no window in which a known
password works.

## Configuration

There are no application options. Everything is configured from the web
interface, and it all lives in the application's configuration directory.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Nginx Proxy Manager when it stops answering, not only when it exits. The
image asks for Nginx Proxy Manager's status at `/api/` every 30 seconds, through
Nginx so that both are checked, and five failures in a row count as a hang. It
is off by default.

### Certificates

Let's Encrypt certificates are requested from the interface, under **SSL
Certificates**. An HTTP challenge needs port 80 reachable from the internet; a
DNS challenge does not, and is the option if your provider blocks it.

## Ports

| Port | What it is                                                      |
| ---- | --------------------------------------------------------------- |
| 80   | The HTTP entrance, and how Let's Encrypt verifies a domain      |
| 81   | The admin interface                                             |
| 443  | The HTTPS entrance, where proxied hosts answer with their certs |

Ports 80 and 443 are the ones your router forwards. Port 81 is the one you
should not forward — it is the administration interface, and nothing outside
your network needs it.

Traefik uses the same two ports by default, so only one of them can have each.
Change or clear a port in the Network section of this application's
Configuration tab; a cleared port is not opened at all.

## Proxying Home Assistant

Home Assistant itself is not behind this until you add it. Create a proxy host
that forwards to `http://homeassistant:8123`, by setting **Scheme** to `http`,
**Forward Hostname / IP** to `homeassistant` and **Forward Port** to `8123`, and
turn on **Websockets Support**, which Home Assistant's frontend needs. Then add
this to Home Assistant's `configuration.yaml` and restart Home Assistant:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 172.30.33.0/24
```

Without it, Home Assistant answers every request the proxy forwards with 400 Bad
Request, and logs that its HTTP integration is not set up for reverse proxies.
`172.30.33.0/24` is the network Home Assistant gives its applications, so this
trusts the applications on this machine and nothing outside it.

## Storage

| Path                      | Holds                                      |
| ------------------------- | ------------------------------------------ |
| `/config/database.sqlite` | Hosts, users, access lists, settings       |
| `/config/nginx`           | The Nginx host files it generates          |
| `/config/letsencrypt`     | The Let's Encrypt account and certificates |
| `/config/access`          | Access lists                               |
| `/config/custom_ssl`      | Certificates you uploaded yourself         |
| `/config/logs`            | Certbot's logs, excluded from backups      |
| `/data/keys.json`         | The JWT key pair                           |

Nothing else is mapped. Nginx Proxy Manager reaches the services it proxies over
the network, so it needs neither `/media` nor `/share`.

The JWT key pair is the one thing that lives outside `/config`, and that is
deliberate — it is a generated secret rather than something you would edit, so
it sits in the application's private directory. Home Assistant backs that up
too. Losing it signs everyone out; it does not lose your hosts.

## Logs

The **Logs** page of the web interface shows the access and error logs of each
host, Nginx Proxy Manager's own log, and Certbot's. All but Certbot's are
written inside the application's container rather than to `/config`. Home
Assistant replaces that container every time the application starts, so those
logs begin empty after every restart, update and backup, and are never part of
one. Nginx Proxy Manager rotates them by size, checking every two days.

The application's log in Home Assistant carries Nginx Proxy Manager's output as
well, along with everything Nginx reports outside of a specific host.

## Backups

Backups are taken cold, so Home Assistant stops the proxy for the duration. The
host database is SQLite, and copying one that is being written to can produce a
backup that will not restore. **Everything behind the proxy is unreachable while
a backup runs**, which is worth knowing before scheduling one — this is the
application whose downtime takes the others with it.

`/config/logs` is excluded from backups. It holds Certbot's logs, which restore
nothing useful.

## Updates

Updates arrive by updating this application. Nginx Proxy Manager is built from
source here, so a new upstream release becomes a new version of this application
rather than something the interface can install on its own.

The same goes for Nginx and Node.js, which are pinned to exact versions: a new
release of either, Nginx's security fixes included, reaches you as a new version
of this application too.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Nginx Proxy Manager itself rather than this packaging, see
[its documentation](https://nginxproxymanager.com/guide/).

## Credits

This is a port of the
[Home Assistant Community app](https://github.com/hassio-addons/app-nginx-proxy-manager)
by Franck Nijhof, used under the MIT licence. The hard parts are all theirs: the
patches that move the application's state into the configuration directory and
keep its logs out of it, the source build, and the Nginx and Let's Encrypt
configuration. They are carried over unchanged.

One thing differs: the base image is Home Assistant's own Debian trixie base
rather than the community one. Both are the same Debian release, so the
community build's packages and its Nginx repository carry over.

Nginx Proxy Manager itself is developed by
[jc21](https://github.com/NginxProxyManager/nginx-proxy-manager) and is MIT
licensed.
