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

async function searchDomain() {
    const dominio = searchInput.value.trim();
    loadingContainer.style.display = 'block';

    if (dominio !== '') {
        try {
            // Salva o domínio no banco de dados usando AJAX
            const responseBD = await fetch('./php/insere.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `dominio_pesquisa=${encodeURIComponent(dominio)}`,
            });

            if (responseBD.ok) {

                const responseAPI = await fetch(`${apiURL}${dominio}`, {
                    method: "GET",
                    headers: headersList,
                    timeout: 10000
                });

                if (responseAPI.ok) {
                    const data = await responseAPI.text();
                    window.location.href = `info.html?domain=${encodeURIComponent(dominio)}&data=${encodeURIComponent(data)}`;
                } else {
                    console.error('Erro na chamada da API');
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
        console.error('Campo de entrada vazio');
        loadingContainer.style.display = 'none';
    }
}
