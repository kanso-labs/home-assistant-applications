# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Notifiarr/notifiarr
ARG NOTIFIARR_VERSION=0.9.5

# Install requirements for application.
# The published binary is statically linked Go, so it runs against musl
# unchanged and needs no runtime dependencies.
RUN \
  if [ "${BUILD_ARCH}" = "aarch64" ]; then NOTIFIARR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then NOTIFIARR_ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/notifiarr.gz \
      "https://github.com/Notifiarr/notifiarr/releases/download/v${NOTIFIARR_VERSION}/notifiarr.${NOTIFIARR_ARCH}.linux.gz" \
  && mkdir -p /opt/notifiarr \
  && gunzip -c /tmp/notifiarr.gz > /opt/notifiarr/notifiarr \
  && chmod +x /opt/notifiarr/notifiarr \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 5454

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Notifiarr" \
    org.opencontainers.image.description="Unified client for Notifiarr.com." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
