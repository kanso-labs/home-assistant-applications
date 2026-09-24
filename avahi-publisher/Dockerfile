# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This is the official Avahi as Alpine packages it, on the Home Assistant base
# image, and nothing else. There is no third-party application here: the options
# are turned into Avahi's own service files and avahi-publish calls.
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# The version is pinned so that a new Avahi produces a release rather than
# arriving silently. registryUrl carries the Alpine branch, so it needs updating
# when the base image above moves to a newer Alpine. The arch only chooses which
# index is read; Alpine ships one version per branch.
# renovate: datasource=apk depName=avahi registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG AVAHI_VERSION=0.9_rc4-r0

# avahi-tools brings avahi-publish, which is how the aliases are published, and
# the bus is what avahi-publish reaches the daemon over.
RUN \
  apk add --no-cache \
    "avahi=${AVAHI_VERSION}" \
    "avahi-tools=${AVAHI_VERSION}" \
    dbus

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Avahi Publisher" \
    org.opencontainers.image.description="Publishes extra .local names and Bonjour services on your network with Avahi." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
