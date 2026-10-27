# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24@sha256:880016115f356afc814398e17ba68a7ee66dfc1b4eaef09755ea2c9fa18ea481
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# The version is pinned so that a new qBittorrent produces a release rather
# than arriving silently. registryUrl carries the Alpine branch, so it needs
# updating when the base image above moves to a newer Alpine. The arch only
# chooses which index is read; Alpine ships one version per branch, so it does
# not have to be one of the architectures this application builds.
# renovate: datasource=apk depName=qbittorrent-nox registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=community&arch=x86_64
ARG QBITTORRENT_VERSION=5.2.1-r0

# Install requirements for application. nginx is what ingress reaches; the
# configuration its package ships is replaced by the one in rootfs/, which
# serves nothing else.
RUN \
  apk add --no-cache \
    nginx \
    "qbittorrent-nox=${QBITTORRENT_VERSION}"

# Copy root filesystem
COPY rootfs /

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. qBittorrent is
# asked on 8080 directly, because the nginx that ingress goes through answers
# only Supervisor, so the check does not cover nginx. Its sign-in page answers
# without a session, where the API turns the request away. qBittorrent opens its
# web interface only once every torrent is loaded, so the start period leaves
# room for a large session. With sign-in bypassed for localhost, qBittorrent
# opens a session for every request that brings no cookie, so the check keeps
# its cookie between runs rather than leaving a new session behind each time.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD curl -f -s -S -o /dev/null -b /tmp/healthcheck.cookies \
    -c /tmp/healthcheck.cookies http://127.0.0.1:8080/ || exit 1

# Expose the ports
EXPOSE 6881 8080

LABEL \
    org.opencontainers.image.title="Home Assistant Application: qBittorrent" \
    org.opencontainers.image.description="BitTorrent client with a web interface." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
