# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/seadexerr-v1.1.1...seadexerr-v1.1.2) (2026-10-18)


### Bug Fixes

* **seadexerr:** match the four indexer flags Seadexerr 3.2 sets, and let Watchdog see a hang ([#765](https://github.com/kanso-labs/home-assistant-applications/issues/765)) ([71af8f8](https://github.com/kanso-labs/home-assistant-applications/commit/71af8f8c029a5b95e0e5ea7514ac6f5383b995d0))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/seadexerr-v1.1.0...seadexerr-v1.1.1) (2026-10-17)


### Bug Fixes

* **seadexerr:** drop the AniList token option Seadexerr no longer reads ([#716](https://github.com/kanso-labs/home-assistant-applications/issues/716)) ([ff417a7](https://github.com/kanso-labs/home-assistant-applications/commit/ff417a79c8ca4f3c03da84bb3547f41a49207744))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/seadexerr-v1.0.1...seadexerr-v1.1.0) (2026-10-12)


### Features

* update ghcr.io/ryder-c/seadexerr docker tag to v3.2.0 ([#606](https://github.com/kanso-labs/home-assistant-applications/issues/606)) ([d637da1](https://github.com/kanso-labs/home-assistant-applications/commit/d637da18031a6eb6fb6565779dcaa84b2917c926))


### Upstream changes

* **v3.2.0:** [Classify releases by mappings instead of AniList format by Ryder-C](https://github.com/Ryder-C/seadexerr/pull/66) ([d637da1](https://github.com/kanso-labs/home-assistant-applications/commit/d637da18031a6eb6fb6565779dcaa84b2917c926))
* **v3.2.0:** [Stream mappings download to disk to prevent memory spike by Ryder-C](https://github.com/Ryder-C/seadexerr/pull/67) ([d637da1](https://github.com/kanso-labs/home-assistant-applications/commit/d637da18031a6eb6fb6565779dcaa84b2917c926))
* **v3.2.0:** [Tag releases with a rare indexer flag combination for custom format scoring by Ryder-C](https://github.com/Ryder-C/seadexerr/pull/68) ([d637da1](https://github.com/kanso-labs/home-assistant-applications/commit/d637da18031a6eb6fb6565779dcaa84b2917c926))

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/seadexerr-v1.0.0...seadexerr-v1.0.1) (2026-10-06)


### Bug Fixes

* update ghcr.io/ryder-c/seadexerr docker tag to v3.1.0 ([#549](https://github.com/kanso-labs/home-assistant-applications/issues/549)) ([04abbbe](https://github.com/kanso-labs/home-assistant-applications/commit/04abbbeb231cf96cfc86ae052b960c1e0fe5c557))


### Upstream changes

* **v3.1.0:** [fix: prevent cache file corruption from concurrent writes by lucasskywalker64](https://github.com/Ryder-C/seadexerr/pull/62) ([04abbbe](https://github.com/kanso-labs/home-assistant-applications/commit/04abbbeb231cf96cfc86ae052b960c1e0fe5c557))
* **v3.1.0:** [Make feed titles unique per release by Ryder-C](https://github.com/Ryder-C/seadexerr/pull/61) ([04abbbe](https://github.com/kanso-labs/home-assistant-applications/commit/04abbbeb231cf96cfc86ae052b960c1e0fe5c557))
* **v3.1.0:** [Support Docker secrets via _FILE variables by Ryder-C](https://github.com/Ryder-C/seadexerr/pull/60) ([04abbbe](https://github.com/kanso-labs/home-assistant-applications/commit/04abbbeb231cf96cfc86ae052b960c1e0fe5c557))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/seadexerr-v0.1.0...seadexerr-v1.0.0) (2026-09-27)


### Features

* **seadexerr:** add Seadexerr as an application ([#449](https://github.com/kanso-labs/home-assistant-applications/issues/449)) ([14bbdb5](https://github.com/kanso-labs/home-assistant-applications/commit/14bbdb50171256decec1cbcaa88caca8ba117184))
* **seadexerr:** release 1.0.0 ([e30fa54](https://github.com/kanso-labs/home-assistant-applications/commit/e30fa548c14d5a27bc3b9ba24cfc866537fc97f4))

## [0.1.0]

### Added

- Initial release, running Seadexerr 3.0.0.
