<?php
include('conexao.php');

# Verifica se o formulário foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST['user'];
    $senha = $_POST['pass'];

    $sql = "SELECT * FROM TABLE_USERS WHERE user='$usuario' AND senha='$senha'";
    $result = $conexao->query($sql);
    
    # Executa a query preparada
    if ($result->num_rows > 0) {
        echo json_encode(array("message" => "Usuario encontrado"));
    } else {
        echo json_encode(array("message" => "Credenciais incorretas"));
    }

    $conexao->close();
} else {
    http_response_code(405);
}

# Fecha a conexão
$conexao->close();
?>
