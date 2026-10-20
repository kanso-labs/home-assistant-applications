# Changelog

All notable changes to this application are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
