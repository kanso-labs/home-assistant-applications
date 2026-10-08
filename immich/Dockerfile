# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from Immich's own server image, as Byparr starts from the image its
# upstream publishes, and adds what upstream runs beside it as containers of
# their own: PostgreSQL with VectorChord, and Valkey. A Home Assistant
# application is one container, so both run inside this one, the way Authentik
# carries PostgreSQL and Flight Finder carries both. Machine learning, the
# fourth, is the Immich Machine Learning application. See DOCS.md.
#
# There is no BUILD_FROM here. Every version is an annotated ARG, the way Flight
# Finder pins its PostgreSQL and Valkey, and the annotations are what Renovate
# reads. See the rules for these images in .github/renovate.json.
# renovate: datasource=docker depName=ghcr.io/immich-app/immich-server
ARG IMMICH_VERSION=v3.3.0
# renovate: datasource=docker depName=valkey/valkey
ARG VALKEY_VERSION=9.1.2

# Valkey is copied out of its own image, which is built on the same Debian
# release as Immich's. That release ships Valkey 8, a major behind the 9
# upstream's compose file runs.
FROM valkey/valkey:${VALKEY_VERSION} AS valkey

FROM ghcr.io/immich-app/immich-server:${IMMICH_VERSION}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0
# PGDG's server depends on its client of exactly the same version, and the image
# already carries that client for Immich's database dumps. apt upgrades the
# client to match a newer server but never downgrades it, so this can only move
# forward from the image's. The suite names the image's Debian release, and has
# to follow it if Immich moves its base; one version covers both architectures.
# renovate: datasource=deb depName=postgresql-17 registryUrl=https://apt.postgresql.org/pub/repos/apt?suite=trixie-pgdg&components=main&binaryArch=amd64
ARG POSTGRESQL_VERSION=17.11-1.pgdg13+2
# VectorChord keeps its vectors in pgvector's types, and its package does not
# depend on pgvector, so it is installed and pinned here in its own right.
# renovate: datasource=deb depName=postgresql-17-pgvector registryUrl=https://apt.postgresql.org/pub/repos/apt?suite=trixie-pgdg&components=main&binaryArch=amd64
ARG PGVECTOR_VERSION=0.8.7-1.pgdg13+1
# renovate: datasource=github-releases depName=tensorchord/VectorChord
ARG VECTORCHORD_VERSION=1.1.1

RUN \
  `# The image purges ca-certificates on its way out, which leaves apt unable` \
  `# to verify PGDG's certificate. apt-get update then skips PGDG with a` \
  `# warning and a zero exit status, and would install Debian's own` \
  `# postgresql-17 in its place; the exact versions below fail instead.` \
  `# Debian's archive is plain HTTP, so the first update reaches it, and the` \
  `# second, with the certificates back, reaches PGDG.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends ca-certificates \
  && apt-get update \
  \
  `# The service script creates the cluster in /data. The one the package` \
  `# would create at install time lives in the image, where nothing starts it` \
  `# and nothing backs it up.` \
  && mkdir -p /etc/postgresql-common/createcluster.d \
  && echo 'create_main_cluster = false' \
    > /etc/postgresql-common/createcluster.d/no-main-cluster.conf \
  \
  && apt-get install --assume-yes --no-install-recommends \
    jq \
    "postgresql-17=${POSTGRESQL_VERSION}" \
    "postgresql-17-pgvector=${PGVECTOR_VERSION}" \
    xz-utils \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/vchord.deb \
      "https://github.com/tensorchord/VectorChord/releases/download/${VECTORCHORD_VERSION}/postgresql-17-vchord_${VECTORCHORD_VERSION}-1_$(dpkg --print-architecture).deb" \
  && apt-get install --assume-yes --no-install-recommends /tmp/vchord.deb \
  && rm -rf /var/lib/apt/lists/* \
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
  `# Valkey runs as a user of its own, as it does in its image.` \
  && useradd --system --home-dir /var/lib/valkey --no-create-home \
    --shell /usr/sbin/nologin valkey \
  && mkdir -p /var/lib/valkey \
  && chown valkey:valkey /var/lib/valkey \
  \
  && rm -f -r \
    /tmp/*

COPY --from=valkey /usr/local/bin/valkey-server /usr/local/bin/valkey-cli /usr/local/bin/

# The services start these by path, so a release that moved or broke any of them
# fails this build rather than an installed application.
RUN \
  test -x /usr/src/app/server/bin/start.sh \
  && command -v immich-healthcheck \
  && test -f /usr/lib/postgresql/17/lib/vchord.so \
  && /usr/lib/postgresql/17/bin/postgres --version \
  && valkey-server --version

# Copy root filesystem
COPY rootfs /

# PostgreSQL and Valkey are reached on the loopback address rather than as
# localhost, which can resolve to ::1, where neither listens. Immich connects as
# the superuser, as it expects to: it creates and updates its own extensions,
# and its database dumps use pg_dumpall. No password is given because the local
# connections are trusted; see the postgres service.
ENV \
  DB_URL='postgresql://postgres@127.0.0.1:5432/immich' \
  REDIS_HOSTNAME='127.0.0.1'

# Machine learning is the Immich Machine Learning application, reached by its
# hostname inside Home Assistant. Immich's own settings can point elsewhere.
ENV IMMICH_MACHINE_LEARNING_URL='http://2dd33fbd-immich-machine-learning:3003'

# The library, which a NAS can hold. See DOCS.md.
ENV IMMICH_MEDIA_LOCATION='/media/immich'

# s6-overlay is pid 1 here, in place of upstream's tini. Setting the entrypoint
# also clears upstream's command, so Immich is started only by its service.
ENTRYPOINT ["/init"]

# Upstream's check, given a start period. Immich runs its migrations, and after
# some updates rebuilds its search indexes, before it opens its port, and
# without one the check counts every failure until then. Supervisor shows the
# application as starting until the first result arrives.
HEALTHCHECK --interval=30s --timeout=10s --start-period=600s --retries=5 \
  CMD immich-healthcheck || exit 1

# Expose the ports
EXPOSE 2283

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Immich" \
    org.opencontainers.image.description="Self-hosted photo and video backup for your phones." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
