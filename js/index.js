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
            const headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            };

            const response = await fetch(`${apiURL}${dominio}`, {
                method: "GET",
                headers: headersList,
                timeout: 10000
            });

            if (response.status === 200) {
                const data = await response.text();
                localStorage.setItem('dominio', dominio);
                localStorage.setItem('data', data);
                window.location.href = `info.html?domain=${dominio}`;

            } else {
                console.error('Erro na chamada da API');
            }
        } catch (error) {
            console.error('Erro na chamada da API', error);
        } finally {
            loadingContainer.style.display = 'none';
        }
    } else {
        console.error('Campo de entrada vazio');
        loadingContainer.style.display = 'none';
    }
}
