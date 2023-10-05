const apiURL = "https://api-check-domain.onrender.com/api/verificar-dominio/";

const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');
const loadingContainer = document.querySelector('.loading_conteiner');

searchBtn.addEventListener('click', async function () {
    await searchDomain();
});

searchInput.addEventListener('keyup', async function (event) {
    if (event.key === 'Enter') {
        await searchDomain();
    }
});

function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block";

    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

async function searchDomain() {
    const dominio = searchInput.value.trim();
    loadingContainer.style.display = 'block';

    if (dominio !== '') {
        try {
            
            console.log(dominio)
            // Salva o domínio no banco de dados usando AJAX
            const responseBD = await fetch('./php/insere.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `dominio_pesquisa=${encodeURIComponent(dominio)}`,
            });

            if (responseBD.ok) {
                const responseAPI = await fetch(`${apiURL}${dominio}`, {
                    method: "GET",
                    timeout: 10000
                });

                if (responseAPI.ok) {
                    const data = await responseAPI.text();
                     localStorage.setItem('dominio', dominio);
                    localStorage.setItem('data', data);
                    window.location.href = `info.html?domain=${dominio}`;
                } else {
                    console.error('Erro na chamada da API');
                    showModal('Por favor, digite um domínio válido.');
                }
            } else {
                console.error('Erro ao salvar o domínio no banco de dados');
            }
        } catch (error) {
            console.error('Erro na chamada do PHP/API:', error);
        } finally {
            loadingContainer.style.display = 'none';
        }
    } else {
        loadingContainer.style.display = 'none';
    }
}
