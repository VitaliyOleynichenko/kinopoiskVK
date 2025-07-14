# MovieLab — Простое SPA для просмотра фильмов

**MovieLab** — это одностраничное приложение на React + TypeScript с бесконечным скроллом, фильтрами и возможностью добавлять фильмы в «Избранное». Данные берутся из публичного Kinopoisk API.


## 📂 Структура проекта

.
├── client/ # React-клиент
│ ├── Dockerfile
│ ├── docker-compose.yml
│ ├── src/
│ ├── public/
│ ├── .env.default
│ └── package.json
└── README.md # Вы на него смотрите :)

## 🚀 Быстрый старт

1. **Клонируйте репозиторий**  
   ```bash
   git clone https://github.com/<ваш-пользователь>/<ваш-репо>.git
   cd <ваш-репо>
Перейдите в папку клиента

cd client

Откройте .env и пропишите ваш ключ:

REACT_APP_KP_API_URL=https://api.kinopoisk.dev
REACT_APP_KP_API_KEY=ВАШ_КЛЮЧ_ОТ_API

Запустите приложение через Docker Compose

docker compose up --build

Откройте в браузере
http://localhost:3000

🎉 Ура! Всё работает!


📋 Кратко о функционале
Бесконечный скролл — подгрузка по 50 фильмов на страницу

Фильтры — по жанру, рейтингу и году (синхронизация с URL)

Детальная страница — постер, описание, дата, жанры, рейтинг

Избранное — сохраняется в LocalStorage, добавление через модальное окно

📦 Технологии
React + TypeScript

MobX для управления состоянием

Material UI для компонентов

Axios для HTTP-запросов

Docker + Docker Compose для контейнеризации
