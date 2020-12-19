FROM nginx:1.13.0-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build/*  /usr/share/nginx/html/

