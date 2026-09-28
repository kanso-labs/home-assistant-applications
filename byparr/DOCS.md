# Home Assistant Application: Byparr

[Byparr](https://github.com/ThePhaseless/Byparr) gets past the anti-bot
challenges, such as Cloudflare's, that stand between the arr applications and
their indexers. It answers the same requests as FlareSolverr, so anything set up
for FlareSolverr can use Byparr instead. The browser doing the work is Camoufox,
a Firefox build hardened against fingerprinting, rather than Chrome.

Upstream is candid that this raises the odds rather than guaranteeing a pass.
Some sites also judge the address a request comes from, which is what the proxy
option below is for.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Byparr" application.
3. Start it. There is nothing to configure first.
4. Point Prowlarr at it, as described below.

**Byparr uses port 8191, the same as FlareSolverr.** Only one of them can
publish it on the Home Assistant machine. A Prowlarr running on the same Home
Assistant needs neither port published, so both can run at once, as Running it
alongside FlareSolverr below describes.

Each request starts a browser of its own, which takes up to about 600 MB of
memory until the request finishes. At rest, Byparr uses about 100 MB.

## Connecting Prowlarr

In Prowlarr, go to **Settings → Indexers → Add Indexer Proxy → FlareSolverr**.
Byparr answers FlareSolverr's requests, so that proxy type is the one to choose.
Set the host to the address Prowlarr can reach Byparr on:

- **A Prowlarr on the same Home Assistant**, such as this repository's Prowlarr
  application, reaches Byparr by its internal name, with no published port
  needed:

  ```
  http://2dd33fbd-byparr:8191
  ```

  `2dd33fbd` is Home Assistant's name for this repository when it was added by
  the address in the README. The name only resolves while Byparr is running.

- **A Prowlarr anywhere else** uses your Home Assistant machine's address and
  Byparr's published port:

  ```
  http://192.168.1.10:8191
  ```

**Replace the address Prowlarr suggests.** It defaults to
`http://localhost:8191/`, which cannot work here. Every application runs in its
own container, so `localhost` means Prowlarr itself rather than Byparr.

**Do not add `/v1` to the end.** Prowlarr appends it, and a host that already
ends in `/v1` becomes `/v1/v1` and fails.

Give the proxy a tag, then apply that same tag to each indexer that needs it.
Only tagged indexers are routed through Byparr.

**Moving from FlareSolverr** needs nothing new in Prowlarr. Stop FlareSolverr,
start Byparr on the same port, and the proxy Prowlarr already has reaches Byparr
instead.

Two things work differently from FlareSolverr:

- **Byparr only fetches pages.** An indexer that needs FlareSolverr to submit a
  form, such as a login, will not work through it.
- **Byparr ignores the proxy Prowlarr sends along with each request.** If
  requests should leave through a proxy, set it in Byparr's own configuration.

Radarr, Sonarr and Bazarr reach it the same way if they talk to indexers
directly.

## Running it alongside FlareSolverr

Keeping both lets most indexers use one, while the ones it cannot get through
use the other.

1. In Prowlarr, add one **FlareSolverr** indexer proxy for each application, and
   give each a tag of its own, such as `flaresolverr` and `byparr`.
2. From a Prowlarr on the same Home Assistant, set their hosts to
   `http://2dd33fbd-flaresolverr:8191` and `http://2dd33fbd-byparr:8191`.
   Neither needs a published port, and the two cannot both publish 8191, so turn
   the port off in Byparr's **Network** settings.
3. From a Prowlarr anywhere else, move Byparr's published port to another one,
   such as `8192`, and use `http://192.168.1.10:8192` for it.
4. Give each indexer the tag of the one proxy it should use. Indexers carrying
   neither tag connect directly.

**Tag each indexer for one proxy, never both.** Prowlarr sends an indexer's
requests through a single FlareSolverr-type proxy: the first matching one in its
list, which in practice is the one added first. It does not fall back to the
other when that one fails, so an indexer carrying both tags only ever uses one
of them.

## Configuration

### `log_level`

How much Byparr writes to the log. Raise it to `debug` when a challenge is
failing and you want to see what the browser did.

### `proxy_server`, `proxy_username` and `proxy_password`

A proxy for the browser to send every request through, written as
`protocol://host:port`, such as `http://proxy.local:3128` or
`socks5://proxy.local:1080`. The user name and password are only needed when the
proxy asks for them.

Challenges pass more often from an address the site trusts, which is why
upstream recommends one. A proxy Byparr cannot reach makes every request fail,
rather than going out directly. The log says a proxy is in use but leaves the
address out, since it can carry credentials.

### `browser_locale`

The language the browser presents to websites, as a tag such as `en-US` or
`pt-BR`. Left empty, it matches the country the requests leave from.

## What it looks up

Before each request, the browser asks a public service which address it leaves
from: `api.ipify.org`, `icanhazip.com` or `checkip.amazonaws.com`. It sets its
timezone to match that address, and its language too unless `browser_locale` is
set. With a proxy configured, these lookups go through the proxy.

It maps the address with a GeoIP database of about 120 MB, published by
[daijro/geoip-all-in-one](https://github.com/daijro/geoip-all-in-one). The
browser downloads it on its first request, then checks GitHub for a newer
release before every request and replaces it when one appears.

## Storage

| Path          | Holds                                          |
| ------------- | ---------------------------------------------- |
| `/data/geoip` | The GeoIP database the browser downloaded last |

That database is the only thing kept. Byparr has no settings and no database of
its own, so no other directory is mapped.

Home Assistant creates a new container every time an application starts, so the
database lives in `/data` rather than beside the browser. Kept there, a restart,
an update or a reboot does not download it again.

## Backups

There is nothing worth backing up. The GeoIP database is excluded, since it is a
public download that comes back on the first request after a restore, and
nothing else is stored.

## Checking it works

Opening the web interface from Home Assistant shows Byparr's API documentation,
which is all the interface it has. Seeing it means the server is up.

To check the browser as well, ask for the health response from the address
Prowlarr uses:

```shell
curl http://192.168.1.10:8191/health
```

```json
{ "msg": "Byparr is working!", "version": "3.0.4", "userAgent": "..." }
```

That request starts the browser and loads `https://google.com`, so it takes a
few seconds. If it answers and Prowlarr still cannot connect, the address in
Prowlarr is wrong rather than Byparr being down.

Both checks need Byparr's port published. With it turned off, Prowlarr checks
the connection itself each time you save the proxy, and reports an address it
cannot reach.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Byparr itself rather than this packaging, see
[its own repository](https://github.com/ThePhaseless/Byparr).

## Credits

This packaging is new, and its shape follows the FlareSolverr application in
this repository.

Byparr is developed by [ThePhaseless](https://github.com/ThePhaseless) and is
licensed under the GNU General Public License v3.0. The icon is Byparr's own,
and the logo is built from it.

## A note on the base image

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. Byparr starts from the image its own project publishes
instead, an Ubuntu 24.04 build carrying Python and the browser, for amd64 and
arm64 together. It is about 900 MB, of which the browser is 560 MB. s6-overlay
and bashio are installed on top, and the service drops back to the unprivileged
user the upstream image runs as.

Upstream's health check is replaced. It ran every 15 minutes and loaded
`https://google.com` through the browser each time, and Home Assistant shows an
application with a health check as starting until the first result arrives, so
Byparr looked unstarted for a quarter of an hour. The one here asks only whether
the server answers, every 30 seconds. The browser check is still there at
`/health` when you want it.
