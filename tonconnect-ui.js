// Файл для подключения TonConnect UI через CDN
(function(){
  const script = document.createElement('script');
  script.src = "https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js";
  script.onload = () => console.log("TonConnect UI loaded");
  document.head.appendChild(script);
})();