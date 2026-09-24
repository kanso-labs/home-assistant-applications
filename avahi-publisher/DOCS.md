# Home Assistant Application: Avahi Publisher

Avahi Publisher announces extra names and services on your local network over
mDNS, the protocol behind `.local` names and Bonjour. It runs the official
[Avahi](https://avahi.org/) and has no web interface: everything comes from the
application's options.

It publishes two kinds of record, each of which can be switched off on its own:

- **Aliases** are extra `.local` names. Point `sonarr.local` at this Home
  Assistant host and Sonarr opens at `http://sonarr.local:8989`, or point
  `nas.local` at a device that does not publish its own name.
- **Services** are Bonjour (DNS-SD) announcements, so a file share, web page or
  printer shows up in Finder, Files, browsers and other apps that look for them.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Avahi Publisher" application.
3. Add your aliases and services on its **Configuration** tab.
4. Start it.

## Configuration

```yaml
publish_aliases: true
aliases:
  - name: sonarr
  - name: nas
    address: 192.168.0.10
publish_services: true
services:
  - name: Office NAS
    type: _smb._tcp
    port: 445
    host: nas
  - name: Sonarr
    type: _http._tcp
    port: 8989
```

### Option: `publish_aliases`

Publishes the aliases, and is on by default. Turn it off to take every alias
down at once without deleting any of them.

### Option: `aliases`

Each alias is an extra name:

- `name` is the name to publish. `sonarr` becomes `sonarr.local`, and a name
  that already ends in `.local` is used as it is.
- `address` is optional. Without it, the alias points at this Home Assistant
  host, which is how each application gets a name of its own. With it, the alias
  points at any IPv4 or IPv6 address.
- `enabled` is optional. Set it to `false` to switch one alias off and keep it
  in the list.

An alias is a name and nothing more, so the port stays part of the address:
`http://sonarr.local:8989`.

### Option: `publish_services`

Publishes the services, and is on by default. Turn it off to take every service
down at once without deleting any of them.

### Option: `services`

Each service announces something a device offers:

- `name` is what browsing apps show, such as `Office NAS`.
- `type` is the DNS-SD service type: `_smb._tcp` for file sharing, `_http._tcp`
  for a web page, `_ssh._tcp` for SSH, `_ipp._tcp` for a printer.
- `port` is the port the device offers it on.
- `host` is optional, and names the device offering it. Without it, the service
  is this Home Assistant host. A device that does not publish its own name needs
  an alias with an address as well, as `nas` does in the example.
- `txt` is optional, a list of `key=value` records such as `path=/admin` for a
  web page.
- `enabled` is optional. Set it to `false` to switch one service off and keep it
  in the list.

A service only helps a client find the device. The connection itself goes
straight to the device and never passes through this application.

### Option: `interfaces`

Optional. Avahi publishes on the interface the host reaches your network
through, which is right for almost every installation. Name one or more
interfaces here, separated by commas, when it is not: a host with both wired and
wireless networking, for example.

## How it shares the network with Home Assistant

The application runs on the host's network rather than behind a published port,
because mDNS is multicast on the local network and a published port cannot carry
it. There is nothing to configure under **Network** as a result.

Home Assistant already answers mDNS for this host's own name, and Avahi leaves
that name to it. It publishes only the aliases and services in the options, so
the two never compete for the same record. Two messages in the log come from
that arrangement and are expected:

- `No NSS support for mDNS detected` is about looking names up inside the
  container, which this application never does.
- `Detected another IPv4 mDNS stack running on this host`, if Avahi prints it,
  is Home Assistant's own responder.

Aliases that point at this host share its address. They are published without a
reverse record, so looking the address up still returns the host's own name
rather than whichever alias happened to be published last.

When another device on the network already uses a name, Avahi publishes under
the next free one instead, such as `sonarr-2.local` or `Office NAS #2`, and the
log says which. Rename the alias or service to take the choice back.

## Storage

Nothing is mapped. The options are kept by Supervisor, and Avahi's configuration
is written again from them every time the application starts.

## Backups

Backups are taken hot. There is no state to catch part way through a write,
since everything the application publishes comes from its options.

## Updates

Avahi comes from Alpine's package, and its version is pinned so that a new one
arrives as a release of this application rather than silently. Alpine currently
ships Avahi 0.9-rc4.

## Why this starts at 0.1.0

Every other application in this repository starts at `1.0.0`. This one does not,
because it has only been built and booted with test records, and has not yet run
on a Home Assistant host, where it shares mDNS with the host's own responder.

It moves to `1.0.0` once it has published aliases and services on a real
instance without surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Avahi itself rather than this packaging, see
[avahi.org](https://avahi.org/) or its
[repository](https://github.com/avahi/avahi).

## Credits

This packaging is new rather than a port. Its shape follows the other
applications in this repository.

Avahi is developed by the [Avahi project](https://github.com/avahi/avahi) and is
licensed under the LGPL-2.1.
