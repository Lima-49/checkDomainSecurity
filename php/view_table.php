<?php
include('conexao.php');

$query = "SELECT * FROM LOG_PESQUISA";
$result = $conexao->query($query);

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);

$conexao->close();
?>
