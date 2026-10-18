# Home Assistant Application: Configarr

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Configarr" application.
3. Start it once. It writes an example configuration and tells you it has
   nothing to sync.
4. Edit that configuration, put your API keys beside it, then restart. Both
   files are in `app_configs/2dd33fbd_configarr` on the host, which the Samba
   share and Studio Code Server applications can reach.

### Profilarr is in this store too

[Profilarr](https://github.com/kanso-labs/home-assistant-applications/tree/main/profilarr)
manages the same quality profiles and custom formats in Sonarr and Radarr, and
this repository ships it as an application of its own. **Pick one for each
instance.** Pointed at the same Sonarr or Radarr, each overwrites the other's
changes on every sync, and whichever synced last wins.

## There is no web interface

Configarr is a job rather than a service. It has no user interface, exposes no
ports, and does not appear in the sidebar. Everything it does shows up in its
log and in the applications it writes to.

Upstream runs it from cron or a Kubernetes CronJob, once per run. Home Assistant
has no scheduler for applications, so this one syncs when it starts and then
again every `sync_interval` hours. Restarting it is how you sync straight away.

## Configuration

### Options

| Option          | Default | What it does                                                       |
| --------------- | ------- | ------------------------------------------------------------------ |
| `dry_run`       | `false` | Report what a sync would change and write nothing.                 |
| `log_level`     | `info`  | How much Configarr writes to its log.                              |
| `sync_interval` | `24`    | Hours between syncs. The first one runs as the application starts. |

Turn `dry_run` on before a large change. Configarr rewrites quality profiles and
custom formats in place, and a dry run is the only way to see what that comes to
before it happens.

### The configuration file

Everything else lives in `/config/config.yml`, because Configarr's configuration
describes several applications at once and does not reduce to a handful of
fields. On first start an example is written there, and it is left alone from
then on.

What gets seeded defines no instance, so the first sync clones the guides,
reports that nothing is defined, and changes nothing. Uncomment the block for
each application Configarr should manage and fill it in:

```yaml
sonarr:
  series:
    base_url: http://2dd33fbd-sonarr:8989
    api_key: !secret SONARR_API_KEY
    include:
      - template: sonarr-quality-definition-series
      - template: sonarr-v4-quality-profile-web-1080p
      - template: sonarr-v4-custom-formats-web-1080p
```

`base_url` is where Configarr finds that application. On the same Home
Assistant, that is its hostname on the internal network rather than `localhost`:
`http://2dd33fbd-sonarr:8989` for Sonarr and `http://2dd33fbd-radarr:7878` for
Radarr. A Sonarr or Radarr running anywhere else keeps the address you already
use for it.

`2dd33fbd` is Home Assistant's name for this repository when it was added by the
address in the README. A Sonarr or Radarr installed any other way has another
prefix, shown as **Hostname** on its **Info** tab.

API keys go in `/config/secrets.yml` and are referenced with `!secret`, which
keeps them out of the file you would paste into an issue:

```yaml
SONARR_API_KEY: 0123456789abcdef0123456789abcdef
```

Each arr application prints its own key under Settings, then General.

The reference for every key is
[the Configarr documentation](https://configarr.de/docs/configuration/config-file).

### Reading a run

The log ends with an Execution Summary, counting successes, failures and skips
per application:

```text
Execution Summary (success/failure/skipped) instances: SONARR: (1/0/0) - RADARR: (0/1/0)
```

A failure there is per instance. An application that is unreachable does not
stop the others from syncing and does not stop the schedule, so the summary,
rather than whether the run completed, is what says the sync worked.

## Storage

| Path          | Access     | Holds                                              |
| ------------- | ---------- | -------------------------------------------------- |
| `/config`     | read/write | `config.yml` and `secrets.yml`                     |
| `/data/repos` | read/write | Clones of TRaSH Guides and the Recyclarr templates |

`/config` is `app_configs/2dd33fbd_configarr` on the host, with the same prefix
as the hostnames above: if this repository was added by another address, it is
the part before the dash in the **Hostname** on this application's **Info** tab.
The Samba share application has it inside its `app_configs` share, and Studio
Code Server under `/addon_configs`, the older name of `app_configs`.

Nothing else is mapped. Configarr reaches every application it manages over that
application's API, so it needs neither `/media` nor `/share`, unlike the arr
applications themselves.

The clones under `/data/repos` are a cache, around 10MB. Configarr refreshes
them at the start of every sync and clones them again from nothing if they are
missing, so losing them costs one slower run.

## Backups

Backups are taken hot, unlike most applications here, so Configarr keeps running
while one is taken. It stores no database — `/config` holds two text files — and
a sync interrupted mid-run changes nothing that the next one will not redo.

## Updates

Version bumps arrive as pull requests against this repository and reach you as
an application update once released. Configarr ships no updater of its own.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Configarr itself rather than this packaging, see
[configarr.de](https://configarr.de) and
[its issue tracker](https://github.com/raydak-labs/configarr/issues).

## Credits

Nobody had packaged Configarr for Home Assistant, so this is built from the
project's own release rather than ported from existing packaging. The icon and
logo are the project's own mark, from
[its documentation site](https://github.com/raydak-labs/configarr/tree/main/docs/static/img).

Configarr itself is developed by [Raydak Labs](https://github.com/raydak-labs)
and is licensed under AGPL-3.0. The executable is the project's own official
release.

What it syncs comes from two projects it is not part of:
[TRaSH Guides](https://trash-guides.info), licensed CC BY-NC-SA 4.0, and the
[Recyclarr configuration templates](https://github.com/recyclarr/config-templates),
licensed MIT.
