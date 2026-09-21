# Home Assistant Application: Nginx Proxy Manager

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Nginx Proxy Manager" application.
3. Start it, then open the web interface on port 81.
4. Create your administrator account on the page it opens with.

The first page is a setup form asking for a name, an email address and a
password. Older versions of Nginx Proxy Manager shipped a published default
login instead; 2.15 does not, so there is no window in which a known password
works.

## Configuration

There are no application options. Everything is configured from the web
interface, and it all lives in the application's configuration directory.

### Ports

| Port | What it is                                                      |
| ---- | --------------------------------------------------------------- |
| 80   | The HTTP entrance, and how Let's Encrypt verifies a domain      |
| 81   | The admin interface                                             |
| 443  | The HTTPS entrance, where proxied hosts answer with their certs |

Ports 80 and 443 are the ones your router forwards. Port 81 is the one you
should not forward — it is the administration interface, and nothing outside
your network needs it.

**Home Assistant itself is not automatically behind this.** Proxying the machine
you are running on needs care: send a proxy host to the Home Assistant port, and
add `use_x_forwarded_for` and `trusted_proxies` to your `configuration.yaml`, or
Home Assistant will reject the forwarded requests.

### Certificates

Let's Encrypt certificates are requested from the interface, under **SSL
Certificates**. An HTTP challenge needs port 80 reachable from the internet; a
DNS challenge does not, and is the option if your provider blocks it.

## Storage

| Path                      | Holds                                        |
| ------------------------- | -------------------------------------------- |
| `/config/database.sqlite` | Hosts, users, access lists, settings         |
| `/config/nginx`           | The Nginx host files it generates            |
| `/config/letsencrypt`     | The Let's Encrypt account and certificates   |
| `/config/access`          | Access lists                                 |
| `/config/custom_ssl`      | Certificates you uploaded yourself           |
| `/config/logs`            | Access and error logs, excluded from backups |
| `/data/keys.json`         | The JWT key pair                             |

Nothing else is mapped. Nginx Proxy Manager reaches the services it proxies over
the network, so it needs neither `/media` nor `/share`.

The JWT key pair is the one thing that lives outside `/config`, and that is
deliberate — it is a generated secret rather than something you would edit, so
it sits in the application's private directory. Home Assistant backs that up
too. Losing it signs everyone out; it does not lose your hosts.

## Backups

Backups are taken cold, so Home Assistant stops the proxy for the duration. The
host database is SQLite, and copying one that is being written to can produce a
backup that will not restore. **Everything behind the proxy is unreachable while
a backup runs**, which is worth knowing before scheduling one — this is the
application whose downtime takes the others with it.

`/config/logs` is excluded from backups. It grows without bound and restores
nothing useful.

## Updates

Updates arrive by updating this application. Nginx Proxy Manager is built from
source here, so a new upstream release becomes a new version of this application
rather than something the interface can install on its own.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Nginx Proxy Manager itself rather than this packaging, see
[its documentation](https://nginxproxymanager.com/guide/).

## Credits

This is a port of the
[Home Assistant Community app](https://github.com/hassio-addons/app-nginx-proxy-manager)
by Franck Nijhof, used under the MIT licence. The hard parts are all theirs: the
four patches that move the application's state into the configuration directory
and its logs to standard output, the source build, and the Nginx and Let's
Encrypt configuration. They are carried over unchanged.

Two things differ. The base image is Home Assistant's own Debian trixie base
rather than the community one, which is what keeps every pinned package version
valid. And the s6 service bundle is declared in `s6-rc.d/user/contents.d` rather
than `user-bundles.d`, because the s6-overlay in that base image does not read
the newer location — with the markers in the newer place, not one of the four
services starts.

Nginx Proxy Manager itself is developed by
[jc21](https://github.com/NginxProxyManager/nginx-proxy-manager) and is MIT
licensed.
