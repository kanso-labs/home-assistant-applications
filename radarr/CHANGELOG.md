# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
