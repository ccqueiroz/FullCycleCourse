## Nginx como Proxy reverso

Para criar um proxy reverso utilizando o Nginx, deve-se criar um arquivo nginx.conf, onde a principal informação que deve possuir é:
<pre>
    server {
    listen 80;
    location / {
        proxy_pass http://192.x.x.2;
    }
    }
</pre>
Modelo de nginx com Proxy reverso para PHP
<pre>
    server {
        listen 80;
        index index.php index.html;
        root /var/www/html;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type_Options "nosniff";

        charset utf-8;

        location ~ \.php$ {
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass laravel:9000;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include /etc/nginx/fastcgi_params;
        }

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
</pre>
Modelo de nginx com Proxy reverso para NodeJs
<pre>
    server {
        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_pass http://appnode:3030;
        }
    }
</pre>

Dockerfile para nginx como proxy reverso com PHP
<pre>
    FROM nginx:1.15.0-alpine

    RUN rm /etc/nginx/conf.d/default.conf

    COPY nginx.conf /etc/nginx/conf.d

    RUN mkdir /var/www/html -p && touch /var/www/html/index.php
</pre>

Dockerfile para nginx como proxy reverso com NodeJs
<pre>
    FROM nginx:1.15.0-alpine

    RUN rm /etc/nginx/conf.d/default.conf

    COPY nginx.conf /etc/nginx/conf.d
</pre>
- Um ponto de atenção é a exclusão do arquivo ```default.conf```

e a cópia do arquivo ```nginx.conf``` para dentro ```/etc/nginx/conf.d```
