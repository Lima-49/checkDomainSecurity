<?php
include('conexao.php');

# Verifica se o formulário foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    # Obtém os dados do formulário de maneira segura
    $data_pesquisa = date("d-m-Y");
    $dominio_pesquisa = $conexao->real_escape_string($_POST['dominio_pesquisa']);

    # Prepara a query SQL para inserção de dados na tabela usando uma declaração preparada
    $query = $conexao->prepare("INSERT INTO LOG_PESQUISA (DATA_PESQUISA, DOMINIO_PESQUISA) VALUES (?, ?)");
    $query->bind_param("ss", $data_pesquisa, $dominio_pesquisa);

    # Executa a query preparada
    if ($query->execute()) {
        # Se a inserção for bem-sucedida, retorna uma resposta indicando sucesso (opcional)
        http_response_code(200);
    } else {
        # Se houver um erro na inserção, retorna uma resposta de erro
        http_response_code(500);
    }

    # Fecha a declaração preparada
    $query->close();
} else {
    # Se o método de requisição não for POST, retorna uma resposta de erro
    http_response_code(405);
}

# Fecha a conexão
$conexao->close();
?>
