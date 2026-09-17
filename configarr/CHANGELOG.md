# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/configarr-v1.1.0...configarr-v1.1.1) (2026-09-17)


### Bug Fixes

* update dependency raydak-labs/configarr to v1.32.0 ([#355](https://github.com/kanso-labs/home-assistant-applications/issues/355)) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))


### Upstream changes

* **v1.32.0:** [**prowlarr:** add sync profile support](https://github.com/raydak-labs/configarr/commit/d5632ddc5ed84cfebfc94e27f82fa9e66b368184) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [**prowlarr:** exclude profiles pending deletion from the dry-run handoff](https://github.com/raydak-labs/configarr/commit/0452ab5445cd665df089e932b9c99170f6c3d8a5) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [**prowlarr:** keep unmanaged server props when updating a resource](https://github.com/raydak-labs/configarr/commit/0e8da70195fe28640bf21ca150ba51fbfc59dceb) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [**prowlarr:** stop dry run creating tags](https://github.com/raydak-labs/configarr/commit/dbf7ff7cc68b5ecb8dfb026165e8d9ffbdebf323) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [chown Whisparr's library folder to the container's runtime user](https://github.com/raydak-labs/configarr/commit/d542c813d37b737c888205975650cb7cd88941b4) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [refresh quality-profile cache before Lidarr/Readarr root folders sync](https://github.com/raydak-labs/configarr/commit/28ccc1579b75839cc003904d775457ee27cd6d17) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [replace unified client with typed per-arr clients and syncers](https://github.com/raydak-labs/configarr/commit/1518cc869e4ab828ecaa6184474aabc6f1493e43) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))
* **v1.32.0:** [stop reporting Prowlarr's indexer-sync trigger as a config change](https://github.com/raydak-labs/configarr/commit/a1d682805b3ad49f6e4a0cbd8405d24d212f0523) ([2c447e6](https://github.com/kanso-labs/home-assistant-applications/commit/2c447e6f3155840c0fe8aebeab9a5b333434e05f))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/configarr-v1.0.0...configarr-v1.1.0) (2026-09-16)


### Features

* **configarr:** add Configarr as an application ([#345](https://github.com/kanso-labs/home-assistant-applications/issues/345)) ([8894405](https://github.com/kanso-labs/home-assistant-applications/commit/88944055451cceba76766ef46c68c1486ed975dd))

## [1.0.0]

### Added

- Initial release, running Configarr 1.31.0.
