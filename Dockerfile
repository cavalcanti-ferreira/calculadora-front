FROM nginx:1.27-alpine-slim
COPY /dist/calculadora-front/browser /usr/share/nginx/html
EXPOSE 80
