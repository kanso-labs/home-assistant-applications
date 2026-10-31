# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.3](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.6.2...wallos-v0.6.3) (2026-10-31)


### Bug Fixes

* update bellamy/wallos docker tag to v5.10.3 ([#937](https://github.com/kanso-labs/home-assistant-applications/issues/937)) ([ce0dcbd](https://github.com/kanso-labs/home-assistant-applications/commit/ce0dcbd15b1a0fd5f9c4eee82f73346b9f9fa4ef))


### Upstream changes

* **v5.10.3:** [**vuln:** stored XSS in admin context via unescaped push-service response in sendnotifications.php](https://github.com/ellite/Wallos/issues/1295) ([ce0dcbd](https://github.com/kanso-labs/home-assistant-applications/commit/ce0dcbd15b1a0fd5f9c4eee82f73346b9f9fa4ef))

## [0.6.2](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.6.1...wallos-v0.6.2) (2026-10-24)


### Bug Fixes

* update bellamy/wallos docker tag to v5.10.2 ([#874](https://github.com/kanso-labs/home-assistant-applications/issues/874)) ([ce9138b](https://github.com/kanso-labs/home-assistant-applications/commit/ce9138bafd6de651c02400ecf4b52c2c9ba1f9ba))


### Upstream changes

* **v5.10.2:** [**docker:** fall back to IPv4-only nginx when IPv6 is unavailable](https://github.com/ellite/Wallos/issues/1287) ([ce9138b](https://github.com/kanso-labs/home-assistant-applications/commit/ce9138bafd6de651c02400ecf4b52c2c9ba1f9ba))

## [0.6.1](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.6.0...wallos-v0.6.1) (2026-10-21)


### Bug Fixes

* update bellamy/wallos docker tag to v5.10.1 ([#853](https://github.com/kanso-labs/home-assistant-applications/issues/853)) ([a953f96](https://github.com/kanso-labs/home-assistant-applications/commit/a953f96b3aa3b809f8c5443e43d10af601505d59))


### Upstream changes

* **v5.10.1:** [**docker:** rebuild on php 8.3.36 to pick up the security release (CVE-2026-109618, CVE-2026-109619)](https://github.com/ellite/Wallos/commit/9e560ed091035b9524aca28e4e6026b2a1bac8f9) ([a953f96](https://github.com/kanso-labs/home-assistant-applications/commit/a953f96b3aa3b809f8c5443e43d10af601505d59))
* **v5.10.1:** [**docker:** rebuild on php 8.3.36 to pick up the security release (CVE-2026-109618, CVE-2026-109619)](https://github.com/ellite/Wallos/commit/a540a9e3146cdf689d88e2e5b2d2f8acbb1e064f) ([a953f96](https://github.com/kanso-labs/home-assistant-applications/commit/a953f96b3aa3b809f8c5443e43d10af601505d59))

## [0.6.0](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.5.1...wallos-v0.6.0) (2026-10-20)


### Features

* update bellamy/wallos docker tag to v5.10.0 ([#815](https://github.com/kanso-labs/home-assistant-applications/issues/815)) ([03ae5ce](https://github.com/kanso-labs/home-assistant-applications/commit/03ae5ceab6722f947afe389303224f4982a7cc3d))


### Upstream changes

* **v5.10.0:** [**bulk:** keep payer and category rows in step with bulk delete and set-category](https://github.com/ellite/Wallos/commit/b3a4d9879848e7d430d9f700fc2b8ec824dbab7c) ([03ae5ce](https://github.com/kanso-labs/home-assistant-applications/commit/03ae5ceab6722f947afe389303224f4982a7cc3d))
* **v5.10.0:** [**bulk:** polish the bulk toolbar and keep Apply disabled until it has something to apply](https://github.com/ellite/Wallos/commit/29b5b5d2a1e62ab97fbef0c817bf60e8e7037e55) ([03ae5ce](https://github.com/kanso-labs/home-assistant-applications/commit/03ae5ceab6722f947afe389303224f4982a7cc3d))
* **v5.10.0:** [**i18n:** rename default names when switching between any two languages](https://github.com/ellite/Wallos/commit/b3acdc0672aea5fa73a960c2f6617ef68065812b) ([03ae5ce](https://github.com/kanso-labs/home-assistant-applications/commit/03ae5ceab6722f947afe389303224f4982a7cc3d))

## [0.5.1](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.5.0...wallos-v0.5.1) (2026-10-19)


### Bug Fixes

* **wallos:** stream ingress uploads so a large backup can be restored ([#784](https://github.com/kanso-labs/home-assistant-applications/issues/784)) ([7877a7e](https://github.com/kanso-labs/home-assistant-applications/commit/7877a7ec89cc2c2b3918c995c03e9adebd437200))

## [0.5.0](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.4.0...wallos-v0.5.0) (2026-10-18)


### Features

* **wallos:** add a hosts option so sign-in can use Authentik's .local name ([#769](https://github.com/kanso-labs/home-assistant-applications/issues/769)) ([bbf17f0](https://github.com/kanso-labs/home-assistant-applications/commit/bbf17f09d35ef1b224786e1c61d6c4d509e4bad4))

## [0.4.0](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.3.0...wallos-v0.4.0) (2026-10-17)


### Features

* update bellamy/wallos docker tag to v5.9.0 ([#733](https://github.com/kanso-labs/home-assistant-applications/issues/733)) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))


### Bug Fixes

* **wallos:** stop asking GitHub for a new version ([#717](https://github.com/kanso-labs/home-assistant-applications/issues/717)) ([70d1909](https://github.com/kanso-labs/home-assistant-applications/commit/70d19096438ef6896959560d1933a491a1a81d21))


### Upstream changes

* **v5.8.4:** [**i18n:** complete Arabic translation and plural "days before" label](https://github.com/ellite/Wallos/issues/1266) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))
* **v5.9.0:** [**pwa:** rename the static cache when a script or stylesheet changes](https://github.com/ellite/Wallos/commit/1d37f898d458c97dee70c09767588a58e715af5b) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))
* **v5.9.0:** [**stats:** drop point labels and dates from the cost trend graph](https://github.com/ellite/Wallos/commit/3a1da1c00677766201588cae7baa247b112a1934) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))
* **v5.9.0:** [**subscriptions:** allow several categories per subscription](https://github.com/ellite/Wallos/commit/d750eacc6b6bb80bc25d365cd378671589d25ffb) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))
* **v5.9.0:** [**subscriptions:** allow several payers per subscription](https://github.com/ellite/Wallos/commit/faa0226801ca6fc85326efa212c33c8f19525798) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))
* **v5.9.0:** [**subscriptions:** show card actions as a 2x2 grid](https://github.com/ellite/Wallos/commit/a224dd2b2dc332673c3043aeb1095a364e8a4302) ([37dd15d](https://github.com/kanso-labs/home-assistant-applications/commit/37dd15da3c1363d966efdd0b9ae9eb443cebfe39))

## [0.3.0](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.2.0...wallos-v0.3.0) (2026-10-16)


### Features

* **wallos:** open Wallos through ingress ([#670](https://github.com/kanso-labs/home-assistant-applications/issues/670)) ([fd5c289](https://github.com/kanso-labs/home-assistant-applications/commit/fd5c289b33390f5ae5d6ee716bd927165826ceb7))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/wallos-v0.1.0...wallos-v0.2.0) (2026-10-12)


### Features

* **wallos:** add Wallos as an application ([#609](https://github.com/kanso-labs/home-assistant-applications/issues/609)) ([0f2ff7c](https://github.com/kanso-labs/home-assistant-applications/commit/0f2ff7c195e26eba40cb0d17e3c3cb1dbdd843f5))

## [0.1.0]

### Added

- Initial release, running Wallos 5.8.3.
