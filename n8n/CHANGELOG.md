# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/n8n-v1.1.0...n8n-v1.1.1) (2026-08-14)


### Bug Fixes

* **deps:** update dependency n8n to v2.34.6 ([#115](https://github.com/kanso-labs/home-assistant-applications/issues/115)) ([c338928](https://github.com/kanso-labs/home-assistant-applications/commit/c338928c9cc2155e0cf94f95664e868101ef3cae))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/n8n-v1.0.0...n8n-v1.1.0) (2026-08-12)


### Features

* **n8n:** add n8n as an Add-on ([53c36bd](https://github.com/kanso-labs/home-assistant-applications/commit/53c36bd742859414c041a75f3235ac3f1ba85399))
* release applications automatically when their version changes ([de30198](https://github.com/kanso-labs/home-assistant-applications/commit/de3019844252900ca5045a9f9e9d2ad9aa1425bc))


### Bug Fixes

* **deps:** update dependency n8n to v2.10.4 ([026ed22](https://github.com/kanso-labs/home-assistant-applications/commit/026ed22ab679c43e7f4a6c024c9ebef73cac23bf))
* **deps:** update dependency n8n to v2.2.4 ([ba280d1](https://github.com/kanso-labs/home-assistant-applications/commit/ba280d163eefae61b547bf514adab54ce04603c1))
* **deps:** update dependency n8n to v2.2.6 ([#26](https://github.com/kanso-labs/home-assistant-applications/issues/26)) ([38b1baf](https://github.com/kanso-labs/home-assistant-applications/commit/38b1bafa4f3e05b1649bb0b8d0348e0d78747a9b))
* **deps:** update dependency n8n to v2.34.4 ([7686db2](https://github.com/kanso-labs/home-assistant-applications/commit/7686db2f995c53c059c04bfc18b2dc17093e381b))
* **deps:** update dependency n8n to v2.34.5 ([#67](https://github.com/kanso-labs/home-assistant-applications/issues/67)) ([005f064](https://github.com/kanso-labs/home-assistant-applications/commit/005f064fe7ff445bffe56fa9bbf1176d9a2dd3b0))
* **n8n:** fix issues with Home Assistant integration ([d86df08](https://github.com/kanso-labs/home-assistant-applications/commit/d86df08b96ba676d808fc1f75f1707d74777b6f2))
* **n8n:** map /share read-only and translate every option ([b18bcfc](https://github.com/kanso-labs/home-assistant-applications/commit/b18bcfc1801ff9a3cd09a45502500a09a2f3e490))
* **n8n:** take backups cold and stream ingress responses ([2984c36](https://github.com/kanso-labs/home-assistant-applications/commit/2984c36d7bbae18abe0a2a0cb65426175015afcb))


### Code Refactoring

* **n8n:** replace Alpine base image with Ubuntu base image for add-on ([860a25b](https://github.com/kanso-labs/home-assistant-applications/commit/860a25bd164ea4244ce47ab9e1d953df79842798))

## [Unreleased]

### Added

- The log level and external module options now have names and descriptions in
  English and Brazilian Portuguese, so the configuration screen no longer shows
  them as raw keys.

### Changed

- Backups are now taken cold, so Home Assistant stops n8n for the duration
  rather than snapshotting a SQLite database that is being written to. The app
  is briefly unavailable while a backup runs.
- `/share` is now mapped read-only. n8n keeps its own state in `/data`, so the
  write access it previously held was never needed.
- Ingress responses are now streamed, so the editor's live execution updates
  reach the browser as they happen instead of being buffered.
- The published image is now the generic multi-architecture name
  `ghcr.io/kanso-labs/home-assistant-application-n8n`, replacing the
  per-architecture `{arch}` reference.
- The base image moved from `build.yaml` into the Dockerfile, which now carries
  a default `BUILD_FROM` so the build no longer depends on Supervisor supplying
  one.

### Fixed

- Renovate tracks the base image again. Its rule still pointed at `build.yaml`,
  which no longer exists, so nothing was watching the `BUILD_FROM` default in
  the Dockerfile that replaced it.
- The local development environment works again. The VS Code tasks and the
  devcontainer both targeted the retired add-on paths and CLI, so neither the
  workspace mount nor the install and rebuild tasks resolved.

### Removed

- `build.yaml`, which Home Assistant deprecated. Its base image and OCI labels
  now live in the Dockerfile.

## [1.0.0]

### Added

- Initial release.
