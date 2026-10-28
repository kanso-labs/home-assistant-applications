# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.9](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.8...sonarr-v1.2.9) (2026-10-28)


### Dependencies

* update home assistant base images ([#903](https://github.com/kanso-labs/home-assistant-applications/issues/903)) ([52aeb10](https://github.com/kanso-labs/home-assistant-applications/commit/52aeb1093dd34c03a25d6be2ae74e8aa0739e673))

## [1.2.8](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.7...sonarr-v1.2.8) (2026-10-27)


### Dependencies

* update home assistant base images ([#895](https://github.com/kanso-labs/home-assistant-applications/issues/895)) ([2e56129](https://github.com/kanso-labs/home-assistant-applications/commit/2e56129b54b52a90c7b6451271e7652b13427f6d))

## [1.2.7](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.6...sonarr-v1.2.7) (2026-10-22)


### Dependencies

* update home assistant base images ([#862](https://github.com/kanso-labs/home-assistant-applications/issues/862)) ([27cd3d7](https://github.com/kanso-labs/home-assistant-applications/commit/27cd3d7a8a69b41003cecd79e5bd19e1fe9caacb))

## [1.2.6](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.5...sonarr-v1.2.6) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.2.5](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.4...sonarr-v1.2.5) (2026-10-19)


### Bug Fixes

* **sonarr:** keep https in sign-in redirects behind ingress or a proxy ([#774](https://github.com/kanso-labs/home-assistant-applications/issues/774)) ([1fd7250](https://github.com/kanso-labs/home-assistant-applications/commit/1fd72507fa9357ba1d98f94aa0cbea58f46c2e79))

## [1.2.4](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.3...sonarr-v1.2.4) (2026-10-18)


### Bug Fixes

* **sonarr:** restore large backups through ingress, and stop crash reports ([#738](https://github.com/kanso-labs/home-assistant-applications/issues/738)) ([d5447c6](https://github.com/kanso-labs/home-assistant-applications/commit/d5447c652b31e8fbe138dce6c85f004b5bf6feb1))

## [1.2.3](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.2...sonarr-v1.2.3) (2026-10-17)


### Bug Fixes

* **sonarr:** require sign-in again behind a reverse proxy ([#689](https://github.com/kanso-labs/home-assistant-applications/issues/689)) ([d99d765](https://github.com/kanso-labs/home-assistant-applications/commit/d99d765362e1d024add769d9421399d46af887a9))

## [1.2.2](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.1...sonarr-v1.2.2) (2026-10-16)


### Bug Fixes

* **sonarr:** keep the ingress path out of the home address ([#678](https://github.com/kanso-labs/home-assistant-applications/issues/678)) ([29b63ac](https://github.com/kanso-labs/home-assistant-applications/commit/29b63acfd6163a8560ac96a0a582e0c3e51416ff))

## [1.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.2.0...sonarr-v1.2.1) (2026-10-16)


### Bug Fixes

* **sonarr:** read the ingress path with bashio::app ([#663](https://github.com/kanso-labs/home-assistant-applications/issues/663)) ([933e9d5](https://github.com/kanso-labs/home-assistant-applications/commit/933e9d5a58396c0fb9c4c39883c1770486fe692e))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.1.3...sonarr-v1.2.0) (2026-10-16)


### Features

* **sonarr:** open Sonarr through ingress ([#657](https://github.com/kanso-labs/home-assistant-applications/issues/657)) ([5c27184](https://github.com/kanso-labs/home-assistant-applications/commit/5c27184c40854b3e22bfb6111223d5376ca648eb))

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.1.2...sonarr-v1.1.3) (2026-09-23)


### Bug Fixes

* update dependency sonarr/sonarr to v4.0.20.3014 ([#412](https://github.com/kanso-labs/home-assistant-applications/issues/412)) ([4d6fa93](https://github.com/kanso-labs/home-assistant-applications/commit/4d6fa93e1e65124d8882070d6d6cea5a2002af0f))


### Upstream changes

* **v4.0.20.3014:** [Fixed: Avoid checking for free space if other specifications fail first by mynameisbogdan](https://github.com/Sonarr/Sonarr/pull/8867) ([4d6fa93](https://github.com/kanso-labs/home-assistant-applications/commit/4d6fa93e1e65124d8882070d6d6cea5a2002af0f))
* **v4.0.20.3014:** [Fixed: Unexpected languages stored in DB will be treated as Unknown by mynameisbogdan](https://github.com/Sonarr/Sonarr/pull/8810) ([4d6fa93](https://github.com/kanso-labs/home-assistant-applications/commit/4d6fa93e1e65124d8882070d6d6cea5a2002af0f))
* **v4.0.20.3014:** [Jellyfin/Emby Connection Test and New Jellyfin Auth header by markus101](https://github.com/Sonarr/Sonarr/pull/8826) ([4d6fa93](https://github.com/kanso-labs/home-assistant-applications/commit/4d6fa93e1e65124d8882070d6d6cea5a2002af0f))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.1.1...sonarr-v1.1.2) (2026-08-28)


### Bug Fixes

* **sonarr:** use the app_config map type Supervisor expects ([#237](https://github.com/kanso-labs/home-assistant-applications/issues/237)) ([06b6566](https://github.com/kanso-labs/home-assistant-applications/commit/06b6566000921783dc88535c1aa9c076f0f26182))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.1.0...sonarr-v1.1.1) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/sonarr-v1.0.0...sonarr-v1.1.0) (2026-08-12)


### Features

* release applications automatically when their version changes ([de30198](https://github.com/kanso-labs/home-assistant-applications/commit/de3019844252900ca5045a9f9e9d2ad9aa1425bc))
* **sonarr:** add Sonarr as an application ([f563016](https://github.com/kanso-labs/home-assistant-applications/commit/f563016470501c3ba33cc15fc3dc79fefd2f3473))

## [1.0.0]

### Added

- Initial release, running Sonarr 4.0.19.2979.
