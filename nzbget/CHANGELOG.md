# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.5](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.3.4...nzbget-v1.3.5) (2026-10-22)


### Dependencies

* update home assistant base images ([#862](https://github.com/kanso-labs/home-assistant-applications/issues/862)) ([27cd3d7](https://github.com/kanso-labs/home-assistant-applications/commit/27cd3d7a8a69b41003cecd79e5bd19e1fe9caacb))

## [1.3.4](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.3.3...nzbget-v1.3.4) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.3.3](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.3.2...nzbget-v1.3.3) (2026-10-19)


### Bug Fixes

* **nzbget:** keep Extension Manager extensions across restarts ([#780](https://github.com/kanso-labs/home-assistant-applications/issues/780)) ([0062210](https://github.com/kanso-labs/home-assistant-applications/commit/0062210dbacb0989e5cae98f67ae87d2d926e137))

## [1.3.2](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.3.1...nzbget-v1.3.2) (2026-10-18)


### Bug Fixes

* **nzbget:** add a health check so Watchdog can restart a hung NZBGet ([#761](https://github.com/kanso-labs/home-assistant-applications/issues/761)) ([ffb4fcd](https://github.com/kanso-labs/home-assistant-applications/commit/ffb4fcd8b894fbeabfccef8a547bcbf546aed476))

## [1.3.1](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.3.0...nzbget-v1.3.1) (2026-10-17)


### Bug Fixes

* **nzbget:** back up the queue, remove the updater, add Python ([#711](https://github.com/kanso-labs/home-assistant-applications/issues/711)) ([848766a](https://github.com/kanso-labs/home-assistant-applications/commit/848766a43f5ee072211a6cdb84318a9a6027b085))

## [1.3.0](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.2.2...nzbget-v1.3.0) (2026-10-16)


### Features

* **nzbget:** open NZBGet through ingress ([#668](https://github.com/kanso-labs/home-assistant-applications/issues/668)) ([32a2b5a](https://github.com/kanso-labs/home-assistant-applications/commit/32a2b5a4b41ed5323b21b6ca157ac9c2f668f255))

## [1.2.2](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.2.1...nzbget-v1.2.2) (2026-08-28)


### Bug Fixes

* **nzbget:** use the app_config map type Supervisor expects ([#231](https://github.com/kanso-labs/home-assistant-applications/issues/231)) ([ad614d9](https://github.com/kanso-labs/home-assistant-applications/commit/ad614d941685370ff55d5a105bfb939793d08666))

## [1.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.2.0...nzbget-v1.2.1) (2026-08-27)


### Bug Fixes

* update dependency nzbgetcom/nzbget to v26.3 ([#214](https://github.com/kanso-labs/home-assistant-applications/issues/214)) ([7247c85](https://github.com/kanso-labs/home-assistant-applications/commit/7247c85eba7ad90a976357f2914db5c0a26912ed))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.1.1...nzbget-v1.2.0) (2026-08-17)


### Features

* **nzbget:** map /media ([#127](https://github.com/kanso-labs/home-assistant-applications/issues/127)) ([a0ede31](https://github.com/kanso-labs/home-assistant-applications/commit/a0ede31790b5a7e7d4803739b3804550e751bacf))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.1.0...nzbget-v1.1.1) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/nzbget-v1.0.0...nzbget-v1.1.0) (2026-08-12)


### Features

* **nzbget:** add NZBGet as an application ([#70](https://github.com/kanso-labs/home-assistant-applications/issues/70)) ([d873c42](https://github.com/kanso-labs/home-assistant-applications/commit/d873c426de784bcb19e355d52ba8c7e8f7e4634e))

## [1.0.0]

### Added

- Initial release, running NZBGet 26.2.
