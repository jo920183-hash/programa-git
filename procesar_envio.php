<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$origen        = $_POST['origen'] ?? '';
$destino       = $_POST['destino'] ?? '';
$peso          = floatval($_POST['peso'] ?? 0);
$dimensiones   = $_POST['dimensiones'] ?? '';
$tipo_servicio = $_POST['tipo_servicio'] ?? $_POST['servicio'] ?? '';

if (empty($origen) || empty($destino) || $peso <= 0 || empty($dimensiones) || empty($tipo_servicio)) {
    echo json_encode(['success' => false, 'message' => 'Todos los datos del envío son obligatorios.']);
    exit;
}

$numero_guia = 'TC-' . rand(1000, 9999);
$estado = 'Recibido en Bodega';

// Cálculo del costo estimado
$tarifaBase = ($tipo_servicio === 'masivo') ? 15000 : 8000;
$costo = round($tarifaBase + ($peso * 3000));

try {
    $stmt = $pdo->prepare("INSERT INTO envios (numero_guia, origen, destino, peso, dimensiones, tipo_servicio, estado) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$numero_guia, $origen, $destino, $peso, $dimensiones, $tipo_servicio, $estado]);

    // Retorna 'guia' y 'costo' para que coincida con el frontend
    echo json_encode([
        'success'     => true,
        'guia'        => $numero_guia,
        'numero_guia' => $numero_guia,
        'costo'       => $costo,
        'estado'      => $estado,
        'message'     => '¡Envío guardado exitosamente en la BD!'
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar en la base de datos: ' . $e->getMessage()]);
}
?>