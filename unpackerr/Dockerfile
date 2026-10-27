# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24@sha256:880016115f356afc814398e17ba68a7ee66dfc1b4eaef09755ea2c9fa18ea481
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=Unpackerr/unpackerr
ARG UNPACKERR_VERSION=1.0.0

# Unpackerr's web interface answers on 5656 for everything on Home Assistant's
# network, with no URL base, and nginx hands ingress to it there. Environment
# variables win over unpackerr.conf on every start, and the web interface shows
# both settings as fixed, so neither can be moved out from under nginx.
ENV \
  UN_WEBSERVER_LISTEN_ADDR="0.0.0.0:5656" \
  UN_WEBSERVER_URLBASE="/"

# Install requirements for application. nginx is what ingress reaches; the
# configuration its package ships is replaced by the one in rootfs/, which
# serves nothing else.
#
# 0.16.0 moved the project to GoReleaser, which replaced the bare gzipped
# binary with a tarball and put the version in the filename. There is no
# unpackerr.<arch>.linux.gz published from that release onwards, so this URL
# does not work for anything older than 0.16.0 either.
RUN \
  apk add --no-cache \
    nginx \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then UNPACKERR_ARCH="arm64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then UNPACKERR_ARCH="amd64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/unpackerr.tar.gz \
      "https://github.com/Unpackerr/unpackerr/releases/download/v${UNPACKERR_VERSION}/unpackerr_${UNPACKERR_VERSION}_linux_${UNPACKERR_ARCH}.tar.gz" \
  && tar zxf /tmp/unpackerr.tar.gz -C /usr/local/bin unpackerr \
  && chmod a+x /usr/local/bin/unpackerr \
  \
  `# Kept as the seed for /config on first run. It travels inside the same` \
  `# tarball as the binary, so the commented defaults cannot drift from the` \
  `# version that ships.` \
  && mkdir -p /opt/unpackerr \
  && tar zxf /tmp/unpackerr.tar.gz -C /opt/unpackerr unpackerr.conf.example \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. It asks nginx on
# 8099 for /ws, which nginx passes to Unpackerr on 5656, so both are checked.
# That is where the web interface opens its websocket, and the one address
# Unpackerr leaves out of its HTTP log, which records every other request.
# Asked without a session, Unpackerr answers it with 401, so any answer below
# 500 counts. nginx answers 502 while Unpackerr is down.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD code="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8099/ws)"; \
    case "${code}" in [234]??) exit 0 ;; esac; exit 1

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Unpackerr" \
    org.opencontainers.image.description="Extracts completed downloads for the arr applications." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
