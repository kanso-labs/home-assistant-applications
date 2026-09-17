# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# This is on base-ubuntu rather than the Alpine base every arr application
# uses, because Configarr's released executable is a Bun build linked against
# glibc — `interpreter /lib/ld-linux-aarch64.so.1`, `GLIBC_2.17`. Bun's own
# error text rules out the usual escape hatch: a glibc build cannot be loaded
# on musl even with gcompat. The alternative is upstream's published image,
# which carries a full Node runtime to run the same program.
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:26.04
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=raydak-labs/configarr
ARG CONFIGARR_VERSION=1.32.0

# The released executable reports its version as the literal `${VERSION}`,
# because the substitution upstream does when it builds its own image does not
# reach the binary. Configarr reads this variable ahead of the compiled-in
# value, so setting it is what puts the running version in the log.
ENV CONFIGARR_VERSION=${CONFIGARR_VERSION}

# Install requirements for application
#
# git is not optional here. Configarr drives it through simple-git to clone
# TRaSH Guides and the Recyclarr templates, which is where everything it syncs
# comes from, so without it every run fails with nothing to read.
RUN \
  apt-get update \
  && apt-get install --assume-yes --no-install-recommends \
    ca-certificates \
    curl \
    git \
    xz-utils \
  && rm -f -r /var/lib/apt/lists/* \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then CONFIGARR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then CONFIGARR_ARCH="x64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/configarr.tar.xz \
      "https://github.com/raydak-labs/configarr/releases/download/v${CONFIGARR_VERSION}/configarr-linux-${CONFIGARR_ARCH}.tar.xz" \
  `# The tarball also carries configarr.map, a 3MB source map that only` \
  `# decorates stack traces. Extracting the executable alone leaves it out.` \
  && tar -Jxf /tmp/configarr.tar.xz -C /usr/local/bin configarr \
  && chmod a+x /usr/local/bin/configarr \
  \
  `# Upstream sets this in its own image for the same reason: the clones under` \
  `# /data are made by whoever the container runs as, and git refuses to read a` \
  `# repository whose owner does not match, which surfaces as a clone that` \
  `# succeeds once and then fails on every later run.` \
  && git config --global --add safe.directory '*' \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Configarr" \
    org.opencontainers.image.description="Syncs TRaSH Guides and Recyclarr templates into the arr applications." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
