# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Tdarr's licence forbids redistributing it, so this repository publishes no image
# of it. config.yaml names no image, which makes each Home Assistant build this
# Dockerfile itself, starting from the image Tdarr publishes, pulled at build time
# on the user's own machine.
#
# That image already carries s6-overlay, jq, FFmpeg, HandBrake and MKVToolNix,
# and runs Tdarr through s6's legacy services.d and cont-init.d directories. Those
# are kept as upstream wrote them; this layer adds one cont-init script ahead of
# them, which is where Home Assistant's options and storage come in.
#
# The whole image, tag included, sits in the ARG and FROM takes it as it is,
# which is how Renovate's own Dockerfile support reads BUILD_FROM.
ARG BUILD_FROM=ghcr.io/haveagitgat/tdarr:3.02.00
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# bashio is what the cont-init script reads application options with, and` \
  `# the Home Assistant base images are the only place it ships prebuilt.` \
  curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
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

# Stop the container if a cont-init script fails, as Home Assistant's bases do.
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

# Tdarr's image has no health check of its own. With one, Supervisor shows the
# application as starting until the first result arrives, and with the watchdog
# on, restarts it when the check fails, so a server that has stopped answering
# is caught as well as one that has exited. /api/v2/status answers without an
# API key even while the sign-in is on. The start period leaves room for a slow
# first start after an update.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:8265/api/v2/status || exit 1

# Expose the ports
EXPOSE 8265 8266

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Tdarr" \
    org.opencontainers.image.description="Automates work on your media library through flows of FFmpeg, HandBrake and MKVToolNix steps." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
