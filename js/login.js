const loadingContainer = document.querySelector('.loading_conteiner');
const submitBTN = document.getElementById("login_submit");

submitBTN.addEventListener("click", async function (event) {
    event.preventDefault();
    await validLogin();
});

async function validLogin(){

    loadingContainer.style.display = 'block';
    document.querySelector('#notification_login').style.display = 'none';
    var usuario = document.getElementById("user").value;
    const senha = document.getElementById("pass").value;

    if ((usuario !== "") && (senha !== "")){
        try {

            const responseBD = await fetch('./php/seleciona.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user=${encodeURIComponent(usuario)}&pass=${encodeURIComponent(senha)}`,
            });
    
            const text = await responseBD.text();
            console.log(text);
            const data = JSON.parse(text);

            if (data.success) {
                window.location.href = `view_table.html`;
            } else {
                loadingContainer.style.display = 'none';
                document.querySelector('#notification_login').style.display = 'block';
            }

        } catch (error) {
            loadingContainer.style.display = 'none';
            console.error('Erro na chamada do PHP/API:', error);

        } finally {
            loadingContainer.style.display = 'none';
        }
    } else {
        loadingContainer.style.display = 'none';
    }
}
