# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Ported from the Home Assistant Community app, which builds Nginx Proxy
# Manager from source because upstream publishes no release asset and its own
# image expects to own pid 1. The build below is that one, kept close enough to
# read as a diff against it; see DOCS.md for the credit.
#
# The base image is the one change worth knowing about. Upstream builds on
# hassio-addons/debian-base, and every Debian package here is pinned to an exact
# trixie version — as is the Nginx repository line further down. Home
# Assistant publishes its own trixie base, so those pins carry over untouched;
# base-ubuntu, which AGENTS.md names as the Debian-family option, would have
# invalidated every one of them.
ARG BUILD_FROM=ghcr.io/home-assistant/base-debian:trixie-2026.08.0
FROM ${BUILD_FROM}

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy patches
COPY patches/*.patch /usr/src/

# Setup base
# renovate: datasource=pypi depName=certbot
ARG CERTBOT_VERSION=5.8.0
# renovate: datasource=github-releases depName=NginxProxyManager/nginx-proxy-manager
ARG NGINX_PROXY_MANAGER_VERSION=2.16.0
# hadolint ignore=DL3003,DL3042
RUN \
    apt-get update \
    \
    && apt-get install -y --no-install-recommends \
        apache2-utils=2.4.68-1~deb13u1 \
        libcap2-bin=1:2.75-10+deb13u1+b3 \
    # logrotate has been rebuilt on aarch64 but not amd64, so its version
    # carries a binNMU suffix on one architecture only. Match the Debian
    # revision and let the suffix vary.
        logrotate=3.22.0-1* \
        openssl=3.5.7-1~deb13u2 \
        python3=3.13.5-1 \
        python3-venv=3.13.5-1 \
    \
    && apt-get install -y --no-install-recommends \
        build-essential=12.12 \
        git=1:2.47.3-0+deb13u1 \
        gnupg=2.4.7-21+deb13u1 \
        libffi-dev=3.4.8-2 \
        libssl-dev=3.5.7-1~deb13u2 \
        patch=2.8-2 \
        python3-dev=3.13.5-1 \
    \
    # Debian ships nginx 1.26.3, which is older than both the Alpine build this
    # app used to ship and the OpenResty 1.29.2 upstream builds on. Take nginx
    # from the nginx project's own repository instead. It compiles the stream
    # module in statically, so no load_module directive is needed.
    && curl -fsSL https://nginx.org/keys/nginx_signing.key \
        | gpg --dearmor > /usr/share/keyrings/nginx-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg]" \
        "http://nginx.org/packages/mainline/debian trixie nginx" \
        > /etc/apt/sources.list.d/nginx.list \
    \
    # The app needs Node 22, while Debian ships Node 20 and its dependencies
    # refuse to install on it. Take Node from the NodeSource repository. That
    # package carries npm inside it, so no separate npm package is needed.
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
        | gpg --dearmor > /usr/share/keyrings/nodesource-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource-keyring.gpg]" \
        "https://deb.nodesource.com/node_22.x nodistro main" \
        > /etc/apt/sources.list.d/nodesource.list \
    \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        nginx=1.31.6-1~trixie \
        nodejs=22.23.3-1nodesource1 \
    \
    && npm install --global yarn@1.22.22 \
    \
    && python3 -m venv /opt/certbot \
    && /opt/certbot/bin/pip install --no-cache-dir \
        "certbot==${CERTBOT_VERSION}" \
    && ln -s /opt/certbot/bin/certbot /usr/bin/certbot \
    \
    && /opt/certbot/bin/python -c "from importlib.metadata import version; \
        print('\n'.join(f'{p}=={version(p)}' \
        for p in ('acme', 'certbot', 'josepy')))" \
        > /etc/certbot-constraints.txt \
    \
    && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
        -o /tmp/nginxproxymanager.tar.gz \
        "https://github.com/NginxProxyManager/nginx-proxy-manager/archive/v${NGINX_PROXY_MANAGER_VERSION}.tar.gz" \
    && mkdir /app \
    && tar zxf \
        /tmp/nginxproxymanager.tar.gz \
        --strip 1 -C /app \
    \
    && for i in /usr/src/*.patch; do \
        patch -d /app -p 1 --forward --no-backup-if-mismatch < "${i}" \
        || exit 1; done \
    \
    && cd /app/frontend \
    && yarn install --frozen-lockfile --network-timeout 100000 \
    && yarn locale-compile \
    && yarn build \
    && rm -rf node_modules \
    \
    && mkdir -p /opt/nginx-proxy-manager/frontend \
    && cp -r /app/frontend/dist/. /opt/nginx-proxy-manager/frontend/ \
    \
    && cp -r /app/backend/. /opt/nginx-proxy-manager/ \
    \
    && sed -i "s#\"version\": \"[^\"]*\"#\"version\": \"${NGINX_PROXY_MANAGER_VERSION}\"#" \
        /opt/nginx-proxy-manager/package.json \
    && grep -q "\"version\": \"${NGINX_PROXY_MANAGER_VERSION}\"" \
        /opt/nginx-proxy-manager/package.json \
    \
    && cd /opt/nginx-proxy-manager \
    && yarn install --frozen-lockfile \
    && rm -rf /opt/nginx-proxy-manager/config \
    \
    && rm -f -r /etc/nginx \
    && cp -r /app/docker/rootfs/etc/nginx /etc/nginx \
    && rm -f /etc/nginx/conf.d/dev.conf \
    \
    # Upstream renders the web interface configuration at every start from a
    # template, so its port can be changed. This app always serves it on port
    # 81, so render it once here instead.
    && sed -e "s#{{NPM_ADMIN_PORT}}#81#g" \
        -e "s#root /app/frontend;#root /opt/nginx-proxy-manager/frontend;#" \
        /etc/nginx/conf.d/production.conf.template \
        > /etc/nginx/conf.d/production.conf \
    && rm -f /etc/nginx/conf.d/production.conf.template \
    \
    && cp /app/docker/rootfs/etc/letsencrypt.ini /etc \
    && cp /app/docker/rootfs/etc/logrotate.d/nginx-proxy-manager /etc/logrotate.d \
    \
    && sed -i "s#user npm;#user root;#" /etc/nginx/nginx.conf \
    && sed -i "s#su npm npm#su root root#" \
        /etc/logrotate.d/nginx-proxy-manager \
    && sed -i "s#table.string('id').notNull().primary();#table.string('id', 32).notNull().primary();#" \
        /opt/nginx-proxy-manager/migrations/20190227065017_settings.js \
    \
    && mkdir -p \
        /run/nginx \
    \
    && yarn cache clean \
    && npm uninstall --global yarn \
    \
    && apt-get purge -y --auto-remove \
        build-essential \
        git \
        gnupg \
        libffi-dev \
        libssl-dev \
        patch \
        python3-dev \
    && apt-get clean \
    \
    && rm -f -r \
        /app \
        /etc/init.d/nginx \
        /etc/logrotate.d/nginx \
        /opt/nginx-proxy-manager/node_modules/bcrypt/build \
        /root/.cache \
        /root/.node-gyp \
        /root/.npm \
        /tmp/.[!.]* \
        /tmp/* \
        /usr/lib/node_modules \
        /usr/local/share/.cache \
        /var/cache/nginx \
        /var/lib/apt/lists/* \
        /var/lib/nginx \
        /var/log/nginx \
        /var/tmp/nginx \
        /var/www

# Keep pip from replacing the Certbot stack that ships with the image
ENV PIP_CONSTRAINT=/etc/certbot-constraints.txt

# Copy root filesystem
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Nginx Proxy Manager" \
    org.opencontainers.image.description="Reverse proxy with a web interface and free SSL certificates." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
