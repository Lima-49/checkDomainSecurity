<?php
include('conexao.php');

# Verifica se o formulário foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $conexao->real_escape_string($_POST['user']);
    $senha = $conexao->real_escape_string($_POST['pass']);
    
    $query = $conexao->prepare("SELECT * FROM TABLE_USERS WHERE user = ? AND senha = ?");
    $query->bind_param("ss", $usuario, $senha);

    # Executa a query preparada
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(array("success" => true, "message" => "Usuario encontrado"));
    } else {
        echo json_encode(array("success" => false, "message" => "Credenciais incorretas"));
    }
    
    # Fecha a conexão
    $query->close();
    $conexao->close();
} else {
    http_response_code(405);
}
?>
