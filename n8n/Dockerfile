# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:26.04@sha256:0101510bef30b55ea61faf7c58379d6a8d90f5b0f87436cc193e612cff543bf8
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=jdx/mise
ARG MISE_VERSION=2026.10.22

# Install requirements for application. nginx is the stand-in for Home
# Assistant's API that the ready-made credential points at; the configuration
# its package ships is replaced by the one in rootfs/, which serves nothing else.
RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
    bash \
    curl \
    git \
    graphicsmagick \
    nginx \
    openssh-client \
  && rm -rf /var/lib/apt/lists/*

# Install mise. The installer comes from the pinned release rather than from
# https://mise.run, which changes with every release, so it is fixed for each
# commit and carries that release's checksums. It still needs MISE_VERSION:
# without it, the installer fetches the newest release instead of its own.
RUN curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/mise-install.sh \
      "https://github.com/jdx/mise/releases/download/v${MISE_VERSION}/install.sh" \
  && MISE_VERSION="${MISE_VERSION}" sh /tmp/mise-install.sh \
  && rm -f /tmp/mise-install.sh
ENV PATH="/root/.local/bin:$PATH"

# Configure n8n
WORKDIR /usr/src/n8n

# Only the files that decide the install come first, so a change to the service
# scripts reuses the installed layer instead of rebuilding it, and an update that
# changes only those scripts downloads only them.
COPY \
  rootfs/usr/src/n8n/package.json \
  rootfs/usr/src/n8n/package-lock.json \
  rootfs/usr/src/n8n/.tool-versions \
  ./

# Install Node.js and n8n. Its native modules compile here, so the toolchain
# comes and goes within this one layer, and npm's cache goes with it. Left
# behind, the two made up most of the image.
#
# npm ci installs exactly the tree the lockfile records, and fails if it and
# package.json disagree. package.json pins n8n alone, while n8n names much of
# what it depends on by range, so without the lockfile a rebuild of the same
# commit could resolve different code.
RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
    g++ \
    linux-libc-dev \
    make \
    python3 \
  && mise install \
  && eval "$(mise activate)" \
  && npm ci --no-audit --no-fund \
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
    org.opencontainers.image.description="Workflow automation that connects your services and Home Assistant, with a visual editor, code steps and AI nodes." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
