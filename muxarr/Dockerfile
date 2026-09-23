# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Muxarr publishes, as Cleanuparr, Seerr, Lingarr,
# Profilarr and Authentik do. Muxarr's releases carry no asset at all, and the
# image is where the work is: it pins an ffmpeg build, and carries ffprobe and
# mkvtoolnix, which are what the remuxing is actually done with.
#
# The version is pinned to an image tag rather than a GitHub release, and that
# is not a shortcut. Every Muxarr release is marked as a prerelease — there has
# never been a stable one — so the github-releases datasource skips them all and
# would silently never offer an update. See renovate.json.
ARG BUILD_FROM=ghcr.io/kirovair/muxarr:0.9.9
FROM ${BUILD_FROM}

# s6-overlay has to come up as pid 1, and the base image drops to uid 888.
USER root

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# curl is already here for the image's own health check, and jq is what` \
  `# bashio reads options with. xz unpacks the s6 tarballs.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    jq \
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
# entrypoint exists to remap a uid from PUID/PGID and drop privileges to it,
# which every application here leaves to Supervisor instead; the rest of what
# it did, the run script does.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 8183

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Muxarr" \
    org.opencontainers.image.description="Strips unwanted audio and subtitle tracks from your media." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
