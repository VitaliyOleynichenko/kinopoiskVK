
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Копируем вашу готовую папку public в корень nginx
COPY public/ .

# Открываем порт 80
EXPOSE 80

# Запускаем nginx в форграунде
CMD ["nginx", "-g", "daemon off;"]

