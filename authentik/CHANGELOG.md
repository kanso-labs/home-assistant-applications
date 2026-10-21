# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.1.2...authentik-v1.1.3) (2026-10-21)


### Bug Fixes

* update ghcr.io/goauthentik/server docker tag to v2026.8.5 ([#848](https://github.com/kanso-labs/home-assistant-applications/issues/848)) ([04e64ae](https://github.com/kanso-labs/home-assistant-applications/commit/04e64aebdca4145905933f24541670e2bf2dca76))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.1.1...authentik-v1.1.2) (2026-10-20)


### Bug Fixes

* **authentik:** load application and source icons through ingress ([#840](https://github.com/kanso-labs/home-assistant-applications/issues/840)) ([df30726](https://github.com/kanso-labs/home-assistant-applications/commit/df3072687463865efb5f870be10b9712cf7e23c5))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.1.0...authentik-v1.1.1) (2026-10-20)


### Bug Fixes

* **authentik:** restore ingress, which the 1.1.0 release reverted ([#836](https://github.com/kanso-labs/home-assistant-applications/issues/836)) ([4df8478](https://github.com/kanso-labs/home-assistant-applications/commit/4df8478d600996b261cad997d20b8d84e6fbb559))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.0.3...authentik-v1.1.0) (2026-10-20)


### Features

* **authentik:** serve through ingress ([#834](https://github.com/kanso-labs/home-assistant-applications/issues/834)) ([c2808dc](https://github.com/kanso-labs/home-assistant-applications/commit/c2808dc040b3f1eab6968f293df134ee594a17b5))

## [1.0.3](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.0.2...authentik-v1.0.3) (2026-10-18)


### Bug Fixes

* **authentik:** start with no bootstrap email, and stop PostgreSQL cleanly ([#735](https://github.com/kanso-labs/home-assistant-applications/issues/735)) ([ce04377](https://github.com/kanso-labs/home-assistant-applications/commit/ce043775a405028eec25d8e3d041af7fb8218926))

## [1.0.2](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.0.1...authentik-v1.0.2) (2026-10-17)


### Bug Fixes

* **authentik:** protect the database across updates and stops ([#708](https://github.com/kanso-labs/home-assistant-applications/issues/708)) ([75551e3](https://github.com/kanso-labs/home-assistant-applications/commit/75551e317a1baec301662cfd7083d26c7b40290b))

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v1.0.0...authentik-v1.0.1) (2026-10-16)


### Bug Fixes

* update ghcr.io/goauthentik/server docker tag to v2026.8.4 ([#646](https://github.com/kanso-labs/home-assistant-applications/issues/646)) ([a7443f1](https://github.com/kanso-labs/home-assistant-applications/commit/a7443f17bbd14dd1101b3066dec6ad29260d0c1e))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v0.2.1...authentik-v1.0.0) (2026-09-22)


### Features

* **authentik:** document the first start and release 1.0.0 ([a737006](https://github.com/kanso-labs/home-assistant-applications/commit/a73700605552b019a5f54cad7a7a84c4c6de7b45))

## [0.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v0.2.0...authentik-v0.2.1) (2026-09-21)


### Bug Fixes

* **authentik:** report a health status so the application leaves startup ([#388](https://github.com/kanso-labs/home-assistant-applications/issues/388)) ([a41ea6a](https://github.com/kanso-labs/home-assistant-applications/commit/a41ea6a5690057da1caf5e506d6c693b7c02d8d2))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/authentik-v0.1.0...authentik-v0.2.0) (2026-09-21)


### Features

* **authentik:** add Authentik as an application ([#386](https://github.com/kanso-labs/home-assistant-applications/issues/386)) ([0094d6b](https://github.com/kanso-labs/home-assistant-applications/commit/0094d6b5c7b1e72f77d889b4c208a4e7ef9f57c0))

## [0.1.0]

### Added

- Initial release, running Authentik 2026.8.3.
