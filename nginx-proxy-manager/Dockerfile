# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Ported from the Home Assistant Community app, which builds Nginx Proxy
# Manager from source because upstream publishes no release asset and its own
# image expects to own pid 1. The build below is that one, kept close enough to
# read as a diff against it; see DOCS.md for the credit.
#
# The base image is the one change worth knowing about. Upstream builds on
# hassio-addons/debian-base, which is Debian trixie, the release the Nginx
# repository line further down names. Home Assistant publishes its own trixie
# base, so the same packages install from the same archive; base-ubuntu, which
# AGENTS.md names as the Debian-family option, would have changed every one.
#
# The tag names the Debian release. Renovate pins it by digest, as it does every
# Home Assistant base image, and opens a pull request each time Home Assistant
# rebuilds trixie under it. The image's dated tags, such as trixie-2026.08.0,
# are ones Renovate cannot read as versions, so a pin to one never moved, and
# moving to Debian's next release is done by hand, with the suite the Nginx
# annotation below names.
#
# Debian's own packages are not pinned. Its archive keeps only the current
# version of each, so an exact pin stops resolving at the next point release and
# fails every build until someone edits it, and the base tag already fixes the
# release they come from. Nginx and Node.js are pinned below, where Renovate
# moves them: their repositories keep every version, and Nginx is the server
# this application exposes to the internet.
ARG BUILD_FROM=ghcr.io/home-assistant/base-debian:trixie
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
# Nginx comes from nginx.org's repository and Node.js from NodeSource's, both
# set up in the step below, and Renovate reads the same ones. nginx.org's suite
# names the base image's Debian release, and has to follow the base if it moves
# on from trixie; NodeSource's nodistro suite serves every release. One version
# covers both architectures.
# renovate: datasource=deb depName=nginx registryUrl=https://nginx.org/packages/mainline/debian?suite=trixie&components=nginx&binaryArch=amd64
ARG NGINX_VERSION=1.31.7-1~trixie
# renovate: datasource=deb depName=nodejs registryUrl=https://deb.nodesource.com/node_22.x?suite=nodistro&components=main&binaryArch=amd64
ARG NODEJS_VERSION=22.23.3-1nodesource1
# hadolint ignore=DL3003,DL3008,DL3042
RUN \
    apt-get update \
    \
    && apt-get install -y --no-install-recommends \
        apache2-utils \
        libcap2-bin \
        logrotate \
        openssl \
        python3 \
        python3-venv \
    \
    && apt-get install -y --no-install-recommends \
        build-essential \
        git \
        gnupg \
        libffi-dev \
        libssl-dev \
        patch \
        python3-dev \
    \
    # Debian ships nginx 1.26.3, which is older than both the Alpine build this
    # app used to ship and the OpenResty 1.29.2 upstream builds on. Take nginx
    # from the nginx project's own repository instead. It compiles the stream
    # module in statically, so no load_module directive is needed.
    #
    # Its signing key, like NodeSource's below, is saved to a file before gpg
    # reads it. curl cannot take back what a failed attempt has already written
    # to a pipe, so a retried download would send gpg that part twice.
    && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
        -o /tmp/nginx_signing.key \
        https://nginx.org/keys/nginx_signing.key \
    && gpg --dearmor < /tmp/nginx_signing.key \
        > /usr/share/keyrings/nginx-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg]" \
        "http://nginx.org/packages/mainline/debian trixie nginx" \
        > /etc/apt/sources.list.d/nginx.list \
    \
    # The app needs Node 22, while Debian ships Node 20 and its dependencies
    # refuse to install on it. Take Node from the NodeSource repository. That
    # package carries npm inside it, so no separate npm package is needed.
    && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
        -o /tmp/nodesource-repo.gpg.key \
        https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    && gpg --dearmor < /tmp/nodesource-repo.gpg.key \
        > /usr/share/keyrings/nodesource-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource-keyring.gpg]" \
        "https://deb.nodesource.com/node_22.x nodistro main" \
        > /etc/apt/sources.list.d/nodesource.list \
    \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        "nginx=${NGINX_VERSION}" \
        "nodejs=${NODEJS_VERSION}" \
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

# Supervisor shows the application as starting until the first result arrives,
# and with the watchdog on, restarts it when the check fails. /api/ is the
# status upstream's own check-health reads. It needs no sign-in, and asking the
# admin interface's Nginx for it checks both halves of the application. Every
# start installs the Certbot DNS plugins its certificates use before the Manager
# listens, and the first start of a new version runs its migrations as well, so
# the start period leaves room for both.
HEALTHCHECK --interval=30s --timeout=10s --start-period=300s --retries=5 \
    CMD curl -f -s -S -o /dev/null http://127.0.0.1:81/api/ || exit 1

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Nginx Proxy Manager" \
    org.opencontainers.image.description="Reverse proxy with a web interface and free SSL certificates." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
