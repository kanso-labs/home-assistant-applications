# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
# Tautulli's own image runs on Python 3.14, as this does. The tag names a Python
# release and an Alpine one, and .github/renovate.json reads the two as one
# version: a new Python arrives as a minor update, a new Alpine as a patch.
ARG BUILD_FROM=ghcr.io/home-assistant/base-python:3.14-alpine3.24@sha256:e85a15bd76ab9528d30057ff9794e1d31e64cdd2f5304bf345e37149d137eeda
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Tautulli/Tautulli
ARG TAUTULLI_VERSION=2.18.2
# Tautulli carries every library it needs in lib/, but for this one, which it
# uses to encrypt what it sends to the Tautulli Remote app. Without it those
# notifications go out in the clear. Its own image installs the same package.
# renovate: datasource=pypi depName=cryptography
ARG CRYPTOGRAPHY_VERSION=50.0.2

# Tautulli takes this for a Docker install: its updater stands down, and the
# settings the container decides, the port and the directories, are shown but
# cannot be changed.
ENV TAUTULLI_DOCKER=True

# Install requirements for application. nginx is what ingress and the published
# port reach; the configuration its package ships is replaced by the one in
# rootfs/, which serves nothing else. Tautulli runs as a user of its own, as in
# its own image.
RUN \
  apk add --no-cache \
    nginx \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/tautulli.tar.gz \
      "https://github.com/Tautulli/Tautulli/archive/refs/tags/v${TAUTULLI_VERSION}.tar.gz" \
  && mkdir -p /opt/tautulli \
  && tar zxf \
      /tmp/tautulli.tar.gz \
      --strip-components=1 \
      -C /opt/tautulli \
  && rm -f -r \
      /opt/tautulli/.github \
      /opt/tautulli/contrib \
      /opt/tautulli/init-scripts \
      /opt/tautulli/package \
      /opt/tautulli/snap \
      /opt/tautulli/tests \
  \
  `# A release tarball carries no git history, so Tautulli reads its version` \
  `# from these two files, as its own image writes them.` \
  && echo "v${TAUTULLI_VERSION}" > /opt/tautulli/version.txt \
  && echo 'master' > /opt/tautulli/branch.txt \
  \
  && pip3 install --no-cache-dir \
    "cryptography==${CRYPTOGRAPHY_VERSION}" \
  \
  && addgroup -S tautulli \
  && adduser -S -D -H -G tautulli -h /config -s /sbin/nologin tautulli \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Tautulli's status
# page needs no sign-in, and asking nginx for it checks both halves of the
# application. The start period covers the database upgrade a first start after
# an update can run.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:8181/status || exit 1

# Expose the ports
EXPOSE 8181

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Tautulli" \
    org.opencontainers.image.description="Monitoring and statistics for Plex Media Server." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
