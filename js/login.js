const loadingContainer = document.querySelector('.loading_conteiner');
const formSubmit = document.getElementById("login_form");

formSubmit.addEventListener("submit", async function (){
    await validLogin();
})

async function validLogin(){
    
    loadingContainer.style.display = 'block';
    var usuario = document.getElementById("user").value;
    const senha = document.getElementById("pass").value;

    if ((usuario !== "") && (senha !== "")){
        try {
            
            console.log(dominio)
            // Salva o domínio no banco de dados usando AJAX
            const responseBD = await fetch('./php/selecina.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user=${encodeURIComponent(usuario)}&pass=${encodeURIComponent(senha)}`,
            });

            if (responseBD.ok) {
                window.location.href = `view_table.html`;
            } else {
                loadingContainer.style.display = 'none';
                showModal('Credenciais incorretas');
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