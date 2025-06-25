# Stage 1: собираем production-бандл
FROM node:18 AS builder
WORKDIR /app

# 1) Копируем зависимости клиента
COPY client/package.json client/package-lock.json ./
RUN npm install

# 2) Копируем исходники и корневой public
COPY client/src ./src
COPY public ./public

# 3) Собираем бандл
RUN npm run build

# Stage 2: nginx отдаёт готовый build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Копируем билд из первого этапа
COPY --from=builder /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
