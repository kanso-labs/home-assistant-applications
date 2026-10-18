# Home Assistant Application: Seadexerr

[Seadexerr](https://github.com/Ryder-C/seadexerr) is an indexer for Prowlarr
that offers one thing: the release [SeaDex](https://releases.moe/) picks as the
best for each anime. Sonarr and Radarr search it like any other indexer, and a
custom format lets them prefer what it finds.

## Why it is built on your Home Assistant

Seadexerr carries no licence, so nobody has been given the right to pass it on,
and this repository publishes no image of it. Your Home Assistant builds the
application itself when it is installed or updated, taking Seadexerr from the
image its author publishes.

That makes installing and updating take a little longer than for other
applications, and it needs internet access at the time.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Seadexerr" application. Home Assistant builds it first.
3. In its Configuration tab, set the Sonarr API key, the Radarr API key, or
   both.
4. Start it.
5. Add it to Prowlarr, and teach Sonarr and Radarr to prefer it. See below.

## Configuration

| Option             | What it sets                                                 |
| ------------------ | ------------------------------------------------------------ |
| Sonarr address     | Where Sonarr is reached. This repository's Sonarr by default |
| Sonarr API key     | Sonarr's API key. Leave it empty to leave series out         |
| Radarr address     | Where Radarr is reached. This repository's Radarr by default |
| Radarr API key     | Radarr's API key. Leave it empty to leave movies out         |
| AnimeBytes passkey | Optional. Also offers the AnimeBytes releases SeaDex lists   |
| Log level          | How much detail Seadexerr writes to its log                  |

Seadexerr looks each title up in Sonarr or Radarr, so it needs at least one of
the two API keys, and the application refuses to start without either. Both keys
are under General in each one's Settings.

The default addresses reach this repository's Sonarr and Radarr applications
through their hostnames inside Home Assistant. An address with a base path, such
as `http://192.168.1.20:8989/sonarr`, works as well.

Turn on **Watchdog** on the application's Info tab to have Home Assistant
restart Seadexerr when it stops answering, not only when it exits. The image
asks Seadexerr's `/health` every 30 seconds, which it answers without contacting
Sonarr, Radarr or SeaDex, so one of them being down never counts against it. It
is off by default.

## Prowlarr

Add Seadexerr as a **Generic Torznab** indexer, named `Seadexerr`, with the URL
`http://2dd33fbd-seadexerr:2071`. That is its hostname inside Home Assistant,
which the Prowlarr application reaches with no port opened. `2dd33fbd` is Home
Assistant's name for this repository when it was added by the address in the
README. If it was added by another address, Seadexerr has another prefix, shown
as **Hostname** on its **Info** tab.

## Sonarr and Radarr

Seadexerr marks every release it offers with four indexer flags, `Freeleech25`,
`DoubleUpload`, `Internal` and `Scene`, which is how Sonarr and Radarr can tell
its releases apart. Releases from other indexers almost never carry all four:

1. In **Settings → Custom Formats**, add one named `Seadex`, with four **Indexer
   Flag** conditions, one for each of those flags, and **Required** checked on
   all four.
2. In **Settings → Profiles**, give that format a high score in the profiles
   your anime use, such as `5000`.

A format matching `Freeleech25` alone, as Seadexerr before 3.2 had you set up,
also scores any other indexer's 25% freeleech release, so add the other three to
one made that way.

## Scoring

When SeaDex lists several releases for one entry, Seadexerr offers the one you
would prefer, which is the best release unless told otherwise. To change what
wins, put a `scoring.toml` in this application's configuration folder:
`app_configs/2dd33fbd_seadexerr` on the host, which the Samba share application
has inside its `app_configs` share and Studio Code Server under
`/addon_configs`, the older name of `app_configs`.

Seadexerr's
[`example_scoring.toml`](https://github.com/Ryder-C/seadexerr/blob/main/example_scoring.toml)
describes every setting. It is read when the application starts, so restart it
after a change. A file it cannot read stops the application, and the log names
the file.

## Ports

| Port   | Serves                                              |
| ------ | --------------------------------------------------- |
| `2071` | Seadexerr's feed. Not opened on the host by default |

Only a Prowlarr outside Home Assistant needs the port opened, which the Network
section of the Configuration tab does. The feed has no login, and with an
AnimeBytes passkey set, its download links carry that passkey, so open it only
on a network you trust.

## Storage

| Path      | Access     | Holds                                                  |
| --------- | ---------- | ------------------------------------------------------ |
| `/config` | read-only  | `scoring.toml`, if you add one                         |
| `/data`   | read/write | Seadexerr's copy of the anime mappings, and its caches |

## Backups

Backups are taken while Seadexerr runs. It keeps no database, only caches it can
fetch again.

## Updates

Updates arrive by updating this application, which builds it again on your Home
Assistant. Seadexerr's version is pinned, so a new one arrives as a release of
this application rather than silently.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Seadexerr itself rather than this packaging, see its
[repository](https://github.com/Ryder-C/seadexerr).

## Credits

Seadexerr is developed by [Ryder-C](https://github.com/Ryder-C), and has no
licence. None of it is in this repository or its images: your Home Assistant
takes it from its author's own image. It uses the
[AniBridge mappings](https://github.com/anibridge/anibridge-mappings), and the
releases it offers are chosen by [SeaDex](https://releases.moe/).

The icon and logo are this repository's own.
