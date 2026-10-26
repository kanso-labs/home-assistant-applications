# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v2.0.0...unpackerr-v2.1.0) (2026-10-26)


### Features

* **unpackerr:** serve the web interface through ingress ([#891](https://github.com/kanso-labs/home-assistant-applications/issues/891)) ([767b624](https://github.com/kanso-labs/home-assistant-applications/commit/767b624afb1ec0a1d8e84b026f03f17647e22ac0))

## [2.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.6...unpackerr-v2.0.0) (2026-10-26)


### ⚠ BREAKING CHANGES

* update dependency unpackerr/unpackerr to v1 ([#884](https://github.com/kanso-labs/home-assistant-applications/issues/884))

### Features

* update dependency unpackerr/unpackerr to v1 ([#884](https://github.com/kanso-labs/home-assistant-applications/issues/884)) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))


### Upstream changes

* **v1.0.0:** [Add a live websocket hub and log file API by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/731) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add config section test probes without persisting by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/738) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add Create for webhook template files by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/769) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add extra HTTP headers on webhook POSTs. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/775) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add GET /api/config/env and bump golift.io/cnfg to v0.4.0 by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/704) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add GET /api/config/help and GET /api/system/export by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/707) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add GET /api/stats, GET /api/system, and authenticated /metrics by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/683) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add GET/POST /api/browse for listing and creating folders by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/706) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add global hook payload IDs and event titles by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/768) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add HTTP login, sessions, and a generated admin API key by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/682) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add JSONL extract history and GET /api/queue and /api/history by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/685) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add login and the hash-router shell so the UI can authenticate by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/742) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add named API keys, custom roles, and permission constants by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/681) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add optional Starr instance names for logs, hooks, and the dashboard by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/719) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add per-section GET /api/config/{section} by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/687) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add per-section PUT /api/config/{section} with main-loop apply and idle restart by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/692) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add queue retry/forget and history delete/clear API actions by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/686) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add settings forms so the UI can edit on-disk config by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/744) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add system, logs, and API docs to the embedded UI by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/745) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add the live dashboard so the UI shows the unpack queue by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/743) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Add UI password hashing, CLI reset, and tray change-password by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/680) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Allow filepath: on PUT and slim the tray and System page by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/749) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Build against the xtractr commit that keeps extracts when ReadDir is empty by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/777) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Bump brace-expansion from 5.0.9 to 5.0.12 in /frontend by dependabotbot](https://github.com/Unpackerr/unpackerr/pull/791) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Bump devalue from 5.9.2 to 5.9.4 in /frontend by dependabotbot](https://github.com/Unpackerr/unpackerr/pull/798) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Bump fast-uri from 3.1.8 to 3.1.9 in /frontend by dependabotbot](https://github.com/Unpackerr/unpackerr/pull/827) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Bump undici and scalar/openapi-parser in /frontend by dependabotbot](https://github.com/Unpackerr/unpackerr/pull/828) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Bump zod from 4.6.5 to 4.6.7 in /frontend by dependabotbot](https://github.com/Unpackerr/unpackerr/pull/829) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Cleaning up by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/696) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Comment Sonarr and Radarr out of the default config by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/757) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Convert to stdlib mux by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/697) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Copy folder retry counts onto history items by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/754) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Count forgotten deleted items and log forgotten imports by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/724) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Count webhook and command-hook failures on each extract so item detail can show them. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/771) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Dashboard Starr ages, Windows path fold, quieter poll logs by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/767) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Detect webhook templates from URL and add ntfy, Apprise, and Mattermost builtins. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/772) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Do not panic when a Starr HTTP client is nil by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/723) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Do not restart general PUT for env clamp or mode padding by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/736) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Drop Whisparr config and env support by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/725) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Edit Discord and Telegram webhook messages as an extract progresses. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/773) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Expose Starr queue snapshots on GET /api/stats by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/726) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Extract configdef and write live TOML from definitions.yml by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/679) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Fix a bug on the Trust UI page. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/748) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Fix file_mode and dir_mode descriptions by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/800) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Fix folder watcher dest re-extract and waiting queue by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/721) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Fold Whisparr config into Radarr by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/720) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Gate npm automerge on frontend tests by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/826) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Give the daemon /etc/unpackerr and drop Python from release bash by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/676) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Identify Starr, folder, and hook instances by map key by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/729) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Ignore extra proxy groups and show Logins Disabled by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/756) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Keep env-only list rows across config PUT by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/722) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Keep in-flight history rows as resume checkpoints by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/737) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Keep signexe next to the other GitHub Actions scripts. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/695) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Keep watched archives searchable when recursion is disabled by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/778) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Let Lidarr choose how an APE cue split is written by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/789) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Map a proxy role header onto webserver roles by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/735) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Move extract types into pkg/extract by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/714) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Move folder poll interval onto each watch path by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/763) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Move folder watcher and path tracking into pkg/folders by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/716) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Move Notifiarr path API keys into X-Api-Key. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/781) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Move webhook and command-hook runtime into pkg/hooks by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/715) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Notifiarr: ` plus `headers.X-Api-Key`. A key still sitting in the URL path is moved to that header on start.](https://notifiarr.com/api/v1/notification/unpackerr`) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Pin docker/dockerfile Docker tag to `ecfaec9` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/709) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Put permission verbs last (area:resource:verb) by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/710) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Raise the Starr extract ratio and pick up the nested-archive xtractr fix by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/797) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Refuse empty folder paths and name Starr skip errors by instance key by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/730) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Reject new filepath: values on config PUT by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/699) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [reopen log files on SIGHUP for logrotate by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/677) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Require KDF for UI password PUT and expose Trust fields on /api/auth/me by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/705) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Reshape the webhook form to the detected template and add in-app setup guides. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/774) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Restore Makefile and source-build Docker for forks by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/708) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Restore Starr queue from history JSONL after restart by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/727) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Restore watched-folder extracts after a restart by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/758) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Serve a committed OpenAPI 3 spec at /api/openapi.json by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/693) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Set a urlbase cookie on the SPA index by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/739) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Share checkStarrQueue behind starrApp by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/712) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Share logExtra, crossPlatformBase, and hookCounts by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/713) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Share Starr validate/get/have behind starrApp by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/711) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Show each Starr max_bytes in the startup dump by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/718) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Show queue extraction ETA, archive, and delay countdowns by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/761) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Show queue item details without file lists on every snapshot by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/765) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Skip JSONL without a log or config file, and lighten dark outline buttons by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/762) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Stamp Starr polls, keep hook extract Data, persist folder retry by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/766) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Start the HTTP server from listen_addr, not metrics by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/678) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Translate extract statuses and fix dashboard accessibility by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/755) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [unRAID: add an appdata path at `/config`, publish **5656**, and drop the old `UN_SONARR_*` / `UN_RADARR_*` / `UN_LIDARR_*` variables after those apps exist in the config file. The Community Applicati…](https://github.com/selfhosters/unRAID-CA-templates/pull/695) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update actions/download-artifact action to v8.0.2 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/811) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update actions/setup-node action to v7.1.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/813) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update actions/upload-artifact action to v7.0.2 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/812) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update alpine:3.24 Docker digest to `294b683` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/787) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency golangci/golangci-lint to v2.15 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/824) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency phosphor-svelte to v3.1.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/815) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency rapidoc to v10 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/804) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency rapidoc to v11 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/822) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency svelte to v5.57.2 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/809) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency svelte-check to v4.7.7 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/823) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency sveltejs/vite-plugin-svelte to v7.3.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/792) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency types/node to v22.20.2 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/751) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency types/node to v24 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/760) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency types/node to v24.19.0 - autoclosed by renovatebot](https://github.com/Unpackerr/unpackerr/pull/794) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency types/node to v24.19.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/803) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency types/node to v24.19.2 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/817) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency vite to v8.3.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/759) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency vite to v8.3.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/793) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update dependency vite to v8.3.4 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/802) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/build-push-action action to v7.4.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/782) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/dockerfile:1 Docker digest to `4edf897` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/801) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/setup-buildx-action action to v4.4.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/783) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/setup-buildx-action action to v4.4.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/786) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/setup-qemu-action action to v4.3.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/700) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update docker/setup-qemu-action action to v4.4.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/785) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update go deps by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/784) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [update go, go mods, linter, fix lint by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/795) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update golang:1.27-alpine Docker digest to `8a5910f` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/788) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update golang:1.27-alpine Docker digest to `f92b6ef` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/819) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update golift.io/rotatorr digest to `a77ea24` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/740) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update golift.io/rotatorr digest to `ca6f760` by renovatebot](https://github.com/Unpackerr/unpackerr/pull/790) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update goreleaser/goreleaser-action action to v7.3.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/820) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module code.cloudfoundry.org/bytefmt to v0.88.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/698) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module code.cloudfoundry.org/bytefmt to v0.89.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/734) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module code.cloudfoundry.org/bytefmt to v0.90.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/780) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module code.cloudfoundry.org/bytefmt to v0.93.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/805) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module code.cloudfoundry.org/bytefmt to v0.94.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/821) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module github.com/prometheus/client_golang to v1.25.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/814) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/crypto to v0.57.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/746) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/crypto to v0.58.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/816) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/mod to v0.41.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/701) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/mod to v0.42.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/818) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/sys to v0.48.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/702) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golang.org/x/sys to v0.49.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/810) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golift.io/starr to v1.4.0 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/732) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Update module golift.io/starr to v1.4.1 by renovatebot](https://github.com/Unpackerr/unpackerr/pull/779) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Upgrade guide: &lt;](https://unpackerr.zip/docs/install/upgrading&gt;) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Upgrade to typescript 6. by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/770) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Wait for incomplete downloads and skip empty folders by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/764) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Web UI: &lt;](https://unpackerr.zip/docs/install/web-ui&gt;) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** [Wire Node into CI so go generate can embed the SPA by davidnewhall](https://github.com/Unpackerr/unpackerr/pull/741) ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** **Whisparr is no longer its own app.** Move `[[whisparr]]` / `UN_WHISPARR_*` to a Radarr instance: `[radarr.whisparr]` and `UN_RADARR_whisparr_*`. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** `make` works again for forks that are not on GoReleaser Pro. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** An archive at the watch root is still found when recursion is off and an exclude suffix is set. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Dashboard (live queue, retry / forget), history, logs, settings, system, and OpenAPI at `/api/openapi.json`. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Discord and Telegram **edit the previous message** as the extract moves (`update`, default on). Set `update = false` for a new post per event. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Docker no longer auto-polls folders every second. Global `folders.interval` / `UN_FOLDERS_INTERVAL` is ignored. Each watch path has its own `interval` (default off, fsnotify only). On Docker or CIFS… ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Electron **`.asar`** archives extract. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Env still wins. A field set by `UN_*` is locked in the UI until you remove that variable. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Extra POST headers, global custom IDs (`[hooks.custom_ids]`), and event titles. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** ISO open failures no longer panic. A Blu-ray ISO reports the UDF error instead of a generic failure. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Languages: English, Spanish, Greek, Dutch. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Lidarr `split_flac` splits FLAC and APE cue sheets. APE output can be APE, WAV, or FLAC (`ape_format`). Older Monkey’s Audio (3.81–3.97) splits. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Login is a local password, a reverse-proxy header, or `noauth`. API keys have roles. A first start can generate an admin key for `/metrics` and scripts. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Nested archives no longer add the inner archive’s own bytes into that ratio, so packed-inside-packed downloads stop failing the cap. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Paste a URL and the template is detected: Notifiarr, Discord, Telegram, Slack, Pushover, Gotify, ntfy, Apprise, Mattermost. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Per-folder `wait_extensions` (stay WAITING while `.part` / `.crdownload` is in the item’s top folder) and `skip_empty`. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Prometheus `/metrics` now requires an API key with `system:metrics:read` (`Authorization: Bearer` or `X-Api-Key`). ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Queue and history survive a restart (JSONL). Starr WAITING comes back on the next poll. Folder rows restore, including delete-after, retries, and interrupted extracts. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Queue shows extraction ETA, the archive, and delay countdowns. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Saving in the UI rewrites the config file. The process user has to be able to write that file. Docker and unRAID need a `/config` mount or those saves disappear. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Settings can edit Starr apps, folders, webhooks, command hooks, and the web server. Each row has a Test button that probes without saving. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** SIGHUP reopens log files for logrotate. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Starr apps, folders, webhooks, and command hooks are named keys (`[sonarr.uhd]`, `UN_SONARR_uhd_URL`). Old `[[sonarr]]` / `[[folder]]` tables still load as `0`, `1`, …. A Save in the UI rewrites them. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Starr uncompressed **ratio cap is 7.5:1** (was 5:1). Folders stay unlimited unless you set `max_ratio`. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** The HTTP server starts whenever `listen_addr` is set. The default is `0.0.0.0:5656`, so an old config that never set it **turns the UI on**. Set `listen_addr = ""` to keep it off. First start with an… ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Tray / menu bar on Windows and macOS opens the UI, and can change the password. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))
* **v1.0.0:** Watched folders can keep archive execute bits with `preserve_exec` (default off). Starr stays on `file_mode` only. ([7611652](https://github.com/kanso-labs/home-assistant-applications/commit/7611652ebe0777d9d64d55dd75b2f204ffd9ba72))

## [1.2.6](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.5...unpackerr-v1.2.6) (2026-10-22)


### Dependencies

* update home assistant base images ([#862](https://github.com/kanso-labs/home-assistant-applications/issues/862)) ([27cd3d7](https://github.com/kanso-labs/home-assistant-applications/commit/27cd3d7a8a69b41003cecd79e5bd19e1fe9caacb))

## [1.2.5](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.4...unpackerr-v1.2.5) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.2.4](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.3...unpackerr-v1.2.4) (2026-10-19)


### Bug Fixes

* **unpackerr:** seed addresses and paths that work on Home Assistant ([#783](https://github.com/kanso-labs/home-assistant-applications/issues/783)) ([b65d1a7](https://github.com/kanso-labs/home-assistant-applications/commit/b65d1a7f21fed304328346c2a7288974dc5d3c80))

## [1.2.3](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.2...unpackerr-v1.2.3) (2026-08-31)


### Bug Fixes

* unpack unpackerr 0.16.1 from its new release tarball ([#260](https://github.com/kanso-labs/home-assistant-applications/issues/260)) ([2bf1650](https://github.com/kanso-labs/home-assistant-applications/commit/2bf1650394925006fe0379e53bf4a9a3bc00f7b9))

## [1.2.2](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.1...unpackerr-v1.2.2) (2026-08-28)


### Bug Fixes

* **unpackerr:** use the app_config map type Supervisor expects ([#238](https://github.com/kanso-labs/home-assistant-applications/issues/238)) ([709d82b](https://github.com/kanso-labs/home-assistant-applications/commit/709d82b4bea1c3f079b91e48895c2aeb213f4449))

## [1.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.2.0...unpackerr-v1.2.1) (2026-08-17)


### Bug Fixes

* **unpackerr:** stop the seeded configuration logging errors on every start ([#144](https://github.com/kanso-labs/home-assistant-applications/issues/144)) ([4a96ab4](https://github.com/kanso-labs/home-assistant-applications/commit/4a96ab48b55f74e8c9cdad8f3f17734a9abf6dc5))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.1.1...unpackerr-v1.2.0) (2026-08-17)


### Features

* **unpackerr:** map /media ([#128](https://github.com/kanso-labs/home-assistant-applications/issues/128)) ([f1631ef](https://github.com/kanso-labs/home-assistant-applications/commit/f1631efc10dbdfb0091e5e4efbf75627183f4e18))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.1.0...unpackerr-v1.1.1) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/unpackerr-v1.0.0...unpackerr-v1.1.0) (2026-08-12)


### Features

* **unpackerr:** add Unpackerr as an application ([#85](https://github.com/kanso-labs/home-assistant-applications/issues/85)) ([d2c99c7](https://github.com/kanso-labs/home-assistant-applications/commit/d2c99c713b580df528caba744777daab49353c01))

## [1.0.0]

### Added

- Initial release, running Unpackerr 0.15.2.
