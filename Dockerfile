# Stage 1: собираем production-бандл
FROM node:18 AS builder
WORKDIR /app

# Копируем только манифесты зависимостей клиента
COPY client/package.json client/package-lock.json ./
RUN npm install

# Копируем исходники (но не node_modules!)
COPY client/src ./src
COPY client/public ./public

# Собираем
RUN npm run build

# Stage 2: nginx отдаёт статику
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
