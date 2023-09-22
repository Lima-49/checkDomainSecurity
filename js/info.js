// info.js

document.addEventListener("DOMContentLoaded", function () {
    // Obtém os elementos DOM
    const domainLabel = document.getElementById("domain-label");
    const backButton = document.getElementById("back-button");
    const dashboardTitle = document.getElementById("dashboard-title");
    const statusRow = document.getElementById("status-row");
    const statusIcon = document.getElementById("status-icon");
    const statusTitle = document.getElementById("status-title");
    const statusSubtitle = document.getElementById("status-subtitle");
    const dmarcList = document.getElementById("dmarc-list");
    const spfList = document.getElementById("spf-list");
  
    // Aqui você pode adicionar sua lógica para preencher os elementos DOM com os dados dinâmicos
    // Por exemplo:
    domainLabel.textContent = "Exemplo.com";
    dashboardTitle.textContent = "Exemplo.com";
  
    // Evento de clique para o botão "Consultar outro Domínio"
    backButton.addEventListener("click", function () {
      // Lógica para redirecionar ou executar outra ação ao clicar no botão
      alert("Botão de volta clicado.");
    });
  });
  