# https://developers.home-assistant.io/docs/apps/configuration#app-dockerfile
#
# Like Byparr, this starts from the image upstream publishes rather than a Home
# Assistant base image. Wallos ships as PHP source, and its image is where the
# PHP extensions it needs are compiled into php:8.3-fpm-alpine, beside nginx
# and the cron daemon that sends its notifications. Building from Alpine's own
# PHP packages would mean keeping that list in step with upstream by hand.
#
# The cost is that s6-overlay and bashio arrive here by hand rather than from
# the base image, and that upstream's startup.sh, which starts all three in the
# background and then only waits, gives way to an s6 service for each.
ARG BUILD_FROM=bellamy/wallos:5.10.0
FROM ${BUILD_FROM}

# Set shell. bash is not installed yet, so this is busybox's ash.
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH=amd64
ARG BUILD_VERSION=dev
# renovate: datasource=github-releases depName=just-containers/s6-overlay
ARG S6_OVERLAY_VERSION=3.2.3.2
# renovate: datasource=github-releases depName=hassio-addons/bashio
ARG BASHIO_VERSION=0.19.0

RUN \
  `# bashio is a bash library that reads options through jq. curl and xz are` \
  `# already in the image.` \
  apk add --no-cache \
    bash \
    jq \
  \
  && if [ "${BUILD_ARCH}" = "aarch64" ]; then S6_ARCH="aarch64"; \
  elif [ "${BUILD_ARCH}" = "amd64" ]; then S6_ARCH="x86_64"; \
  else echo "Unsupported architecture: ${BUILD_ARCH}" && exit 1; fi \
  \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-noarch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/s6-arch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" \
  && tar -C / -Jxpf /tmp/s6-noarch.tar.xz \
  && tar -C / -Jxpf /tmp/s6-arch.tar.xz \
  \
  `# bashio is what the service scripts read application options with, and` \
  `# the Home Assistant base images are the only place it ships prebuilt.` \
  && curl -J -L -f --retry 8 --retry-all-errors --retry-max-time 180 \
      -o /tmp/bashio.tar.gz \
      "https://github.com/hassio-addons/bashio/archive/v${BASHIO_VERSION}.tar.gz" \
  && mkdir -p /tmp/bashio \
  && tar -xzf /tmp/bashio.tar.gz --strip-components=1 -C /tmp/bashio \
  && mv /tmp/bashio/lib /usr/lib/bashio \
  && ln -s /usr/lib/bashio/bashio /usr/bin/bashio \
  \
  `# Upstream's schedule is /etc/cron.d/cronjobs, run by dcron. dcron cannot` \
  `# be an s6 service: in the foreground it moves itself into a new process` \
  `# group, which a session leader may not do, and s6 starts every service as` \
  `# one. BusyBox's crond, already in the image, runs it instead, from root's` \
  `# crontab. Reading the file rather than trusting the crontab upstream` \
  `# installs from it fails the build if upstream ever moves it.` \
  `#` \
  `# Each job's output is sent to the application's log rather than a file` \
  `# inside the container, where nobody looking from Home Assistant would` \
  `# find it. Only the daily jobs print anything when there is nothing to do.` \
  `# They end without a newline, which awk adds so that the next line of the` \
  `# log starts on its own, and a job that prints nothing still prints nothing.` \
  `#` \
  `# The version check is left off the schedule. Every six hours it asks GitHub` \
  `# for Wallos's latest release, for a dashboard notice that cannot install` \
  `# it, when a new version only ever arrives as an application update.` \
  && sed -E '/checkforupdates\.php/d; s#>> /var/log/cron/[^ ]+ 2>&1$#2>\&1 | awk 1#' \
    /etc/cron.d/cronjobs > /etc/crontabs/root \
  && chmod 0600 /etc/crontabs/root \
  \
  && rm -f -r \
    /tmp/*

# Copy root filesystem
COPY rootfs /

# The Home Assistant base images set these for every other application. A
# failed first step, such as a database that could not be created or migrated,
# then stops the application rather than leaving the web server up in front of
# nothing.
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

# s6-overlay is pid 1 here, in place of upstream's dumb-init. Setting the
# entrypoint also clears the image's CMD, which would otherwise run
# startup.sh as the main program and start a second copy of everything.
ENTRYPOINT ["/init"]

# The PHP base image stops its container with SIGQUIT, which PHP-FPM takes as a
# graceful stop but s6-overlay ignores. Supervisor would wait out its timeout
# and kill Wallos on every stop. SIGTERM is what s6-overlay shuts down on.
STOPSIGNAL SIGTERM

# Upstream's health check is kept as it is. It asks nginx and PHP-FPM for a page
# that only says OK, and checks every 5 seconds until the first success, so
# Supervisor stops showing Wallos as starting within seconds of it answering.

# Expose the ports
EXPOSE 80

LABEL \
    org.opencontainers.image.title="Home Assistant Application: Wallos" \
    org.opencontainers.image.description="Tracks your subscriptions, what each costs a month and when it renews." \
    org.opencontainers.image.source="https://github.com/kanso-labs/home-assistant-applications" \
    org.opencontainers.image.licenses="MIT"
