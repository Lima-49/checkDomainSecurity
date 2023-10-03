<?php
include('config.php');

// Conectar ao banco de dados
$conexao = new mysqli($hostname, $user, $password, $database);

// Verificar a conexão
if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}
?>
