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

**Byparr's port is closed by default.** A Prowlarr on the same Home Assistant
reaches Byparr by its internal name and needs no port, which is also what lets
Byparr and FlareSolverr run side by side. Open the port only for a Prowlarr on
another machine, as Connecting Prowlarr below describes.

Each request starts a browser of its own, which takes up to about 600 MB of
memory until the request finishes. At rest, Byparr uses about 100 MB.

## Connecting Prowlarr

In Prowlarr, go to **Settings → Indexers → Add Indexer Proxy → FlareSolverr**.
Byparr answers FlareSolverr's requests, so that proxy type is the one to choose.
Set the host to the address Prowlarr can reach Byparr on:

- **A Prowlarr on the same Home Assistant**, such as this repository's Prowlarr
  application, reaches Byparr by its internal name, with no port opened:

  ```
  http://2dd33fbd-byparr:8191
  ```

  `2dd33fbd` is Home Assistant's name for this repository when it was added by
  the address in the README. The name only resolves while Byparr is running.

- **A Prowlarr anywhere else** needs Byparr's port opened first. In Byparr's
  **Configuration** tab, under **Network**, set the port to `8191`, then use
  your Home Assistant machine's address:

  ```
  http://192.168.1.10:8191
  ```

**Open the port only on a network you trust.** Byparr has no login, and it
fetches whatever page it is asked for from inside Home Assistant's network.
Anyone who can reach the port can therefore have it fetch the applications there
that open no port of their own, such as Seadexerr's feed with the AnimeBytes
passkey in its links, and read back what they answer.

**Set up while the port was open by default?** Byparr used to publish 8191 on
the Home Assistant machine. An update closes it unless you had set the port
yourself under **Network**, so a proxy in Prowlarr pointing at
`http://192.168.1.10:8191` stops connecting. From a Prowlarr on the same Home
Assistant, change its host to `http://2dd33fbd-byparr:8191`. From one anywhere
else, open the port again as above.

**Replace the address Prowlarr suggests.** It defaults to
`http://localhost:8191/`, which cannot work here. Every application runs in its
own container, so `localhost` means Prowlarr itself rather than Byparr.

**Do not add `/v1` to the end.** Prowlarr appends it, and a host that already
ends in `/v1` becomes `/v1/v1` and fails.

Give the proxy a tag, then apply that same tag to each indexer that needs it.
Only tagged indexers are routed through Byparr.

**If indexers behind Cloudflare keep failing** on a network with IPv6, turn on
`ipv4_only` in this repository's
[Prowlarr application](https://github.com/kanso-labs/home-assistant-applications/tree/main/prowlarr).
Cloudflare has been seen to challenge Prowlarr's own request again over IPv6,
even with the cookies Byparr had just earned.

**Moving from FlareSolverr** needs only the proxy's host changed. From a
Prowlarr on the same Home Assistant, change `http://2dd33fbd-flaresolverr:8191`
to `http://2dd33fbd-byparr:8191`. From one anywhere else, stop FlareSolverr and
open Byparr's port on `8191`, and the address Prowlarr already has reaches
Byparr instead.

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
   Neither needs its port opened.
3. From a Prowlarr anywhere else, open the two ports on different numbers, since
   only one of them can take 8191. Open Byparr's on `8192`, say, and use
   `http://192.168.1.10:8192` for it.
4. Give each indexer the tag of the one proxy it should use. Indexers carrying
   neither tag connect directly.

**Tag each indexer for one proxy, never both.** Prowlarr sends an indexer's
requests through a single FlareSolverr-type proxy: the first matching one in its
list, which in practice is the one added first. It does not fall back to the
other when that one fails, so an indexer carrying both tags only ever uses one
of them.

## Configuration

Only **Log level** shows on the Configuration tab at first. The proxy and
browser language options have no default, so they show once **Show unused
optional configuration options** is on.

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

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Byparr when it stops answering, not only when it exits. The image asks
for Byparr's API documentation at `/docs` every 30 seconds, which needs neither
the browser nor the internet, and three failures in a row count as a hang. It is
off by default.

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

| Path          | Access     | Holds                                          |
| ------------- | ---------- | ---------------------------------------------- |
| `/data/geoip` | read/write | The GeoIP database the browser downloaded last |

That database is the only thing kept. Byparr has no settings and no database of
its own, so no other directory is mapped.

Home Assistant creates a new container every time an application starts, so the
database lives in `/data` rather than beside the browser. Kept there, a restart,
an update or a reboot does not download it again.

The browser also writes a fresh profile for every request and deletes it when
the request finishes. It goes to `/tmp`, which Home Assistant keeps in memory
for this application rather than on disk, so those writes cost no wear on an SD
card or eMMC.

## Backups

There is nothing worth backing up. The GeoIP database is excluded, since it is a
public download that comes back on the first request after a restore, and
nothing else is stored.

## Checking it works

Prowlarr tests the connection each time you save the proxy, and reports an
address it cannot reach. That is the quickest check, and it needs no port.

To check the browser as well, ask Byparr for its health response. The Terminal &
SSH application runs on the same network as Prowlarr, so from there the internal
name works with the port closed:

```shell
curl http://2dd33fbd-byparr:8191/health
```

With the port open, the address a Prowlarr elsewhere would use works too, such
as `http://192.168.1.10:8191/health`. Either way, the answer is:

```json
{ "msg": "Byparr is working!", "version": "...", "userAgent": "..." }
```

That request starts the browser and loads `https://google.com`, so it takes a
few seconds. If it answers and Prowlarr still cannot connect, the address in
Prowlarr is wrong rather than Byparr being down.

Byparr has no interface beyond its API documentation, which an open port serves
at `http://192.168.1.10:8191/docs`.

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

Many applications here start from a Home Assistant base image, which supplies
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
