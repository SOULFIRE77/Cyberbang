require('dotenv').config();
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const dataFile = path.join(__dirname, 'registrations.json');

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

bot.onText(/\/register\s+(.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1].trim();
  if (!address.startsWith('U')) {
    bot.sendMessage(chatId, 'Неверный TON-адрес. Пример: /register U...');
    return;
  }
  let data = JSON.parse(fs.readFileSync(dataFile));
  if (data.find(item => item.address === address)) {
    bot.sendMessage(chatId, `Адрес ${address} уже зарегистрирован.`);
  } else {
    data.push({ address, chatId, date: new Date().toISOString() });
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    bot.sendMessage(chatId, `Адрес ${address} успешно зарегистрирован!`);
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text && !msg.text.startsWith('/register')) {
    bot.sendMessage(chatId, 'Используйте команду /register <TON_ADDRESS> для регистрации.');
  }
});

console.log('Telegram bot started');