# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Seadexerr carries no licence, so nobody has been given the right to pass it
# on, and this repository publishes no image of it. config.yaml names no image,
# which makes each Home Assistant build this Dockerfile itself: the binary comes
# straight from the image Seadexerr publishes, pulled at build time on the
# user's own machine.
#
# That image is distroless, with no shell for the service scripts, and its
# binary is built against glibc, so it is copied onto the Debian-family base
# rather than the Alpine one.
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:26.04
# renovate: datasource=docker depName=ghcr.io/ryder-c/seadexerr
ARG SEADEXERR_VERSION=3.0.0

FROM ghcr.io/ryder-c/seadexerr:v${SEADEXERR_VERSION} AS seadexerr

FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev

COPY --from=seadexerr /usr/local/bin/seadexerr /usr/local/bin/seadexerr

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Seadexerr" \
    org.opencontainers.image.description="Prowlarr indexer that offers the SeaDex release of each anime, for Sonarr and Radarr to prefer." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
