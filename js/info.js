// Recupere o valor do domínio da URL
const urlParams = new URLSearchParams(window.location.search);

// Recupere o valor do domínio do Local Storage
var dominio = localStorage.getItem('dominio');
var data = JSON.parse(localStorage.getItem('data'));

// Verifique se o valor do domínio não está vazio
if (dominio) {
    // Atualize o conteúdo do elemento HTML com o valor do domínio
    document.getElementById('domain-label').textContent = dominio;
    document.getElementById('dashboard-title').textContent = dominio;
}

document.getElementById('back-button').addEventListener('click', async function () {
    window.location.href = "index.html"
});

document.getElementById('logo_home').addEventListener('click', async function () {
  window.location.href = "index.html"
});


// Selecione a div com a classe "StatusSummary_row"
const statusRow = document.querySelector('.StatusSummary_row');

// Acesse o valor de data[dmarc][info][exists]
const dmarcExists = data.dmarc.info.exists;

// Acesse o valor de data[dmarc][info][at_enforcement]
const dmarcAtEnforcement = data.dmarc.info.at_enforcement;

// Acesse o valor de data[dmarc][info][text]
const dmarcText = data.dmarc.info.text;

// Selecione a tag <img> com o ID "status-icon"
const statusIcon = document.getElementById('status-icon');

// Selecione a tag <img> com o ID "list_icon"
const listIcon = document.getElementById('list_icon');

if (dmarcExists){

    if (dmarcAtEnforcement) {
      // Se for verdadeiro, aplique a classe com o fundo verde
      statusRow.classList.add('background-green');
      document.getElementById('status_summary_title').textContent = "Protegido";
      document.getElementById('status_summary_sub_title').textContent = "Contra ataques de falsificação de identidade";
      statusIcon.src = "./img/email_correto_branco.png";

      listIcon.src = "./img/email_correto_branco.png";
      const dmarcList = document.getElementById('dmarc-list');
      const novoItem = document.createElement('li')
      novoItem.textContent = "Muito bem! Seu domínio está protegido contra abusos por phishers e spammers e atende às nossas recomendações de segurança.";
      novoItem.classList.add('List_item')
      dmarcList.appendChild(novoItem);

    } else {
      // Caso contrário, aplique a classe com o fundo vermelho
      statusRow.classList.add('background-red');
      document.getElementById('status_summary_title').textContent = "Desprotegido";
      document.getElementById('status_summary_sub_title').textContent = "Contra ataques de falsificação de identidade";

      document.querySelector('#btn_proteger_dominio').style.display = 'block';
      
      statusIcon.src = "./img/email_incorreto_branco.png";
      listIcon.src = "./img/email_incorreto_branco.png";
      document.querySelector('#btn_proteger_dominio').style.display = 'block';

      const dmarcList = document.getElementById('dmarc-list');
      const novoItem = document.createElement('li')
      novoItem.textContent = "Seu domínio não está protegido contra abuso por phishers e spammers! Qualquer um pode enviar mensagens se passando por esse domínio, sem ser detectado.";
      novoItem.classList.add('List_item')
      dmarcList.appendChild(novoItem);

    }

} else{
  // Caso contrário, aplique a classe com o fundo vermelho
  statusRow.classList.add('background-red');
  document.getElementById('status_summary_title').textContent = "Desprotegido";
  document.getElementById('status_summary_sub_title').textContent = "Contra ataques de falsificação de identidade";

  statusIcon.src = "./img/email_incorreto_branco.png";
  listIcon.src = "./img/email_incorreto_branco.png";
  document.querySelector('#btn_proteger_dominio').style.display = 'block';

  const dmarcList = document.getElementById('dmarc-list');

  const itemUm = document.createElement('li')
  itemUm.textContent = "Seu domínio não está totalmente protegido contra abusos de phishers e spammers. Qualquer um pode enviar mensagens se passando por esse domínio, sem ser detectado.";
  itemUm.classList.add('List_item')

  const itemDois = document.createElement('li')
  itemDois.textContent = "Deixe-nos ajudá-lo a corrigir isso e iniciar uma avaliação gratuita de 21 dias."
  itemDois.classList.add('List_item')

  dmarcList.appendChild(itemUm)
  dmarcList.appendChild(itemDois)

}

