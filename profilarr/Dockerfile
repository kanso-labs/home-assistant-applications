# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Profilarr publishes rather than a Home Assistant
# base image, for the reason Seerr and Lingarr do: Profilarr cuts no release
# asset. Building it here would mean carrying a Deno toolchain, running the
# SvelteKit build, and then `deno compile`-ing a standalone binary against the
# right target triple — reproducing upstream's build rather than using it.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application. The image underneath is
# denoland/deno:alpine, so the packages come from apk as they do for Seerr.
ARG BUILD_FROM=ghcr.io/dictionarry-hub/profilarr:2.3.1
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0
# nginx is what ingress reaches, on a port of its own; see nginx.conf. It is
# pinned so that a new nginx produces a release rather than arriving silently.
# registryUrl carries the Alpine branch of the image above, so it needs
# updating when upstream moves to a newer Alpine, and the build fails until it
# is.
# renovate: datasource=apk depName=nginx registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG NGINX_VERSION=1.30.6-r0

RUN \
  `# bash, curl, ca-certificates, git and tar are already here — upstream` \
  `# installs them for its own entrypoint and for the git clones Profilarr` \
  `# makes. jq and xz are what bashio and the s6 tarballs add to that, and` \
  `# nginx serves ingress. The configuration its package ships is replaced by` \
  `# the one in rootfs/, which serves nothing else.` \
  apk add --no-cache \
    jq \
    "nginx=${NGINX_VERSION}" \
    xz \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then S6_ARCH="aarch64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then S6_ARCH="x86_64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-noarch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-arch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" \
  && tar -C / -Jxpf /tmp/s6-noarch.tar.xz \
  && tar -C / -Jxpf /tmp/s6-arch.tar.xz \
  \
  `# bashio is what the service scripts read application options with, and` \
  `# the Home Assistant base images are the only place it ships prebuilt.` \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/bashio.tar.gz \
      "https://github.com/hassio-addons/bashio/archive/v${BASHIO_VERSION}.tar.gz" \
  && mkdir -p /tmp/bashio \
  && tar -xzf /tmp/bashio.tar.gz --strip-components=1 -C /tmp/bashio \
  && mv /tmp/bashio/lib /usr/lib/bashio \
  && ln -s /usr/lib/bashio/bashio /usr/bin/bashio \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Ingress depends on three things in what Profilarr ships, see nginx.conf: the
# <head> its page template opens with, where nginx loads the ingress script;
# the /auth/ check in its layout, which nginx rewrites; and SvelteKit working
# out its own base from the page's address. None is something Profilarr
# promises, and an update that changed one would break ingress alone, with a
# blank or half-working page, while the published port kept working and nothing
# reported it. Each is looked for here, so such an update fails its build
# instead, in the pull request that brings it. The template is compiled into
# the binary as an escaped string, which is why the first pattern spells out
# its \n and tabs.
RUN \
  grep -q -F "$(printf '<head>\\n\t\t<meta charset')" /app/profilarr \
    || { echo 'The page template no longer opens with <head>' >&2; exit 1; } \
  && grep -q -r -F 'url.pathname.startsWith(`/auth/`)' /app/static/_app/immutable/nodes \
    || { echo 'The /auth/ layout check nginx.conf rewrites is gone' >&2; exit 1; } \
  && grep -q -F 'location).pathname.slice(0, -1)' /app/profilarr \
    || { echo 'SvelteKit no longer works out its base from the page address' >&2; exit 1; }

# s6-overlay is pid 1 here, in place of the image's own tini and entrypoint.
# That entrypoint reassigns the profilarr user's uid from PUID and PGID, hands
# /config to it and drops privileges to it. Supervisor sets neither and never
# remaps a user, so the run script hands /config to profilarr as the image
# creates it, uid 1000, and starts Profilarr as that user.
ENTRYPOINT ["/init"]

# Upstream's health check is kept as it is. It asks /api/v1/health on the port
# in the image's PORT, 6868, so a PORT set in the run script would break it.
# That is Profilarr with nothing in front of it, so nginx is not part of the
# check.

# Expose the ports
EXPOSE 6868

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Profilarr" \
    org.opencontainers.image.description="Configuration management for Radarr and Sonarr." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
