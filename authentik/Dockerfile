# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Authentik publishes, as Cleanuparr, Seerr, Lingarr
# and Profilarr do. Authentik's releases carry outpost binaries and OCI tarballs
# rather than a server archive, and building the server here would mean a Rust
# toolchain, a Node web build and a uv-locked Python environment — reproducing
# upstream's build rather than using it.
#
# What is different from those four is what gets added on top. Authentik is
# three containers upstream: PostgreSQL, a server and a worker. A Home Assistant
# application is one container, so PostgreSQL is installed here and the server
# and worker collapse into the single `allinone` mode upstream's entrypoint
# already supports. See DOCS.md.
ARG BUILD_FROM=ghcr.io/goauthentik/server:2026.8.3
FROM ${BUILD_FROM}

# s6-overlay has to come up as pid 1, and the base image ends on USER 1000.
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
  `# The base image purges curl on its way out, and bashio needs it at run` \
  `# time as well as for the downloads below. postgresql is the whole reason` \
  `# this application can stand on its own; on Debian trixie it is 17.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    ca-certificates \
    curl \
    jq \
    openssl \
    postgresql \
    xz-utils \
  \
  `# Debian creates a cluster at install time through its own wrapper, under` \
  `# /var/lib/postgresql, which is inside the image rather than on a volume.` \
  `# The service script makes its own cluster in /data instead, so this one` \
  `# would be a confusing copy that is never started and never backed up.` \
  && pg_dropcluster --stop 17 main \
  \
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

# s6-overlay is pid 1 here, in place of the image's own dumb-init and `ak`
# entrypoint. The run script still calls `ak`, so upstream keeps ownership of
# migrations and of waiting for the database.
ENTRYPOINT ["/init"]

# The base image's health check runs `ak healthcheck`, which as root chowns
# /data to the authentik user — and the PostgreSQL cluster lives under /data.
# It has to be replaced rather than removed: Supervisor reads the container's
# `Healthcheck` config, and `HEALTHCHECK NONE` writes `Test: ["NONE"]`, which is
# truthy. An application with no health check at all is reported started as soon
# as it runs, but one with an inert check waits in `startup` for a health status
# Docker never emits, and never comes out of it.
#
# A plain request for the liveness endpoint has none of `ak healthcheck`'s side
# effects and works whatever the host maps the port to. The start period is long
# because a first boot runs every migration and imports the default flows.
HEALTHCHECK --interval=30s --timeout=10s --start-period=600s --retries=5 \
    CMD curl -f -s -S -o /dev/null http://127.0.0.1:9000/-/health/live/ || exit 1

# Expose the ports
EXPOSE 9000 9443

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Authentik" \
    org.opencontainers.image.description="Self-hosted identity provider for single sign-on." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
