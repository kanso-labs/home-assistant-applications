# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Bazarr+ publishes, as Cleanuparr, Seerr, Lingarr,
# Profilarr, Authentik and Muxarr do. The fork cuts releases but attaches no
# asset to them, so there is no archive to unpack the way the Bazarr beside
# this one does — and the image carries a compiled alass alongside the
# application, which building here would mean reproducing with a Rust stage.
#
# The image underneath is python:3.14-slim-trixie, so the packages come from
# apt as they do for Cleanuparr.
ARG BUILD_FROM=ghcr.io/lavx/bazarr:2.6.2
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# The slim base carries neither curl nor jq, and bashio needs both at run` \
  `# time as well as for the downloads below.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    ca-certificates \
    curl \
    jq \
    xz-utils \
  && rm -f -r /var/lib/apt/lists/* \
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

# s6-overlay is pid 1 here, in place of the image's own entrypoint. That
# entrypoint exists to remap a uid from PUID and PGID and drop privileges to
# it, which every application here leaves to Supervisor instead.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 6767

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Bazarr+" \
    org.opencontainers.image.description="Subtitle manager with a provider marketplace and AI translation." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
