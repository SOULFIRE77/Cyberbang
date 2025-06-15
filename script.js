const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://soulfire77.github.io/cyberbang/manifest.json",
  buttonRootId: "ton-connect"
});

tonConnectUI.onStatusChange(wallet => {
  const walletDiv = document.getElementById('wallet-address');
  const botLink = document.getElementById('bot-link');

  if (wallet) {
    walletDiv.innerText = `Кошелёк подключен: ${wallet.account.address}`;
    botLink.style.display = "block";
  } else {
    walletDiv.innerText = "";
    botLink.style.display = "none";
  }
});
