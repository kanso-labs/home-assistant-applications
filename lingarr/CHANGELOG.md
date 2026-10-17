# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.3](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.3.2...lingarr-v1.3.3) (2026-10-17)


### Bug Fixes

* **lingarr:** add a health check so the watchdog can see a hang ([#720](https://github.com/kanso-labs/home-assistant-applications/issues/720)) ([09aa3cb](https://github.com/kanso-labs/home-assistant-applications/commit/09aa3cb855db15c7f2746dde7a6a8fa38b6879b0))

## [1.3.2](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.3.1...lingarr-v1.3.2) (2026-10-17)


### Bug Fixes

* **lingarr:** answer the ingress port for supervisor alone ([#693](https://github.com/kanso-labs/home-assistant-applications/issues/693)) ([df712ab](https://github.com/kanso-labs/home-assistant-applications/commit/df712ab03ca023869a5527fb061aa1b4dcc4857a))

## [1.3.1](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.3.0...lingarr-v1.3.1) (2026-10-16)


### Bug Fixes

* **lingarr:** keep the ingress path out of the home address ([#684](https://github.com/kanso-labs/home-assistant-applications/issues/684)) ([2929faa](https://github.com/kanso-labs/home-assistant-applications/commit/2929faa1d53777b84d7325e8680c401c9040835f))

## [1.3.0](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.2.0...lingarr-v1.3.0) (2026-10-16)


### Features

* **lingarr:** open Lingarr through ingress ([#671](https://github.com/kanso-labs/home-assistant-applications/issues/671)) ([c9c3f9a](https://github.com/kanso-labs/home-assistant-applications/commit/c9c3f9a981e460b269008e7f9191f056839daf78))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.1.0...lingarr-v1.2.0) (2026-10-09)


### Features

* update ghcr.io/lingarr-translate/lingarr docker tag to v1.4.0 ([#583](https://github.com/kanso-labs/home-assistant-applications/issues/583)) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))


### Upstream changes

* **v1.4.0:** [added batch translation environment variable by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/551) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [added job timeout configuration by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/529) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Bump the npm-minor-and-patch group in /Lingarr.Client with 12 updates by dependabotbot](https://github.com/lingarr-translate/lingarr/pull/518) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Bump the npm-minor-and-patch group in /Lingarr.Client with 9 updates by dependabotbot](https://github.com/lingarr-translate/lingarr/pull/546) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Bump the nuget-minor-and-patch group with 16 updates by dependabotbot](https://github.com/lingarr-translate/lingarr/pull/548) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Bump the nuget-minor-and-patch group with 17 updates by dependabotbot](https://github.com/lingarr-translate/lingarr/pull/520) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Feat/translated context by bluavocado](https://github.com/lingarr-translate/lingarr/pull/530) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [Fix unknown subtitle language fallback by crisperfx](https://github.com/lingarr-translate/lingarr/pull/553) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [fixed batch translation being disabled when saving an ai service by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/552) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [fixed unauthenticated onboarding and signup by rowanfuchs in `9fba9f7`](https://github.com/lingarr-translate/lingarr/commit/9fba9f7cc862e1d4af83794c39c8511058f722ae) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [prevent duplicate job by checking request id by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/527) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [refactored date and time handling by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/514) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [strip subtitle markup from line by line content translations by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/550) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))
* **v1.4.0:** [telemetry improvements by rowanfuchs](https://github.com/lingarr-translate/lingarr/pull/510) ([d88e3ab](https://github.com/kanso-labs/home-assistant-applications/commit/d88e3ab61a425670991df983d55c21d0e4715d09))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/lingarr-v1.0.0...lingarr-v1.1.0) (2026-09-16)


### Features

* **lingarr:** add Lingarr as an application ([#343](https://github.com/kanso-labs/home-assistant-applications/issues/343)) ([7cc813c](https://github.com/kanso-labs/home-assistant-applications/commit/7cc813cd8242760b585c09d10e74996503a7d1f9))

## [1.0.0]

### Added

- Initial release, running Lingarr 1.3.0.
