const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://soulfire77.github.io/cyberbang/tonconnect-manifest.json',
  buttonRootId: 'ton-connect'
});

tonConnectUI.onStatusChange(wallet => {
  if (wallet && wallet.account && wallet.account.address) {
    document.getElementById("wallet-address").innerText = `Кошелек: ${wallet.account.address}`;
    document.getElementById("bot-link").style.display = "block";
    document.getElementById("register-instructions").innerText = "Вы подключены. Нажмите кнопку ниже, чтобы перейти в Telegram-бот.";
  }
});
