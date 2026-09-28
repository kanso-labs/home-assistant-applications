# Home Assistant Application: Scrutiny

[Scrutiny](https://github.com/AnalogJ/scrutiny) watches the health of your
disks. It reads their S.M.A.R.T. data with smartctl, keeps the history in its
own InfluxDB, and flags a disk as failing using thresholds drawn from real-world
drive statistics.

## Installation

1. Add this repository to your Home Assistant instance.
2. Install the "Scrutiny" application.
3. Start it. It reads the disks it can reach straight away.
4. Open the web interface on port `8080`.

## Which disks it can see

Scrutiny runs with Home Assistant's protection mode on, so it reads only the
disks Home Assistant grants it:

- **SATA and USB disks**, `/dev/sda` to `/dev/sdz`, apart from the disk Home
  Assistant runs from.
- **NVMe drives**, `/dev/nvme0` to `/dev/nvme7`, read through their controller
  device. Home Assistant grants that for every NVMe drive, including one it runs
  from.

**The disk Home Assistant runs from is withheld when it is SATA or USB.** Home
Assistant never grants it to an application whose protection mode is on, so
Scrutiny reports on every other disk but not that one. SD cards and eMMC have no
S.M.A.R.T. data to read.

Some USB enclosures only pass S.M.A.R.T. data through when smartctl is told
their device type. If a USB disk appears without data, set its type in
`collector.yaml`, as described below.

## Configuration

### `collector_schedule`

When to read the disks again, as a cron expression: minute, hour, day of the
month, month and day of the week. The default, `0 0 * * *`, reads them every day
at midnight, in your Home Assistant's time zone. `0 */6 * * *` reads them every
six hours.

The disks are also read each time Scrutiny starts.

## Notifications and other settings

Scrutiny's own settings live in two optional files in this application's
configuration folder, `addon_configs/2dd33fbd_scrutiny` when the repository was
added by the address in the README:

- **`scrutiny.yaml`** sets notifications, such as email, Discord or ntfy, under
  `notify.urls`. Start from upstream's
  [example](https://github.com/AnalogJ/scrutiny/blob/master/example.scrutiny.yaml).
- **`collector.yaml`** sets which disks to read and their device types. Start
  from upstream's
  [example](https://github.com/AnalogJ/scrutiny/blob/master/example.collector.yaml).

Neither file exists until you create it. Restart the application after editing
either one.

## Ports

| Port   | Serves                               |
| ------ | ------------------------------------ |
| `8080` | The web interface and Scrutiny's API |

Two applications cannot publish the same port, and Home Assistant reports the
conflict only when the second one starts. If `8080` is already taken, for
example by this repository's qBittorrent, change Scrutiny's port under its
**Network** settings.

InfluxDB listens inside the application alone, and no port is published for it.

## Storage

| Path                | Holds                                             |
| ------------------- | ------------------------------------------------- |
| `/data/influxdb`    | The S.M.A.R.T. history                            |
| `/data/scrutiny.db` | The disks Scrutiny knows, and its settings        |
| `/config`           | The optional `scrutiny.yaml` and `collector.yaml` |

## Backups

Backups are taken cold, so Home Assistant stops Scrutiny for the duration.
Copying InfluxDB and SQLite while they are being written to can produce a backup
that will not restore.

## Updates

Version bumps arrive as pull requests against the repository and reach you as an
application update once released.

## Why this starts at 0.1.0

Most applications in this repository start at `1.0.0`. This one does not,
because it has only been run where there was no disk with S.M.A.R.T. data to
read, and has not yet read a real disk on a real instance.

It moves to `1.0.0` once it has done that without surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

For questions about Scrutiny itself rather than this packaging, see
[its own repository](https://github.com/AnalogJ/scrutiny).

## Credits

This packaging is new, and starts from the image Scrutiny publishes, as the
FlareSolverr application here does.
[alexbelgium/hassio-addons](https://github.com/alexbelgium/hassio-addons)
packages Scrutiny too, and its device list showed which device names to grant.

Scrutiny is developed by [Jason Kulatunga](https://github.com/AnalogJ) and is
licensed under the MIT License. The icon is Scrutiny's own, and the logo is
built from it.
