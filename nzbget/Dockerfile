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
  `# every start logs a "not found" error. The extensions in its Extension` \
  `# Manager are Python 3 scripts, so Python is installed and linked under` \
  `# both names they call it by, as NZBGet's own image does.` \
  apk add --no-cache \
    python3 \
    util-linux \
  \
  && ln -s -f /usr/bin/python3 /usr/bin/python \
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
  `# NZBGet's own updater would replace /opt/nzbget inside a container that` \
  `# Supervisor recreates on every start, so an update would run without the` \
  `# page edit below until the next start, which then puts the old version` \
  `# back. The page reads its update feed and install script from` \
  `# package-info.json, so emptying that and removing the script leaves the` \
  `# update dialog nothing to install.` \
  && rm -f /opt/nzbget/install-update.sh \
  && echo '{}' > /opt/nzbget/webui/package-info.json \
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
