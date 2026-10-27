# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24@sha256:880016115f356afc814398e17ba68a7ee66dfc1b4eaef09755ea2c9fa18ea481
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Radarr/Radarr
ARG RADARR_VERSION=6.4.4.10685

ENV XDG_CONFIG_HOME="/config/xdg"

# Radarr listens on the loopback address alone, and nginx answers on 7878 in its
# place, so that ingress and the published port both reach it. Environment
# variables win over the address and port saved in config.xml.
ENV Radarr__Server__BindAddress="127.0.0.1"
ENV Radarr__Server__Port="17878"

# With analytics off, Radarr sends Servarr's Sentry no crash reports, apart from
# an error early in a start, before it has read its settings. Like the two
# above, this variable wins over the setting saved in config.xml.
ENV Radarr__Log__AnalyticsEnabled="False"

# Install requirements for application. nginx is what ingress and the published
# port reach; the configuration its package ships is replaced by the one in
# rootfs/, which serves nothing else.
RUN \
  apk add --no-cache \
    icu-libs \
    nginx \
    sqlite-libs \
    xmlstarlet \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then RADARR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then RADARR_ARCH="x64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/radarr.tar.gz \
      "https://github.com/Radarr/Radarr/releases/download/v${RADARR_VERSION}/Radarr.master.${RADARR_VERSION}.linux-musl-core-${RADARR_ARCH}.tar.gz" \
  && mkdir -p /opt/bin \
  && tar zxf \
      /tmp/radarr.tar.gz \
      --strip 1 -C /opt/bin \
  \
  && echo -e "UpdateMethod=docker\nBranch=master\nPackageVersion=${BUILD_VERSION}\nPackageAuthor=Kanso Labs" \
    > /opt/package_info \
  \
  && rm -f -r \
    /tmp/* \
    /opt/bin/Radarr.Update

# Copy root filesystem
COPY rootfs /

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Radarr's ping
# needs no sign-in, and asking nginx for it checks both halves of the
# application. The start period covers the database migrations a first start
# after an update can run.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:7878/ping || exit 1

# Expose the ports
EXPOSE 7878

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Radarr" \
    org.opencontainers.image.description="Movie collection manager for Usenet and BitTorrent users." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
