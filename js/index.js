const apiURL = "https://api-check-domain.onrender.com/api/verificar-dominio/"

// Adicione um evento de clique ao botão "Verificar Domínio"
document.getElementById('search_btn').addEventListener('click', async function () {
    
    // Recupere o valor do campo de entrada
    var dominio = document.getElementById('search_input').value;

    document.querySelector('.loading_conteiner').style.display = 'block';

    // Verifique se o campo de entrada não está vazio
    if (dominio.trim() !== '') {
        try {
            // Faça a chamada de API usando o valor do domínio
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            };

            console.log(`${apiURL}${dominio}`)

            let response = await fetch(`${apiURL}${dominio}`, {
                method: "GET",
                headers: headersList,
                timeout: 20000 // Defina um timeout para a solicitação (10 segundos)
            });

            if (response.status === 200) {
                // A resposta foi bem-sucedida, então obtenha os dados
                let data = await response.text();
                localStorage.setItem('dominio', dominio);
                localStorage.setItem('data', data)
                window.location.href = `info.html?domain=${dominio}`;

                document.querySelector('.loading_conteiner').style.display = 'none'

            } else {
                // A resposta não foi bem-sucedida, trate o erro aqui
                console.error('Erro na chamada da API');
                document.querySelector('.loading_conteiner').style.display = 'none';

            }
        } catch (error) {
            console.error('Erro na chamada da API', error);
            document.querySelector('.loading_conteiner').style.display = 'none';

        }
    } else {
        // O campo de entrada está vazio, trate isso aqui
        console.error('Campo de entrada vazio');
        document.querySelector('.loading_conteiner').style.display = 'none';

    }
});


// Adicione um evento de clique ao botão "Verificar Domínio"
document.getElementById('search_input').addEventListener('keyup', async function (event) {

    if (event.key == 'Enter'){

        document.querySelector('.loading_conteiner').style.display = 'block';
        
        // Recupere o valor do campo de entrada
        var dominio = document.getElementById('search_input').value;

        // Verifique se o campo de entrada não está vazio
        if (dominio.trim() !== '') {
            try {
                // Faça a chamada de API usando o valor do domínio
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
                };
                
                console.log(`${apiURL}${dominio}`)

                let response = await fetch(`${apiURL}${dominio}`, {
                    method: "GET",
                    headers: headersList,
                    timeout: 10000 // Defina um timeout para a solicitação (10 segundos)
                });

                if (response.status === 200) {
                    // A resposta foi bem-sucedida, então obtenha os dados
                    let data = await response.text();
                    localStorage.setItem('dominio', dominio);
                    localStorage.setItem('data', data)
                    window.location.href = `info.html?domain=${dominio}`;

                    document.querySelector('.loading_conteiner').style.display = 'none';

                } else {
                    // A resposta não foi bem-sucedida, trate o erro aqui
                    console.error('Erro na chamada da API');
                    document.querySelector('.loading_conteiner').style.display = 'none';
                }
            } catch (error) {
                console.error('Erro na chamada da API', error);
                document.querySelector('.loading_conteiner').style.display = 'none';
            }
        } else {
            // O campo de entrada está vazio, trate isso aqui
            console.error('Campo de entrada vazio');
            document.querySelector('.loading_conteiner').style.display = 'none';
        }
    }
    
});

