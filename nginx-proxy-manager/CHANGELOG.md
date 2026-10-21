# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.5](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.1.4...nginx-proxy-manager-v1.1.5) (2026-10-21)


### Dependencies

* update dependency nginx to v1.31.8-1~trixie ([#858](https://github.com/kanso-labs/home-assistant-applications/issues/858)) ([3e74726](https://github.com/kanso-labs/home-assistant-applications/commit/3e747268ead0b6df0d681fc3dbe82410c3c35820))
* update dependency nodejs to v22.23.4-1nodesource1 ([#851](https://github.com/kanso-labs/home-assistant-applications/issues/851)) ([7d7c41e](https://github.com/kanso-labs/home-assistant-applications/commit/7d7c41ec2977e5200b3eb65726156ffe8231c412))

## [1.1.4](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.1.3...nginx-proxy-manager-v1.1.4) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.1.2...nginx-proxy-manager-v1.1.3) (2026-10-18)


### Bug Fixes

* **nginx-proxy-manager:** add a health check so a hung proxy can be restarted ([#759](https://github.com/kanso-labs/home-assistant-applications/issues/759)) ([6232fc0](https://github.com/kanso-labs/home-assistant-applications/commit/6232fc06493808d57db4442d4ab8337a19cec021))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.1.1...nginx-proxy-manager-v1.1.2) (2026-10-17)


### Bug Fixes

* **nginx-proxy-manager:** update nginx to 1.31.7 and keep it current ([#698](https://github.com/kanso-labs/home-assistant-applications/issues/698)) ([f0611d2](https://github.com/kanso-labs/home-assistant-applications/commit/f0611d2c36d38c1cbf6a500a8ff0c29e4596653b))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.1.0...nginx-proxy-manager-v1.1.1) (2026-09-24)


### Bug Fixes

* update dependency nginxproxymanager/nginx-proxy-manager to v2.16.0 ([#422](https://github.com/kanso-labs/home-assistant-applications/issues/422)) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))


### Upstream changes

* **v2.16.0:** [jc21/nginx-proxy-manager:2.16.0](https://hub.docker.com/layers/jc21/nginx-proxy-manager/2.16.0/images/sha256-57d85bffc776c01909c7b24e127a69a72b7d8c75d387e6cb26c762978fc43e4c) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** [jc21/nginx-proxy-manager:2](https://hub.docker.com/layers/jc21/nginx-proxy-manager/2/images/sha256-57d85bffc776c01909c7b24e127a69a72b7d8c75d387e6cb26c762978fc43e4c) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** [jc21/nginx-proxy-manager:latest](https://hub.docker.com/layers/jc21/nginx-proxy-manager/latest/images/sha256-57d85bffc776c01909c7b24e127a69a72b7d8c75d387e6cb26c762978fc43e4c) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇦🇿 Add Azerbaijani locale (thanks jamalkamaladdin) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇩🇪 Updated German locale (thanks CallMeLeon167) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇪🇪 Updated Estonian locale (thanks siimaarmaa) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇮🇷 Add Persian locale (thanks zalaghi) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇹🇷 Updated Turkish locale (thanks qwist1233-cpu) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** 🇺🇦 Add Ukrainian locale (thanks tapacko88) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Add a Logs viewer to the UI (thanks carlosalbertorg) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Add LWS DNS certbot plugin (thanks zergflag) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Add reuseport to improve performance and reduce packet drops (thanks 7heMech) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Add Tencent Cloud EdgeOne DNS certbot plugin (thanks hurole) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Changed order of escape to prevent RCE (thanks Yasha-ops) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Collapse custom locations into a filterable list (thanks fatihemre) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fix config changes not taking effect (thanks vgoer) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fix Insufficient private key permissions (thanks vgoer) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fix missing new on PermissionError so denied requests return 403, not 404 (thanks timothestoifl24) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fix streams bracket IPv6 forward host for valid nginx upstream (thanks addielaruee) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fix Tencent Cloud apex and wildcard certificate issuance (thanks xzy103) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Fixed Estonian flag bug (thanks quokkawiki) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Invalidate tokens issued before a password change (thanks jmrplens) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Keep the failed nginx config as a .conf.err file (thanks vzagorovskiy) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Per-path access lists in Proxy Host modal (thanks drakhaw) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Redirect authenticated login visits to dashboard (thanks hulkbig) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Remove broken sorting from Audit Logs (thanks 12LuA) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Remove DNS provider credentials from disk after certbot runs (thanks shawnhank) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Update s6 overlay to support podman socket activation (thanks fo5for) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Updated Azure DNS certbot plugin to certbot-dns-azure-modern (thanks cloudchristoph) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Updated Timeweb Cloud certbot plugin (thanks frenck) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Updated Websupport DNS plugin (thanks setrin) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Use local QR code generation to prevent leaking 2FA keys to third-parties (thanks vgoer) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))
* **v2.16.0:** Use the row's own model and host type in regenerate-config (thanks vzagorovskiy) ([a8a8321](https://github.com/kanso-labs/home-assistant-applications/commit/a8a8321866cfa8dfaa76cdc4be1214cb38cf76f0))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/nginx-proxy-manager-v1.0.0...nginx-proxy-manager-v1.1.0) (2026-09-22)


### Features

* **nginx-proxy-manager:** add Nginx Proxy Manager as an application ([#390](https://github.com/kanso-labs/home-assistant-applications/issues/390)) ([16fa28a](https://github.com/kanso-labs/home-assistant-applications/commit/16fa28a798fcd238c4510b5a01e3f6816fd4d8e2))

## [1.0.0]

### Added

- Initial release, running Nginx Proxy Manager 2.15.1.
