// Recupere o valor do domínio da URL
const urlParams = new URLSearchParams(window.location.search);

// Recupere o valor do domínio do Local Storage
var dominio = localStorage.getItem('dominio');

// Verifique se o valor do domínio não está vazio
if (dominio) {
    // Atualize o conteúdo do elemento HTML com o valor do domínio
    document.getElementById('domain-label').textContent = dominio;
}

document.getElementById('back-button').addEventListener('click', async function () {
    window.location.href = "index.html"
});

document.getElementById('logo_home').addEventListener('click', async function () {
  window.location.href = "index.html"
});
