# Home Assistant Application: Traefik

[Traefik](https://traefik.io/traefik/) is a reverse proxy. Every request that
reaches it is sent on to the application its host name belongs to, so
`sonarr.home.local` can reach Sonarr and `auth.home.local` Authentik, both
through the one address.

Simple routes are set in the Configuration tab. Anything more, such as putting
Authentik in front of an application, goes in Traefik's own configuration files,
which this application reads alongside them.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Traefik" application.
3. Add a route for each application in its Configuration tab. See Routes below.
4. Start it.
5. Point each host name at Home Assistant's address, for example with the Avahi
   Publisher application for `.local` names, or in your router's DNS.

## Configuration

| Option           | What it sets                                                                  |
| ---------------- | ----------------------------------------------------------------------------- |
| Routes           | The host names Traefik answers for, and where each one's requests go          |
| SSL              | Whether every route is also served over HTTPS, with the certificate below     |
| Certificate file | The certificate in Home Assistant's `/ssl` folder. `fullchain.pem` by default |
| Private key file | The certificate's private key, in the same folder. `privkey.pem` by default   |
| Log level        | How much detail Traefik writes to its log                                     |

### Routes

Each route sends the requests for one host name somewhere else.

- **Host name** is the name the browser asks for, such as `sonarr.home.local`,
  with no `http://` and no port. A request is matched whatever port it arrived
  on.
- **Forward to** is where its requests go. Another application is reached by its
  hostname inside Home Assistant, which is the repository's eight characters, a
  dash and the application's slug: `http://2dd33fbd-sonarr:8989`. A device on
  your network is reached by its address, such as `http://192.168.1.20:8080`.
- **Middlewares** are optional. Each one names a middleware defined in a file in
  this application's configuration folder, and they apply in order. See
  Configuration files below.

A request for a host name with no route gets a `404`. Two routes for the same
host name compete for the same requests, so only the first is used, and the log
says so.

Traefik passes the host name on exactly as the browser sent it, port included,
along with `X-Forwarded-Host`, `X-Forwarded-Port` and `X-Forwarded-Proto`. An
application that builds its own addresses, as Authentik does, gets them right
even when Traefik is on a port other than 80.

### Configuration files

Traefik reads every `.yml`, `.yaml` and `.toml` file in this application's
configuration folder: `addon_configs/<repository>_traefik` on the host, which
the Samba and Studio Code Server applications can reach. Changes to them apply
without a restart, and a mistake in one is reported in the log.

`generated.yml` is the one exception. The application writes it from the
Configuration tab every time it starts, so anything changed in it is lost. Put
your own configuration in a file of its own.

A file can define anything Traefik's
[file provider](https://doc.traefik.io/traefik/reference/install-configuration/providers/others/file/)
accepts: middlewares, routers with rules beyond a host name, or services with
several servers. Routers and services defined there are complete on their own,
and the Configuration tab's routes can use middlewares defined there by name.

For example, `authentik.yml` holding this middleware lets a route put Authentik
in front of its application, once **Middlewares** lists `authentik`:

```yaml
http:
  middlewares:
    authentik:
      forwardAuth:
        address: http://2dd33fbd-authentik:9000/outpost.goauthentik.io/auth/traefik
        trustForwardHeader: true
        authResponseHeaders:
          - X-authentik-username
          - X-authentik-groups
          - X-authentik-email
          - X-authentik-name
          - X-authentik-uid
```

It is taken from
[Authentik's Traefik guide](https://docs.goauthentik.io/add-secure-apps/providers/proxy/server_traefik/),
which also covers the provider to create in Authentik and the extra route its
single-application mode needs.

## HTTPS

Turning on **SSL** serves every route over HTTPS on port 443 as well as over
HTTP on port 80. The certificate comes from Home Assistant's `/ssl` folder,
where the Let's Encrypt and DuckDNS applications put theirs, and is used for
every host name. Plain HTTP keeps working, so `.local` names, which no public
certificate covers, can go on using it.

The application refuses to start while SSL is on and either file is missing, and
the log names the one it looked for.

Files in the configuration folder can use other certificates from `/ssl` as
well, through Traefik's
[TLS configuration](https://doc.traefik.io/traefik/reference/routing-configuration/http/tls/tls-certificates/).

## The dashboard

Traefik's dashboard opens from the Home Assistant sidebar and shows every
router, service and middleware, with any errors in them. It is read-only.

It is only reachable through Home Assistant, which puts its own login in front.
Neither port 80 nor port 443 serves it.

## Ports

| Port  | Serves                                 |
| ----- | -------------------------------------- |
| `80`  | Every route over HTTP                  |
| `443` | Every route over HTTPS, when SSL is on |

Nginx Proxy Manager uses the same two ports by default, so only one of them can
have each. Change or clear a port in the Network section of this application's
Configuration tab; a cleared port is not opened at all.

## Headers

Every entrypoint drops request headers whose names use anything other than
letters, digits and dashes, such as `X_Auth_User`. Python, PHP and nginx
backends read that name as `X-Auth-User`, so a client could otherwise pass off a
header of its own as one set by a forward-auth middleware.

## Storage

| Path      | Access     | Holds                                            |
| --------- | ---------- | ------------------------------------------------ |
| `/config` | read/write | `generated.yml` and your own configuration files |
| `/ssl`    | read-only  | The certificates served over HTTPS               |

Nothing else is mapped. Traefik keeps no other state.

## Backups

Backups are taken while Traefik runs. It keeps nothing but the configuration
files, so there is no database to catch mid-write.

## Updates

Updates arrive by updating this application. Traefik's version is pinned, so a
new one arrives as a release of this application rather than silently.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Traefik itself rather than this packaging, see its
[documentation](https://doc.traefik.io/traefik/) or its
[repository](https://github.com/traefik/traefik).

## Credits

This packaging is new rather than a port, and its shape follows the other
applications in this repository.
[alex3305/home-assistant-addons](https://github.com/alex3305/home-assistant-addons)
packaged Traefik for Home Assistant before it, and has since been archived.

Traefik is developed by [Traefik Labs](https://traefik.io/) and is licensed
under the MIT License. The icon and logo are Traefik's own.
