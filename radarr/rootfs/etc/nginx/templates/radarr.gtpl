# Radarr runs under the ingress path as its URL base, so every address it writes
# into a page already carries that path and nothing has to be rewritten on the
# way out. The path has to go back onto requests on the way in: Supervisor
# strips it before an ingress request arrives here, and Traefik, Prowlarr and
# everything else calling the published port never sends it. A browser that
# came in on the published port then asks for the prefixed addresses the page
# names, and those pass through as they are.
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

# A page opened on the published port without the path, a bookmark from before
# ingress most likely, is sent to the same page under it, because Radarr's own
# router only matches addresses under its URL base. Supervisor marks every
# ingress request with X-Ingress-Path, and those must never be redirected: the
# browser would come back through ingress without the path, and round again.
# API callers do not ask for HTML, so they are answered where they asked.
map $http_x_ingress_path $from_ingress {
    default 1;
    '' 0;
}

map "$from_ingress:$http_accept" $redirect_to_base {
    default 0;
    "~^0:.*text/html" 1;
}

server {
    listen {{ .port }} default_server;
{{- if .ipv6 }}
    listen [::]:{{ .port }} default_server;
{{- end }}

    # A restored backup is uploaded through here, and it can be large.
    client_max_body_size 0;
    proxy_request_buffering off;

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    # Radarr believes forwarded headers from the loopback address, so each one
    # says what nginx saw rather than passing on what the client claimed. Radarr
    # sees the same client address it saw before nginx was in front of it, which
    # is what its "disabled for local addresses" sign-in decides on.
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Live updates hold a WebSocket open for as long as the page is.
    proxy_buffering off;
    proxy_read_timeout 1h;
    proxy_send_timeout 1h;
    # Behind Traefik, an absolute redirect would name this port rather than
    # the one the browser used.
    absolute_redirect off;
{{ if .ingress_entry }}
    location ^~ {{ .ingress_entry }} {
        proxy_pass http://127.0.0.1:{{ .upstream }};
    }

    location / {
        if ($redirect_to_base) {
            return 307 {{ .ingress_entry }}$request_uri;
        }

        proxy_pass http://127.0.0.1:{{ .upstream }}{{ .ingress_entry }}$request_uri;
    }
{{- else }}
    location / {
        proxy_pass http://127.0.0.1:{{ .upstream }};
    }
{{- end }}
}
