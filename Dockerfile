FROM nginx:1.27-alpine-slim
COPY /browser /usr/share/nginx/html
EXPOSE 80
