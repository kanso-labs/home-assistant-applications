# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Authelia publishes a static musl build with every release, and it runs as it
# is on the Home Assistant base image. Authelia's own image is Ubuntu without
# bash, which the service scripts need, so this starts from the base image and
# takes the release binary instead.
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=authelia/authelia
ARG AUTHELIA_VERSION=4.39.28

RUN \
  if [ "${BUILD_ARCH}" = "aarch64" ]; then ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && release="https://github.com/authelia/authelia/releases/download/v${AUTHELIA_VERSION}" \
  && archive="authelia-v${AUTHELIA_VERSION}-linux-${ARCH}-musl.tar.gz" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o "/tmp/${archive}" "${release}/${archive}" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/checksums.sha256 "${release}/checksums.sha256" \
  \
  `# The release publishes a checksum for every archive, so a truncated or` \
  `# substituted download fails here rather than at run time.` \
  && (cd /tmp && grep " ${archive}$" checksums.sha256 | sha256sum -c -) \
  && tar -xzf "/tmp/${archive}" -C /usr/local/bin authelia \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 9091

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Authelia" \
    org.opencontainers.image.description="Single sign-on and two-factor authentication for the applications behind your reverse proxy." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
