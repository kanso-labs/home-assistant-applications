# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v1.0.3...muxarr-v1.0.4) (2026-10-19)


### Bug Fixes

* **muxarr:** give the first start after an update five minutes ([#785](https://github.com/kanso-labs/home-assistant-applications/issues/785)) ([ef6e597](https://github.com/kanso-labs/home-assistant-applications/commit/ef6e59778e17ef0aa71961ba495f062804c2c920))

## [1.0.3](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v1.0.2...muxarr-v1.0.3) (2026-10-17)


### Bug Fixes

* **muxarr:** add a health check so the watchdog can see a hang ([#721](https://github.com/kanso-labs/home-assistant-applications/issues/721)) ([6e432ee](https://github.com/kanso-labs/home-assistant-applications/commit/6e432eef14462dcb7a444f889fad8f4a94c022aa))

## [1.0.2](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v1.0.1...muxarr-v1.0.2) (2026-10-15)


### Bug Fixes

* update ghcr.io/kirovair/muxarr docker tag to v0.9.12 ([#647](https://github.com/kanso-labs/home-assistant-applications/issues/647)) ([4813710](https://github.com/kanso-labs/home-assistant-applications/commit/48137106ac1831f9152d8144c8259735c7275a60))


### Upstream changes

* **v0.9.12:** [mkvmerge and mkvpropedit come from the MKVToolNix repo now: v102 instead of Ubuntu's v82 from 2024, pinned so both architectures get the same one](https://github.com/KirovAir/muxarr/issues/82) ([4813710](https://github.com/kanso-labs/home-assistant-applications/commit/48137106ac1831f9152d8144c8259735c7275a60))
* **v0.9.12:** [When Sonarr or Radarr refuse the webhook, the message now says why, in their words. Usually it is a Muxarr URL they cannot reach](https://github.com/KirovAir/muxarr/issues/81) ([4813710](https://github.com/kanso-labs/home-assistant-applications/commit/48137106ac1831f9152d8144c8259735c7275a60))

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v1.0.0...muxarr-v1.0.1) (2026-10-14)


### Bug Fixes

* update ghcr.io/kirovair/muxarr docker tag to v0.9.11 ([#641](https://github.com/kanso-labs/home-assistant-applications/issues/641)) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))


### Upstream changes

* **v0.9.10:** [`POST /api/queue` queues every file that needs work, so you can turn off auto-queue and convert from a cron job at night](https://github.com/KirovAir/muxarr/issues/68) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [Audio codec exclusion actually works now, the setting used to be wired to subtitle codecs only](https://github.com/KirovAir/muxarr/issues/74) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [Lost your password? Start once with `MUXARR__AUTH__RESET=true`, see &lt;](https://github.com/KirovAir/muxarr/issues/65) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [New notification trigger "Queue finished": one message per batch with the totals, handy for a single media server refresh](https://github.com/KirovAir/muxarr/issues/72) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [New setting "Queue new files found by a scan" under Processing, for files that were skipped as hardlinked earlier](https://github.com/KirovAir/muxarr/issues/71) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [README has a section on running without Docker](https://github.com/KirovAir/muxarr/issues/63) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [Sonarr webhooks work again. Sonarr v4 sends an `episodeFiles` array and Muxarr only read the old single `episodeFile`, so Download events never found a path](https://github.com/KirovAir/muxarr/issues/76) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** [Sorting the library by Tracks no longer throws, sorting by Size is fast on large libraries](https://github.com/KirovAir/muxarr/issues/73) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.10:** Notifications were only sent after someone opened the Notifications settings page since the last restart. They now work right after start ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** [`GET /api/conversions` lists conversions, newest first, with `?filePath=` to follow one file after queueing it. Thanks matthew-inamdar](https://github.com/KirovAir/muxarr/issues/70) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** [Autoscan actually scans now. The interval only took effect after a restart, and a timed scan did nothing but sync with the arrs](https://github.com/KirovAir/muxarr/issues/75) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** [Sonarr and Radarr now hear about a converted file. They rescan it, and rename it when their naming format has something in it that changed, like the audio codec or languages. Muxarr follows the new n…](https://github.com/KirovAir/muxarr/issues/79) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** [Telegram notifications can go to a forum topic. Thanks alejandroVasquez812](https://github.com/KirovAir/muxarr/issues/64) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** [The webhook notification payload has `filePath` next to `fileName`. Thanks matthew-inamdar](https://github.com/KirovAir/muxarr/issues/69) ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** A cancel that lands after the file was already swapped no longer flips a finished conversion to cancelled ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))
* **v0.9.11:** There is a CONTRIBUTING.md now, have a look before opening a PR ([d9b4978](https://github.com/kanso-labs/home-assistant-applications/commit/d9b49789bcea7c0964e6bb5e87771ebc74518e7b))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v0.2.0...muxarr-v1.0.0) (2026-09-23)


### Features

* **muxarr:** release 1.0.0 ([89be67c](https://github.com/kanso-labs/home-assistant-applications/commit/89be67c820e5fa5805992595c00604fc6577a15a))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/muxarr-v0.1.0...muxarr-v0.2.0) (2026-09-23)


### Features

* **muxarr:** add Muxarr as an application ([#404](https://github.com/kanso-labs/home-assistant-applications/issues/404)) ([214f70c](https://github.com/kanso-labs/home-assistant-applications/commit/214f70ce95d12ff7a739349dc85a406507ca3f02))

## [0.1.0]

### Added

- Initial release, running Muxarr 0.9.9.
