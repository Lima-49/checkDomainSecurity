const apiURL = "http://127.0.0.1:5000/api/verificar-dominio/"

// Recupere o valor do campo de entrada
var dominio = document.getElementById('search_input').value;

// Adicione um evento de clique ao botão "Verificar Domínio"
document.getElementById('search_btn').addEventListener('click', async function () {
    
    // Verifique se o campo de entrada não está vazio
    if (dominio.trim() !== '') {
        try {
            // Faça a chamada de API usando o valor do domínio
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            };

            let response = await fetch(`${apiURL}${dominio}.json`, {
                method: "GET",
                headers: headersList,
                timeout: 10000 // Defina um timeout para a solicitação (10 segundos)
            });

            if (response.status === 200) {
                // A resposta foi bem-sucedida, então obtenha os dados
                let data = await response.text();
                window.location.href = `info.html?domain=${dominio}`;

            } else {
                // A resposta não foi bem-sucedida, trate o erro aqui
                console.error('Erro na chamada da API');
            }
        } catch (error) {
            console.error('Erro na chamada da API', error);
        }
    } else {
        // O campo de entrada está vazio, trate isso aqui
        console.error('Campo de entrada vazio');
    }
});


// Adicione um evento de clique ao botão "Verificar Domínio"
document.getElementById('search_input').addEventListener('keyup', async function (event) {

    if (event.key == 'Enter'){

        // Verifique se o campo de entrada não está vazio
        if (dominio.trim() !== '') {
            try {
                // Faça a chamada de API usando o valor do domínio
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
                };

                let response = await fetch(`${apiURL}${dominio}.json`, {
                    method: "GET",
                    headers: headersList,
                    timeout: 10000 // Defina um timeout para a solicitação (10 segundos)
                });

                if (response.status === 200) {
                    // A resposta foi bem-sucedida, então obtenha os dados
                    let data = await response.text();
                    window.location.href = `info.html?domain=${dominio}`;

                } else {
                    // A resposta não foi bem-sucedida, trate o erro aqui
                    console.error('Erro na chamada da API');
                }
            } catch (error) {
                console.error('Erro na chamada da API', error);
            }
        } else {
            // O campo de entrada está vazio, trate isso aqui
            console.error('Campo de entrada vazio');
        }
    }
    
});
