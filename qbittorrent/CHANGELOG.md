# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.4](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.3.3...qbittorrent-v1.3.4) (2026-10-22)


### Dependencies

* update ghcr.io/home-assistant/base:3.24 docker digest to 992dc6a ([#861](https://github.com/kanso-labs/home-assistant-applications/issues/861)) ([0ee5d3d](https://github.com/kanso-labs/home-assistant-applications/commit/0ee5d3d2c1774579d5d0b4954ca9e560f8807d86))

## [1.3.3](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.3.2...qbittorrent-v1.3.3) (2026-10-20)


### Dependencies

* pin ghcr.io/home-assistant/base docker tag to 8fde417 ([#808](https://github.com/kanso-labs/home-assistant-applications/issues/808)) ([b62b005](https://github.com/kanso-labs/home-assistant-applications/commit/b62b005a000efcc824acbe423fd1a103aaadf9bc))

## [1.3.2](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.3.1...qbittorrent-v1.3.2) (2026-10-18)


### Bug Fixes

* **qbittorrent:** add a health check so Watchdog can restart a hung qBittorrent ([#764](https://github.com/kanso-labs/home-assistant-applications/issues/764)) ([fa01eeb](https://github.com/kanso-labs/home-assistant-applications/commit/fa01eeb445d3b4b383d9b89176f500f2d68d24db))

## [1.3.1](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.3.0...qbittorrent-v1.3.1) (2026-10-17)


### Bug Fixes

* **qbittorrent:** keep ingress working on qbittorrent 5.2.2 and later ([#692](https://github.com/kanso-labs/home-assistant-applications/issues/692)) ([80b1785](https://github.com/kanso-labs/home-assistant-applications/commit/80b1785edccb4f681b124dbf167dc54d16d3be69))

## [1.3.0](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.2.1...qbittorrent-v1.3.0) (2026-10-16)


### Features

* **qbittorrent:** open qBittorrent through ingress ([#669](https://github.com/kanso-labs/home-assistant-applications/issues/669)) ([9118bce](https://github.com/kanso-labs/home-assistant-applications/commit/9118bcec106fceaa74a20ce350ad31debe530401))

## [1.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.2.0...qbittorrent-v1.2.1) (2026-08-28)


### Bug Fixes

* **qbittorrent:** use the app_config map type Supervisor expects ([#234](https://github.com/kanso-labs/home-assistant-applications/issues/234)) ([e5efcce](https://github.com/kanso-labs/home-assistant-applications/commit/e5efcce2509c0a488546d46cdc03f827b309381b))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.1.1...qbittorrent-v1.2.0) (2026-08-17)


### Features

* **qbittorrent:** map /media ([#126](https://github.com/kanso-labs/home-assistant-applications/issues/126)) ([650202a](https://github.com/kanso-labs/home-assistant-applications/commit/650202a1102aaf27f725a219ed1620918a6ca6d8))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.1.0...qbittorrent-v1.1.1) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/qbittorrent-v1.0.0...qbittorrent-v1.1.0) (2026-08-12)


### Features

* **qbittorrent:** add qBittorrent as an application ([#68](https://github.com/kanso-labs/home-assistant-applications/issues/68)) ([064b41c](https://github.com/kanso-labs/home-assistant-applications/commit/064b41c5f8396c5647387b63734f3a736cdf7323))

## [1.0.0]

### Added

- Initial release, running qBittorrent 5.2.1.
