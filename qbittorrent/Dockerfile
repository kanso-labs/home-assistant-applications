# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# The version is pinned so that a new qBittorrent produces a release rather
# than arriving silently. depName carries the Alpine branch, so it needs
# updating when the base image moves to a newer Alpine.
# renovate: datasource=repology depName=alpine_3_24/qbittorrent-nox versioning=loose
ARG QBITTORRENT_VERSION=5.2.1-r0

# Install requirements for application
RUN \
  apk add --no-cache \
    "qbittorrent-nox=${QBITTORRENT_VERSION}"

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 6881 8080

LABEL \
    org.opencontainers.image.title="Home Assistant Application: qBittorrent" \
    org.opencontainers.image.description="BitTorrent client with a web interface." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
