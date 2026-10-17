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

Radarr, Sonarr and Bazarr reach it the same way if they talk to indexers
directly.

Ingress will not do for this. It serves through Home Assistant's authenticated
proxy, which Prowlarr cannot sign in to.

To run it alongside Byparr, which answers the same requests, see Byparr's
documentation.

## Configuration

### `log_level`

How much FlareSolverr writes to the log. Raise it to `debug` when a challenge is
failing and you want to see what the browser did.

## Storage

None. FlareSolverr keeps no configuration and no database, so no directory is
mapped and nothing survives a restart. There is nothing to back up.

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

A health check also asks FlareSolverr's `/health` every 30 seconds. That is what
lets the **Watchdog** switch on the application's Info tab restart a
FlareSolverr that has stopped answering, rather than only one that has crashed.
FlareSolverr works on four requests at a time and a check waits behind them, so
it takes about five minutes without an answer to count as a failure.

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

Most applications here start from a Home Assistant base image, which supplies
s6-overlay and bashio. FlareSolverr starts from the image its own project
publishes instead.

Upstream releases a linux x64 tarball and nothing else, so there is no asset to
install on aarch64. Their own image is built for amd64 and arm64 together, which
makes it the only route to both architectures. s6-overlay and bashio are
installed on top, and the service layout is unchanged.

The service also drops back to the unprivileged user the upstream image defines.
Chromium refuses to run as root, and s6-overlay has to be pid 1, so the two are
reconciled by starting as root and stepping down before the application runs.
