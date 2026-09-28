# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Like FlareSolverr and Byparr, this starts from the image upstream publishes
# rather than a Home Assistant base image. Its omnibus image carries the web
# interface, the collector, InfluxDB and a static smartmontools build, for amd64
# and arm64, on Debian, and already runs s6-overlay v3. Only bashio is added.
ARG BUILD_FROM=ghcr.io/analogj/scrutiny:v0.9.4-omnibus
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  apt-get update && apt-get install --assume-yes --no-install-recommends \
    jq \
  && rm -rf /var/lib/apt/lists/* \
  \
  `# bashio is what the service scripts read application options with, and` \
  `# the Home Assistant base images are the only place it ships prebuilt.` \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/bashio.tar.gz \
      "https://github.com/hassio-addons/bashio/archive/v${BASHIO_VERSION}.tar.gz" \
  && mkdir -p /tmp/bashio \
  && tar -xzf /tmp/bashio.tar.gz --strip-components=1 -C /tmp/bashio \
  && mv /tmp/bashio/lib /usr/lib/bashio \
  && ln -s /usr/lib/bashio/bashio /usr/bin/bashio \
  \
  `# Upstream's services, init scripts and cron job are replaced by the s6-rc` \
  `# services under rootfs/, which read the application's options.` \
  && rm -f -r /etc/services.d /etc/cont-init.d /etc/cron.d/scrutiny \
  \
  `# Scrutiny and its collector read scrutiny.yaml and collector.yaml from this` \
  `# directory. Both are optional, and a person edits them in /config.` \
  && rm -f -r /opt/scrutiny/config \
  && ln -s /config /opt/scrutiny/config \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Upstream's CMD already starts s6-overlay as pid 1, so no ENTRYPOINT is set:
# one would receive that CMD as a program to run after the services.

# Expose the ports
EXPOSE 8080

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Scrutiny" \
    org.opencontainers.image.description="Watches the health of your disks through S.M.A.R.T. and keeps its history." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
