FROM nginx

WORKDIR /app

RUN apt-get update && \
    apt-get install vim -y

COPY ./index.html /usr/share/nginx/html