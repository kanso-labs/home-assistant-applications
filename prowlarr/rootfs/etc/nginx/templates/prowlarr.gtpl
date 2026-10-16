# Prowlarr runs under the ingress path as its URL base, so every address it
# writes carries that path. The path has to go back onto requests on the way in:
# Supervisor strips it before an ingress request arrives here, and Traefik,
# Sonarr and everything else calling the published port never sends it. On the
# way out, ingress needs the path left where Prowlarr wrote it, and the
# published port needs it taken out again, so that a browser at home sees
# Prowlarr's addresses as they were before ingress.
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
{{ if .ingress_entry }}
# Supervisor marks every ingress request with X-Ingress-Path. Anything without
# it came in on the published port.
map $http_x_ingress_path $from_ingress {
    default 1;
    '' 0;
}

# The base each caller sees: the ingress path through ingress, and none on the
# published port. Cookies need a path of their own, since an empty one means
# the current page's directory rather than the root.
map $from_ingress $public_base {
    1 {{ .ingress_entry }};
    0 '';
}

map $from_ingress $public_root {
    1 {{ .ingress_entry }};
    0 /;
}

map $from_ingress $public_base_encoded {
    1 {{ .ingress_entry_encoded }};
    0 '';
}

# nginx cannot rewrite a compressed response, so the published port asks
# Prowlarr for an uncompressed one. Ingress gets what the browser asked for,
# since nothing in it is rewritten.
map $from_ingress $upstream_accept_encoding {
    1 $http_accept_encoding;
    0 '';
}

# A page opened on the published port under the path, a bookmark from before
# this change most likely, is sent to the same page without it.
map "$from_ingress:$http_accept" $redirect_out_of_base {
    default 0;
    "~^0:.*text/html" 1;
}

map $request_uri $request_uri_without_base {
    default $request_uri;
    "~^{{ .ingress_entry }}(?<rest>/.*)$" $rest;
    "~^{{ .ingress_entry }}(?<rest>\?.*)?$" /$rest;
}
{{ end }}
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
    # Prowlarr believes forwarded headers from the loopback address, so each one
    # says what nginx saw rather than passing on what the client claimed. Prowlarr
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
    # Prowlarr writes its base into the page, the scripts' settings, the API's
    # answers and its redirects, and names it nowhere else, so replacing that
    # one string everywhere it appears is all it takes. Through ingress the
    # replacement is the path itself, which changes nothing.
    proxy_set_header Accept-Encoding $upstream_accept_encoding;
    sub_filter '{{ .ingress_entry }}' '$public_base';
    sub_filter_once off;
    sub_filter_types application/javascript application/json application/manifest+json application/xml text/css text/javascript text/xml;
    # The sign-in page is sent the page to return to, under the base and
    # encoded, so a redirect to it names the base twice. Only one redirect rule
    # applies to each response, so that case comes first.
    proxy_redirect ~^(https?://[^/]+)?{{ .ingress_entry }}(/.*?){{ .ingress_entry_encoded }}(.*)$ $1$public_base$2$public_base_encoded$3;
    proxy_redirect ~^(https?://[^/]+)?{{ .ingress_entry }}(/.*)$ $1$public_base$2;
    proxy_redirect ~^(https?://[^/]+)?{{ .ingress_entry }}$ $1$public_root;
    proxy_cookie_path ~^{{ .ingress_entry }}$ $public_root;
    proxy_cookie_path ~^{{ .ingress_entry }}(/.*)$ $public_base$1;

    location ^~ {{ .ingress_entry }} {
        if ($redirect_out_of_base) {
            return 307 $request_uri_without_base;
        }

        proxy_pass http://127.0.0.1:{{ .upstream }};
    }

    location / {
        proxy_pass http://127.0.0.1:{{ .upstream }}{{ .ingress_entry }}$request_uri;
    }
{{- else }}
    location / {
        proxy_pass http://127.0.0.1:{{ .upstream }};
    }
{{- end }}
}
