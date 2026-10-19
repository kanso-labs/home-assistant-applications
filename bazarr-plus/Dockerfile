# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Bazarr+ publishes, as Cleanuparr, Seerr, Lingarr,
# Profilarr, Authentik and Muxarr do. The fork cuts releases but attaches no
# asset to them, so there is no archive to unpack the way the Bazarr beside
# this one does — and the image carries a compiled alass alongside the
# application, which building here would mean reproducing with a Rust stage.
#
# The image underneath is python:3.14-slim-trixie, so the packages come from
# apt as they do for Cleanuparr.
#
# init-bazarr-plus seeds a new install's config.yaml with two values Bazarr+'s
# upgrade migrations would otherwise change, so check those migrations in
# bazarr/app/config.py when this version moves.
ARG BUILD_FROM=ghcr.io/lavx/bazarr:2.7.2
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
  `# The slim base carries neither curl nor jq, and bashio needs both at run` \
  `# time as well as for the downloads below. nginx is what ingress and the` \
  `# published port reach; the configuration its package ships is replaced` \
  `# by the one in rootfs/.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    ca-certificates \
    curl \
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

# The Home Assistant base images set this for every other application, and this
# one installs s6-overlay itself. A failed init-bazarr-plus, such as a URL base
# that could not be written, then stops the application. Without it the
# container stays up with neither nginx nor Bazarr+ started, and Home Assistant
# shows it as running.
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

# s6-overlay is pid 1 here, in place of the image's own entrypoint. That
# entrypoint remaps a uid from PUID and PGID and drops privileges to it.
# Bazarr+ runs as root instead, because it writes subtitles into the library
# under /media and /share, which Supervisor mounts owned by root.
ENTRYPOINT ["/init"]

# Bazarr+'s unauthenticated ping, asked of nginx on 6767, so the check covers
# nginx, Bazarr+'s frontend server, which passes /api/ on to the backend or
# answers 503 while it is down, and the backend itself. Upstream's own probe
# asks the frontend server only whether it believes the backend is running,
# which stays true of a backend that has stopped answering. Neither nginx nor
# the frontend server logs the request. Upstream counts failures after 30
# seconds, and a first start or an update that runs migrations, or installs
# the providers Provider Hub is set to, can take longer than that, which
# Watchdog would cut short by restarting it.
#
# A 503 while the frontend server still reports the backend running is a
# restart from inside Bazarr+, which upstream's probe was built not to count as
# an outage, and which can run for minutes while Provider Hub installs
# providers. A backend that has stopped answering still fails, on curl's
# --max-time.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=3 \
  CMD code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 http://127.0.0.1:6767/api/system/ping)"; \
    [ "${code}" = 200 ] && exit 0; \
    [ "${code}" = 503 ] && curl -s --max-time 1 http://127.0.0.1:16767/_supervisor/status | grep -q '"running"' && exit 0; \
    exit 1

# Expose the ports
EXPOSE 6767

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Bazarr+" \
    org.opencontainers.image.description="Subtitle manager with a provider marketplace and AI translation." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
