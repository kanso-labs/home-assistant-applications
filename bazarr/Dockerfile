# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
# Bazarr supports Python 3.13 and below. It starts on 3.14 and then says so
# itself: "Python version greater than 3.13.x is unsupported [...] you're on
# your own". Renovate is held to 3.13 for this image; see renovate.json.
ARG BUILD_FROM=ghcr.io/home-assistant/base-python:3.13-alpine3.22
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=morpheus65535/bazarr
ARG BAZARR_VERSION=1.6.0
ARG UNRAR_VERSION=6.2.12

# Install requirements for application
RUN \
  apk add --no-cache --virtual .build-dependencies \
    autoconf \
    automake \
    build-base \
    linux-headers \
    musl-dev \
  \
  && apk add --no-cache \
    7zip \
    ffmpeg \
    mediainfo \
    unzip \
  \
  && curl -J -L -o /tmp/unrar.tar.gz \
      "https://www.rarlab.com/rar/unrarsrc-${UNRAR_VERSION}.tar.gz" \
  && tar zxf \
      /tmp/unrar.tar.gz \
      -C /tmp \
  && make -C /tmp/unrar \
  && install -v -m755 /tmp/unrar/unrar /usr/local/bin \
  \
  && curl -J -L -o /tmp/bazarr.zip \
      "https://github.com/morpheus65535/bazarr/releases/download/v${BAZARR_VERSION}/bazarr.zip" \
  && unzip -q \
      /tmp/bazarr.zip \
      -d /opt/bin \
  \
  && echo -e "PackageVersion=${BAZARR_VERSION}\nUpdateMethod=Docker\nBranch=master\nPackageAuthor=Kanso Labs" \
    > /opt/package_info \
  \
  `# Bazarr imports pkg_resources at startup, which setuptools dropped after` \
  `# v81, so it is held below that. The base image ships pip alone, and apk's` \
  `# py3-setuptools would target Alpine's python rather than /usr/local's.` \
  && pip3 install --no-cache-dir \
    'setuptools<81' \
    -r /opt/bin/requirements.txt \
  \
  && apk del --no-cache --purge .build-dependencies \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 6767

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Bazarr" \
    org.opencontainers.image.description="Subtitle manager for Radarr and Sonarr." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
