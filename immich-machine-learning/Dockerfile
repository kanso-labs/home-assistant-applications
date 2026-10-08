# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from Immich's own machine-learning image, as Byparr starts from the
# image its upstream publishes. Immich builds it for amd64 and arm64, and adds a
# variant for amd64 alone that runs the models on an Intel GPU through OpenVINO.
# The base therefore differs by architecture: amd64 takes that variant, and
# aarch64 the plain image, which runs the models on the processor.
#
# That is why there is no BUILD_FROM here. The build action passes BUILD_ARCH,
# which picks the stage below, and its default keeps a plain `docker build`
# working, the job BUILD_FROM's default does elsewhere. BuildKit, which the build
# action uses, pulls only the stage it picks; the legacy builder resolves every
# FROM, and so cannot build this for aarch64 at all.
#
# One version serves both stages, so the two architectures can never build
# different releases, and the annotation above it is what Renovate reads. See
# the rules for the Immich images in .github/renovate.json.
ARG BUILD_ARCH=amd64
# renovate: datasource=docker depName=ghcr.io/immich-app/immich-machine-learning
ARG IMMICH_VERSION=v3.3.0

FROM ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION}-openvino AS base-amd64
FROM ghcr.io/immich-app/immich-machine-learning:${IMMICH_VERSION} AS base-aarch64

# hadolint ignore=DL3006
FROM base-${BUILD_ARCH}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# Neither image carries curl or jq, which bashio needs, nor xz-utils, which` \
  `# the s6-overlay archives need.` \
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
  `# Upstream keeps the models in /cache, and points MACHINE_LEARNING_CACHE_FOLDER,` \
  `# TRANSFORMERS_CACHE and HF_HOME into it. Supervisor creates a new container` \
  `# on every start, so a cache left there would download every model again` \
  `# each time. Linking the folder into /data, which survives a restart, keeps` \
  `# all three without overriding any of them.` \
  && ln -s /data/cache /cache \
  \
  `# The service starts upstream's module by name, so a release that moved it` \
  `# fails this build rather than an installed application.` \
  && test -f /usr/src/immich_ml/__main__.py \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here, in place of upstream's tini. Setting the entrypoint
# also clears upstream's command, so machine learning is started only by its
# service.
ENTRYPOINT ["/init"]

# Upstream's health check stays. It asks the service's own /ping, which answers
# within seconds of a start, so Supervisor does not show the application as
# starting for long.

# Reached on Home Assistant's internal network by the Immich application, and
# never published on the host.
EXPOSE 3003

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Immich Machine Learning" \
    org.opencontainers.image.description="Face recognition and smart search for the Immich application." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