// Encontre o botão por ID
const btnProtegerDominio = document.getElementById('btn_proteger_dominio');

// Adicione um evento de clique ao botão
btnProtegerDominio.addEventListener('click', function() {
    // Redirecione para a URL desejada
    window.location.href = 'https://mailsecurity.com.br/mailsecurity-dmarc-enforcement/';
});

if(dmarcText != null){

  const dmarcList = document.getElementById('dmarc-list');
  const listSubTitle = document.createElement('li')
  listSubTitle.textContent = "Registro DMARC."
  listSubTitle.classList.add('List_sub-title')
  dmarcList.appendChild(listSubTitle)

  const novoItem = document.createElement('li');
  novoItem.className = 'code-block';

  const codeElement = document.createElement('code');
  codeElement.textContent = dmarcText;
  novoItem.appendChild(codeElement);

  dmarcList.appendChild(novoItem);

}


// Acesse o valor de data[spf][info][exists]
const spfExists = data.spf.info.exists;

// Acesse o valor de data[spf][info][valid]
const spfAtEnforcement = data.spf.info.valid;

// Acesse o valor de data[spf][info][text]
const spfText = data.spf.info.text;

// Selecione a tag <img> com o ID "list_icon"
const listIconSpf = document.getElementById('list_icon_spf');

if (spfExists){

  if (spfAtEnforcement) {

    listIconSpf.src = "./img/email_correto_branco.png";
    const spfList = document.getElementById('spf-list');
    
    const itemUm = document.createElement('li')
    itemUm.textContent = "Parabéns! Seu registro SPF é válido. Um registo SPF está configurado para este domínio e cumpre as nossas recomendações de boas práticas.";
    itemUm.classList.add('List_item')
    
    const itemDois = document.createElement('li')
    itemDois.textContent = `Os servidores de E-mail que processam este registo SPF efectuam um máximo de ${data.spf.info.domain_lookup_count} pesquisas de domínio. O SPF limita cada registo a um máximo de 10 pesquisas de domínio.`
    itemDois.classList.add('List_item')

    spfList.appendChild(itemUm);
    spfList.appendChild(itemDois);

  } else {

    listIconSpf.src = "./img/email_incorreto_branco.png";
    const spfList = document.getElementById('spf-list');
    
    const itemUm = document.createElement('li')
    itemUm.textContent = "A configuração SPF para este domínio tem erros que afetarão a segurança, a visibilidade e a capacidade de entrega do correio eletrónico enviado a partir do domínio.";
    itemUm.classList.add('List_item')
    
    const itemDois = document.createElement('li')
    itemDois.textContent = ` Os receptores estão limitados a 10 pesquisas de DNS quando avaliam registos SPF.
    A avaliação completa deste registo SPF requer ${spf_info.domain_lookup_count} pesquisas.
    Algumas ou todas as mensagens de correio eletrónico enviadas a partir deste domínio podem não ser autenticadas com êxito.`
    itemDois.classList.add('List_item')

    spfList.appendChild(itemUm);
    spfList.appendChild(itemDois);

  }

} else{

listIconSpf.src = "./img/email_incorreto_branco.png";
const dmarcList = document.getElementById('spf-list');

const itemUm = document.createElement('li')
itemUm.textContent = "Um registro SPF não foi configurado para esse domínio."
itemUm.classList.add('List_item')

const itemDois = document.createElement('li')
itemDois.textContent = "Emails enviados a partir desse domínio não serão authenticados"
itemDois.classList.add('List_item')

dmarcList.appendChild(itemUm)
dmarcList.appendChild(itemDois)

}

if(spfText != null){

  const dmarcList = document.getElementById('spf-list');
  const listSubTitle = document.createElement('li')
  listSubTitle.textContent = "Registro SPF."
  listSubTitle.classList.add('List_sub-title')
  dmarcList.appendChild(listSubTitle)

  const novoItem = document.createElement('li');
  novoItem.className = 'code-block';

  const codeElement = document.createElement('code');
  codeElement.textContent = spfText;
  novoItem.appendChild(codeElement);

  dmarcList.appendChild(novoItem);

}