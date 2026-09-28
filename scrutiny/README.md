# Home Assistant Application: Scrutiny

Watches the health of your disks through S.M.A.R.T. and keeps its history, with
failure thresholds drawn from real-world drive statistics.

Scrutiny reads each disk on a schedule, stores the results in its own InfluxDB,
and flags a disk that is likely to fail.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

See [DOCS.md](./DOCS.md) for installation and usage.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
