# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.15](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.14...traefik-v1.0.15) (2026-11-13)


### Bug Fixes

* update dependency traefik/traefik to v3.7.19 ([#1046](https://github.com/kanso-labs/home-assistant-applications/issues/1046)) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))


### Upstream changes

* **v3.7.19:** [**accesslogs** Remove nonexistent access log fields ( kunalvirwal)](https://github.com/traefik/traefik/pull/14255) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))
* **v3.7.19:** [**http3** Bump github.com/quic-go/quic-go to v0.65.0 ( amazon7737)](https://github.com/traefik/traefik/pull/14258) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))
* **v3.7.19:** [**metrics** Fix TOML examples and StatsD defaults in metrics reference ( ZainnQureshii)](https://github.com/traefik/traefik/pull/13991) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))
* **v3.7.19:** [**middleware** Bump github.com/klauspost/compress to v1.20.4 ( Neffi42)](https://github.com/traefik/traefik/pull/14254) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))
* **v3.7.19:** [**server** Bump golang.org/x/crypto to v0.59.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/14271) ([435685b](https://github.com/kanso-labs/home-assistant-applications/commit/435685b59309ab5b2e67adf545c7ba366006c358))

## [1.0.14](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.13...traefik-v1.0.14) (2026-11-10)


### Bug Fixes

* update dependency traefik/traefik to v3.7.18 ([#1005](https://github.com/kanso-labs/home-assistant-applications/issues/1005)) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))


### Upstream changes

* **v3.7.18:** [**authentication** Limit BasicAuth password length ( Neffi42)](https://github.com/traefik/traefik/pull/14168) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**authentication** Support connection-bound authentication schemes in Proxy-Authorization ( Neffi42)](https://github.com/traefik/traefik/pull/14203) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**k8s/ingress-nginx** Apply host-less auth-tls annotations to the default TLS option ( rtribotte)](https://github.com/traefik/traefik/pull/14224) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**k8s/ingress-nginx** Apply Ingress NGINX CORS before the redirect annotations ( lazerg)](https://github.com/traefik/traefik/pull/14093) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**k8s/ingress-nginx** Fix Ssl-Client-* headers when Ingresses share a host ( Neffi42)](https://github.com/traefik/traefik/pull/14160) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**k8s/ingress-nginx** List missing ingress-nginx annotations as unsupported ( lazerg)](https://github.com/traefik/traefik/pull/14163) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**k8s/knative** Bump knative.dev/pkg to v0.0.0-20261102011501-7b6dcbbe4ea4 ( kevinpollet)](https://github.com/traefik/traefik/pull/14220) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**middleware, performance** Limit zstd encoder memory in the Compress middleware ( juliens)](https://github.com/traefik/traefik/pull/14167) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**middleware** Accept uppercase Q weight in compress Accept-Encoding parsing ( locker95)](https://github.com/traefik/traefik/pull/14153) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**middleware** Bump github.com/vulcand/oxy to v2.3.2 ( ldez)](https://github.com/traefik/traefik/pull/14241) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**middleware** Fix grammar in observability and InFlightReq pages ( m-shahi)](https://github.com/traefik/traefik/pull/14209) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**middleware** Use a Secret for basicAuth in the Chain middleware Kubernetes example ( lazerg)](https://github.com/traefik/traefik/pull/14143) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**plugins** Bump github.com/traefik/yaegi to v0.16.3 ( juliens)](https://github.com/traefik/traefik/pull/14231) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**plugins** Fix deterministic randomness in WASM plugins ( yugfletcher)](https://github.com/traefik/traefik/pull/14107) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**plugins** Fix typos in plugin type error and documentation ( sarankumar1325)](https://github.com/traefik/traefik/pull/14186) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**server, grpc** Add regression test for gRPC bidirectional streams ( ozenyunus35)](https://github.com/traefik/traefik/pull/14037) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**server** Resolve dot-segments and empty segments with path parameters ( Neffi42)](https://github.com/traefik/traefik/pull/14188) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**server** Validate HTTP Host matcher values ( Milad93R)](https://github.com/traefik/traefik/pull/13571) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**service** Fix SPIFFE configuration for the TCP servers transport ( simpleqt)](https://github.com/traefik/traefik/pull/14200) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [**tcp** Detect TCP connection reset on read when the error is wrapped ( noakky)](https://github.com/traefik/traefik/pull/14046) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Add version to the dot-segments migration note ( kevinpollet)](https://github.com/traefik/traefik/pull/14248) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Fix broken anchors in providers overview, SPIFFE and v3 migration docs ( SatvikMishra08)](https://github.com/traefik/traefik/pull/14027) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Fix dead and redirecting external links ( rachana5)](https://github.com/traefik/traefik/pull/14139) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Fix Docker Hub link in README ( GUOZIJAN)](https://github.com/traefik/traefik/pull/14198) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Move AI assistance disclosure to the pull request description ( Neffi42)](https://github.com/traefik/traefik/pull/14194) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))
* **v3.7.18:** [Update download and GitHub star counts ( tomatokoolaid)](https://github.com/traefik/traefik/pull/14193) ([4b80592](https://github.com/kanso-labs/home-assistant-applications/commit/4b80592a22b5f81557bd421b7dc126078d955479))

## [1.0.13](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.12...traefik-v1.0.13) (2026-11-06)


### Dependencies

* update home assistant base images ([#976](https://github.com/kanso-labs/home-assistant-applications/issues/976)) ([5f2ec80](https://github.com/kanso-labs/home-assistant-applications/commit/5f2ec803f448bc342a49456c16a791e9f692e951))

## [1.0.12](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.11...traefik-v1.0.12) (2026-10-30)


### Bug Fixes

* update dependency traefik/traefik to v3.7.17 ([#934](https://github.com/kanso-labs/home-assistant-applications/issues/934)) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))


### Upstream changes

* **v3.7.17:** [**acme** Bump github.com/go-acme/lego/v5 to v5.6.0 ( ldez)](https://github.com/traefik/traefik/pull/14166) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**acme** Bump github.com/go-jose/go-jose/v4 to v4.1.6 ( Mheaus)](https://github.com/traefik/traefik/pull/14165) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**docker** Update Docker Basic guide to use Traefik v3.7 ( Saku0512)](https://github.com/traefik/traefik/pull/14141) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**http3** Bump github.com/quic-go/quic-go to v0.64.1 ( janpachol)](https://github.com/traefik/traefik/pull/14132) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**k8s/gatewayapi** Preserve Gateway status conditions owned by other controllers ( Neffi42)](https://github.com/traefik/traefik/pull/14128) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**k8s/ingress-nginx** Avoid generated name collisions across namespaces in the ingress-nginx provider ( Neffi42)](https://github.com/traefik/traefik/pull/14140) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**logs, k8s/gatewayapi** Lower user configuration error logs to debug ( rtribotte)](https://github.com/traefik/traefik/pull/14159) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**middleware, authentication, k8s/crd, k8s, k8s/ingress-nginx** Resolve secret references when building middlewares ( sdelicata)](https://github.com/traefik/traefik/pull/14083) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**middleware** Bump github.com/andybalholm/brotli to v1.2.7 ( albe2669)](https://github.com/traefik/traefik/pull/14137) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**middleware** Fix broken flush, hijack, and deadlines in wrapped ResponseWriters ( Neffi42)](https://github.com/traefik/traefik/pull/14082) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**security** Point security announcements to GitHub advisories ( nmengin)](https://github.com/traefik/traefik/pull/14099) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**server, fastproxy** Fix FastProxy backend connection leak for NTLM and Kerberos ( juliens)](https://github.com/traefik/traefik/pull/14158) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**server** Add an entry point option to limit the number of request header values ( juliens)](https://github.com/traefik/traefik/pull/14111) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**server** Add global default for aliasHeadersStrategy ( nikolas-sapa)](https://github.com/traefik/traefik/pull/13919) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**server** Bump golang.org/x/net to v0.62.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/14176) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))
* **v3.7.17:** [**server** Fix backend connection leak for NTLM and Kerberos authentication ( juliens)](https://github.com/traefik/traefik/pull/14144) ([dd855eb](https://github.com/kanso-labs/home-assistant-applications/commit/dd855ebc16cd88fcbd377deef953d8305480a368))

## [1.0.11](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.10...traefik-v1.0.11) (2026-10-28)


### Dependencies

* update home assistant base images ([#903](https://github.com/kanso-labs/home-assistant-applications/issues/903)) ([52aeb10](https://github.com/kanso-labs/home-assistant-applications/commit/52aeb1093dd34c03a25d6be2ae74e8aa0739e673))

## [1.0.10](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.9...traefik-v1.0.10) (2026-10-27)


### Dependencies

* update home assistant base images ([#895](https://github.com/kanso-labs/home-assistant-applications/issues/895)) ([2e56129](https://github.com/kanso-labs/home-assistant-applications/commit/2e56129b54b52a90c7b6451271e7652b13427f6d))

## [1.0.9](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.8...traefik-v1.0.9) (2026-10-22)


### Dependencies

* update home assistant base images ([#862](https://github.com/kanso-labs/home-assistant-applications/issues/862)) ([27cd3d7](https://github.com/kanso-labs/home-assistant-applications/commit/27cd3d7a8a69b41003cecd79e5bd19e1fe9caacb))

## [1.0.8](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.7...traefik-v1.0.8) (2026-10-20)


### Bug Fixes

* update dependency traefik/traefik to v3.7.16 ([#828](https://github.com/kanso-labs/home-assistant-applications/issues/828)) ([b08e270](https://github.com/kanso-labs/home-assistant-applications/commit/b08e270bca04c213039201d7ccd1100145865fb8))


### Upstream changes

* **v3.7.16:** [**authentication, service, k8s/ingress-nginx** Support NTLM and Kerberos in ForwardAuth and ingress-nginx auth-url ( juliens)](https://github.com/traefik/traefik/pull/14091) ([b08e270](https://github.com/kanso-labs/home-assistant-applications/commit/b08e270bca04c213039201d7ccd1100145865fb8))
* **v3.7.16:** [**authentication, service** Support NTLM and Kerberos authentication in ForwardAuth ( juliens)](https://github.com/traefik/traefik/pull/14084) ([b08e270](https://github.com/kanso-labs/home-assistant-applications/commit/b08e270bca04c213039201d7ccd1100145865fb8))
* **v3.7.16:** [**k8s/gatewayapi** Fix Gateway API conformance suite setup with the containerd image store ( Neffi42)](https://github.com/traefik/traefik/pull/14089) ([b08e270](https://github.com/kanso-labs/home-assistant-applications/commit/b08e270bca04c213039201d7ccd1100145865fb8))
* **v3.7.16:** [**k8s/ingress-nginx** Document that rewrite is supported in configuration-snippet ( bingtang9)](https://github.com/traefik/traefik/pull/14070) ([b08e270](https://github.com/kanso-labs/home-assistant-applications/commit/b08e270bca04c213039201d7ccd1100145865fb8))

## [1.0.7](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.6...traefik-v1.0.7) (2026-10-20)


### Dependencies

* pin dependencies ([#807](https://github.com/kanso-labs/home-assistant-applications/issues/807)) ([e0dcf16](https://github.com/kanso-labs/home-assistant-applications/commit/e0dcf16b1da605e23394313d9f5e5143f8f6a6f5))

## [1.0.6](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.5...traefik-v1.0.6) (2026-10-19)


### Bug Fixes

* **traefik:** keep file routers off the sidebar dashboard's port ([#778](https://github.com/kanso-labs/home-assistant-applications/issues/778)) ([39afe3a](https://github.com/kanso-labs/home-assistant-applications/commit/39afe3a2621b4196cabd7adccca91f6f6adc37a1))

## [1.0.5](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.4...traefik-v1.0.5) (2026-10-18)


### Bug Fixes

* **traefik:** add a health check on Traefik's ping ([#767](https://github.com/kanso-labs/home-assistant-applications/issues/767)) ([22c9ab8](https://github.com/kanso-labs/home-assistant-applications/commit/22c9ab88f59b3af1d3ae4e1e3893d7a515dfbe9c))

## [1.0.4](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.3...traefik-v1.0.4) (2026-10-17)


### Bug Fixes

* **traefik:** serve a renewed certificate without a restart ([#713](https://github.com/kanso-labs/home-assistant-applications/issues/713)) ([9581545](https://github.com/kanso-labs/home-assistant-applications/commit/9581545f4b918c36303154623de32aca9f4a9c65))

## [1.0.3](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.2...traefik-v1.0.3) (2026-10-16)


### Bug Fixes

* update dependency traefik/traefik to v3.7.15 ([#654](https://github.com/kanso-labs/home-assistant-applications/issues/654)) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))


### Upstream changes

* **v3.7.15:** [**fastproxy** Add a non-regression test for CR/LF in FastProxy request headers ( mturac)](https://github.com/traefik/traefik/pull/13642) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**fastproxy** Fix concurrent buffer reads on upgraded connections ( juliens)](https://github.com/traefik/traefik/pull/14023) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s** Document the safeNaming impact on cross-provider references ( lazerg)](https://github.com/traefik/traefik/pull/13768) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/crd** Allow observability metadata on child routers ( bunnysayzz)](https://github.com/traefik/traefik/pull/14018) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/crd** Fix broken Kubernetes CRD definitions links in CRD reference pages ( SatvikMishra08)](https://github.com/traefik/traefik/pull/14047) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/gatewayapi** Bump sigs.k8s.io/gateway-api to v1.6.3 ( rtribotte)](https://github.com/traefik/traefik/pull/14017) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/gatewayapi** Default HTTPRoute backend scheme to HTTP when no appProtocol ( Tyagiquamar)](https://github.com/traefik/traefik/pull/13935) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/gatewayapi** Fix broken links in the Gateway API routing page ( Neffi42)](https://github.com/traefik/traefik/pull/14072) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/ingress-nginx** Apply auth-tls client authentication to the whole host ( juliens)](https://github.com/traefik/traefik/pull/14057) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**k8s/ingress-nginx** Fix cross-namespace check on shared auth-tls-secret TLS options ( juliens)](https://github.com/traefik/traefik/pull/14066) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**security** Fix typo in the Request Path page ( SethFalco)](https://github.com/traefik/traefik/pull/14036) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**server** Reject CONNECT method before reaching the muxer ( juliens)](https://github.com/traefik/traefik/pull/14050) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [**server** Reject CONNECT requests regardless of HTTP version ( juliens)](https://github.com/traefik/traefik/pull/14031) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [Add the documentation style guide to the Contributing section ( rachana5)](https://github.com/traefik/traefik/pull/14061) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [Bump golang.org/x/net to v0.60.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/14048) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [Fix broken anchor links to Restrict the Scope of Service Discovery ( SatvikMishra08)](https://github.com/traefik/traefik/pull/14056) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))
* **v3.7.15:** [Remove redundant period in README ( mxmrnn)](https://github.com/traefik/traefik/pull/14068) ([10b2b0d](https://github.com/kanso-labs/home-assistant-applications/commit/10b2b0d29d57febe095b12c125c5a5a3e793397a))

## [1.0.2](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.1...traefik-v1.0.2) (2026-10-06)


### Bug Fixes

* update dependency traefik/traefik to v3.7.14 ([#546](https://github.com/kanso-labs/home-assistant-applications/issues/546)) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))


### Upstream changes

* **v3.7.14:** [**accesslogs** Clarify access log buffering behavior ( amazon7737)](https://github.com/traefik/traefik/pull/13510) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**accesslogs** Clarify that USR1 only reopens the access log file ( rtribotte)](https://github.com/traefik/traefik/pull/13955) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**acme** Bump github.com/go-acme/lego/v5 to v5.5.1 ( ldez)](https://github.com/traefik/traefik/pull/13929) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**acme** Bump github.com/go-acme/lego/v5 to v5.5.2 ( ldez)](https://github.com/traefik/traefik/pull/13952) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**acme** Close the newly created ACME storage file on Windows ( datrixlab)](https://github.com/traefik/traefik/pull/13860) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**docker** Bump github.com/docker/cli to v29.8.1 ( kevinpollet)](https://github.com/traefik/traefik/pull/13934) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**fastproxy** Isolate NTLM and Negotiate backend connections in FastProxy ( kevinpollet)](https://github.com/traefik/traefik/pull/13914) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s** Clarify nativeLB load balancing behavior in Kubernetes reference docs ( zarko-a)](https://github.com/traefik/traefik/pull/13358) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Allow configuring gateways ( kevinpollet)](https://github.com/traefik/traefik/pull/13819) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Bump sigs.k8s.io/gateway-api to v1.6.2 ( kevinpollet)](https://github.com/traefik/traefik/pull/13984) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Do not create the Gateway API routers a previous one shadows ( rtribotte)](https://github.com/traefik/traefik/pull/13946) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Do not let TLSRoute routers shadow TCPRoute routers ( rtribotte)](https://github.com/traefik/traefik/pull/13953) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Fix HTTP/GRPC routes conflict ( AnatoleLucet)](https://github.com/traefik/traefik/pull/13421) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Fix TLSRoute router name collision across listeners sharing an entry point ( rtribotte)](https://github.com/traefik/traefik/pull/13959) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Report the BackendTLSPolicy ancestor in the namespace of its Gateway ( rtribotte)](https://github.com/traefik/traefik/pull/13964) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/gatewayapi** Stable sort Gateways to keep the TLS certificate order stable ( rl-io)](https://github.com/traefik/traefik/pull/13911) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Build the ssl-passthrough HTTP route like any other ingress ( rtribotte)](https://github.com/traefik/traefik/pull/13915) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Do not normalize resource names in the ingress-nginx provider ( kevinpollet)](https://github.com/traefik/traefik/pull/13922) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Fix the ingress-nginx cross-links between the routing and provider docs ( simpleqt)](https://github.com/traefik/traefik/pull/13925) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Make trailing capture group optional in ImplementationSpecific paths ( mmatur)](https://github.com/traefik/traefik/pull/13455) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Remove Authorization header for basic and digest auth ( josmo)](https://github.com/traefik/traefik/pull/13631) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Set the Ssl-Client-* request headers on the Ingress-NGINX HTTP router ( rtribotte)](https://github.com/traefik/traefik/pull/13912) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**k8s/ingress-nginx** Support wildcard origins in cors-allow-origin for the ingress-nginx provider ( kimsehyoung)](https://github.com/traefik/traefik/pull/13726) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**logs, middleware, k8s/crd** Expose IngressRoute metadata in access logs ( mmatur)](https://github.com/traefik/traefik/pull/12985) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**middleware** Avoid deprecated table.maxn in the rate limiter Lua script ( lazerg)](https://github.com/traefik/traefik/pull/13825) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**otel** Bump go.opentelemetry.io/otel/exporters/otlp/otlpmetric to v1.46.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/13933) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**otel** Bump go.opentelemetry.io/otel/exporters/otlp/otlptrace to v1.46.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/13932) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**otel** Bump otlploggrpc and otlploghttp to v0.22.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/13931) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**rules** Ignore negated matchers when parsing rule domains ( rtribotte)](https://github.com/traefik/traefik/pull/13863) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**security** Document the coordinated disclosure embargo for security reports ( emilevauge)](https://github.com/traefik/traefik/pull/13982) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**server** Bump golang.org/x/crypto to v0.57.0 ( kevinpollet)](https://github.com/traefik/traefik/pull/13930) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**server** Fix misleading trailer comments in header strategy handlers ( AleksaMCode)](https://github.com/traefik/traefik/pull/13938) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**server** Silence encoded characters warning when some are disallowed ( Adel-Ayoub)](https://github.com/traefik/traefik/pull/13470) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**service** Dedicate a sticky transport per ServersTransport ( sdelicata)](https://github.com/traefik/traefik/pull/13838) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**service** Fix the second server selection bias in the P2C load balancer ( lazerg)](https://github.com/traefik/traefik/pull/13644) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**service** Isolate preauthenticated NTLM and Kerberos backend connections ( kevinpollet)](https://github.com/traefik/traefik/pull/13902) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**tcp** Fix 'allows to configure' grammar in TCP ServersTransport ( fng713)](https://github.com/traefik/traefik/pull/13894) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**udp** Copy UDP datagrams into right-sized buffers before queuing ( rtribotte)](https://github.com/traefik/traefik/pull/13941) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [**webui** Bump react-router to v7 and vite to v8 ( gndz07)](https://github.com/traefik/traefik/pull/13794) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [Fix 'allow to match' grammar in TCP HostSNI rules ( fng713)](https://github.com/traefik/traefik/pull/13895) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [Fix build with GOPROXY=direct ( mehrdadbn9)](https://github.com/traefik/traefik/pull/12724) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [Fix case-sensitive option anchors ( simpleqt)](https://github.com/traefik/traefik/pull/13924) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))
* **v3.7.14:** [Fix the end anchor in the single-test example ( amazon7737)](https://github.com/traefik/traefik/pull/13898) ([9bef743](https://github.com/kanso-labs/home-assistant-applications/commit/9bef7436a498772f2faf1006dfc09e6ebbd46c9a))

## [1.0.1](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v1.0.0...traefik-v1.0.1) (2026-10-01)


### Bug Fixes

* **traefik:** stop cutting off uploads that run past a minute ([#493](https://github.com/kanso-labs/home-assistant-applications/issues/493)) ([96ae993](https://github.com/kanso-labs/home-assistant-applications/commit/96ae993e1ebe28ea43d9e32819d1fc17569ec5be))

## [1.0.0](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v0.2.0...traefik-v1.0.0) (2026-09-26)


### Bug Fixes

* **traefik:** match host names regardless of case ([#446](https://github.com/kanso-labs/home-assistant-applications/issues/446)) ([9ed1720](https://github.com/kanso-labs/home-assistant-applications/commit/9ed172081651762715e90d5604789e1daca151a2))

## [0.2.0](https://github.com/kanso-labs/home-assistant-applications/compare/traefik-v0.1.0...traefik-v0.2.0) (2026-09-25)


### Features

* **traefik:** add Traefik as an application ([#437](https://github.com/kanso-labs/home-assistant-applications/issues/437)) ([2b71702](https://github.com/kanso-labs/home-assistant-applications/commit/2b717024a28e354537223ba2a8b7302f23b97bfd))
* **traefik:** release as stable after its first real deployment ([#440](https://github.com/kanso-labs/home-assistant-applications/issues/440)) ([2905c2e](https://github.com/kanso-labs/home-assistant-applications/commit/2905c2ef811e9b6f277365a18982db5072ec7a1d))

## [0.1.0]

### Added

- Initial release, running Traefik 3.7.13.
