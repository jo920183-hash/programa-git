<?php
$host = 'localhost';
$db   = 'transportes_condor';
$user = 'root'; // Ajusta si usas contraseña o un usuario diferente
$pass = '';     
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     header('Content-Type: application/json');
     echo json_encode(['success' => false, 'message' => 'Error de conexión a BD: ' . $e->getMessage()]);
     exit;
}
?>