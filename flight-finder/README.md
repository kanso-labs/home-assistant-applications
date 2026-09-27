# Home Assistant Application: Flight Finder

Tracks flight, hotel and car rental prices over time, with price history and
alerts when they drop.

Flight Finder searches prices itself on a schedule, reads them with an AI model
you choose, and keeps their history in its own PostgreSQL, which runs inside
this application.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

See [DOCS.md](./DOCS.md) for installation and usage.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
