# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Lingarr publishes rather than a Home Assistant
# base image, for the same reason Cleanuparr and Seerr do: Lingarr cuts no
# release archive at all. Its releases are the images themselves, so there is
# nothing to download and unpack onto a base image, and building on the
# published image is the only way to follow its versions.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application. The image underneath is
# mcr.microsoft.com/dotnet/aspnet, which is Ubuntu, so the packages come from
# apt as they do for Cleanuparr.
ARG BUILD_FROM=ghcr.io/lingarr-translate/lingarr:1.3.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# The ASP.NET runtime image is the slim Debian one, which carries neither` \
  `# curl nor ca-certificates. bashio needs curl and jq at run time, so those` \
  `# two stay installed rather than being purged with the rest.` \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    ca-certificates \
    curl \
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

# s6-overlay is pid 1 here, in place of the image's own `dotnet Lingarr.Server.dll`
# entrypoint, which the run script calls instead.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 9876

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Lingarr" \
    org.opencontainers.image.description="Subtitle translator for Radarr and Sonarr." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
