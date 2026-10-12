# The Home Assistant node in n8n calls http://<host>:<port>/api/... with a
# long-lived access token. This server stands in for Home Assistant on the
# loopback address: it forwards the API to Home Assistant through Supervisor
# and adds this application's own token, so the credential in n8n carries a
# placeholder that is never read.
#
# Only processes inside this container can reach it, and those can already
# read the Supervisor token from their environment.
server {
    listen 127.0.0.1:{{ .port }};

    location /api/ {
        proxy_http_version 1.1;
        proxy_pass http://supervisor/core/api/;
        proxy_set_header Authorization "Bearer {{ env "SUPERVISOR_TOKEN" }}";
        proxy_set_header Host supervisor;
        # The node streams nothing, but a service call can take a while.
        proxy_read_timeout 300s;
    }

    location / {
        return 404;
    }
}
