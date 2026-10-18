# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Notifiarr/notifiarr
ARG NOTIFIARR_VERSION=0.9.7

# Notifiarr listens on the loopback address alone, and nginx answers on 5454 in
# its place, so that ingress and the published port both reach it. Environment
# variables win over the address saved in notifiarr.conf.
ENV DN_BIND_ADDR="127.0.0.1:15454"

# Install requirements for application. nginx is what ingress and the published
# port reach; the configuration its package ships is replaced by the one in
# rootfs/, which serves nothing else. The published binary is statically linked
# Go, so it runs against musl unchanged and needs nothing else.
RUN \
  apk add --no-cache \
    nginx \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then NOTIFIARR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then NOTIFIARR_ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/notifiarr.gz \
      "https://github.com/Notifiarr/notifiarr/releases/download/v${NOTIFIARR_VERSION}/notifiarr.${NOTIFIARR_ARCH}.linux.gz" \
  && mkdir -p /opt/notifiarr \
  && gunzip -c /tmp/notifiarr.gz > /opt/notifiarr/notifiarr \
  && chmod +x /opt/notifiarr/notifiarr \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. It asks nginx on
# 5454 for /ui/ws, which nginx passes to Notifiarr under its URL base, so both
# are checked. That is where Notifiarr's log viewer opens its WebSocket, and
# the one address Notifiarr leaves out of its HTTP log, which records every
# other request. Asked without the WebSocket's parameters, Notifiarr answers it
# with a redirect to sign in, or with its page while no API key is set,
# whatever the Authentication Type, so any answer below 500 counts. nginx
# answers 502 while Notifiarr is down. Notifiarr opens its port only after it
# has tried to report to notifiarr.com, and asked Plex for its name when one is
# set up, so the start period leaves room for either being slow to answer.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
  CMD code="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:5454/ui/ws)"; \
    case "${code}" in [234]??) exit 0 ;; esac; exit 1

# Expose the ports
EXPOSE 5454

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Notifiarr" \
    org.opencontainers.image.description="Unified client for Notifiarr.com." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
