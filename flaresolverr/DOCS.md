# Home Assistant Application: FlareSolverr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "FlareSolverr" application.
3. Start it. There is nothing to configure first.
4. Point Prowlarr at it, as described below.

**FlareSolverr's port is closed by default.** A Prowlarr on the same Home
Assistant reaches FlareSolverr by its internal name and needs no port. Open the
port only for a Prowlarr on another machine, as Connecting Prowlarr below
describes.

## Connecting Prowlarr

In Prowlarr, go to **Settings → Indexers → Add Indexer Proxy → FlareSolverr**
and set the host to the address Prowlarr can reach FlareSolverr on:

- **A Prowlarr on the same Home Assistant**, such as this repository's Prowlarr
  application, reaches FlareSolverr by its internal name, with no port opened:

  ```
  http://2dd33fbd-flaresolverr:8191
  ```

  `2dd33fbd` is Home Assistant's name for this repository when it was added by
  the address in the README. The name only resolves while FlareSolverr is
  running.

- **A Prowlarr anywhere else** needs FlareSolverr's port opened first. In
  FlareSolverr's **Configuration** tab, under **Network**, set the port to
  `8191`, then use your Home Assistant machine's address:

  ```
  http://192.168.1.10:8191
  ```

**Open the port only on a network you trust.** FlareSolverr has no login, and it
fetches whatever page it is asked for from inside Home Assistant's network.
Anyone who can reach the port can therefore have it fetch the applications there
that open no port of their own, such as Seadexerr's feed with the AnimeBytes
passkey in its links, and read back what they answer.

**Set up while the port was open by default?** FlareSolverr used to publish 8191
on the Home Assistant machine. An update closes it unless you had set the port
yourself under **Network**, so a proxy in Prowlarr pointing at
`http://192.168.1.10:8191` stops connecting. From a Prowlarr on the same Home
Assistant, change its host to `http://2dd33fbd-flaresolverr:8191`. From one
anywhere else, open the port again as above.

**Replace the address Prowlarr suggests.** It defaults to
`http://localhost:8191/`, which cannot work here. Every application runs in its
own container, so `localhost` means Prowlarr itself rather than FlareSolverr.
The symptom is a proxy that refuses to connect while FlareSolverr sits there
running perfectly.

**Do not add `/v1` to the end.** Prowlarr appends it, and a host that already
ends in `/v1` becomes `/v1/v1` and fails.

Give the proxy a tag, then apply that same tag to each indexer that needs it.
Only tagged indexers are routed through FlareSolverr.

**If indexers behind Cloudflare keep failing** on a network with IPv6, turn on
`ipv4_only` in this repository's
[Prowlarr application](https://github.com/kanso-labs/home-assistant-applications/tree/main/prowlarr),
since Cloudflare has been seen to challenge Prowlarr's own request again over
IPv6, even with the cookies FlareSolverr had just earned.

Radarr, Sonarr and Bazarr reach it the same way if they talk to indexers
directly.

Ingress will not do for this. It serves through Home Assistant's authenticated
proxy, which Prowlarr cannot sign in to.

To run it alongside Byparr, which answers the same requests, see Byparr's
documentation.

## Configuration

Only **Log level** shows on the Configuration tab at first. The proxy and
browser language options have no default, so they show once **Show unused
optional configuration options** is on.

### `log_level`

How much FlareSolverr writes to the log. Raise it to `debug` when a challenge is
failing and you want to see what the browser did.

### `proxy_server`, `proxy_username` and `proxy_password`

A proxy for the browser to send every request through, written as
`protocol://host:port`, such as `http://proxy.local:3128` or
`socks5://proxy.local:1080`. The user name and password are only needed when the
proxy asks for them, and Chrome cannot sign in to a SOCKS proxy with them. Give
the port even when it is the protocol's usual one, and set both the user name
and the password or neither: FlareSolverr fails every request on a signed-in
proxy with no port, and sends the word `None` for whichever of the two is
missing.

Challenges pass more often from an address the site trusts. A proxy FlareSolverr
cannot reach makes every request fail, rather than going out directly.

**A proxy set in Prowlarr comes first.** When Prowlarr has a proxy of its own,
under **Settings → General**, it sends it along with each request, and
FlareSolverr uses that one in place of this one.

**FlareSolverr writes the proxy to its log.** At the `info` level it logs every
request it receives, and the proxy is part of the request, user name and
password included. Set `log_level` to `warning` to keep them out of the log,
which also leaves out the lines about each request and its challenge. The line
this application logs at start says only that a proxy is in use.

### `browser_locale`

The language the browser presents to websites, as a tag such as `en-US` or
`pt-BR`. Chrome sends it in the `Accept-Language` header of every request, as
`en-GB,en;q=0.9` for `en-GB`.

Left empty, the browser presents the setting FlareSolverr's image carries,
`C.UTF-8`, which names no language at all. Websites then see
`C.UTF-8,C.UTF;q=0.9`.

### Watchdog

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart FlareSolverr when it stops answering, not only when it exits. The image
asks FlareSolverr's `/health` every 30 seconds and allows about five minutes
without an answer before counting it as a hang, since a check waits its turn
behind the four requests FlareSolverr works on at a time. It is off by default.

## Storage

None. FlareSolverr keeps no configuration and no database, so no directory is
mapped and nothing survives a restart. There is nothing to back up.

The browser writes a fresh profile to `/tmp` for every request. Home Assistant
keeps `/tmp` in memory for this application rather than on disk, so those writes
cost no wear on an SD card or eMMC.

## Backups

There is nothing to back up. FlareSolverr keeps no state, so no `backup` mode is
declared and a backup of this application is empty by design.

## Checking it works

FlareSolverr has no interface. Opening it from Home Assistant shows a short JSON
message rather than a page:

```json
{ "msg": "FlareSolverr is ready!", "version": "...", "userAgent": "..." }
```

Seeing it means the service is up. The same response comes back from the address
Prowlarr uses, which is the quicker way to tell a connection problem from an
application problem. The Terminal & SSH application runs on the same network as
Prowlarr, so from there the internal name works with the port closed:

```shell
curl http://2dd33fbd-flaresolverr:8191
```

With the port open, `http://192.168.1.10:8191` answers the same way. If either
answers and Prowlarr still cannot connect, the address in Prowlarr is wrong
rather than FlareSolverr being down.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about FlareSolverr itself rather than this packaging, see
[its own repository](https://github.com/FlareSolverr/FlareSolverr).

## Credits

The packaging is adapted from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
is MIT licensed.

FlareSolverr itself is
[a separate project](https://github.com/FlareSolverr/FlareSolverr) and is
licensed under the MIT licence. The icon is FlareSolverr's own, and the logo is
built from it.

## A note on the base image

Many applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. FlareSolverr starts from the image its own project
publishes instead.

Upstream releases a linux x64 tarball and nothing else, so there is no asset to
install on aarch64. Their own image is built for amd64 and arm64 together, which
makes it the only route to both architectures. s6-overlay and bashio are
installed on top, and the service layout is unchanged.

The service also drops back to the unprivileged user the upstream image defines.
Chromium refuses to run as root, and s6-overlay has to be pid 1, so the two are
reconciled by starting as root and stepping down before the application runs.
