require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const DB = './backend/telegram-bot/users.json';

if (!fs.existsSync(DB)) fs.writeFileSync(DB, '[]');

function saveUser(user){
  const arr = JSON.parse(fs.readFileSync(DB));
  if (!arr.some(u=>u.chatId==user.chatId)) {
    arr.push(user);
    fs.writeFileSync(DB, JSON.stringify(arr, null, 2));
  }
}

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, `👋 Добро пожаловать в Cyberbang!\n\nИспользуй /register <TON‑адрес> для регистрации.`);
});

bot.onText(/\/register (.+)/, (msg, match) => {
  const addr = match[1].trim();
  if (!addr.startsWith('U')) return bot.sendMessage(msg.chat.id, '⛔ Неверный TON-адрес.');
  saveUser({ chatId: msg.chat.id, address: addr });
  bot.sendMessage(msg.chat.id, `✅ Адрес ${addr} зарегистрирован!`);
});

bot.onText(/\/balance/, msg => {
  const users = JSON.parse(fs.readFileSync(DB));
  const user = users.find(u=>u.chatId==msg.chat.id);
  if (!user) return bot.sendMessage(msg.chat.id, '⚠️ Сначала зарегистрируйтесь: /register <TON‑адрес>');
  bot.sendMessage(msg.chat.id, `🔍 Баланс для ${user.address}: ⚡ Пока недоступно`);
});

// Дополнительные команды
bot.onText(/\/inventory/, msg => {
  bot.sendMessage(msg.chat.id, `📦 Ваш инвентарь пока пуст.`);
});
bot.onText(/\/nft/, msg => {
  bot.sendMessage(msg.chat.id, `🎨 Ваши NFT: пока нет.`);
});
bot.onText(/\/stats/, msg => {
  bot.sendMessage(msg.chat.id, `📊 Статистика: 0 игр, 0 побед.`);
});

bot.on('message', msg => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, 'Используйте команды: /register, /balance, /inventory, /nft, /stats.');
  }
});

console.log('✅ CyberBang Telegram‑бот запущен');
