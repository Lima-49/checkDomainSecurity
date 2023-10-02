const apiURL = "https://api-check-domain.onrender.com/api/verificar-dominio/";

const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');
const loadingContainer = document.querySelector('.loading_conteiner');

searchBtn.addEventListener('click', async function () {
    var domainSearched = await searchDomain();
    //window.location.href = domainSearched
});

searchInput.addEventListener('keyup', async function (event) {
    if (event.key === 'Enter') {
        var domainSearched = await searchDomain();
        //window.location.href = domainSearched
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

                await insertDataBase(dominio);
                return `info.html?domain=${dominio}`;

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

async function insertDataBase(dominio) {
    try {

        const response = await fetch("./php/database.php", {
            method: "POST",
            body: `dominio_pesquisa=${dominio}`,
            timeout: 10000
        });

        if (response.status === 200) {
            const data = await response.text();
            console.log("Resposta do servidor: ", data);
        } else {
            console.error('Erro na chamada da API');
        }
    } catch (error) {
        console.error('Erro na chamada da API', error);
    }
}