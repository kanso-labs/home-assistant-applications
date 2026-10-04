# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/configarr-v1.1.2...configarr-v1.1.3) (2026-10-04)


### Bug Fixes

* update dependency raydak-labs/configarr to v1.34.0 ([#530](https://github.com/kanso-labs/home-assistant-applications/issues/530)) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))


### Upstream changes

* **v1.34.0:** [bind media feature syncs to per-*arr client contracts](https://github.com/raydak-labs/configarr/issues/555) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [drop unreachable helpers and superseded merge pass](https://github.com/raydak-labs/configarr/issues/556) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [dry run showed fake tag ids for not-yet-created tags](https://github.com/raydak-labs/configarr/commit/c0fd3544a74ac149721c4437da7fee13115a3d85) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [propagate download-client pipeline failures instead of exiting 0](https://github.com/raydak-labs/configarr/commit/db7f7642f243918f7dae82221bcf9d97f9b2b173) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [show *arr error body in API error messages](https://github.com/raydak-labs/configarr/issues/549) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [stop creating Lidarr/Readarr tags during dry runs](https://github.com/raydak-labs/configarr/commit/35dc12048a3c3548c893181493ad846b662e2c7f) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [stop dry runs from creating missing download client tags](https://github.com/raydak-labs/configarr/commit/cf0fef517df01d9916aefb69f17656f039a6092c) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [stop leaking download client secrets into logs and diff reports](https://github.com/raydak-labs/configarr/issues/550) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))
* **v1.34.0:** [unify tag handling and add tags/delete_unmanaged_tags config for all *arrs](https://github.com/raydak-labs/configarr/issues/548) ([fa56543](https://github.com/kanso-labs/home-assistant-applications/commit/fa56543ceca28961a90e408a61e222d4c462d7db))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/configarr-v1.1.1...configarr-v1.1.2) (2026-09-29)


### Bug Fixes

* update dependency raydak-labs/configarr to v1.33.0 ([#484](https://github.com/kanso-labs/home-assistant-applications/issues/484)) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))


### Upstream changes

* **v1.33.0:** [**nix:** correct pnpmDeps hash for 1.32.0](https://github.com/raydak-labs/configarr/commit/153cd10bf046aef9cc1d574865966dc6c57f2bc2) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [**prowlarr:** drop deprecated app_profile alias (soft-breaking)](https://github.com/raydak-labs/configarr/commit/d044d31450ea4d93f2ae8b53aec1a0bf0149959a) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [count skipped download clients as failed changes](https://github.com/raydak-labs/configarr/commit/40eaae01703613b3721b26f5f24c82230ae73f71) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [delete unmanaged Prowlarr resources after their dependents](https://github.com/raydak-labs/configarr/commit/cb28f5e00fb504b314d25d6a7da60f2e44f0f148) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [enforce configuration validation](https://github.com/raydak-labs/configarr/issues/509) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [persist disabled *arr providers without connection tests](https://github.com/raydak-labs/configarr/commit/4131e71ee19abe099497ff0d0738337e8db0e0d6) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))
* **v1.33.0:** [support release profiles](https://github.com/raydak-labs/configarr/issues/542) ([3a0a4d9](https://github.com/kanso-labs/home-assistant-applications/commit/3a0a4d9abf2393fbf256c624d6ebc674163049cb))

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
