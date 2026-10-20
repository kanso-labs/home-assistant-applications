# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Seerr publishes rather than a Home Assistant base
# image, as Cleanuparr, Lingarr, Muxarr and others here do. Seerr publishes no
# release asset and is not an npm package, so the alternative is cloning the
# repository and running its pnpm and Next.js build, including the
# native-module pruning upstream does for musl. Building on top of the image
# upstream already publishes keeps that parity for free.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application.
ARG BUILD_FROM=ghcr.io/seerr-team/seerr:v3.5.0
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
# renovate: datasource=apk depName=nginx registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.23&components=main&arch=x86_64
ARG NGINX_VERSION=1.28.3-r7

# Upstream runs as the node user. s6-overlay has to come up as pid 1.
USER root

RUN \
  `# nginx serves ingress. The configuration its package ships is replaced by` \
  `# the one in rootfs/, which serves nothing else.` \
  apk add --no-cache \
    bash \
    curl \
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

# Ingress rewrites two strings in the scripts Seerr ships, see nginx.conf: the
# folder Next.js loads scripts from, and the address it builds for each page's
# data. Neither is something Seerr promises, and an update that changed one
# would leave ingress showing a page that never finishes loading, while the
# published port kept working and nothing reported it. Each is looked for
# here, in what the image actually ships, so such an update fails its build
# instead, in the pull request that brings it.
RUN \
  for pattern in \
    '"/_next/"' \
    '`/_next/data/${'; \
  do \
    grep -q -r -F -- "${pattern}" /app/.next/static/chunks \
      || { echo "Ingress rewrites ${pattern}, which Seerr no longer ships" >&2; exit 1; }; \
  done

# s6-overlay is pid 1 here. The Home Assistant base images set this for every
# other application; this one has to set it itself.
ENTRYPOINT ["/init"]

# Upstream's image has no health check, so Supervisor's watchdog could see
# Seerr exit but never hang. /api/v1/status would be the obvious endpoint, but
# it asks GitHub for the latest release whenever the version check is on, the
# default, with no timeout, so a slow GitHub could get Seerr restarted.
# /api/v1/status/appdata answers without signing in and from the container
# alone. A watchdog URL in config.yaml would do the same, but the application
# linter rejects that key in favour of this. 5055 is Seerr with nothing in
# front of it, so nginx is not part of the check.
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:5055/api/v1/status/appdata || exit 1

# Expose the ports
EXPOSE 5055

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Seerr" \
    org.opencontainers.image.description="Media request and discovery manager for Jellyfin, Plex and Emby." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
