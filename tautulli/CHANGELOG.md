# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0](https://github.com/kanso-labs/home-assistant-applications/compare/tautulli-v0.2.3...tautulli-v0.3.0) (2026-11-11)


### Features

* update dependency tautulli/tautulli to v2.19.1 ([#1013](https://github.com/kanso-labs/home-assistant-applications/issues/1013)) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))


### Upstream changes

* **v2.19.0:** [Change: Renamed ETA on activity cards to Ends At.](https://github.com/Tautulli/Tautulli/issues/2574) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [Fix: Changing admin HTTP password did not log out existing sessions. (Thanks spjoes)](https://github.com/Tautulli/Tautulli/issues/2868) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [Fix: Dolby Vision Profile and Level notification parameters should be blank when not present.](https://github.com/Tautulli/Tautulli/issues/2381) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [Fix: Newsletter scheduler crash when local timezone cannot be resolved.](https://github.com/Tautulli/Tautulli/issues/2889) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [Fix: Telegram notifications shown as failed in the notification logs when a poster with a caption is sent. (Thanks PilaScat)](https://github.com/Tautulli/Tautulli/issues/2852) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [Fix: Truncate long titles in export filenames.](https://github.com/Tautulli/Tautulli/issues/2777) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added ability to disable Tautulli login and only allow Plex OAuth login.](https://github.com/Tautulli/Tautulli/issues/2092) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added feature to archive users and libraries while keeping their history.  (Thanks akonopcz)](https://github.com/Tautulli/Tautulli/issues/1435) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added Homebrew Cask installation method for macOS. (Thanks manakbisht)](https://github.com/Tautulli/Tautulli/issues/2867) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added item counts to recently added newsletter parameters.](https://github.com/Tautulli/Tautulli/issues/1787) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added Letterboxd URL notification parameter.](https://github.com/Tautulli/Tautulli/issues/1904) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added Reply-To header to email notification agent.](https://github.com/Tautulli/Tautulli/issues/1702) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Added weeks and years time frame options for newsletters.](https://github.com/Tautulli/Tautulli/issues/2042) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Allow selecting multiple media types for recently added on the homepage.](https://github.com/Tautulli/Tautulli/issues/2733) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Improved Tautulli log messages to include full traceback for errors.](https://github.com/Tautulli/Tautulli/issues/2760) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** [New: Log IP address of failed login attempts.](https://github.com/Tautulli/Tautulli/issues/2092) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Change: Only allow X-Api-Key header for `/api` and `/auth/signin`. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Alert message for an expired Plex token not showing up. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Broken collections click through link to Plex Web on media info pages. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Collections composite poster not showing on media info pages. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: CSRF via State-Changing GET Endpoints Allows Administrative Actions. (CVE-2026-TBD) (Thanks zaara2004) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Deep links for Plex Android / iOS app notifications not working. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Do not allow custom newsletter templates inside the newsletter output folder. (Thanks SHAHID-XT) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Escape media info fields in the Media Info tables. (CVE-2026-TBD) (Thanks Cbdlll) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Escape playlist titles in the Playlist tables. (CVE-2026-TBD) (Thanks Cbdlll) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Escape subtitle language on the activity cards. (CVE-2026-TBD) (Thanks Cbdlll) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Filtering history tables on collections and playlist media info pages showed incorrect results. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Generating self-signed SSL certificates not working. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: GIT_PATH command injection. (SHAHID-XT) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Some default settings were reset to disabled after completing the setup wizard. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: SSRF in /pms_image_proxy via unrestricted external image URL handling. (CVE-2026-TBD) (Thanks larlarua) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Fix: Unable to save blank newsletter subject, body, or message. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Installs without a password set will generate a temporary random password on upgrade. The temporary login info can be found in the Tautulli log file. Please change the password in the settings after… ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added ability to restore deleted users/libraries from the users/libraries tables in edit mode. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added Ace editor for editing notification text. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added CPU architecture to the system analytics data. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added deleted_section and is_archived to get_libraries_table API response. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added deleted_user and is_archived to get_users_table API response. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added Flatpak installation method for Linux. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added include_archived parameter to all history and statistics API commands. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added include_last_triggered parameter to get_notifiers API command. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added is_archived to get_user, get_users, get_user_names, get_library, and get_library_names API responses. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added live TV notification exclusion tag. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added row_ids parameter to undelete_user and undelete_library API commands. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Added user_is_archived and library_is_archived to get_history API response. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Generate a temporary random login password on existing installs if no password is set. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Generate a temporary random login password on new installs to access the setup wizard. (CVE-2026-TBD) (Thanks SHAHID-XT) ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: get_recently_added API command now accepts a comma separated list of media types. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Major database optimizations and performance improvements. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Refuse non-local clients when no password is set. This can be disabled by setting allow_public_no_password = 1 in the config file. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Update Docker image, and Windows and MacOS packages to Python 3.14. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** New: Various UI fixes and improvements. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Note: Archived users and libraries are excluded from all history and statistics by default. They can be shown using the "Show Archived Data" button in the navigation bar dropdown menu. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Removed: /delete_duplicate_libraries endpoint removed. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Removed: Drop support for arm/v6 Docker image. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Removed: Drop support for macOS 10.13 and 10.14 for the Intel x86_64 installer package. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Removed: OneSignal notifications for Tautulli Remote App. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Removed: PlexWatch and Plexivity importers removed. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.0:** Support for Python 3.10 has been dropped. The minimum Python version is now 3.11. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))
* **v2.19.1:** Fix: Snap package not starting. ([5946059](https://github.com/kanso-labs/home-assistant-applications/commit/59460590cb5f583a6a247a3e112e63123c2038f1))

## [0.2.3](https://github.com/kanso-labs/home-assistant-applications/compare/tautulli-v0.2.2...tautulli-v0.2.3) (2026-11-06)


### Dependencies

* update home assistant base images ([#976](https://github.com/kanso-labs/home-assistant-applications/issues/976)) ([5f2ec80](https://github.com/kanso-labs/home-assistant-applications/commit/5f2ec803f448bc342a49456c16a791e9f692e951))

## [0.2.2](https://github.com/kanso-labs/home-assistant-applications/compare/tautulli-v0.2.1...tautulli-v0.2.2) (2026-10-28)


### Dependencies

* update home assistant base images ([#903](https://github.com/kanso-labs/home-assistant-applications/issues/903)) ([52aeb10](https://github.com/kanso-labs/home-assistant-applications/commit/52aeb1093dd34c03a25d6be2ae74e8aa0739e673))

## [0.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/tautulli-v0.2.0...tautulli-v0.2.1) (2026-10-27)


### Dependencies

* update home assistant base images ([#895](https://github.com/kanso-labs/home-assistant-applications/issues/895)) ([2e56129](https://github.com/kanso-labs/home-assistant-applications/commit/2e56129b54b52a90c7b6451271e7652b13427f6d))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/tautulli-v0.1.0...tautulli-v0.2.0) (2026-10-26)


### Features

* **tautulli:** add Tautulli as an application ([#889](https://github.com/kanso-labs/home-assistant-applications/issues/889)) ([c6e6629](https://github.com/kanso-labs/home-assistant-applications/commit/c6e6629bdaea57cd164ceea2a9a3391b26637bdc))

## [0.1.0]

### Added

- Initial release, running Tautulli 2.18.2.
