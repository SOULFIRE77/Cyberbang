const connector = new window.TonConnect({
  manifestUrl: "https://soulfire77.github.io/cyberbang/tonconnect-manifest.json"
});

const connectBtn = document.getElementById("connect-button");
const walletInfo = document.getElementById("wallet-info");
const walletAddressEl = document.getElementById("wallet-address");
const walletBalanceEl = document.getElementById("wallet-balance");

connectBtn.addEventListener("click", async () => {
  try {
    const connected = await connector.connectWallet();
    const wallet = connector.wallet;
    const address = connector.account?.address;

    if (address) {
      walletAddressEl.textContent = address;
      walletInfo.style.display = "block";

      // Получение баланса
      const res = await fetch(`https://tonapi.io/v2/accounts/${address}`);
      const json = await res.json();
      const balance = Number(json.balance) / 1e9;
      walletBalanceEl.textContent = balance.toFixed(4);
    }
  } catch (err) {
    alert("Ошибка подключения кошелька: " + err.message);
  }
});
