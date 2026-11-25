# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.5](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.1.4...grimmory-v1.1.5) (2026-11-25)


### Dependencies

* update dependency hassio-addons/bashio to v0.20.0 ([#1135](https://github.com/kanso-labs/home-assistant-applications/issues/1135)) ([d6f4a0e](https://github.com/kanso-labs/home-assistant-applications/commit/d6f4a0e4d2816c9a035b94875b77c6063651821c))

## [1.1.4](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.1.3...grimmory-v1.1.4) (2026-11-20)


### Bug Fixes

* update ghcr.io/grimmory-tools/grimmory docker tag to v3.5.1 ([#1100](https://github.com/kanso-labs/home-assistant-applications/issues/1100)) ([2c818d7](https://github.com/kanso-labs/home-assistant-applications/commit/2c818d76d3e30fba257541f5292896694c249edd))


### Upstream changes

* **v3.5.1:** [mitigate CVE-2026-114938](https://github.com/grimmory-tools/grimmory/issues/3167) ([2c818d7](https://github.com/kanso-labs/home-assistant-applications/commit/2c818d76d3e30fba257541f5292896694c249edd))

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.1.2...grimmory-v1.1.3) (2026-11-20)


### Dependencies

* update mariadb apk package to v11.8.10-r0 ([#1091](https://github.com/kanso-labs/home-assistant-applications/issues/1091)) ([80babd6](https://github.com/kanso-labs/home-assistant-applications/commit/80babd6edb157ad7b51da40a3e755cc4eea62f6e))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.1.1...grimmory-v1.1.2) (2026-11-18)


### Dependencies

* update nginx apk package to v1.30.7-r0 ([#1077](https://github.com/kanso-labs/home-assistant-applications/issues/1077)) ([47a6dcc](https://github.com/kanso-labs/home-assistant-applications/commit/47a6dcc27b4c5202ef066b2cfea808f9568a495e))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.1.0...grimmory-v1.1.1) (2026-10-23)


### Dependencies

* update nginx apk package to v1.30.6-r0 ([#865](https://github.com/kanso-labs/home-assistant-applications/issues/865)) ([9c4d295](https://github.com/kanso-labs/home-assistant-applications/commit/9c4d2952753f2e1feb82eed458ccd458865692c9))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.0.1...grimmory-v1.1.0) (2026-10-21)


### Features

* **grimmory:** serve through ingress ([#831](https://github.com/kanso-labs/home-assistant-applications/issues/831)) ([0f805d2](https://github.com/kanso-labs/home-assistant-applications/commit/0f805d2cedf41b1d3e9dbbf84ba91b1d7cccf4da))


### Dependencies

* update mariadb apk package to v11.8.9-r0 ([#821](https://github.com/kanso-labs/home-assistant-applications/issues/821)) ([76e5aa5](https://github.com/kanso-labs/home-assistant-applications/commit/76e5aa5d4348c31217aa261389bdc07996e3a3b7))

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v1.0.0...grimmory-v1.0.1) (2026-10-17)


### Bug Fixes

* **grimmory:** repair the database's ownership and give it time to stop ([#709](https://github.com/kanso-labs/home-assistant-applications/issues/709)) ([19e24c6](https://github.com/kanso-labs/home-assistant-applications/commit/19e24c61a98be7f841a72671fd0432a8c2418a6c))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v0.2.0...grimmory-v1.0.0) (2026-10-08)


### Features

* **grimmory:** release 1.0.0 ([f088f00](https://github.com/kanso-labs/home-assistant-applications/commit/f088f008ae61b882974518b564558ff24643122d))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/grimmory-v0.1.0...grimmory-v0.2.0) (2026-10-05)


### Features

* **grimmory:** add Grimmory as an application ([#538](https://github.com/kanso-labs/home-assistant-applications/issues/538)) ([6c9039c](https://github.com/kanso-labs/home-assistant-applications/commit/6c9039c953c59644e7beb0fe62d3e6dda1384113))

## [0.1.0]

### Added

- Initial release, running Grimmory v3.5.0 with MariaDB 11.8.
