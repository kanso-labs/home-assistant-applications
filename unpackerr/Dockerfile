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
#
# 0.16.0 moved the project to GoReleaser, which replaced the bare gzipped
# binary with a tarball and put the version in the filename. There is no
# unpackerr.<arch>.linux.gz published from that release onwards, so this URL
# does not work for anything older than 0.16.0 either.
RUN \
  if [ "${BUILD_ARCH}" = "aarch64" ]; then UNPACKERR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then UNPACKERR_ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/unpackerr.tar.gz \
      "https://github.com/Unpackerr/unpackerr/releases/download/v${UNPACKERR_VERSION}/unpackerr_${UNPACKERR_VERSION}_linux_${UNPACKERR_ARCH}.tar.gz" \
  && tar zxf /tmp/unpackerr.tar.gz -C /usr/local/bin unpackerr \
  && chmod a+x /usr/local/bin/unpackerr \
  \
  `# Kept as the seed for /config on first run. It travels inside the same` \
  `# tarball as the binary, so the commented defaults cannot drift from the` \
  `# version that ships.` \
  && mkdir -p /opt/unpackerr \
  && tar zxf /tmp/unpackerr.tar.gz -C /opt/unpackerr unpackerr.conf.example \
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
