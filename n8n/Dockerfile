# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base-ubuntu:24.04
FROM ${BUILD_FROM}

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
RUN curl https://mise.run | sh
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
    org.opencontainers.image.description="Flexible AI workflow automation for technical teams. Build with the precision of code or the speed of drag-n-drop. Host with on-prem control or in-the-cloud convenience. n8n gives you more freedom to implement multi-step AI agents and integrate apps than any other tool." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
