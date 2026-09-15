# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-v1.1.3...bazarr-v1.1.4) (2026-09-15)


### Bug Fixes

* update dependency morpheus65535/bazarr to v1.6.1 ([#332](https://github.com/kanso-labs/home-assistant-applications/issues/332)) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))


### Upstream changes

* **v1.6.1:** ["no log: Revert update GitHub Actions to use `actions/download-artifact@v9`."](https://github.com/morpheus65535/bazarr/commit/983ed6b69361ff87cca3a9c92a5d470a92d99a66) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added animetosho xyz provider](https://github.com/morpheus65535/bazarr/pull/3445) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added audio language column to SeriesView and improved backend logic for parsing audio languages from episodes when retrieving series data, and audio_language is empty.](https://github.com/morpheus65535/bazarr/commit/c14fcda917d8752f6695b2b96d88d9c00989a75c) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added blacklisting of files that fail to decode due to parsing errors](https://github.com/morpheus65535/bazarr/commit/ab6dc34bbf494a61423c7b7cfbfe56f96ec03a60) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added database indexes to improve query performance for episodes and movies subtitles tables.](https://github.com/morpheus65535/bazarr/issues/3461) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added embedded subtitles manual extraction](https://github.com/morpheus65535/bazarr/commit/6e458ea3dbc54c0a73d56890e7c311b3857fc39e) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added index definitions to database model for improved query performance across multiple tables.](https://github.com/morpheus65535/bazarr/commit/74a2659010c72dd5e2edfa99083d3aaa2d5772cc) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added mass subtitles page poster view, improved pagination and UI selection](https://github.com/morpheus65535/bazarr/pull/3515) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added new history chart views and improve responsive layout](https://github.com/morpheus65535/bazarr/pull/3530) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added poster view](https://github.com/morpheus65535/bazarr/pull/3487) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added preview subtitle modal](https://github.com/morpheus65535/bazarr/pull/3478) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added randomized User-Agent header to PrijevodiOnline provider session initialization.](https://github.com/morpheus65535/bazarr/issues/3474) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added sort and filter](https://github.com/morpheus65535/bazarr/pull/3498) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added spotlight](https://github.com/morpheus65535/bazarr/pull/3418) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added SubsDump subtitles provider](https://github.com/morpheus65535/bazarr/commit/b26e644e75afa2b74198b2f63eb7f47a8375dde6) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added subtitle track duration to manual search to tell same-language embedded subtitles tracks apart](https://github.com/morpheus65535/bazarr/commit/5e823c88bd8e72962a0f3ad27783f3b198388829) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added SubtitleCat provider](https://github.com/morpheus65535/bazarr/commit/5054d83f276454c45cc0f41d7970c0ce33b26d7b) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added support for excluding hearing-impaired subtitles (non-HI languages profile mode)](https://github.com/morpheus65535/bazarr/commit/42a7a765a795378131e42dc4856b77741557b7b5) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added support for language equivalence in subtitles indexing and expanded desired and actual subtitles logic to account for custom and regional language mappings.](https://github.com/morpheus65535/bazarr/issues/2820) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added support for Traditional Chinese (`zh-tw`) in `fese/tags.py` and updated `fese` dependency to a custom fork with unmerged changes.](https://github.com/morpheus65535/bazarr/commit/671636b9265c9da4d8ab561d54152623a9fe23ff) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added translation of embedded subtitles and original-format preservation](https://github.com/morpheus65535/bazarr/commit/b1868e6ba4cd0124b49db4766ddccd385a592908) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Added validation to ensure subtitle modification applies only to `.srt` files and improved logging for unsupported file types.](https://github.com/morpheus65535/bazarr/issues/3501) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Adjusted settings provider responsive screen](https://github.com/morpheus65535/bazarr/commit/0be3a67a7ae254a68e492732804830bcb44fe970) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Aligned plex and jellyfin settings with design system](https://github.com/morpheus65535/bazarr/pull/3547) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Enhanced AvistazNetworkSubtitle with caching and added results in manual search](https://github.com/morpheus65535/bazarr/commit/2a6b658a305ef4ec5f3c233fd3fb5d2c081e3a8c) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed `throttled_count` never decaying, leaving providers with no retries after their first throttle](https://github.com/morpheus65535/bazarr/commit/0775346f0f423b2fa4737097de4aad2b669fda34) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed animetosho Brazilian Portuguese detection](https://github.com/morpheus65535/bazarr/commit/3c9bce9f5515ab5629a65ebde21df8eeaa08387b) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed AnimeTosho discarding distinct release associations that share the same attachment URL.](https://github.com/morpheus65535/bazarr/issues/3582) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed animetosho forced subtitles](https://github.com/morpheus65535/bazarr/pull/3580) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Brazilian Portuguese detection on animetosho_xyz](https://github.com/morpheus65535/bazarr/commit/5be026c07559e9ee00b9daad3fdf5a468c01a99b) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed default value handling in `calculate_score` to correctly distinguish `0` from `None`.](https://github.com/morpheus65535/bazarr/issues/3439) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed embedded subtitles handling by refining language fallback logic by taking disposition into account.](https://github.com/morpheus65535/bazarr/issues/3573) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Google translator baking errors into subtitles and silently swallowing per-line failures](https://github.com/morpheus65535/bazarr/commit/00ff1724a1c1ad4fcd45c082537177186f28791f) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed GreekSubs manual downloads with expired tokens](https://github.com/morpheus65535/bazarr/commit/14f901972a3dfdbf065f6c6a8bad0201a447ffd2) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed hdbits provider support for Swedish ("se") language mapping.](https://github.com/morpheus65535/bazarr/issues/3507) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed indexed embedded subtitles never being cleared when a rescan finds zero tracks](https://github.com/morpheus65535/bazarr/commit/3853ba3494895de5b2b41c6fd7606f78d894025c) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed job manager running job icon](https://github.com/morpheus65535/bazarr/pull/3452) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Ktuvit provider returning zero results when catalog entry has no ReleaseYear.](https://github.com/morpheus65535/bazarr/issues/3420) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed language code inconsistencies in profiles by converting ISO 639-3 to ISO 639-1 and updating missing subtitles.](https://github.com/morpheus65535/bazarr/issues/3549) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed language keys in `subsource` converter and updated language parsing logic to improve compatibility with regional variants.](https://github.com/morpheus65535/bazarr/issues/3481) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed LegendasNet search returning no results when name is incorrect despite a valid IMDb ID, and added RAR support.](https://github.com/morpheus65535/bazarr/commit/49fc02e28f5df15db58f6f151fc2e8a7ffb00355) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Lingarr translation with blank subtitle lines](https://github.com/morpheus65535/bazarr/commit/4feb61c88f3f0f140948a4e82a1f7b16caccd808) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed logging entire subtitle files when there's a UnicodeDecodeError on download](https://github.com/morpheus65535/bazarr/commit/0e7c286c884936fff6de1e4a686deb5e6abcfcac) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed mislabelling of Persian subtitles as hearing-impaired and improved log file redaction](https://github.com/morpheus65535/bazarr/commit/5f8b6b22304cdafd8c7c74c6de0994eb5dc0f054) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed missing icon tooltip](https://github.com/morpheus65535/bazarr/commit/b5f796e5fca69513ce60d6488188580cef63662e) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Movie and series actions](https://github.com/morpheus65535/bazarr/commit/a21c08bb51449c288a86b1f24672db38e424a84d) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed queries for history API and upgrading subtitles to prevent duplicate entries.](https://github.com/morpheus65535/bazarr/issues/3558) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed stale job manager](https://github.com/morpheus65535/bazarr/pull/3458) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed subdl provider not detecting hearing-impaired markers in release names](https://github.com/morpheus65535/bazarr/commit/3da207aa33c90b81020060b07dd8a08a7ccbd021) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed subf2m provider not finding subtitles for seasons 13, 14, 18 and 20 due to misspelled season names](https://github.com/morpheus65535/bazarr/commit/98f03219509ddf4fb005893b01e8555768b89f4c) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed subsource being throttled for one hour when its API reports a reset delay of seconds](https://github.com/morpheus65535/bazarr/commit/6cf215cd409de2bed641005d2ea1ff2a087f208e) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Subsource provider querying Brazilian Portuguese as generic Portuguese](https://github.com/morpheus65535/bazarr/commit/e0effeed3a3d3212d6b5153640d8479f8afd6804) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed subtitles modifications and post-processing to handle renamed files and properly update database when using remove HI mods.](https://github.com/morpheus65535/bazarr/commit/8c620790dac24130b521e937e9262e62c843b4ef) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed subtitles search when path and file ID are unchanged in movie and episode sync triggered by a SignalR event by deferring it until next scheduled task execution.](https://github.com/morpheus65535/bazarr/issues/3419) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed SuperSubtitles year matching](https://github.com/morpheus65535/bazarr/commit/8a39c60d2875615d9abaeb96e5b48e33790be9a2) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed sync issue with Sonarr API when it's unreachable](https://github.com/morpheus65535/bazarr/commit/f9bec077d6a68d50c53bb809ffa21fa38008bd66) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed syncing issue with Sonarr and Radarr on edge racing condition cases](https://github.com/morpheus65535/bazarr/commit/ea22d7a216aeef84a379a6153409faaf179a4ade) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed SyntaxWarning about `return` in a `finally` block following PEP 765.](https://github.com/morpheus65535/bazarr/commit/a2ee84136c66c98e85dbbf2ce53561507800b8af) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed table pagination](https://github.com/morpheus65535/bazarr/commit/5d5af6690d7dd343afc12368af5073567faff70a) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed Titrari repetitive subtitle descriptions issue](https://github.com/morpheus65535/bazarr/commit/b0c23e3ebddfc0d2ab84de3a9538efdf3ec4038d) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed track ID collision with changed attributes in embedded subtitles indexing.](https://github.com/morpheus65535/bazarr/issues/3588) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed translation of an embedded track in a single extract-and-translate job](https://github.com/morpheus65535/bazarr/commit/1e789acc415822c57e56519990ae05ae76c389ac) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed two point fit frozen modal](https://github.com/morpheus65535/bazarr/commit/db94ccc9a312f69e45979436b004defc00fa262d) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed type mismatch in Gemini translator by ensuring index comparison uses string conversion.](https://github.com/morpheus65535/bazarr/issues/3450) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed upload subtitle dropzone region](https://github.com/morpheus65535/bazarr/pull/3529) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed URL validation in series and movie image proxy endpoints to prevent SSRF attacks by validating URL schemes and verifying domain matching.](https://github.com/morpheus65535/bazarr/commit/5fc33435cdd3aa56f0990f9d50b788af3c450a73) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Fixed WhisperAI provider ignoring the configured ffmpeg_path when invoking ffprobe.](https://github.com/morpheus65535/bazarr/issues/3417) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improve settings provider integration required warning](https://github.com/morpheus65535/bazarr/pull/3447) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved blacklisting of individual subtitles in a list of subtitles, if there's a parse error in save_subtitles in subliminal](https://github.com/morpheus65535/bazarr/commit/9d853cfd10c3dab5dd169bcb9ed68a664a6f0644) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved Gestdown provider matching by adding year match when TVDb ID matches between video and subtitle source.](https://github.com/morpheus65535/bazarr/commit/9013092b5b0ceb74891f13532be595fc3d4ad0c1) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved Jimaku provider matching by selecting entries with exact AniList ID and logging unmatched results.](https://github.com/morpheus65535/bazarr/issues/3302) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved jobs manager UI](https://github.com/morpheus65535/bazarr/pull/3433) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved Lingarr title management for movie translation](https://github.com/morpheus65535/bazarr/commit/34982f89775d87b0ff918b613c6da9ddef80d3f2) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved logging in `LingarrTranslator` by adding source file details and increased API timeout to handle extended translation durations.](https://github.com/morpheus65535/bazarr/issues/3534) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved matching logic in AnimeSubInfo provider, refactored search strategies for episodes and movies and replaced hardcoded User-Agent with random selection from a predefined list.](https://github.com/morpheus65535/bazarr/issues/3130) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved OpenSubtitles API query by refining IMDb matching logic to properly match year when imdb does.](https://github.com/morpheus65535/bazarr/issues/3574) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved settings saving by queuing long-running jobs instead of waiting for them to complete before returning.](https://github.com/morpheus65535/bazarr/commit/93ba651316b42a93584ffdf9a1a3479f9cd630e9) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved SubDL provider resilience and runtime controls](https://github.com/morpheus65535/bazarr/commit/4c66b91bf5211f14ffd0baa734f940c8d63f5c18) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Improved subtitle encoding detection by introducing `detect_encoding` utility and handling non-UTF-8 subtitles files.](https://github.com/morpheus65535/bazarr/issues/3508) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Optimize subtitle update logic for movies and episodes by skipping unchanged `path` and `file_id` checks, reducing unnecessary disk usage to index already properly indexed subtitles.](https://github.com/morpheus65535/bazarr/issues/3419) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Patched the `deep_translator` module to allow custom user-agent to be used with Google Translate.](https://github.com/morpheus65535/bazarr/issues/3557) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Persist sidebar theme switch](https://github.com/morpheus65535/bazarr/pull/3476) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Prevent path traversal in PWA asset handling by validating resolved file paths before serving.](https://github.com/morpheus65535/bazarr/commit/9ea62688dfc2bd56ed11f6352653eaaf68c2f758) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Redesign language mappings settings](https://github.com/morpheus65535/bazarr/pull/3552) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Redesigned login page](https://github.com/morpheus65535/bazarr/pull/3532) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Refactored `postprocessing` to use `shlex.split` with `shell=False` under Windows, enhancing security against CWE-78 OS command injection scenarios.](https://github.com/morpheus65535/bazarr/commit/ff1f5c420fc2dc0922c0dd695bec085e2bd04a74) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Refactored AnimeSubInfo provider search logic to improve handling of episode patterns, alternative titles, and movie titles.](https://github.com/morpheus65535/bazarr/issues/3130) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Refactored subtitle loading to use `open` with specified encoding, improving readability and consistency.](https://github.com/morpheus65535/bazarr/issues/3514) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Refined session handling in form-based authentication to improve security and code consistency.](https://github.com/morpheus65535/bazarr/commit/e79e37d64070596f4e7f35908f8a8de78cb7313a) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Removed duplicated tuple-unwrapping checks from subtitle download, wanted, manual, and upgrade flows now that processing returns normalized results.](https://github.com/morpheus65535/bazarr/commit/dc1b19c1158297d8857a71f0e0f0a88cb6037a6e) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Removed obsolete tuple-unwrapping check from manual subtitle upload flow following processing normalization.](https://github.com/morpheus65535/bazarr/commit/11eee3519857e69fe83d8055f432bdfe827b83d0) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Split settings into tabs and categories](https://github.com/morpheus65535/bazarr/pull/3559) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Updated API key logging code to hide more secrets](https://github.com/morpheus65535/bazarr/commit/15174eba074d48a12b3a2eecfa5b78d9e1de992b) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Updated subliminal_patch's user-agent list with externally sourced values.](https://github.com/morpheus65535/bazarr/issues/3474) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))
* **v1.6.1:** [Updated vendored `fese` module to include upstream improvements.](https://github.com/morpheus65535/bazarr/issues/3184) ([4016e15](https://github.com/kanso-labs/home-assistant-applications/commit/4016e157598646fed168154a2bca4bb85e24dbd9))

## [1.1.3](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-v1.1.2...bazarr-v1.1.3) (2026-08-28)


### Bug Fixes

* **bazarr:** use the app_config map type Supervisor expects ([#228](https://github.com/kanso-labs/home-assistant-applications/issues/228)) ([427cefc](https://github.com/kanso-labs/home-assistant-applications/commit/427cefc1e12ec99b3c85ee2a4eaca3a9f8f60908))

## [1.1.2](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-v1.1.1...bazarr-v1.1.2) (2026-08-13)


### Bug Fixes

* stop reporting an error when an application is stopped ([#97](https://github.com/kanso-labs/home-assistant-applications/issues/97)) ([68291d3](https://github.com/kanso-labs/home-assistant-applications/commit/68291d3f87b7edd3204eabc29fdfdf71e0273836))

## [1.1.1](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-v1.1.0...bazarr-v1.1.1) (2026-08-12)


### Bug Fixes

* **bazarr:** pin to a Python version Bazarr supports ([#80](https://github.com/kanso-labs/home-assistant-applications/issues/80)) ([c353d3e](https://github.com/kanso-labs/home-assistant-applications/commit/c353d3e0418d35ce7bc91f6e47c41edb1287fe98))

## [1.1.0](https://github.com/kanso-labs/home-assistant-applications/compare/bazarr-v1.0.0...bazarr-v1.1.0) (2026-08-12)


### Features

* **bazarr:** add Bazarr as an application ([#62](https://github.com/kanso-labs/home-assistant-applications/issues/62)) ([53991aa](https://github.com/kanso-labs/home-assistant-applications/commit/53991aa65ece2d8f168f80c6c51ee2cb3deb34ff))


### Bug Fixes

* **deps:** update dependency morpheus65535/bazarr to v1.6.0 ([#66](https://github.com/kanso-labs/home-assistant-applications/issues/66)) ([e9e1372](https://github.com/kanso-labs/home-assistant-applications/commit/e9e137270667d4ab2f925180b3b4fd19e655b1c3))

## [1.0.0]

### Added

- Initial release, running Bazarr 1.5.2.
