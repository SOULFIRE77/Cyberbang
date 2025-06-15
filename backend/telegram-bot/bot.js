// bot.js
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  console.error("Не задан TELEGRAM_TOKEN в .env");
  process.exit(1);
}
const bot = new TelegramBot(token, { polling: true });

const dataFile = path.resolve(__dirname, 'users.json');
let users = {};
if (fs.existsSync(dataFile)) {
  try {
    users = JSON.parse(fs.readFileSync(dataFile));
  } catch {
    users = {};
  }
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Этот бот регистрирует твой TON-адрес. После подключения кошелька на сайте отправь сюда команду /register <адрес>.');
});

bot.onText(/\/register (.+)/, (msg, match) => {
  const address = match[1].trim();
  const chatId = msg.chat.id.toString();
  users[chatId] = address;
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
  bot.sendMessage(chatId, `Адрес зарегистрирован: ${address}`);
});

bot.onText(/\/myaddress/, (msg) => {
  const chatId = msg.chat.id.toString();
  const addr = users[chatId];
  if (addr) {
    bot.sendMessage(chatId, `Твой зарегистрированный адрес: ${addr}`);
  } else {
    bot.sendMessage(chatId, `У тебя ещё не зарегистрирован адрес. Используй /register <адрес>.`);
  }
});

console.log("Telegram-бот запущен");