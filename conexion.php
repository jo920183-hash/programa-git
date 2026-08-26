<?php
$host     = "127.0.0.1";
$port     = 3307; 
$user     = "root";
$password = "";
$database = "condor_db";

$conn = new mysqli($host, $user, $password, $database, $port);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos: " . $conn->connect_error]);
    exit();
}
?>
