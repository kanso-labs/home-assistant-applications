# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Jackett/Jackett
ARG JACKETT_VERSION=0.24.2414

# Jackett's own help says not to pass --DataFolder on Unix and to set this
# instead. Its data then lives in /config/Jackett.
ENV XDG_CONFIG_HOME="/config"

# Install requirements for application
RUN \
  apk add --no-cache \
    icu-libs \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then JACKETT_ARCH="LinuxMuslARM64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then JACKETT_ARCH="LinuxMuslAMDx64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/jackett.tar.gz \
      "https://github.com/Jackett/Jackett/releases/download/v${JACKETT_VERSION}/Jackett.Binaries.${JACKETT_ARCH}.tar.gz" \
  && mkdir -p /opt/bin \
  && tar zxf \
      /tmp/jackett.tar.gz \
      --strip 1 -C /opt/bin \
  \
  `# The bundled updater would replace this image's own binary, and the` \
  `# systemd unit installer has nothing to install into under s6.` \
  && rm -f -r \
    /tmp/* \
    /opt/bin/JackettUpdater* \
    /opt/bin/install_service_systemd.sh

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 9117

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Jackett" \
    org.opencontainers.image.description="Indexer proxy that translates searches into tracker-specific queries." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
