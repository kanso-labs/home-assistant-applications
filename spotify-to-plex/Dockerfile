# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image the project publishes. It builds a Next.js
# application, a Python scraper and a scheduler into one image and runs the
# three under supervisord, which is not something worth reproducing here.
#
# No s6-overlay is installed, because supervisord is already the init this
# image runs. What is added is bashio, and an entrypoint that puts the
# application's options into the environment before handing over to the
# entrypoint the image already had.
ARG BUILD_FROM=jjdenhertog/spotify-to-plex:1.0.107
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.18.1

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

# Expose the ports
EXPOSE 9030

# Declaring an entrypoint clears the command inherited from the base image, so
# the command below repeats what that image already ran.
ENTRYPOINT ["/usr/bin/spotify-to-plex-start"]
CMD ["supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Spotify to Plex" \
    org.opencontainers.image.description="Keeps Spotify playlists synced with a Plex music library." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
