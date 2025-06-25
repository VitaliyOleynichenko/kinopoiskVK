# Stage 1: сборка production
FROM node:18 AS builder
WORKDIR /app

# 1.1) Копируем манифесты зависимостей клиента
COPY client/package.json client/package-lock.json ./
RUN npm install

# 1.2) Копируем весь client-код и собираем бандл
COPY client/ ./
RUN npm run build

# Stage 2: nginx отдаёт готовую статику
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 2.1) Копируем build
COPY --from=builder /app/build .

# 2.2) Открываем 80 порт и запускаем nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
