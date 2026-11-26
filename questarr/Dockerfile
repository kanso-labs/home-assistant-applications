# https://contributors.home-assistant.io/apps/guides/dockerfile/
#
# This starts from the image Questarr publishes, as Seerr, Muxarr, Cleanuparr
# and others here do. Questarr publishes no release asset for Linux, and the
# image is where the work is: it builds the client and server, prunes the
# development dependencies, and carries Apprise for notifications and 7-Zip
# for unpacking downloads. UnRAR is replaced below.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application.
ARG BUILD_FROM=ghcr.io/doezer/questarr:v1.6.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.20.0
# nginx is what ingress reaches, on a port of its own; see nginx.conf. It is
# pinned so that a new nginx produces a release rather than arriving silently.
# registryUrl carries the Alpine branch of the image above, so it needs
# updating when upstream moves to a newer Alpine, and the build fails until it
# is.
# renovate: datasource=apk depName=nginx registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG NGINX_VERSION=1.30.8-r0
# Questarr unpacks RAR downloads with UnRAR, which is untrusted input, so it is
# kept current, and built from source here, as Bazarr's is. Upstream's image
# downloads RARLAB's x86_64 binary on every architecture, which cannot run on
# aarch64. RARLAB publishes no feed or repository; the rarlab datasource in
# .github/renovate.json reads its download page. Its source tarballs are
# numbered by build rather than by version, so unrarsrc-7.2.7 is UnRAR 7.23,
# and the page links a beta as readily as a release: RARVER_BETA in the
# tarball's version.hpp says which a bump is, and the build below fails on a
# beta.
# renovate: datasource=custom.rarlab depName=unrar
ARG UNRAR_VERSION=7.2.7

# s6-overlay has to come up as root. The image sets no user of its own: it runs
# as root and drops to the questarr user in its entrypoint, which /init
# replaces below, so this changes nothing today and keeps s6 working if a later
# image sets one.
USER root

RUN \
  apk add --no-cache --virtual .build-dependencies \
    build-base \
  \
  `# curl is already here, installed by the image for its own UnRAR download.` \
  `# bash runs bashio, jq is what bashio reads options with, and xz unpacks` \
  `# the s6 tarballs. nginx serves ingress; the configuration its package` \
  `# ships is replaced by the one in rootfs/, which serves nothing else.` \
  && apk add --no-cache \
    bash \
    jq \
    "nginx=${NGINX_VERSION}" \
    xz \
  \
  `# Built for this architecture in place of upstream's x86_64 binary, at the` \
  `# path Questarr already finds it on.` \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/unrar.tar.gz \
      "https://www.rarlab.com/rar/unrarsrc-${UNRAR_VERSION}.tar.gz" \
  && tar zxf \
      /tmp/unrar.tar.gz \
      -C /tmp \
  && if ! grep -q -E '^#define RARVER_BETA +0$' /tmp/unrar/version.hpp; then \
      echo "unrarsrc-${UNRAR_VERSION} is a beta of UnRAR, which this image does not ship" >&2; \
      exit 1; \
    fi \
  && make -C /tmp/unrar \
  && install -v -m755 /tmp/unrar/unrar /usr/local/bin/unrar \
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
  `# Questarr reads config.yaml from data/ under its working directory, /app,` \
  `# whatever SQLITE_DB_PATH says, and writes its backups and release` \
  `# classifier model beside the database. Linking the whole directory to` \
  `# /config keeps all of it, rather than the database alone, across an` \
  `# update. The image creates the directory empty.` \
  && rmdir /app/data \
  && ln -s /config /app/data \
  \
  && apk del --no-cache --purge .build-dependencies \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here, in place of the image's own entrypoint. That
# entrypoint remaps the questarr user's uid from PUID and PGID, hands /app/data
# to it and drops privileges to it. Questarr runs as root instead, because it
# imports games into the library under /media and /share, which Supervisor
# mounts owned by root. The umask the entrypoint applied, the run script does.
ENTRYPOINT ["/init"]

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Upstream's image
# declares no health check of its own; its Compose file probes /api/health,
# which answers without signing in and asks nothing of IGDB, the indexers or
# the downloaders, and stays on plain HTTP when Questarr's own HTTPS redirect is
# on. The app linter rejects config.yaml's `watchdog` in favour of this. 5000 is
# Questarr with nothing in front of it, so nginx is not part of the check.
#
# Questarr migrates its database before it starts listening, so the start
# period gives the first start after an update two minutes.
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:5000/api/health || exit 1

# Expose the ports
EXPOSE 5000

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Questarr" \
    org.opencontainers.image.description="Game library manager that discovers, tracks and downloads the games you want." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
