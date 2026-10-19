# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
# Bazarr warns above Python 3.13 — "Python version greater than 3.13.x is
# unsupported [...] you're on your own" — but check_python_version() only exits
# below 3.10, and upstream CI runs its backend suite on 3.14. The warning is not
# a ceiling, so Renovate follows this image wherever it goes. The tag names a
# Python release and an Alpine one, and docker versioning alone never crosses
# the Alpine part, so .github/renovate.json reads the two as one version: a new
# Python arrives as a minor update, a new Alpine as a patch.
ARG BUILD_FROM=ghcr.io/home-assistant/base-python:3.14-alpine3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=morpheus65535/bazarr
ARG BAZARR_VERSION=1.6.2
# Bazarr runs UnRAR on archives downloaded from subtitle providers, which is
# untrusted input, so it is kept current. RARLAB publishes no feed or
# repository; the rarlab datasource in .github/renovate.json reads its download
# page. Its source tarballs are numbered by build rather than by version, so
# unrarsrc-7.2.7 is UnRAR 7.23, and the page links a beta as readily as a
# release: RARVER_BETA in the tarball's version.hpp says which a bump is, and
# the build below fails on a beta.
# renovate: datasource=custom.rarlab depName=unrar
ARG UNRAR_VERSION=7.2.7

# Install requirements for application. nginx is what ingress and the published
# port reach; the configuration its package ships is replaced by the one in
# rootfs/, which serves nothing else.
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
    nginx \
    unzip \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/unrar.tar.gz \
      "https://www.rarlab.com/rar/unrarsrc-${UNRAR_VERSION}.tar.gz" \
  && tar zxf \
      /tmp/unrar.tar.gz \
      -C /tmp \
  && if ! grep -q -E '^#define RARVER_BETA +0$' /tmp/unrar/version.hpp; then \
      echo "unrarsrc-${UNRAR_VERSION} is a beta of UnRAR, which this image does not ship" >&2; \
      exit 1; \
    fi \
  && make -C /tmp/unrar \
  && install -v -m755 /tmp/unrar/unrar /usr/local/bin \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/bazarr.zip \
      "https://github.com/morpheus65535/bazarr/releases/download/v${BAZARR_VERSION}/bazarr.zip" \
  && unzip -q \
      /tmp/bazarr.zip \
      -d /opt/bin \
  \
  && echo -e "UpdateMethod=docker\nBranch=master\nPackageVersion=${BUILD_VERSION}\nPackageAuthor=Kanso Labs" \
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

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Bazarr's ping
# needs no sign-in, and asking nginx for it checks both halves of the
# application. Bazarr answers a path outside its URL base with a redirect, which
# passes too, since the server is still answering. The start period covers the
# database migrations a first start after an update can run.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:6767/api/system/ping || exit 1

# Expose the ports
EXPOSE 6767

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Bazarr" \
    org.opencontainers.image.description="Subtitle manager for Radarr and Sonarr." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
