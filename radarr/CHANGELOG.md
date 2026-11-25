# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v2.0.0...radarr-v2.0.1) (2026-11-25)


### Dependencies

* update home assistant base images ([#1149](https://github.com/kanso-labs/home-assistant-applications/issues/1149)) ([4768960](https://github.com/kanso-labs/home-assistant-applications/commit/4768960e80d2dc1e9c68c6315782b8502af88e32))

## [2.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.10...radarr-v2.0.0) (2026-11-16)


### ⚠ BREAKING CHANGES

* update dependency radarr/radarr to v7 ([#1058](https://github.com/kanso-labs/home-assistant-applications/issues/1058))

### Features

* update dependency radarr/radarr to v7 ([#1058](https://github.com/kanso-labs/home-assistant-applications/issues/1058)) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))


### Upstream changes

* **v7.0.3.10918:** [`0623578` New: Support PEM format for SSL certificates](https://github.com/Radarr/Radarr/commit/062357828fc34f955a23f93af0195c2e3a25d24c) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`08924f0` Split media info migration into batches for lower memory usage](https://github.com/Radarr/Radarr/commit/08924f0ffacfe83aa37237129851c87bab9455ae) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`092e725` Fixed: Matching searched movie by IMDb ID from indexer results  ](https://github.com/Radarr/Radarr/issues/12048) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`0a097de` Fixed: update every matching Plex section](https://github.com/Radarr/Radarr/commit/0a097deb192a6b72b84c23dc18c2c0d68a0678fe) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`0b87f5a` Bump FluentMigrator to 7.2](https://github.com/Radarr/Radarr/commit/0b87f5aefb8a66481082d69a3048fba6ff1545d8) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`0bd7dde` Bump .NET to 10.0.15](https://github.com/Radarr/Radarr/commit/0bd7ddef172c121733d5d4156b5b960d6f47ece6) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`0cd2fc2` New: Display multiple audio and subtitles streams in media info](https://github.com/Radarr/Radarr/commit/0cd2fc2ce43cf49434b6bd1ea94e660de02b5e98) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`0d0cb8f` Fix filename builder for files without streams](https://github.com/Radarr/Radarr/commit/0d0cb8f75eb976a2ccbb0f68e5a68735c5d199cc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`100c247` Display 'None' for empty subtitles streams](https://github.com/Radarr/Radarr/commit/100c24710925928f92e8e96ad7c39f9fc0e0185a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`11b5916` Display the Radarr icon in ntfy notifications](https://github.com/Radarr/Radarr/commit/11b5916e7ad70bebe87a00f9129da2bfc75eba3e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`13a7260` Fix calculating custom score using renamed filename before manual importing](https://github.com/Radarr/Radarr/commit/13a7260a0d60627921a2dc963ee10359f6d48145) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`14afe52` Ignore command body when deserializing command resource](https://github.com/Radarr/Radarr/commit/14afe52869afee0c2e93ea4fe39330c3070197c5) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`1b1aa2a` Bump to 7.0.3](https://github.com/Radarr/Radarr/commit/1b1aa2af592618de048e70f502a275c6213e31f5) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`1b7edb3` New: Full Transmission label support](https://github.com/Radarr/Radarr/commit/1b7edb3240aca3acfc167770e3bae1a4f3bbaf34) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`220db30` Fix option key for Disabled For Localhost](https://github.com/Radarr/Radarr/commit/220db30c8ba156d486f02c224ac669c10af0862e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`22c5119` Reduce log noise in HttpHappyEyeballs](https://github.com/Radarr/Radarr/commit/22c51196045910b75cde851fa90c6057855577c3) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`250b50f` Default to `und` for audio streams with no language tag](https://github.com/Radarr/Radarr/commit/250b50f135837c7244ead64394bd04efe0682dae) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`28900a8` Fixed: Manual Interaction - Required notifications failing for unknown movies](https://github.com/Radarr/Radarr/issues/11716) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`2c205ed` Restrict ImageSharp decoders and suppress 3.x advisories](https://github.com/Radarr/Radarr/commit/2c205edecafb96b852d62e5743b8adc4e8dd8494) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`2f64b5c` Fixed: Don't log Postgres password during database migration](https://github.com/Radarr/Radarr/commit/2f64b5cf6c4e183d395dc889b4bb0e2dc209c1c2) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`2fc6df4` Cleanse email addresses from logs](https://github.com/Radarr/Radarr/commit/2fc6df4f618c29936e9a83171415fa755fc863bc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`30a212e` Bump FluentMigrator to 8.0.1](https://github.com/Radarr/Radarr/commit/30a212e2834100dbde3ee58ba2f95b2721a2285e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`31f9e41` Fix DbLogger unregister](https://github.com/Radarr/Radarr/commit/31f9e416668cdfd0a6a43efbc2c11045154ac4fe) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`35538cb` Exclude expired entries from cached values](https://github.com/Radarr/Radarr/commit/35538cb5ed0e26f6b14342bfee404803fb87177a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`3aa3c47` New: Sorting movies index and discover by popularity](https://github.com/Radarr/Radarr/commit/3aa3c47d815a4a95fcad2a67ed586e05b05da634) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`3eea106` Fixed: Avoid marking grab as failed when qBittorrent already has that release](https://github.com/Radarr/Radarr/commit/3eea106e1718a2a68be2a682d3cdaa117aedc89e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`3fc9ca8` Bump nodejs to 24](https://github.com/Radarr/Radarr/commit/3fc9ca86e60560973d82cc3508c8761e54dd4929) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`4105182` Only split JSON up to the failing line when building error snippet](https://github.com/Radarr/Radarr/commit/4105182a7644e6805e71084cc18ed35f52359244) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`418db91` Bump to 7.0.1](https://github.com/Radarr/Radarr/commit/418db91e9c656d4996410d5451550ddcf843fb30) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`479b6f2` Compact JSON responses for API endpoints](https://github.com/Radarr/Radarr/commit/479b6f2a17b5e5b0378659bc27401750f10829a7) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`4c08c2c` Use Happy Eyeballs for HTTP socket address selection](https://github.com/Radarr/Radarr/commit/4c08c2cfc1ed1a9e49df0cda5031ac58e25a3197) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`4d2fef5` Ignore dotnet-tools generated by dotnet new manifest](https://github.com/Radarr/Radarr/commit/4d2fef5ee679a1f1b74e6dea3a65a88bf597d029) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`4d9bd47` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/4d9bd475cabadfd2e74b7fcdf50b281c3b70adbe) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`4e4a818` New: Remove deprecated Kometa metadata](https://github.com/Radarr/Radarr/commit/4e4a818311bca63d15cbba0063cf82bbe4e94d0b) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`52ad720` Fixed: Trakt audio channels formatted with host culture](https://github.com/Radarr/Radarr/commit/52ad720223ecf28623016e8c46580625422d987a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`5404ff7` New: OIDC authentication](https://github.com/Radarr/Radarr/commit/5404ff78b62360f030aa72c5c53160dd3f041c80) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`56004a2` Bump version to 7.0.0](https://github.com/Radarr/Radarr/commit/56004a2792e6257fbac74f43978e07c850dbfb8a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`5642604` TypedResults for API v3 endpoints](https://github.com/Radarr/Radarr/commit/56426048e3595b6b8c3025638e7b0013c2c9ec64) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`56f6168` New: Trakt Smart List import list](https://github.com/Radarr/Radarr/commit/56f6168bb6f254c9a34d0e5da76040dcb4215d3d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`5c31e55` Fixed: Prevent upgrades for not yet scanned deleted files with unmonitor deleted movies on](https://github.com/Radarr/Radarr/commit/5c31e55f3fc66e561cc689ba9b2f97dfadfad00f) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`62c6add` Add place-content to stylelint properties order](https://github.com/Radarr/Radarr/commit/62c6addd04969f02cdaa2490c7608e792ecfa9de) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`6475650` Bump to 7.0.2](https://github.com/Radarr/Radarr/commit/6475650706390c6cca0186b7f56e5e61a2efa41c) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`65c3361` New: Add Irish language](https://github.com/Radarr/Radarr/commit/65c3361701ff1bb67ef41d8a4b594ef28cd44123) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`663e879` Bump Mono.Unix to 7.1.0](https://github.com/Radarr/Radarr/commit/663e879027805580f6971ab375bdbe7d66740a1a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`6694658` Collect three tests that NUnit was never running](https://github.com/Radarr/Radarr/commit/6694658e1b195b98a9dd21a3e3ff587bee7840bf) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`66eff5d` Fixed: Parse DTS-HD MA + DTS:X as DTS-X in media info](https://github.com/Radarr/Radarr/commit/66eff5df238343656d56c3396e75895d165c51b9) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`693a183` Update renamed generator id for PostgreSQL in FluentMigrator](https://github.com/Radarr/Radarr/commit/693a183e4fbc5873ce040c7c9be8abc8ada300c0) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`6c8f16e` New: Removed Special Handling of Reflinks for BTRFS and ZFS](https://github.com/Radarr/Radarr/commit/6c8f16ed150f5bb6d480fba52c8db5344a036546) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7462166` Fixed redirection to login page for forms authentication](https://github.com/Radarr/Radarr/commit/74621669eda11d8a68a4e7662b615348c776012a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7556e07` Bump Ical.Net to 5.2.3](https://github.com/Radarr/Radarr/commit/7556e071cee3e8dfd1431818989d43043352dfcc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7852431` Fixed: Don't cache media covers that aren't downloaded](https://github.com/Radarr/Radarr/commit/7852431ea7505d6061a367e2a4924c18143e0f6a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7879a63` Update API docs](https://github.com/Radarr/Radarr/commit/7879a635dd5ae22e41bbe75dd39b6aadfe2e2358) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7bfa867` Bump coverlet.collector to 10.1.0](https://github.com/Radarr/Radarr/commit/7bfa8674488e4692f359697d6e85db38cb78e552) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7c27228` Deserialize JSON with STJson directly from UTF-8 bytes](https://github.com/Radarr/Radarr/commit/7c27228226611d442bcd365b6700c704163aaf8e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`7e3f80c` Bump FFMpegCore to 6.0.0](https://github.com/Radarr/Radarr/commit/7e3f80c98d01481430ab356f6d7322fc5dc381ee) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`803e102` Fix edition tags capitalization for mm scans](https://github.com/Radarr/Radarr/commit/803e10274cf23464d429b0b5af4606c4b89e3793) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`80d97a3` Import qBittorrent single-file torrents from root_path](https://github.com/Radarr/Radarr/commit/80d97a33ef36da0337e3235d8287037f32c9157b) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`8324542` New: Bump FFMpegCore to 5.4.0 and FFprobe to 8.0.1](https://github.com/Radarr/Radarr/commit/8324542894d58cf8a02125c30f4f96cb43a2106e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`83d36c3` Deserialize typed HTTP responses from bytes instead of a string copy](https://github.com/Radarr/Radarr/commit/83d36c36d621b1b82cc747599ecbc895a610fdf5) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`896c642` Fixed: Interactive search failing when a release couldn't be processed](https://github.com/Radarr/Radarr/commit/896c64259a41ffbc94035f6cd230c3d42a4cf880) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`89f5aaa` Remove postcss-url](https://github.com/Radarr/Radarr/commit/89f5aaa354b9d8414ca68ec582e7551263865064) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`8fcea50` Suppress additional ImageSharp 3.x advisory](https://github.com/Radarr/Radarr/commit/8fcea506a134aac831f8d18ec09c556531505add) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`901733b` Fallback to host sqlite3 on FreeBSD and Linux](https://github.com/Radarr/Radarr/commit/901733bac74cc260fadfd1dd82d4a4da1e78f1c2) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`905bffa` Bump FFMpegCore to 5.5.0 and FFprobe to 9.0.2](https://github.com/Radarr/Radarr/commit/905bffa23764c8219c626380b137ae2f0b716b2e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`928e887` New: Add custom headers to Ntfy.sh connection](https://github.com/Radarr/Radarr/commit/928e8871ccad6a899e9d99781a54fcf17ab7c3d9) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`9315619` Convert General Settings to TypeScript](https://github.com/Radarr/Radarr/commit/931561900a7c2a56eecb78e25fae6f4b9b3d51f3) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`940e75e` Migrate mediainfo per movie file one at the time to avoid OOM](https://github.com/Radarr/Radarr/commit/940e75e77f191364463a38eb63e62942aeb9bcb1) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`9751205` Test postgres 15, 16 and 18](https://github.com/Radarr/Radarr/commit/97512050d20ecb2c9163a9b0f0ce4b7a7b5a6f2b) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`9925802` New: Allow bypassing authentication for Localhost](https://github.com/Radarr/Radarr/commit/99258026555fe0a94d30fed33fcd4826ae29e76d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`9c7c341` New: Calculate custom score using renamed filename before importing](https://github.com/Radarr/Radarr/commit/9c7c341c0490c048f3db4e426f303ff83b326398) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`9d078f1` Fix blank UI page](https://github.com/Radarr/Radarr/commit/9d078f11370237692e8ba84cadd9fdac268287a9) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a07ba41` Fix Event handling on disposed Container](https://github.com/Radarr/Radarr/commit/a07ba4195ed3eceeb170f1bce49346078e1e8eb3) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a25c682` Bump Microsoft.NET.Test.Sdk to 18.11.0](https://github.com/Radarr/Radarr/commit/a25c6821939b369c752cda1a3f23322e3a230c4d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a3fb071` Use default page size recommended by the indexer](https://github.com/Radarr/Radarr/commit/a3fb071ae9f630520fd0e116649f617b94d1a398) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a51b544` Update corejs version in babel/preset-env](https://github.com/Radarr/Radarr/commit/a51b544c8166dd6493ad23c1d702d8dac9e68398) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a8b8547` Improve nullable analysis for IsNullOrWhiteSpace and IsNotNullOrWhiteSpace](https://github.com/Radarr/Radarr/commit/a8b85470ac1c5d44952430f6efc1e67ce34ea997) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`a8d55dd` Update API docs](https://github.com/Radarr/Radarr/commit/a8d55ddd7ab318081d60cd3351f60aa3697fc9b6) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`ab15f7d` Bump webpack to 5.112 and moment to 2.31](https://github.com/Radarr/Radarr/commit/ab15f7d6dcd902798f05c2e4aee1b6a99abf140a) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`ac202fc` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/ac202fc088d52a8533fb5ca25410177ea8dcd92d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`ac83535` Fixed: Wildcard IP addresses in Allowed Hosts](https://github.com/Radarr/Radarr/commit/ac835352d86751f2f22a467125f3934dd2b65006) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`af772b0` New: Replace HTML Encoded values in release titles](https://github.com/Radarr/Radarr/commit/af772b051ac27a0615c7f8b7f78622b6dc183be0) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`af7814f` Fixed: NZBGet history message showing {scriptStatus} token](https://github.com/Radarr/Radarr/commit/af7814f7a89ea46f21522f0a1b8bcdcf7644b8bf) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`afcd13a` Add folder paths to Manual Import buttons](https://github.com/Radarr/Radarr/commit/afcd13abf247e99833f2771f64d39dad7e5ff92d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b18a3eb` Fix media info on movie file details](https://github.com/Radarr/Radarr/commit/b18a3eb9e49f919d3574db879d48347bdfd5a4af) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b1ed767` Improve rejection message for import failures due to permissions](https://github.com/Radarr/Radarr/commit/b1ed767ea5deda7f4db6b00f7f4fd1bdf556f657) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b3396e2` Clear all expired cache entries periodically](https://github.com/Radarr/Radarr/commit/b3396e2fd872c03a07b2bc98144715ae1bd88032) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b5f3eeb` Include error message for import failures](https://github.com/Radarr/Radarr/commit/b5f3eeb996282ea1fd714474ee4c7b561f40cdcc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b67cdf4` Fixed: Issue extracting subtitle information for unknown movies](https://github.com/Radarr/Radarr/commit/b67cdf4c2f64cb824ed8a4d51af39efdaed5a7ed) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b6aa629` Remove dotnet-bsd nuget feed](https://github.com/Radarr/Radarr/commit/b6aa629e967f5e31cc85ff66c764b330fe3940dc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`b9afb26` Cleanup downloads removed from client](https://github.com/Radarr/Radarr/commit/b9afb26be5822fb3e28038f157ac1a0f85611c5b) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`c0a0be6` Drop codec Id from audio streams in API response](https://github.com/Radarr/Radarr/commit/c0a0be6dde11ec4c9576366a7623322ea2a08775) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`c7c6369` New: Bump .NET to 10](https://github.com/Radarr/Radarr/commit/c7c636925a715400c6f6e1797933ea9f6d02df6d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`c8d8ed2` Improve restart required behavior](https://github.com/Radarr/Radarr/commit/c8d8ed221f968d7038603fa330eb1fea9087f258) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`c90668a` Reset loaded state for movie images when URL changes](https://github.com/Radarr/Radarr/commit/c90668a520664ad0c91812cfee57c41928ad2148) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`c9e04d3` Refresh browser after resetting API Key](https://github.com/Radarr/Radarr/commit/c9e04d36e23be39a3ce1cba044d3dfeb231e7b39) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`cb59779` Disable response cache in authentication endpoints](https://github.com/Radarr/Radarr/commit/cb59779cf8413afc05715d5389313e29244e85dc) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`cd0c9c4` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/cd0c9c448aca1fde2ed5b89ba165e1ef3a450078) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`d3d8753` Add external nuget feed for dotnet-freebsd](https://github.com/Radarr/Radarr/commit/d3d8753813cc5cecea1344f23b306b24bfc0f855) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`db28e1b` Enable Call async methods when in an async method](https://github.com/Radarr/Radarr/commit/db28e1b410f8187168112792ed89a6bfa20a8c95) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`df2faa6` Pin System.Security.Cryptography.Pkcs to 10.0.13](https://github.com/Radarr/Radarr/commit/df2faa64c75e6081556d11232dc46523e7264ea1) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`e02945a` Remember Me for OIDC login](https://github.com/Radarr/Radarr/commit/e02945a4d491fdf3496fa7d617224d78d2a7548e) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`e77fd33` Bump .NET to 10.0.14](https://github.com/Radarr/Radarr/commit/e77fd33e82d1d80f1cc58c7a5ebd959a90210299) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`e92d5df` Send full certificate chain](https://github.com/Radarr/Radarr/commit/e92d5df9a35e65cbd61609ce5c17f28976f79276) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`f324ff8` Improve System action labels for screen readers](https://github.com/Radarr/Radarr/commit/f324ff8835830a8080a8796841aca2868d45f6ca) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`f42742b` Detailed progress bar enabled by default for movies and collections index](https://github.com/Radarr/Radarr/commit/f42742bb526de60a8145bfdd11620024eecc62ad) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`f5af5db` Fallback to name tag in media info stream titles for mp4](https://github.com/Radarr/Radarr/commit/f5af5db636767f695be1efc6f56be969ef3e15b5) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`f5ccd1c` New: Option to show Rotten Tomatoes rating in Discover overview view](https://github.com/Radarr/Radarr/commit/f5ccd1ca7888b70d43fc22d0108154aa753deba8) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`f7e51f8` Avoid DNS resolution for IP addresses in Happy Eyeballs](https://github.com/Radarr/Radarr/commit/f7e51f8172ff2277ac0da0d02e9321e97122a50d) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))
* **v7.0.3.10918:** [`fed9f78` Prevent missing media info from failing script import](https://github.com/Radarr/Radarr/commit/fed9f7833cdf96a203ce1d6c5e842bb3c6d63b38) ([12bc9b2](https://github.com/kanso-labs/home-assistant-applications/commit/12bc9b2546429ee85fa8eb15e71ef57a8367f7fd))

## [1.2.10](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.9...radarr-v1.2.10) (2026-11-06)


### Dependencies

* update home assistant base images ([#976](https://github.com/kanso-labs/home-assistant-applications/issues/976)) ([5f2ec80](https://github.com/kanso-labs/home-assistant-applications/commit/5f2ec803f448bc342a49456c16a791e9f692e951))

## [1.2.9](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.8...radarr-v1.2.9) (2026-10-28)


### Dependencies

* update home assistant base images ([#903](https://github.com/kanso-labs/home-assistant-applications/issues/903)) ([52aeb10](https://github.com/kanso-labs/home-assistant-applications/commit/52aeb1093dd34c03a25d6be2ae74e8aa0739e673))

## [1.2.8](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.7...radarr-v1.2.8) (2026-10-27)


### Dependencies

* update home assistant base images ([#895](https://github.com/kanso-labs/home-assistant-applications/issues/895)) ([2e56129](https://github.com/kanso-labs/home-assistant-applications/commit/2e56129b54b52a90c7b6451271e7652b13427f6d))

## [1.2.7](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.6...radarr-v1.2.7) (2026-10-22)


### Dependencies

* update home assistant base images ([#862](https://github.com/kanso-labs/home-assistant-applications/issues/862)) ([27cd3d7](https://github.com/kanso-labs/home-assistant-applications/commit/27cd3d7a8a69b41003cecd79e5bd19e1fe9caacb))

## [1.2.6](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.5...radarr-v1.2.6) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.2.5](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.4...radarr-v1.2.5) (2026-10-19)


### Bug Fixes

* **radarr:** keep https in sign-in redirects behind ingress or a proxy ([#775](https://github.com/kanso-labs/home-assistant-applications/issues/775)) ([f9da5f4](https://github.com/kanso-labs/home-assistant-applications/commit/f9da5f4254f800b50ab3b1284444f42319ea4028))

## [1.2.4](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.3...radarr-v1.2.4) (2026-10-18)


### Bug Fixes

* **radarr:** restore large backups through ingress, and stop crash reports ([#739](https://github.com/kanso-labs/home-assistant-applications/issues/739)) ([7548ad0](https://github.com/kanso-labs/home-assistant-applications/commit/7548ad0edf61d3e95fb13216382e8cdcf8323b91))

## [1.2.3](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.2...radarr-v1.2.3) (2026-10-17)


### Bug Fixes

* **radarr:** require sign-in again behind a reverse proxy ([#690](https://github.com/kanso-labs/home-assistant-applications/issues/690)) ([6d95729](https://github.com/kanso-labs/home-assistant-applications/commit/6d95729e660dc83776898384ca21a9afceab7941))

## [1.2.2](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.1...radarr-v1.2.2) (2026-10-16)


### Bug Fixes

* **radarr:** keep the ingress path out of the home address ([#679](https://github.com/kanso-labs/home-assistant-applications/issues/679)) ([f06def3](https://github.com/kanso-labs/home-assistant-applications/commit/f06def3a2b4298cae966cc2acf9c166d61bc46ca))

## [1.2.1](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.2.0...radarr-v1.2.1) (2026-10-16)


### Bug Fixes

* **radarr:** read the ingress path with bashio::app ([#664](https://github.com/kanso-labs/home-assistant-applications/issues/664)) ([fc04153](https://github.com/kanso-labs/home-assistant-applications/commit/fc04153983107cb30afda78ecb9a80a69039b085))

## [1.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.1.3...radarr-v1.2.0) (2026-10-16)


### Features

* **radarr:** open Radarr through ingress ([#658](https://github.com/kanso-labs/home-assistant-applications/issues/658)) ([8274163](https://github.com/kanso-labs/home-assistant-applications/commit/82741637d12c3dc22c1d75bfea8bff812cd5c28b))

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.1.2...radarr-v1.1.3) (2026-09-23)


### Bug Fixes

* update dependency radarr/radarr to v6.4.4.10685 ([#414](https://github.com/kanso-labs/home-assistant-applications/issues/414)) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))


### Upstream changes

* **v6.4.4.10685:** [`0220f0d` Log warning if hardlinking failed and fallbacks to copy](https://github.com/Radarr/Radarr/commit/0220f0daa9f68ffa40e5f0fe1ce4f909858ceba4) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`0283449` Remove unused package references](https://github.com/Radarr/Radarr/commit/02834499f47b077f63b993df3d8ec6af6e5ff5f4) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`02ef5f5` Bump to 6.4.3](https://github.com/Radarr/Radarr/commit/02ef5f56d54aaf46216b6718fd3591ad253548e5) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`04e27cb` Bump Sentry to 5.16.3](https://github.com/Radarr/Radarr/commit/04e27cb264104973e531cf5226430dabf5611786) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`0c78421` Fix disposing of the HttpRequestMessage](https://github.com/Radarr/Radarr/commit/0c78421d553f8395fee14171892da60650123c97) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`109f88d` New: Use translations for days of week](https://github.com/Radarr/Radarr/commit/109f88d7b50a4ba9b1a8430dfafa0b5e0d6fc451) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`15369ed` New: RQBit download client  ](https://github.com/Radarr/Radarr/issues/11180) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`1737a71` Fix log message for MinCustomFormatScore rejection](https://github.com/Radarr/Radarr/commit/1737a7166976e077dc288081c3b47a85ac4ee79a) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`1906cfb` Fixed: Format of timestamps for Discord notifications from some systems](https://github.com/Radarr/Radarr/commit/1906cfb3819b6e9f603642020c6a7d689c8e5352) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`2089d4a` Avoid suppresing search for movies errors](https://github.com/Radarr/Radarr/commit/2089d4a33f2ffe0151cbab5ebb3b7ec48af3c34c) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`223dc18` Fix modals on iOS](https://github.com/Radarr/Radarr/commit/223dc1862d980517554acea36541a06c13ee27db) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`25062f2` Fix queue not showing items with issues](https://github.com/Radarr/Radarr/commit/25062f2d7aec0bcc83551f48e94836fa658c28ef) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`255f38d` Fixed: Refactor showing grabbed/blocklisted releases in Interactive Search](https://github.com/Radarr/Radarr/commit/255f38dce817a5a2fb0cdc9b9476324725dc75b3) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`25eeec3` Query options support for useApiQuery](https://github.com/Radarr/Radarr/commit/25eeec39b5c43422e2e81cae3758a902890d9e40) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`2c24d9b` Fixed: Trakt OAuth URL](https://github.com/Radarr/Radarr/commit/2c24d9b4aafd00dedea4505119060c242c0963be) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`2cfc781` Fixed: Ignore invalid languages during Manual Import](https://github.com/Radarr/Radarr/commit/2cfc781f85c6fb0355f4c37da5c68d86616e7bdf) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`2d1ff13` Fixed: Error when fetching non-existing tags in import script](https://github.com/Radarr/Radarr/commit/2d1ff13c1b16b3625e91dfa445c63b8f98b3959a) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`3287f8e` New: Search movies by original title from page header](https://github.com/Radarr/Radarr/commit/3287f8e14ae5204604fb12d8fc1101b77903d35a) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`32d9cd9` Fixed: Exclude streaming extensions for probing media info](https://github.com/Radarr/Radarr/commit/32d9cd9ea736664326e536bc7641beb7754089b8) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`34b0f54` Fixed: Parse Celdra as release group](https://github.com/Radarr/Radarr/commit/34b0f5450fdc346cc72cf18669e601d68b974250) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`35d3532` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/35d35321fbe79c41ceae647659ed889af006b1f6) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`36d8492` Bump frontend dependencies](https://github.com/Radarr/Radarr/commit/36d8492959846d4189b60375835d48ce6e4e2dd2) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`387d43d` New: Add Trusted Networks setting](https://github.com/Radarr/Radarr/commit/387d43d7aecc3dfa63f780bf93a72e0966aab319) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`39c172d` Bump NUnit to 4.5.1](https://github.com/Radarr/Radarr/commit/39c172d827a3738af4a2d9e951c7c52ce7153d77) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`3fcf0db` Don't skip health check if Allowed Hosts is set to *](https://github.com/Radarr/Radarr/commit/3fcf0db80f396059ffc1a4c513075a88a7816080) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`40bb746` Fixed: Connecting to Jellyfin 12+](https://github.com/Radarr/Radarr/issues/11663) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`45da623` Fixed: Re-grabbing a torrent that was already imported should re-import](https://github.com/Radarr/Radarr/commit/45da623c777c2451bff5684718832952925f2be3) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`48a61bf` Bump to 6.4.4](https://github.com/Radarr/Radarr/commit/48a61bf63aabac13446c3792a1d6e0ec8ccd741d) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`516ca59` Restore auto width behavior from previous FontAwesome versions](https://github.com/Radarr/Radarr/commit/516ca5979e0b2ed776778e9b73158aec0a456c96) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`598f989` Bump to 6.4.2](https://github.com/Radarr/Radarr/commit/598f989ad1163b3ed21ef57880ba8ba4d1b07e51) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`5e8e532` Fix malformed cookie test](https://github.com/Radarr/Radarr/commit/5e8e532cd3cecdd3645a4c44148a88a3c26713b1) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`68b93db` Fixed: Importing single files from Freebox](https://github.com/Radarr/Radarr/commit/68b93db78cb7a648d61a486d94eae703242e1e36) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`69f8cea` Fixed: Improve cache busting for covers using a hash instead of file modification time](https://github.com/Radarr/Radarr/commit/69f8ceaeb59021be314d7790a5eb1f38b99f10da) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`6a1c500` Fixed: Broken Trakt links](https://github.com/Radarr/Radarr/commit/6a1c50028457d45712316d06b1c07f5387987835) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`6bb8ede` Remove offensive joke about a sensitive topic](https://github.com/Radarr/Radarr/commit/6bb8edeafdf71829249702f0e85cd8d6c7809a5c) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`7004fe8` Produce distinct values in aggregated movie stats from Postgres](https://github.com/Radarr/Radarr/commit/7004fe8b3eee3f0280ea440dd6f59e576e0692b1) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`72ae0c0` Add reason to health check](https://github.com/Radarr/Radarr/commit/72ae0c011dc3297b6b5b9feb8971da28977f510c) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`750247f` Defer deserialize JSON response resource with Lazy](https://github.com/Radarr/Radarr/commit/750247fbe7dbcaa06b3b95ef52286b7c314d46f8) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`7946e7b` Fixed: Switch theme automatically on system change](https://github.com/Radarr/Radarr/commit/7946e7bd2cec7a67227c642ab9c9fa61ef1c14c5) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`80bbaa6` Fixed: Parsing quality and languages when manual importing item with multiple movies error](https://github.com/Radarr/Radarr/commit/80bbaa6e413c84dc901b090d33ecc66190e7d83b) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`91c6dc4` New: Add hostname validation](https://github.com/Radarr/Radarr/commit/91c6dc4eac9883e8389145ff4728858442502212) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`92f24bc` Fixed: Improve logging for 'Allowed Hosts' and 'Trusted Networks'](https://github.com/Radarr/Radarr/commit/92f24bcdb96def15923779e277afea878ee0de3a) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`94ef97b` Improve zip extraction](https://github.com/Radarr/Radarr/commit/94ef97b1f1187aeeca20d658a747620df8980238) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`9910767` Fixed: Unexpected languages stored in DB will be treated as Unknown](https://github.com/Radarr/Radarr/commit/9910767f58b0d9beb3b7fa671ed4695487d917d3) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`9d81413` Wrap bulk UpdateMany/SetFields in a transaction](https://github.com/Radarr/Radarr/commit/9d814137c12dae035e95ee14e3a2c079ce7d20db) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`9f0328d` Update major version to 6.4.1](https://github.com/Radarr/Radarr/commit/9f0328d31781b488659fa33119b5a0fd5419da1d) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`a117783` Bump FluentAssertions to 7.2.2](https://github.com/Radarr/Radarr/commit/a11778302bc04e9d60b7d1d0c640c423272deb0b) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`a598695` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/a598695ecd70c95b38f4f9efcd1dbe12cccd2f49) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`a96bf7c` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/a96bf7c3ecb23cb76993770727285dc17a613fbc) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`aae657b` Convert getLanguageName to hook](https://github.com/Radarr/Radarr/commit/aae657b160787f1f3765d3ba5abbd6adb3a06f47) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`b8a3923` Fixed: Parsing anime releases that contain year in the movie title](https://github.com/Radarr/Radarr/commit/b8a3923bce9d80eccc0abcbc0cbb4ff4091e7999) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`bdd5a72` Multiple Translations updated by Weblate](https://github.com/Radarr/Radarr/commit/bdd5a726071630f408c85fe1b716c5bef108d513) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`c3f0654` Fix allowed hosts check check on config file changes](https://github.com/Radarr/Radarr/commit/c3f0654984994145deeb6bfbdd77654653fd2224) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`c52c7f4` New: Filter movies by movie file quality](https://github.com/Radarr/Radarr/commit/c52c7f438764e793529e0cdbfdcc12400ff6fc35) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`c53ccac` Bump swiper to 14.1.0](https://github.com/Radarr/Radarr/commit/c53ccacbce65ed6c61e802038213413d720e0bc6) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`c6fef43` Return maximum long value on overflow getting disk information](https://github.com/Radarr/Radarr/commit/c6fef4309de3ffdd5e0e9607ad30beb12d791333) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`c7cf91c` Fixed: Trakt import list crash on watchlist entry with null TMDB ID  ](https://github.com/Radarr/Radarr/issues/11519) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`ca45160` Bump sqlite to 3.53.4](https://github.com/Radarr/Radarr/commit/ca451608dc60c6cec754aba8d96bfa30e9468ed5) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`d2d9dce` Fix parsing already imported items from download clients](https://github.com/Radarr/Radarr/commit/d2d9dce33baf969ee5801820ee7cdac25d5b8b89) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`dbcb327` New: Include External IDs for movies with links](https://github.com/Radarr/Radarr/commit/dbcb327a1134d26d2feb9b4589ee8c7b2dafb1ae) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`de48113` Bump to 6.4.0](https://github.com/Radarr/Radarr/commit/de4811318ef1eb6560a5e480cc4bba2afc008ca9) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`e575ec5` Add isSaving to createSettingsSectionSelector](https://github.com/Radarr/Radarr/commit/e575ec5e5e856ebbfeef1c4c1f9b55a86e0d1641) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`e80abdd` Improve external restart handling](https://github.com/Radarr/Radarr/commit/e80abdd603ffbdcfc48615f824488f7c7402424f) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`ec1e57d` Fixed: Validate source, modifier and resolution specifications](https://github.com/Radarr/Radarr/commit/ec1e57d05c87cd5d85117f8e1a2eeeb2a768c2fb) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`f3bb632` Ignore case for rating type enums](https://github.com/Radarr/Radarr/commit/f3bb6321cdee98cf8f22c80acc26d847bd4ecba8) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`f5102d3` Fix build due to low disk space](https://github.com/Radarr/Radarr/commit/f5102d31592ff2f2d8ec4c9ca01eae200db1be20) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`f62cb92` Display external ID only for main movie link group](https://github.com/Radarr/Radarr/commit/f62cb92c105b761c142cedfef2e3eed024f6e922) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`fb908fd` Remove configuring as service duplicated PostgresOptions](https://github.com/Radarr/Radarr/commit/fb908fd5f4861a529e6d60e12ee0a214e24c80ef) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))
* **v6.4.4.10685:** [`fd8eb4d` Fixed: Don't allow pushed releases to bypass pending releases that recently expired](https://github.com/Radarr/Radarr/commit/fd8eb4d1593f05b3025b17a61265cbc6593d8e91) ([4e593fb](https://github.com/kanso-labs/home-assistant-applications/commit/4e593fb54810387aae5b17da1cdcecf7506640a1))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.1.1...radarr-v1.1.2) (2026-08-28)


### Bug Fixes

* **radarr:** use the app_config map type Supervisor expects ([#235](https://github.com/kanso-labs/home-assistant-applications/issues/235)) ([c454536](https://github.com/kanso-labs/home-assistant-applications/commit/c454536276f1360cedc748afdb4d2db379b66011))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.1.0...radarr-v1.1.1) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/radarr-v1.0.0...radarr-v1.1.0) (2026-08-12)


### Features

* **radarr:** add Radarr as an application ([f71f0b4](https://github.com/kanso-labs/home-assistant-applications/commit/f71f0b476a617fad0416ae130007b3b8845bc20d))
* release applications automatically when their version changes ([de30198](https://github.com/kanso-labs/home-assistant-applications/commit/de3019844252900ca5045a9f9e9d2ad9aa1425bc))


### Bug Fixes

* **radarr:** use addon_config, which is what the linter accepts ([7cd7ec9](https://github.com/kanso-labs/home-assistant-applications/commit/7cd7ec99ed1cda2ab3973eea9c990f9f152ae166))

## [1.0.0]

### Added

- Initial release, running Radarr 6.3.0.10514.
