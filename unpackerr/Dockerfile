# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Unpackerr/unpackerr
ARG UNPACKERR_VERSION=0.16.1

# Install requirements for application
RUN \
  if [ "${BUILD_ARCH}" = "aarch64" ]; then UNPACKERR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then UNPACKERR_ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/unpackerr.gz \
      "https://github.com/Unpackerr/unpackerr/releases/download/v${UNPACKERR_VERSION}/unpackerr.${UNPACKERR_ARCH}.linux.gz" \
  && gunzip -c /tmp/unpackerr.gz > /usr/local/bin/unpackerr \
  && chmod a+x /usr/local/bin/unpackerr \
  \
  `# Kept as the seed for /config on first run. Pinned to the same release as` \
  `# the binary, so the commented defaults describe the version that ships.` \
  && mkdir -p /opt/unpackerr \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /opt/unpackerr/unpackerr.conf.example \
      "https://raw.githubusercontent.com/Unpackerr/unpackerr/v${UNPACKERR_VERSION}/examples/unpackerr.conf.example" \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Unpackerr" \
    org.opencontainers.image.description="Extracts completed downloads for the arr applications." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
