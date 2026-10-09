# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:26.04
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=jdx/mise
ARG MISE_VERSION=2026.10.6

# Install requirements for application
RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
    bash \
    curl \
    git \
    graphicsmagick \
    openssh-client \
  && rm -rf /var/lib/apt/lists/*

# Install mise
RUN curl -L -f --retry 8 --retry-all-errors --retry-max-time 180 https://mise.run \
  | MISE_VERSION="${MISE_VERSION}" sh
ENV PATH="/root/.local/bin:$PATH"

# Configure n8n
WORKDIR /usr/src/n8n

# Only the two pins that decide the install come first, so a change to the
# service scripts reuses the installed layer instead of rebuilding it, and an
# update that changes only those scripts downloads only them.
COPY rootfs/usr/src/n8n/package.json rootfs/usr/src/n8n/.tool-versions ./

# Install Node.js and n8n. Its native modules compile here, so the toolchain
# comes and goes within this one layer, and npm's cache goes with it. Left
# behind, the two made up most of the image.
RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
    g++ \
    linux-libc-dev \
    make \
    python3 \
  && mise install \
  && eval "$(mise activate)" \
  && npm install --no-audit --no-fund \
  && npm cache clean --force \
  && apt-get purge --assume-yes --auto-remove g++ linux-libc-dev make python3 \
  && rm -rf /var/lib/apt/lists/* /root/.cache /root/.npm /tmp/*

# Copy root filesystem
COPY rootfs /

# n8n counts an unset NODE_ENV as development, which turns off its login rate
# limits, echoes any Origin back with credentials, and puts stack traces in
# error responses. n8n's own image sets it too. Set after the install and before
# anything runs n8n, so docker exec sessions and n8n's CLI commands get it as
# well.
ENV NODE_ENV=production

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. Readiness answers
# only once n8n's database is connected and migrated and n8n has finished
# starting, which the first start after an update can take minutes to reach.
HEALTHCHECK --interval=30s --timeout=10s --start-period=600s --retries=5 \
  CMD curl -f -s -S -o /dev/null http://127.0.0.1:5678/healthz/readiness || exit 1

# Expose the ports
EXPOSE 5678

LABEL \
    org.opencontainers.image.title="Home Assistant Application: n8n" \
    org.opencontainers.image.description="Flexible AI workflow automation for technical teams." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
