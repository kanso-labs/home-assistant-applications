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
ARG BUILD_FROM=ghcr.io/kirovair/muxarr:0.9.12
FROM ${BUILD_FROM}

# s6-overlay has to come up as root. The image sets no user of its own: it runs
# as root and drops to uid 888 in its entrypoint, which /init replaces below, so
# this changes nothing today and keeps s6 working if a later image sets one.
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
  `# curl is already here, installed by the image to fetch MKVToolNix's` \
  `# signing key, and jq is what bashio reads options with. xz unpacks the s6` \
  `# tarballs.` \
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
# entrypoint remaps a uid from PUID and PGID, hands /config to it and drops
# privileges to it. Muxarr runs as root instead, because it rewrites media files
# in place under /media and /share, which Supervisor mounts owned by root. The
# rest of what the entrypoint did, the run script does.
ENTRYPOINT ["/init"]

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Without one it
# sees only a process that exits, never one that has stopped answering; the
# app linter rejects config.yaml's `watchdog` in favour of this. The check asks
# for the login page, which Muxarr renders itself and serves to anyone, before
# setup and after it, whether or not a login was set up. Its own /health sits
# behind the redirects every other page does, to /setup until setup is done and
# to /login while a login is on and the local network is not trusted, and curl
# counts a redirect as a pass.
#
# Muxarr updates its database before it starts listening, copying it aside
# first and compacting it after, so the first start after an update takes
# longer the larger the library. The start period gives that five minutes.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=3 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:8183/login || exit 1

# Expose the ports
EXPOSE 8183

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Muxarr" \
    org.opencontainers.image.description="Strips unwanted audio and subtitle tracks from your media." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
