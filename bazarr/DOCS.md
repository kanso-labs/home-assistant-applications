# Home Assistant Application: Bazarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Bazarr" application.
3. Start it, then select **Open Web UI**, or open port 6767.

### First login

Bazarr itself starts with no authentication, and port 6767 is published on your
network, where anyone who can reach it would have the whole interface, including
the provider passwords and the Sonarr and Radarr API keys it stores. So on its
first start this application turns on Bazarr's form login and writes the
generated password to the log:

```
Web interface username: admin
Web interface password: <password>
```

Read it from the log and sign in. Change the username and password under
**Settings → Application → General → Security**. Anything that talks to Bazarr
through its API key keeps working.

The login is seeded only when there is no configuration yet, so an install from
before keeps whatever it had. If that is no login, set **Authentication** there
to **Form** and choose a username and password.

### Bazarr+ is in this store too

[Bazarr+](https://github.com/kanso-labs/home-assistant-applications/tree/main/bazarr-plus)
is a fork of Bazarr, and this repository ships it as an application of its own.
**Pick one.** Both write subtitle files next to your media, so running them over
the same library means two applications editing the same files with different
settings, and whichever ran last wins.

They also publish the same port, 6767. Two applications cannot publish one port,
and Home Assistant reports the conflict only when the second one starts. If
Bazarr+ or anything else already has it, change the port Bazarr is published on
under its **Network** settings. Nothing inside the container moves — only the
port the host answers on.

## Configuration

Bazarr has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Point it at Radarr and Sonarr under Settings, then choose the subtitle languages
and providers you want. Bazarr reaches them over Home Assistant's internal
network by hostname, not at `localhost`: the Radarr and Sonarr in this
repository are `2dd33fbd-radarr` on port 7878 and `2dd33fbd-sonarr` on
port 8989. `2dd33fbd` is Home Assistant's name for this repository when it was
added by the address in the README. A Radarr or Sonarr from another repository
has another prefix, shown as **Hostname** on that application's **Info** page.

Bazarr sends anonymous usage information to Google Analytics while **Settings →
Application → General → Analytics → Enable** is on: the providers it uses, the
languages it searches for, and the versions of Bazarr, Python, Sonarr, Radarr
and the operating system. Bazarr turns it on by default, and this application
turns it off in a new install. An install from before keeps whatever it had, so
turn it off there if you would rather not send it.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Bazarr when it stops answering, not only when it exits. The image asks
for Bazarr's `/api/system/ping` every 30 seconds, through nginx so that both are
checked, and five failures in a row count as a hang. It is off by default.

## Ingress

Bazarr is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls Bazarr's API, such as the webhooks Sonarr and Radarr can
send it, which need no change.

Both reach Bazarr through nginx. Ingress puts Bazarr under a path of
Supervisor's choosing, `/api/hassio_ingress/<token>`, and Bazarr writes one URL
base into every page it serves, so the application makes that path the URL base
and moves Bazarr itself to port 16767. nginx answers on 6767, puts the path back
onto whatever arrives without it, and takes it back out of everything it returns
to the published port.

Five things follow from that:

- **Bazarr asks for its own login inside ingress too.** Home Assistant's sign-in
  tells Bazarr nothing, so the login under First login applies there as well.
- **The published port shows Bazarr's own addresses**, with no path, as it did
  before ingress, and its API and webhooks answer at the root. A page opened
  there under the path, such as a link copied out of ingress, is sent to the
  same page without it.
- **Base URL and Port under Settings → Application → General are set by the
  application.** The base is written into `config.yaml` on every start, and the
  port Bazarr listens on is passed to it on the command line, which wins over
  the one saved. On the published port the base shows as `/`. Leave it alone:
  one saved there is written over at the application's next start, but a restart
  from inside Bazarr would put it into effect first and break both routes.
  Restoring a backup under **System → Backups** restarts Bazarr that way, with
  the base the backup was taken with, so restart the application after one.
- **A Base URL saved before ingress, such as `/bazarr`, is replaced**, and the
  log says so on the start that replaces it. Whatever called
  `http://<host>:6767/bazarr` has to call `http://<host>:6767` instead, and a
  reverse proxy that served Bazarr under such a path has to serve it at the root
  of a host name of its own.
- **Port 16767 answers on the internal network too**, because Bazarr listens on
  every address unless **Address** on the same page says otherwise. It is not
  published, and it serves the same Bazarr as 6767, under the ingress path.

## Storage

| Path      | Access     | Holds                                         |
| --------- | ---------- | --------------------------------------------- |
| `/config` | read/write | The Bazarr database, settings, cache and logs |
| `/media`  | read/write | Your library, where subtitles are written     |
| `/share`  | read/write | Shared storage, when your library lives there |

`/media` and `/share` are writable because Bazarr saves subtitle files next to
the media they belong to. Read-only mappings would let it search and find
subtitles it could never save.

## Backups

Backups are taken cold, so Home Assistant stops Bazarr for the duration. Bazarr
keeps its state in SQLite, and copying a database that is being written to can
produce a backup that will not restore. The application is briefly unavailable
while a backup runs.

The cache and the logs are left out of backups: Bazarr fills its cache again as
it searches, and a restore needs neither. The backups Bazarr takes itself, in
`/config/backup`, stay in.

## Updates

The image sets `UpdateMethod=docker` and starts Bazarr with `--no-update`, so
its own updater is disabled by design. Updates arrive by updating this
application instead.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Bazarr itself rather than this packaging, see the
[Bazarr wiki](https://wiki.bazarr.media).

## Credits

This packaging began as a port of the
[Home Assistant Community add-on](https://github.com/hassio-addons/addon-bazarr)
by Franck Nijhof, used under the MIT licence.

Bazarr itself is developed by the
[Bazarr team](https://github.com/morpheus65535/bazarr) and is licensed under
GPLv3.

The icon is Bazarr's own, from its web interface. The logo sets the same icon
beside Bazarr's name, in the purple Bazarr uses as its theme colour.
