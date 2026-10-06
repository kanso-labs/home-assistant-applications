# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# There is no third-party application here: iptables as Alpine packages it, on
# the Home Assistant base image, and the scripts in rootfs that turn the options
# into rules.
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# The version is pinned so that a new iptables produces a release rather than
# arriving silently. registryUrl carries the Alpine branch, so it needs updating
# when the base image above moves to a newer Alpine. The arch only chooses which
# index is read; Alpine ships one version per branch.
# renovate: datasource=apk depName=iptables registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG IPTABLES_VERSION=1.8.13-r0

RUN \
  apk add --no-cache \
    "iptables=${IPTABLES_VERSION}"

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: NAT Gateway" \
    org.opencontainers.image.description="Shares this host's network connection with a device plugged straight into a spare Ethernet port." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
