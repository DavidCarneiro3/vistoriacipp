<?php
// CONEXAO, N�O MECHER

$mysqli = new mysqli ("agendamentosbd.mysql.dbaas.com.br", "agendamentosbd", "vivas@123", "agendamentosbd");

if ($mysqli->connect_errno) {
    
   echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>