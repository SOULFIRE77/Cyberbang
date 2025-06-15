# Cyberbang

Проект Cyberbang с поддержкой TonConnect и Telegram-ботом.

## Frontend
- `index.html`, `style.css`, `js/script.js`.
- Подключает TON-кошелёк и показывает адрес + даёт команду `/register <address>`.

## Backend (Telegram bot)
- Папка: `backend/telegram-bot`
- Файл `.env` содержит:
  TELEGRAM_TOKEN=твой токен
  TON_WALLET=твой TON-адрес
- Запуск:
  ```bash
  cd backend/telegram-bot
  npm install
  node index.js
  ```

## Публикация на GitHub Pages
- Загрузить содержимое репозитория в `main`.
- Активировать GitHub Pages на ветке main (root).
- Адрес: `https://soulfire77.github.io/cyberbang/`