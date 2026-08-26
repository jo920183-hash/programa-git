<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$guia = trim($_GET['guia'] ?? '');

if (empty($guia)) {
    echo json_encode(["success" => false, "message" => "Por favor ingrese un número de guía."]);
    exit();
}

$stmt = $conn->prepare("SELECT numero_guia, origen, destino, peso, dimensiones, tipo_servicio, estado, fecha_envio FROM envios WHERE numero_guia = ?");
$stmt->bind_param("s", $guia);
$stmt->execute();
$result = $stmt->get_result();

if ($envio = $result->fetch_assoc()) {
    echo json_encode(["success" => true, "data" => $envio]);
} else {
    echo json_encode(["success" => false, "message" => "Número de guía no encontrado."]);
}

$stmt->close();
$conn->close();
?>