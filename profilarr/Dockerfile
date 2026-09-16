# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This starts from the image Profilarr publishes rather than a Home Assistant
# base image, for the reason Seerr and Lingarr do: Profilarr cuts no release
# asset. Building it here would mean carrying a Deno toolchain, running the
# SvelteKit build, and then `deno compile`-ing a standalone binary against the
# right target triple — reproducing upstream's build rather than using it.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image. Both are installed below, and the service layout under
# rootfs/ is unchanged from every other application. The image underneath is
# denoland/deno:alpine, so the packages come from apk as they do for Seerr.
ARG BUILD_FROM=ghcr.io/dictionarry-hub/profilarr:2.2.0
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# bash, curl, ca-certificates, git and tar are already here — upstream` \
  `# installs them for its own entrypoint and for the git clones Profilarr` \
  `# makes. jq and xz are what bashio and the s6 tarballs add to that.` \
  apk add --no-cache \
    jq \
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

# Copy root filesystem
COPY rootfs /

# s6-overlay is pid 1 here, in place of the image's own tini and entrypoint.
# That entrypoint exists to reassign a uid from PUID/PGID and drop privileges
# to it, which every application here leaves to Supervisor instead; what it
# does besides that, the run script does.
ENTRYPOINT ["/init"]

# Expose the ports
EXPOSE 6868

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Profilarr" \
    org.opencontainers.image.description="Configuration management for Radarr and Sonarr." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
