<?php
# Substitua abaixo os dados, de acordo com o banco criado
$user = "dmarcian_admin"; 
$password = "O3Hl_!5u}.uU"; 
$database = "dmarcian_log_acessos"; 
$hostname = "localhost"; 

# Conecta com o servidor de banco de dados usando MySQLi
$mysqli = new mysqli($hostname, $user, $password, $database);

# Verifica a conexão
if ($mysqli->connect_error) {
    die('Erro na conexão: ' . $mysqli->connect_error);
}

# Executa a query desejada 
$data_pesquisa = date("Y-m-d");
$dominio_pesquisa = $_POST['dominio_pesquisa']; 

# Prepara a query SQL para inserção de dados na tabela
$query = "INSERT INTO LOG_PESQUISA (DATA_PESQUISA, DOMINIO_PESQUISA) VALUES ('$data_pesquisa', '$dominio_pesquisa')";

# Executa a query
if ($mysqli->query($query) === TRUE) {
    echo "Dados inseridos com sucesso!";
} else {
    echo "Erro na query: " . $query . "<br>" . $mysqli->error;
}

# Fecha a conexão
$mysqli->close();
?>
