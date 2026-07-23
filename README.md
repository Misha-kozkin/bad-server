# WebLarek — интернет-магазин

Учебный fullstack-проект интернет-магазина «WebLarek»: клиентская часть на React, серверная часть на Node.js/Express, база данных MongoDB. Весь проект запускается через Docker Compose, а раздачей статики и проксированием запросов занимается Nginx.

GitHub проекта: https://github.com/Misha-kozkin/bad-server.git

## Стек технологий

Frontend - React, TypeScript, Vite, Redux Toolkit, React Router, Sass
Backend - Node.js, TypeScript, Express, MongoDB (Mongoose), JWT-авторизация
Прокси Nginx
Инфраструктура - Docker, Docker Compose,

## Запуск локально (для разработки)

1. Склонировать репозиторий
   **https://github.com/Misha-kozkin/bad-server.git**

```bash
   git clone https://github.com/Misha-kozkin/bad-server.git
   cd bad-server
```

2. Скопировать примеры переменных окружения и заполнить их своими значениями

```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
```

3. Запустить проект

```bash
   docker compose up -d
```

4. Наполнить базу данных тестовыми данными — см. [.dump/README.md](.dump/README.md)
5. Открыть в браузере:
   - http://localhost/ — витрина магазина
   - http://localhost/login/ — авторизация
   - http://localhost/admin/ — админка
