// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, что библиотека TonConnect UI загружена
  if (!window.TON_CONNECT_UI) {
    console.error("TonConnect UI не загружен");
    return;
  }
const manifestUrl = "https://SOULFIRE77.github.io/cyberbang/tonconnect-manifest.json";  ;
  // Инициализируем TonConnectUI и указываем div с id="ton-connect" для кнопки
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl,
    buttonRootId: "ton-connect"
  });

  // Функция обработки успешного подключения кошелька
  async function onWalletConnected(provider) {
    try {
      const account = (await provider.getAccount())?.account;
      if (account) {
        // Показываем адрес на странице
        document.getElementById("wallet-address").innerText =
          "Подключен адрес: " + account;

        // Показываем инструкцию для бота
        document.getElementById("register-instructions").innerHTML =
          `Скопируйте команду:<br><code>/register ${account}</code>`;

        // Делаем видимой кнопку регистрации в Telegram-боте
        const botLink = document.getElementById("bot-link");
        botLink.href = "https://t.me/CyberBangBOT";
        botLink.style.display = "inline-block";
      }
    } catch (err) {
      console.error("Ошибка при получении адреса кошелька:", err);
    }
  }

  // Слушаем изменение статуса подключения кошелька
  tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet.connected) {
      // Когда кошелек действительно подключён, получаем provider и вызываем onWalletConnected
      const provider = await tonConnectUI.connect();
      await onWalletConnected(provider);
    }
  });
});
