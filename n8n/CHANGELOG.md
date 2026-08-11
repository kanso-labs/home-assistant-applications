# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Backups are now taken cold, so Home Assistant stops n8n for the duration
  rather than snapshotting a SQLite database that is being written to. The app
  is briefly unavailable while a backup runs.
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
