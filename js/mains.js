document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById('search_btn');
    const dmarcInfo = document.getElementById('dmarc_info');
    const spfInfo = document.getElementById('spf_info');

    searchBtn.addEventListener('click', () => {
        const dominio = document.getElementById('search_input').value;
        
        fetch(`/show_info?dominio=${dominio}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    dmarcInfo.textContent = `DMARC Info: ${data.dmarc.info.text}`;
                    spfInfo.textContent = `SPF Info: ${data.spf.info.text}`;
                } else {
                    dmarcInfo.textContent = 'Erro ao buscar informações.';
                    spfInfo.textContent = '';
                }
            });
    });
});
