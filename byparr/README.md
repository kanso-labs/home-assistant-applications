# Home Assistant Application: Byparr

Proxy server that gets past the anti-bot challenges standing between the arr
applications and their indexers.

It answers the same requests as FlareSolverr, so Prowlarr and the rest send a
request through Byparr and get the answer back, with a hardened Firefox doing
the work in place of Chrome.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

See [DOCS.md](./DOCS.md) for installation and usage.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
