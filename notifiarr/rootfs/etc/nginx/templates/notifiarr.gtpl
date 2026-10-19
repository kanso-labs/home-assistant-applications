# Notifiarr runs under the ingress path as its URL base, so every address it
# writes carries that path. The path has to go back onto requests on the way in:
# Supervisor strips it before an ingress request arrives here, and Traefik, Plex,
# scripts calling the API and everything else on the published port never send
# it. On the way out, ingress needs the path left where Notifiarr wrote it, and
# the published port needs it taken out again, so that a browser at home sees
# Notifiarr's addresses as they were before ingress.
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
# published port.
map $from_ingress $public_base {
    1 {{ .ingress_entry }};
    0 '';
}

map $from_ingress $public_root {
    1 {{ .ingress_entry }};
    0 /;
}

# nginx cannot rewrite a compressed response, so the published port asks
# Notifiarr for an uncompressed one. Ingress gets what the browser asked for,
# since nothing in it is rewritten.
map $from_ingress $upstream_accept_encoding {
    1 $http_accept_encoding;
    0 '';
}

# Notifiarr sets its session cookie on the root. Through ingress that is Home
# Assistant's, shared by every ingress application, and Bazarr's and Bazarr+'s
# session cookies have the same name, so there it is scoped to the ingress path
# instead.
map $from_ingress $ingress_cookie_path {
    1 {{ .ingress_entry }};
    0 /;
}

# Notifiarr hands its pages their URL base in a cookie, which the scripts read
# before anything else, and nginx can only rewrite a cookie's path, not its
# value. So the published port is sent a second one, the cookie Notifiarr sends
# when it has no URL base, and the browser keeps the later of the two.
map "$from_ingress:$upstream_cookie_urlbase" $public_urlbase_cookie {
    default '';
    "~^0:." urlbase=/;
}

# A page opened on the published port under the path, a bookmark made since
# ingress most likely, is sent to the same page without it. API callers do not
# ask for HTML, so they are answered where they asked.
map "$from_ingress:$http_accept" $redirect_out_of_base {
    default 0;
    "~^0:.*text/html" 1;
}

map $request_uri $request_uri_without_base {
    default $request_uri;
    "~^{{ .ingress_entry }}(?<rest>/.*)$" $rest;
    "~^{{ .ingress_entry }}(?<rest>\?.*)?$" /$rest;
}

# Notifiarr answers Plex's webhooks and Prometheus at the root whatever its URL
# base, and under the base only some of them, so these keep the address they
# were given. A sign-in from the top page arrives as POST / too, which is
# harmless: Notifiarr answers a sign-in at any path.
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
    # Beyond that cookie, Notifiarr writes its base into the settings its API
    # answers with and into its redirects, and names it nowhere else: the page
    # loads its scripts by relative address. Replacing that one string
    # everywhere it appears is all the rest takes. Through ingress the
    # replacement is the path itself, which changes nothing.
    proxy_set_header Accept-Encoding $upstream_accept_encoding;
    sub_filter '{{ .ingress_entry }}' '$public_base';
    sub_filter_once off;
    sub_filter_types application/javascript application/json application/manifest+json application/xml text/css text/javascript text/xml;
    proxy_redirect ~^(https?://[^/]+)?{{ .ingress_entry }}(/.*)$ $1$public_base$2;
    proxy_redirect ~^(https?://[^/]+)?{{ .ingress_entry }}$ $1$public_root;
    proxy_cookie_path ~^/$ $ingress_cookie_path;
    add_header Set-Cookie $public_urlbase_cookie;

    location ^~ {{ .ingress_entry }} {
        if ($redirect_out_of_base) {
            return 307 $request_uri_without_base;
        }

        proxy_pass http://{{ .upstream }};
    }

    location / {
        proxy_pass http://{{ .upstream }}$base_path$request_uri;
    }
{{- else }}
    location / {
        proxy_pass http://{{ .upstream }};
    }
{{- end }}
}
