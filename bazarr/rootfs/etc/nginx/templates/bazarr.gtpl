# Bazarr runs under the ingress path as its URL base, so every address it writes
# carries that path. The path has to go back onto requests on the way in:
# Supervisor strips it before an ingress request arrives here, and Traefik, the
# webhooks Sonarr and Radarr send, and everything else calling the published
# port never send it. On the way out, ingress needs the path left where Bazarr
# wrote it, and the published port needs it taken out again, so that a browser
# at home sees Bazarr's addresses as they were before ingress.
{{ if .base_url }}
# Supervisor marks every ingress request with X-Ingress-Path. Anything without
# it came in on the published port.
map $http_x_ingress_path $from_ingress {
    default 1;
    '' 0;
}

# The base each caller sees: the ingress path through ingress, and none on the
# published port. A redirect to the bare base needs a path of its own, since an
# empty one would leave the browser where it was.
map $from_ingress $public_base {
    1 {{ .base_url }};
    0 '';
}

map $from_ingress $public_root {
    1 {{ .base_url }};
    0 /;
}

# nginx cannot rewrite a compressed response, so the published port asks Bazarr
# for an uncompressed one, and nginx compresses it after the rewrite. Ingress
# gets what the browser asked for, since nothing in it is rewritten.
map $from_ingress $upstream_accept_encoding {
    1 $http_accept_encoding;
    0 '';
}

# Bazarr sets its session cookie on the root. Through ingress that is Home
# Assistant's, shared by every ingress application, and Bazarr+'s and
# Notifiarr's session cookies have the same name, so there it is scoped to the
# ingress path instead.
map $from_ingress $ingress_cookie_path {
    1 {{ .base_url }};
    0 /;
}

# A page opened on the published port under the path, such as a link copied out
# of ingress, is sent to the same page without it. API callers do not ask for
# HTML, so they are answered where they asked.
map "$from_ingress:$http_accept" $redirect_out_of_base {
    default 0;
    "~^0:.*text/html" 1;
}

map $request_uri $request_uri_without_base {
    default $request_uri;
    "~^{{ .base_url }}(?<rest>/.*)$" $rest;
    "~^{{ .base_url }}(?<rest>\?.*)?$" /$rest;
}
{{ end }}
server {
    listen {{ .port }} default_server;
{{- if .ipv6 }}
    listen [::]:{{ .port }} default_server;
{{- end }}

    # Subtitle files are uploaded through here, and nginx would refuse any over
    # 1 MiB on its own.
    client_max_body_size 0;
    proxy_request_buffering off;

    # Bazarr takes the scheme from X-Forwarded-Proto, which nginx passes on as
    # the client sent it, and logs X-Forwarded-For with each sign-in.
    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # A manual search answers only once every provider has, and live updates
    # hold a request open until there is something to send.
    proxy_buffering off;
    proxy_read_timeout 1h;
    proxy_send_timeout 1h;
    # Behind Traefik, an absolute redirect would name this port rather than
    # the one the browser used.
    absolute_redirect off;
{{ if .base_url }}
    # Bazarr writes its base into the page's <base> and the settings it injects
    # there, the API's answers, and its redirects, and names it nowhere else:
    # the scripts read it from the page. So replacing that one string is all it
    # takes. Through ingress the replacement is the path itself, which changes
    # nothing.
    proxy_set_header Accept-Encoding $upstream_accept_encoding;
    sub_filter '{{ .base_url }}' '$public_base';
    sub_filter_once off;
    sub_filter_types application/javascript application/json application/manifest+json text/css text/javascript;
    # nginx compresses what it rewrote, after rewriting it, in Bazarr's place.
    # Ingress answers arrive compressed already when the browser asked for it,
    # and nginx leaves a compressed answer alone.
    gzip on;
    gzip_proxied any;
    gzip_types application/javascript application/json application/manifest+json text/css text/javascript text/plain;
    gzip_vary on;
    proxy_redirect ~^(https?://[^/]+)?{{ .base_url }}(/.*)$ $1$public_base$2;
    proxy_redirect ~^(https?://[^/]+)?{{ .base_url }}$ $1$public_root;
    proxy_cookie_path ~^/$ $ingress_cookie_path;

    location ^~ {{ .base_url }} {
        if ($redirect_out_of_base) {
            return 307 $request_uri_without_base;
        }

        proxy_pass http://127.0.0.1:{{ .upstream }};
    }

    location / {
        proxy_pass http://127.0.0.1:{{ .upstream }}{{ .base_url }}$request_uri;
    }
{{- else }}
    location / {
        proxy_pass http://127.0.0.1:{{ .upstream }};
    }
{{- end }}
}
