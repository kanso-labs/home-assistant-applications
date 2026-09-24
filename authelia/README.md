# Home Assistant Application: Authelia

Single sign-on and two-factor authentication for the applications behind your
reverse proxy.

Authelia signs people in once, with a second factor where you ask for one, and
tells the proxy who may reach what. It sits behind a reverse proxy such as Nginx
Proxy Manager. You set your domain in the Configuration tab, and everything else
in Authelia's own `configuration.yml`.

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

See [DOCS.md](./DOCS.md) for installation and usage.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
