# Cyberbang

Браузерная киберпанк-игра с интеграцией TON Wallet, токеном CBG и NFT.

## Файлы
- `index.html` — основной фронтенд
- `tonconnect-ui.js` — загрузчик TonConnect UI
- `tonconnect-manifest.json` — манифест для TonConnect
- `manifest.webmanifest` — PWA манифест
- `icons/` — папка с иконками (icon-192.png, icon-512.png)
- `terms.html`, `privacy.html` — страницы условий и политики
- `backend/telegram-bot/` — код Telegram-бота для регистрации адресов

## Настройка
1. Замените в `index.html` и `tonconnect-manifest.json` URL на свой GitHub Pages.
2. Замените `YourBotUsername` на юзернейм вашего Telegram-бота.
3. Настройте Telegram-бот в папке `backend/telegram-bot`, создайте `.env` с `TELEGRAM_TOKEN`.
4. Добавьте файлы в репозиторий и запустите GitHub Pages.

