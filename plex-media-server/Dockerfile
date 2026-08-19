# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Plex publishes rather than a Home Assistant base
# image. Plex has no source to build and no versioned release feed Renovate can
# read: its download API reports 1.43.3.10861-07dfddaeb while repology reports
# 1.43.3.10861 without the build hash the download URL needs. The published
# image carries the full version as its tag, so Renovate's built-in Dockerfile
# manager reads it from there.
#
# That tag needs a versioning rule to go with it, and renovate.json carries one.
# The build hash after the dash is a compatibility suffix to docker versioning,
# which never updates across one; since every Plex release mints a fresh hash,
# the default would silently offer no update at all, ever.
#
# Unlike the other applications built this way, no s6-overlay is installed
# here. Plex's image already runs it, already declares /init as its entrypoint,
# and already starts Plex. Only bashio is missing, and it is what lets the
# application's options reach Plex.
ARG BUILD_FROM=plexinc/pms-docker:1.43.3.10896-cb3ebc72d
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  apt-get update && apt-get install --assume-yes --no-install-recommends \
    curl \
    jq \
  && rm -rf /var/lib/apt/lists/* \
  \
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

# The entrypoint and the exposed ports come from the base image, which already
# supervises Plex. Redeclaring either would only risk drifting from it.

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Plex Media Server" \
    org.opencontainers.image.description="Recorded media, live TV, online news, and podcasts ready to stream." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
