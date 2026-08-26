<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$origen      = $_POST['origen'] ?? '';
$destino     = $_POST['destino'] ?? '';
$peso        = floatval($_POST['peso'] ?? 0);
$dimensiones = $_POST['dimensiones'] ?? '';
$servicio    = $_POST['servicio'] ?? '';

if (empty($origen) || empty($destino) || $peso <= 0 || empty($dimensiones) || empty($servicio)) {
    echo json_encode(['success' => false, 'message' => 'Todos los datos del envío son obligatorios.']);
    exit;
}

$guia = 'TC-' . rand(1000, 9999);
$baseRate = ($servicio === 'masivo') ? 12000 : (($servicio === 'mensajeria') ? 8000 : 6000);
$costo = round($baseRate + ($peso * 3500));

try {
    $stmt = $pdo->prepare("INSERT INTO envios (guia, origen, destino, peso, dimensiones, servicio, costo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$guia, $origen, $destino, $peso, $dimensiones, $servicio, $costo]);

    echo json_encode([
        'success' => true,
        'guia'    => $guia,
        'costo'   => $costo,
        'message' => 'Envío registrado en la base de datos.'
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el envío: ' . $e->getMessage()]);
}
?>