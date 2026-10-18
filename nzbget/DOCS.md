# Home Assistant Application: NZBGet

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "NZBGet" application.
3. Start it, then select **Open Web UI**, or open port 6789.

## First login

NZBGet ships with the same web interface password as every other NZBGet
installation. This application replaces it on first start with a generated one
and writes it to the log:

```
Web interface username: nzbget
Web interface password: <password>
```

Read it from the log and sign in on NZBGet's own form, which opens in front of
the page. You can change the password under Settings, then Security. No
credentials are stored in this application's configuration.

## Configuration

NZBGet has no application options. Everything is configured from its own web
interface, and the settings live in the application's configuration directory so
they survive restarts and updates.

Add your news servers under Settings, then News-Servers. Until you do, the log
reports that no servers are configured, which is expected on a fresh install.

Five defaults are changed on first start, because NZBGet's own would be wrong
here:

| Setting           | Seeded value    | Why                                                                                   |
| ----------------- | --------------- | ------------------------------------------------------------------------------------- |
| `MainDir`         | `/share/nzbget` | NZBGet downloads into its install directory, which is replaced on every update        |
| `QueueDir`        | `/config/queue` | NZBGet keeps the queue under `MainDir`, outside this application's backups            |
| `ControlPassword` | generated       | The shipped password is identical on every NZBGet in the world                        |
| `WriteLog`        | `none`          | Home Assistant already captures the log, and NZBGet's own file is appended to forever |
| `FormAuth`        | `yes`           | NZBGet's sign-in form fits inside Home Assistant better than the browser's dialog     |

All five are written only when no configuration exists, so anything you change
afterwards is left alone. `QueueDir` is the one exception. An installation from
before it was seeded has its queue, history and statistics moved from
`/share/nzbget/queue` into `/config/queue` once, on its first start after the
update, as long as `QueueDir` still reads upstream's `${MainDir}/queue`. A queue
directory you chose yourself stays where you put it.

Extensions from NZBGet's Extension Manager, under Settings, then Extension
Manager, are Python 3 scripts, and the image carries Python 3 for them. They
install into `/share/nzbget/scripts`, so they are not part of this application's
backup, but their settings are.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart NZBGet when it stops answering, not only when it exits. The image asks
NZBGet for its web interface every 30 seconds, and any answer passes, even one
asking for the password, so only five requests in a row that go unanswered count
as a hang. It is off by default.

## Ingress

NZBGet is served through Home Assistant's ingress, so it opens inside Home
Assistant and comes along wherever Home Assistant does, Home Assistant Cloud
included. Turn on **Show in sidebar** on the application's page to keep it a
click away. Ingress is authenticated by Home Assistant, which lets only
administrators in.

The published port keeps working alongside it, for the browser at home and for
everything that calls NZBGet's API: Sonarr, Radarr, Prowlarr and Home
Assistant's own NZBGet integration need no change.

NZBGet writes every address in its pages relative to the page, so ingress
reaches it on 6789 directly, with no proxy of this application's in between and
no URL base to set. Three things follow:

- **The page loads its scripts and styles one file at a time.** NZBGet normally
  fetches them in a single request that lists the files in its query,
  `combined.js?a.js+b.js`. Home Assistant re-encodes that query on its way
  through ingress into one NZBGet refuses, so the image switches the page to the
  list NZBGet uses in its own debug builds. The files are the same, each fetched
  on its own, and the port serves the same page.
- **NZBGet still asks for its own password inside ingress.** Home Assistant's
  sign-in tells NZBGet nothing. A new install shows NZBGet's form, as in First
  login. An installation from before ingress keeps the browser's own password
  dialog, because seeded settings are never rewritten; set **FormAuth** to `yes`
  under Settings, then Security, to have the form instead.
- **Only the way NZBGet asks changes with FormAuth, not what it accepts.** The
  password is checked the same way either way. Sonarr, Radarr, Prowlarr and the
  integration send theirs with every request, unasked, so they do not notice.
  NZBGet's System Health then warns that form credentials may be sent in
  plaintext while SecureControl is off. That is as true of the browser's dialog,
  which it does not flag, and through ingress both travel over Home Assistant's
  own connection, HTTPS whenever Home Assistant is.

To skip NZBGet's sign-in inside ingress, since Home Assistant has already asked
for one, add Supervisor's address to **AuthorizedIP** under Settings, then
Security, making it `127.0.0.1,172.30.32.2`. Supervisor sends every ingress
request from that address, while the published port's callers come from
elsewhere and still need the password. It is a choice to trust Home Assistant's
sign-in in place of NZBGet's, so it is left to you.

Phone apps such as nzb360 and LunaSea cannot use ingress, because it needs a
Home Assistant session in a browser. They still work on the published port.

## Storage

| Path      | Access     | Holds                                                   |
| --------- | ---------- | ------------------------------------------------------- |
| `/config` | read/write | The NZBGet configuration, queue, history and statistics |
| `/media`  | read/write | Your media library                                      |
| `/share`  | read/write | Downloads and extensions, under `nzbget`                |

Downloads still land in `/share` by default, and letting Radarr and Sonarr file
them into `/media` remains the tidier arrangement. `/media` is mapped so that a
category or post-processing script can also be pointed straight at a library
path when you want NZBGet to put files there itself.

## Backups

Backups are taken cold, so Home Assistant stops NZBGet for the duration. The
queue, history and statistics are in `/config` and come along in the
application's backup. NZBGet writes them continuously while it runs, and copying
them mid-write could produce a backup that restores into a broken queue.

The downloads themselves, finished or not, stay in `/share`, which the
application's backup does not include.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released. NZBGet's own updater is not used: the image
leaves it out and turns its update check off, because an update installed from
inside the container would be undone the next time it starts.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about NZBGet itself rather than this packaging, see the
[NZBGet documentation](https://nzbget.com/documentation/).

## Credits

The logo comes from
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons), which
also served as a reference for what a Home Assistant NZBGet needs. That
packaging is broader than this one, carrying CIFS mounts and elevated
privileges. This application asks for neither.

NZBGet itself is developed by [nzbgetcom](https://github.com/nzbgetcom/nzbget)
and is licensed under GPLv2 or later. The binary is the project's own official
release, and the icon is its favicon.
