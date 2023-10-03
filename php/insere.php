<?php
include('conexao.php');

# Verifica se o formulário foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    # Obtém os dados do formulário de maneira segura
    $data_pesquisa = date("Y-m-d");
    $dominio_pesquisa = $conexao->real_escape_string($_POST['dominio_pesquisa']);

    # Prepara a query SQL para inserção de dados na tabela usando uma declaração preparada
    $query = $conexao->prepare("INSERT INTO LOG_PESQUISA (DATA_PESQUISA, DOMINIO_PESQUISA) VALUES (?, ?)");
    $query->bind_param("ss", $data_pesquisa, $dominio_pesquisa);

    # Executa a query preparada
    if ($query->execute()) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro na inserção de dados: " . $query->error;
    }

    # Fecha a declaração preparada
    $query->close();
} else {
    echo "Formulário não enviado corretamente.";
}

# Fecha a conexão
$conexao->close();
?>
