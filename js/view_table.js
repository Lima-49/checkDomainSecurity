const logoHM = document.getElementById('logo_img');

logoHM.addEventListener('click', function () {
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await axios.get('./php/view_table.php');
        const data = response.data;

        const tableBody = document.querySelector('#table-data tbody');
        data.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row.DATA_PESQUISA}</td>
                <td>${row.DOMINIO_PESQUISA}</td>`;
            tableBody.appendChild(newRow);
        });
    } catch (error) {
        console.error('Erro na chamada do PHP/API:', error);
    }
});
