# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Like Seerr, this starts from the image upstream publishes rather than a Home
# Assistant base image. FlareSolverr releases a linux x64 tarball and nothing
# else, so aarch64 has no asset to install at all. Its own image is built for
# amd64 and arm64 together, which is the only route to both architectures.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application.
ARG BUILD_FROM=ghcr.io/flaresolverr/flaresolverr:v3.5.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

# Upstream runs as an unprivileged user. s6-overlay has to come up as pid 1.
USER root

RUN \
  apt-get update && apt-get install --assume-yes --no-install-recommends \
    curl \
    jq \
    xz-utils \
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
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here. The Home Assistant base images set this for every
# other application; this one has to set it itself.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 8191

LABEL \
    org.opencontainers.image.title="Home Assistant Application: FlareSolverr" \
    org.opencontainers.image.description="Proxy server that solves the challenges standing between the arr applications and their indexers." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
