# Notifiarr runs under the ingress path as its URL base, so every address its
# web interface asks for already carries that path and nothing has to be
# rewritten on the way out. The path has to go back onto requests on the way in:
# Supervisor strips it before an ingress request arrives here, and Traefik, Plex,
# scripts calling the API and everything else on the published port never send
# it. A browser that came in on the published port then asks for the prefixed
# addresses the page names, and those pass through as they are.
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
{{ if .ingress_entry }}
# A page opened on the published port without the path, a bookmark from before
# ingress most likely, is sent to the same page under it, so that the address
# bar matches the URL base Notifiarr's pages navigate under. Supervisor marks
# every ingress request with X-Ingress-Path, and those must never be redirected:
# the browser would come back through ingress without the path, and round again.
# API callers and webhooks do not ask for HTML, so they are answered where they
# asked.
map $http_x_ingress_path $from_ingress {
    default 1;
    '' 0;
}

map "$from_ingress:$http_accept" $redirect_to_base {
    default 0;
    "~^0:.*text/html" 1;
}

# Notifiarr answers Plex's webhooks and Prometheus at the root whatever its URL
# base, and under the base only some of them, so these keep the address they
# were given. A sign-in from the top page under ingress arrives as POST / too,
# which is harmless: Notifiarr answers a sign-in at any path.
map "$request_method:$uri" $base_path {
    default {{ .ingress_entry }};
    'POST:/' '';
    'POST:/plex' '';
    'POST:/api/plex/post' '';
    'GET:/metrics' '';
    'GET:/api/metrics' '';
}
{{ end }}
server {
    listen {{ .port }} default_server;
{{- if .ipv6 }}
    listen [::]:{{ .port }} default_server;
{{- end }}

    # Plex posts a thumbnail with every webhook.
    client_max_body_size 0;
    proxy_request_buffering off;

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    # Notifiarr believes X-Forwarded-For only from the networks listed under
    # Upstreams, so this says what nginx saw rather than passing on what the
    # client claimed, in case loopback is ever listed there.
    proxy_set_header X-Forwarded-For $remote_addr;
    # A log file is followed over a WebSocket for as long as the page is open.
    proxy_buffering off;
    proxy_read_timeout 1h;
    proxy_send_timeout 1h;
    # Behind Traefik, an absolute redirect would name this port rather than
    # the one the browser used.
    absolute_redirect off;
{{ if .ingress_entry }}
    location ^~ {{ .ingress_entry }} {
        proxy_pass http://{{ .upstream }};
    }

    location / {
        if ($redirect_to_base) {
            return 307 {{ .ingress_entry }}$request_uri;
        }

        proxy_pass http://{{ .upstream }}$base_path$request_uri;
    }
{{- else }}
    location / {
        proxy_pass http://{{ .upstream }};
    }
{{- end }}
}
