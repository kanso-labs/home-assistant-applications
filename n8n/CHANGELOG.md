# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- The published image is now the generic multi-architecture name
  `ghcr.io/kanso-labs/home-assistant-application-n8n`, replacing the
  per-architecture `{arch}` reference.
- The base image moved from `build.yaml` into the Dockerfile, which now carries
  a default `BUILD_FROM` so the build no longer depends on Supervisor supplying
  one.

### Removed

- `build.yaml`, which Home Assistant deprecated. Its base image and OCI labels
  now live in the Dockerfile.

## [1.0.0]

### Added

- Initial release.
