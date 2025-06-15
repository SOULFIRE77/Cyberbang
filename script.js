// script.js: initializes TonConnect UI
document.addEventListener('DOMContentLoaded', () => {
  if (!window.TON_CONNECT_UI) {
    console.error("TonConnect UI script not loaded yet");
    return;
  }
  const manifestUrl = "https://SOULFIRE77.github.io/cyberbang/tonconnect-manifest.json"; // replace if needed
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl,
    buttonRootId: "ton-connect"
  });

  async function onWalletConnected(provider) {
    try {
      const account = (await provider.getAccount())?.account;
      if (account) {
        document.getElementById("wallet-address").innerText =
          "Подключен адрес: " + account;
        const instrEl = document.getElementById("register-instructions");
        instrEl.innerHTML = `Скопируйте команду:<br><code>/register ${account}</code>`;
        const botLink = document.getElementById("bot-link");
        botLink.href = "https://t.me/CyberBangBOT";
        botLink.style.display = "inline-block";
      }
    } catch (err) {
      console.error("Ошибка при получении адреса:", err);
    }
  }

  tonConnectUI.onStatusChange(async (wallet) => {
    if (wallet.connected) {
      const provider = await tonConnectUI.connect();
      await onWalletConnected(provider);
    }
  });
});