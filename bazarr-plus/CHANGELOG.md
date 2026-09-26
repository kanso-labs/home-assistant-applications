# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-plus-v1.0.0...bazarr-plus-v1.0.1) (2026-09-26)


### Bug Fixes

* update ghcr.io/lavx/bazarr docker tag to v2.7.0 ([#445](https://github.com/kanso-labs/home-assistant-applications/issues/445)) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))


### Upstream changes

* **v2.7.0:** … 126 further changes are in the upstream release notes: https://github.com/LavX/bazarr/releases/tag/v2.7.0 ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Downloads are jobs**. Download queues a job with a readable name, and when the file is ready it saves itself with no second click and the row shows **Saved**. You do not have to wait on the page fo…](https://github.com/LavX/bazarr/issues/526) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**It answers while it searches**. Rows appear as each provider finishes, in the order they arrive, and you can download one while the rest are still working. On a real 36-provider install the first r…](https://github.com/LavX/bazarr/issues/520) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**It is honest about each provider**. A provider that cannot serve this request is shown apart from one that is unavailable, and a provider that never got to run is no longer reported as a timeout. A…](https://github.com/LavX/bazarr/issues/443) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**No nagging** (,). One line on Discover offers to connect a library, and you can close it for good.](https://github.com/LavX/bazarr/issues/496) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Nothing costs a provider call you did not ask for.** Browsing and refreshing Discover never contact a subtitle provider. Back and Forward restore a finished search without searching again, and a se…](https://github.com/LavX/bazarr/issues/513) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Preview before you commit**. A formatted preview opens right under the row you picked, with the original text one click away.](https://github.com/LavX/bazarr/issues/445) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Request it in Seerr**. If you run Seerr, Jellyseerr or Overseerr, a title page says what Seerr already knows and offers the matching action.](https://github.com/LavX/bazarr/issues/453) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Slow providers get 40 seconds**. A new install gives a search 40 seconds instead of 20, and rows still arrive as each provider answers, so the first results come no later; an existing install still…](https://github.com/LavX/bazarr/issues/558) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**Sonarr is never required.** Every library step is optional, and one you leave untouched writes nothing at all.](https://github.com/LavX/bazarr/issues/518) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**The app only shows what you have**. The sidebar lists Series, Movies and Sports per connected kind, so an install with no library has no dead-end pages, and an install running only Radarr gets Movi…](https://github.com/LavX/bazarr/issues/496) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** [**The wizard asks who you are first**. Right after Welcome it offers two honest paths: have subtitles fetched automatically for a Sonarr, Radarr or Sportarr library, or find subtitles for anything wi…](https://github.com/LavX/bazarr/issues/462) ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **Everything you already do for an episode works for a race.** Manual search and download, uploads, the subtitle editor, sync, translation, combine, scheduled work, Wanted, History, Excluded, global… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **Leagues and events, the way you think about them.** The Sports page lists your leagues; a league page lists its events by season, with audio languages, subtitles and per-event actions on each row.… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **One slow server does not hold up the rest.** Each server refreshes on its own background worker, with pending targets and **Retry pending** when it was unreachable. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **Profiles per league.** A league carries a language profile, set from **Change Profile** on the league or with **Mass Edit** across several, and that profile decides which languages its events look… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **Settings that fit sports.** Sportarr has its own minimum score for sports events, excluded tags, excluded sports, a monitored-only switch and search after sync, with global defaults and per-instanc… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **The subtitle shows up in your server.** After a download or upload, Bazarr+ asks every enabled server that holds the file to refresh it natively: Emby and Silo through their path mappings, Jellyfin… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** **Your media servers hear about it.** A new sports subtitle refreshes Plex and Jellyfin through their configured libraries, and Emby and Silo through their path mappings. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Add Sportarr under **Settings &gt; Connections &gt; Sportarr**, test it and save. Give a league a language profile from its page. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** If you run Seerr, add it under **Settings &gt; Connections &gt; Seerr**, then open a show you do not have. The season picker keeps what Seerr holds, what your library holds and what is left to request apar… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Land on Discover, search for a title and download a subtitle; it saves itself when it is ready. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Later, add Sonarr or Radarr under **Settings &gt; Connections** and watch the library half and its sidebar pages appear. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** On a league page, try **Combine across league** and watch it run as one job with per-item progress. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Open **Search details** under the results after a search finishes. It tells you how many providers searched, how many skipped the request and how many were unavailable. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Open an event and run a manual search, or open **Wanted** and let the missing sports subtitles queue up with everything else. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Start a fresh container, choose **subtitles for anything** on the wizard's second screen, pick your language and install the recommended providers. ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))
* **v2.7.0:** Type a film you do not own into the search bar, open its title page, pick a language and press **Find subtitles**. Watch rows arrive, open **Preview** on one, then **Download** it. The file saves its… ([02d91ba](https://github.com/kanso-labs/home-assistant-applications/commit/02d91ba4f6619235eb78481815506a40d48671cc))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-plus-v0.2.0...bazarr-plus-v1.0.0) (2026-09-23)


### Features

* **bazarr-plus:** document login, translation and profiles, and release 1.0.0 ([8ec96b6](https://github.com/kanso-labs/home-assistant-applications/commit/8ec96b6d596124544e0527c781a483346a13295a))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-plus-v0.1.0...bazarr-plus-v0.2.0) (2026-09-23)


### Features

* **bazarr-plus:** add Bazarr+ as an application ([#406](https://github.com/kanso-labs/home-assistant-applications/issues/406)) ([7a92e84](https://github.com/kanso-labs/home-assistant-applications/commit/7a92e8478b9d296a426018efc348c89fdbc072ad))

## [0.1.0]

### Added

- Initial release, running Bazarr+ 2.6.2.
