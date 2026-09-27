# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Flight Finder publishes, as Seerr and Cleanuparr
# do, rather than from a Home Assistant base image. Building it means a Next.js
# monorepo build plus the Chromium that its scraper drives, and upstream already
# ships both, for both architectures, on Alpine 3.24.
#
# Added on top are s6-overlay and bashio, by hand as they are for Seerr, and the
# two services upstream runs as separate containers, because a Home Assistant
# application is one container: PostgreSQL, as the Authentik application does,
# and Valkey in place of Redis. See DOCS.md.
ARG BUILD_FROM=ghcr.io/affromero/flight-finder:0.15.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0
# The version is pinned so that a new PostgreSQL produces a release rather than
# arriving silently. registryUrl carries the Alpine branch of the image above,
# so it needs updating when upstream moves to a newer Alpine. 17 rather than the
# 16 upstream's compose file runs, because Alpine 3.24 keeps 16 in community,
# whose support ends six months after a release, and 17 in main.
# renovate: datasource=apk depName=postgresql17 registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG POSTGRESQL_VERSION=17.11-r0
# Valkey rather than Redis for the same reason: Alpine 3.24 keeps Valkey in main
# and Redis in community. Flight Finder speaks to either.
# renovate: datasource=apk depName=valkey registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG VALKEY_VERSION=9.0.4-r0

# Upstream runs as the node user. s6-overlay has to come up as pid 1.
USER root

RUN \
  apk add --no-cache \
    bash \
    jq \
    "postgresql17=${POSTGRESQL_VERSION}" \
    "postgresql17-client=${POSTGRESQL_VERSION}" \
    "valkey=${VALKEY_VERSION}" \
    "valkey-cli=${VALKEY_VERSION}" \
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
  `# What Flight Finder keeps outside PostgreSQL has to live in /data, which` \
  `# Home Assistant persists and backs up. Upstream mounts a volume over this` \
  `# path, so it becomes a link into /data instead.` \
  && rm -f -r /app/data \
  && ln -s /data/app /app/data \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here. The Home Assistant base images set this for every
# other application; this one has to set it itself.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 3003

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Flight Finder" \
    org.opencontainers.image.description="Tracks flight, hotel and car rental prices, with price history and alerts." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
