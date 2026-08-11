# Base image
ARG BUILD_FROM
FROM $BUILD_FROM

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
