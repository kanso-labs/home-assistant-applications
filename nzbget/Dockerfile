# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=nzbgetcom/nzbget
ARG NZBGET_VERSION=26.3

# Install requirements for application
RUN \
  `# NZBGet calls lscpu on startup. Without it the binary still runs, but` \
  `# every start logs a "not found" error.` \
  apk add --no-cache \
    util-linux \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then NZBGET_ARCH="aarch64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then NZBGET_ARCH="x86_64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 -o /tmp/nzbget.run \
      "https://github.com/nzbgetcom/nzbget/releases/download/v${NZBGET_VERSION}/nzbget-${NZBGET_VERSION}-bin-linux.run" \
  \
  `# The installer ships every architecture. Naming one keeps only its binary,` \
  `# and the payload is statically linked, so it runs against musl unchanged.` \
  && sh /tmp/nzbget.run \
      --arch "${NZBGET_ARCH}" \
      --destdir /opt/nzbget \
  \
  `# The page loads its scripts and styles as combined.js?a.js+b.js, which` \
  `# ingress cannot carry: Home Assistant and Supervisor both re-encode the` \
  `# query on the way through, it arrives as ?a.js+b.js=, and NZBGet answers` \
  `# 404 to any URL holding "=". This swaps in the page's one-file-per-tag` \
  `# list, with the same four edits NZBGet makes itself in a debug build, and` \
  `# fails the build if the markers it relies on are ever gone.` \
  && grep -q -F '<!-- %if-not-debug% -->' /opt/nzbget/webui/index.html \
  && sed -i \
      -e 's|<!-- %if-debug%||' \
      -e 's|<!-- %if-not-debug% -->|<!--|' \
      -e 's|<!-- %end% -->|-->|' \
      -e 's|%end% -->||' \
      /opt/nzbget/webui/index.html \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# Expose the ports
EXPOSE 6789

LABEL \
    org.opencontainers.image.title="Home Assistant Application: NZBGet" \
    org.opencontainers.image.description="Usenet downloader with a web interface." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
