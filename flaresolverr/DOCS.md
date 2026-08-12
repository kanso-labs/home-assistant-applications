# Home Assistant Application: FlareSolverr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "FlareSolverr" application.
3. Start it. There is nothing to configure first.
4. Point Prowlarr at it, as described below.

## Connecting Prowlarr

FlareSolverr has no interface of its own. It answers requests on port 8191 and
is driven entirely by the application in front of it.

In Prowlarr, go to **Settings → Indexers → Add Indexer Proxy → FlareSolverr**
and set the host to:

```
http://<your-home-assistant-host>:8191
```

Give the proxy a tag, then apply that same tag to each indexer that needs it.
Only tagged indexers are routed through FlareSolverr.

Radarr, Sonarr and Bazarr reach it the same way if they talk to indexers
directly.

## Configuration

### `log_level`

How much FlareSolverr writes to the log. Raise it to `debug` when a challenge is
failing and you want to see what the browser did.

## Storage

None. FlareSolverr keeps no configuration and no database, so no directory is
mapped and nothing survives a restart. There is nothing to back up.

## Checking it works

Opening `http://<host>:8191` in a browser returns a short JSON message rather
than a page. That is the health response, and seeing it means the service is up.

## Updating

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

## Credits

The packaging is adapted from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
is MIT licensed.

FlareSolverr itself is
[a separate project](https://github.com/FlareSolverr/FlareSolverr) and is
licensed under the MIT licence.

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
