# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Traefik publishes a static build with every release, and it runs as it is on
# the Home Assistant base image, which brings the bashio the service scripts
# need.
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=traefik/traefik
ARG TRAEFIK_VERSION=3.7.13

RUN \
  if [ "${BUILD_ARCH}" = "aarch64" ]; then ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && release="https://github.com/traefik/traefik/releases/download/v${TRAEFIK_VERSION}" \
  && archive="traefik_v${TRAEFIK_VERSION}_linux_${ARCH}.tar.gz" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o "/tmp/${archive}" "${release}/${archive}" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/checksums.txt "${release}/traefik_v${TRAEFIK_VERSION}_checksums.txt" \
  \
  `# The release publishes a checksum for every archive, so a truncated or` \
  `# substituted download fails here rather than at run time.` \
  && (cd /tmp && grep " ${archive}$" checksums.txt | sha256sum -c -) \
  && tar -xzf "/tmp/${archive}" -C /usr/local/bin traefik \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 80 443

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Traefik" \
    org.opencontainers.image.description="Reverse proxy that sends each request to the application its host name belongs to." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
