# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Sonarr/Sonarr
ARG SONARR_VERSION=4.0.19.2979

ENV XDG_CONFIG_HOME="/config/xdg"

# Install requirements for application
RUN \
  apk add --no-cache \
    icu-libs \
    sqlite-libs \
    xmlstarlet \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then SONARR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then SONARR_ARCH="x64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -o /tmp/sonarr.tar.gz \
      "https://github.com/Sonarr/Sonarr/releases/download/v${SONARR_VERSION}/Sonarr.main.${SONARR_VERSION}.linux-musl-${SONARR_ARCH}.tar.gz" \
  && mkdir -p /opt/bin \
  && tar zxf \
      /tmp/sonarr.tar.gz \
      --strip 1 -C /opt/bin \
  \
  && echo -e "UpdateMethod=docker\nBranch=main\nPackageVersion=${BUILD_VERSION}\nPackageAuthor=Kanso Labs" \
    > /opt/package_info \
  \
  && rm -f -r \
    /tmp/* \
    /opt/bin/Sonarr.Update

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 8989

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Sonarr" \
    org.opencontainers.image.description="Smart PVR for Usenet and BitTorrent users." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
