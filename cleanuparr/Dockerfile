# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Cleanuparr publishes rather than a Home Assistant
# base image, for the same reason Seerr does: the release archive carries the
# application alone, while the published image also carries Apprise, which is
# what its notifications are sent through. Building on the published image
# keeps that working instead of quietly dropping it.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application. Unlike Seerr's, the image
# underneath is Microsoft's ASP.NET runtime image, which is Ubuntu rather than
# Alpine, so the packages come from apt.
ARG BUILD_FROM=ghcr.io/cleanuparr/cleanuparr:2.10.11
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# nginx is what ingress reaches, on a port of its own; the configuration` \
  `# its package ships is replaced by the one in rootfs/, which serves` \
  `# nothing else.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    jq \
    nginx \
    xz-utils \
  && rm -f -r /var/lib/apt/lists/* \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then S6_ARCH="aarch64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then S6_ARCH="x86_64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-noarch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-arch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" \
  && tar -C / -Jxpf /tmp/s6-noarch.tar.xz \
  && tar -C / -Jxpf /tmp/s6-arch.tar.xz \
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
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here, in place of the image's own entrypoint. That
# entrypoint exists to create a user and drop privileges to it, which every
# application here leaves to Supervisor instead.
ENTRYPOINT ["/init"]

# Upstream's image has no health check, so Supervisor's watchdog could see
# Cleanuparr exit but never hang. /health answers without signing in and asks
# only whether the application is running, never whether a download client or
# arr application is reachable, so an outage elsewhere cannot get Cleanuparr
# restarted. It is asked on 11011 directly, which nginx is not in front of. A
# watchdog URL in config.yaml would do the same, but the application linter
# rejects that key in favour of this.
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:11011/health || exit 1

# Expose the ports
EXPOSE 11011

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Cleanuparr" \
    org.opencontainers.image.description="Removes stuck and unwanted downloads from the arr applications and their download clients." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
