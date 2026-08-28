# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:26.04
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=jdx/mise
ARG MISE_VERSION=2026.8.14

# Install requirements for application
RUN apt-get update && apt-get install --assume-yes --no-install-recommends \
    bash \
    curl \
    g++ \
    git \
    graphicsmagick \
    linux-libc-dev \
    make \
    openssh-client \
    python3 \
  && rm -rf /var/lib/apt/lists/*

# Install mise
RUN curl -L -f --retry 8 --retry-all-errors --retry-max-time 180 https://mise.run \
  | MISE_VERSION="${MISE_VERSION}" sh
ENV PATH="/root/.local/bin:$PATH"

# Copy root filesystem
COPY rootfs /

# Configure n8n
WORKDIR /usr/src/n8n

# Install Node.js and n8n
RUN mise install && \
  eval "$(mise activate)" && \
  npm install

# Expose the ports
EXPOSE 5678

LABEL \
    org.opencontainers.image.title="Home Assistant Application: n8n" \
    org.opencontainers.image.description="Flexible AI workflow automation for technical teams." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
