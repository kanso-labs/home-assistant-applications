# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Grimmory publishes, as Byparr starts from its
# upstream's, and adds the MariaDB that upstream runs beside it as a container of
# its own. A Home Assistant application is one container, so MariaDB runs inside
# this one, the way Immich carries PostgreSQL. See DOCS.md.
#
# Upstream's image is Java 25 on Alpine 3.24, for amd64 and arm64 together.
# Grimmory is built with Java's preview features on, which run only on the exact
# Java release it was compiled for, so its own runtime is kept rather than a
# Home Assistant base image's.
ARG BUILD_FROM=ghcr.io/grimmory-tools/grimmory:v3.5.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0
# The version is pinned so that a new MariaDB produces a release rather than
# arriving silently. registryUrl carries the Alpine branch of the image above,
# so it needs updating when upstream moves to a newer Alpine. 11.8 rather than
# the 11.4 upstream's compose file runs, because 11.8 is what Alpine 3.24
# ships, and both are long-term releases.
# renovate: datasource=apk depName=mariadb registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG MARIADB_VERSION=11.8.9-r0
# nginx answers ingress on a port of its own, and is pinned the way MariaDB is,
# from the same Alpine branch.
# renovate: datasource=apk depName=nginx registryUrl=https://dl-cdn.alpinelinux.org/alpine?branch=v3.24&components=main&arch=x86_64
ARG NGINX_VERSION=1.30.4-r1

RUN \
  `# Upstream's image carries no curl, which the downloads below retry with.` \
  `# The configuration nginx's package ships is replaced by the one in` \
  `# rootfs/, which serves nothing but ingress.` \
  apk add --no-cache \
    bash \
    curl \
    jq \
    "mariadb=${MARIADB_VERSION}" \
    "mariadb-client=${MARIADB_VERSION}" \
    "nginx=${NGINX_VERSION}" \
    xz \
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

# The services start these by path, so a release that moved or broke any of them
# fails this build rather than an installed application.
RUN \
  test -f /app/app.jar \
  && command -v java \
  && command -v mariadb-admin \
  && command -v mariadb-install-db \
  && mariadbd --version \
  && nginx -v

# Copy root filesystem
COPY rootfs /

# Ingress works by nginx rewriting text in Grimmory's built web interface, which
# Grimmory names nowhere else, so an update that changes any of that text would
# leave ingress showing a blank page while the published port went on working,
# and nothing would say why. This reads every sub_filter's text out of
# nginx.conf, so the list cannot drift from it, and fails the build when any of
# them is missing from the interface inside /app/app.jar. A failure here means
# the rewrite in nginx.conf needs updating to what this Grimmory writes instead.
RUN \
  mkdir -p /tmp/web \
  && unzip -q /app/app.jar 'BOOT-INF/classes/static/*' -d /tmp/web \
  && awk ' \
      $1 == "sub_filter" { \
        rest = substr($0, index($0, "sub_filter") + 11); \
        quote = substr(rest, 1, 1); \
        rest = substr(rest, 2); \
        print substr(rest, 1, index(rest, quote) - 1) \
      }' /etc/nginx/nginx.conf > /tmp/patterns \
  && test "$(wc -l < /tmp/patterns)" -gt 0 \
  && while IFS= read -r pattern; do \
    found="$(grep -r -l -F -- "${pattern}" /tmp/web/BOOT-INF/classes/static | wc -l)"; \
    echo "${found} file(s) contain ${pattern}"; \
    test "${found}" -gt 0 || exit 1; \
  done < /tmp/patterns \
  && nginx -t \
  && rm -f -r /tmp/*

# s6-overlay is pid 1 here, in place of upstream's entrypoint. Setting the
# entrypoint also clears upstream's command, so Grimmory is started only by its
# service.
ENTRYPOINT ["/init"]

# Upstream's probe, asked of 127.0.0.1 every 30 seconds rather than of localhost
# every 60, with a start period of five minutes rather than one. The first start
# creates the database and runs every migration before Grimmory opens its port,
# which the start period leaves room for. Supervisor shows the application as
# starting until the first result arrives.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD wget -q --spider http://127.0.0.1:6060/api/v1/healthcheck || exit 1

# Expose the ports
EXPOSE 6060

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Grimmory" \
    org.opencontainers.image.description="A self-hosted library for your ebooks, comics and audiobooks." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
