# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Plex publishes rather than a Home Assistant base
# image. Plex has no source to build and no versioned release feed Renovate can
# read: its download API reports 1.43.3.10861-07dfddaeb while repology reports
# 1.43.3.10861 without the build hash the download URL needs. The published
# image carries the full version as its tag, so Renovate's built-in Dockerfile
# manager reads it from there.
#
# That tag needs a versioning rule to go with it, and renovate.json carries one.
# The build hash after the dash is a compatibility suffix to docker versioning,
# which never updates across one; since every Plex release mints a fresh hash,
# the default would silently offer no update at all, ever.
#
# As in Tdarr, no s6-overlay is installed here. Plex's image already runs it,
# already declares /init as its entrypoint, and already starts Plex. Only bashio
# is missing, and it is what lets the application's options reach Plex.
ARG BUILD_FROM=plexinc/pms-docker:1.43.4.10903-e5521bd8c
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

# Plex's image drops to its own `plex` user, uid 1000, before starting the
# server. Home Assistant's shares are bind-mounted with the host's ownership
# and Supervisor never remaps a uid, so /media and /share arrive owned by root
# and uid 1000 cannot write to either. That surfaces as Plex failing to create
# its transcoder directory, and would equally stop a recording or a deletion.
#
# PLEX_UID and PLEX_GID are the base image's own knob for this, and it handles
# 0 as a special case: the home directory is left at /config rather than being
# moved aside, so the library stays where it is.
ENV PLEX_UID=0
ENV PLEX_GID=0

RUN \
  apt-get update && apt-get install --assume-yes --no-install-recommends \
    curl \
    jq \
  && rm -rf /var/lib/apt/lists/* \
  \
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

# Home Assistant's base images set this, and Plex's image does not. With it, a
# start-up script that fails stops the application, as when the options script
# cannot take an emptied allowed network back out of Plex. Without it, Plex
# starts anyway with that network still allowed. The claim check only reports,
# so when it cannot read Plex's settings it warns rather than failing.
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

# The entrypoint and the exposed ports come from the base image, which already
# supervises Plex. Redeclaring either would only risk drifting from it.

# Upstream's health check, given a start period. It asks Plex for /identity on
# port 32400 every 5 seconds, and 20 failures in a row count as unhealthy.
# Upstream counts them from the moment the container starts, so with Watchdog
# on, a start that runs a long database migration after an update could be
# restarted partway. Docker counts failures from the first check that passes,
# so the period costs a healthy start nothing.
HEALTHCHECK --interval=5s --timeout=2s --start-period=300s --retries=20 \
  CMD /healthcheck.sh || exit 1

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Plex Media Server" \
    org.opencontainers.image.description="Recorded media, live TV, online news, and podcasts ready to stream." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
