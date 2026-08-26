<?php
header('Content-Type: application/json');
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $origen      = trim($_POST['origen'] ?? '');
    $destino     = trim($_POST['destino'] ?? '');
    $peso        = floatval($_POST['peso'] ?? 0);
    $dimensiones = trim($_POST['dimensiones'] ?? '');
    $servicio    = trim($_POST['servicio'] ?? '');

    if (empty($origen) || empty($destino) || $peso <= 0 || empty($dimensiones) || empty($servicio)) {
        echo json_encode(["success" => false, "message" => "Complete todos los campos del envío correctamente."]);
        exit();
    }

    // Generar un número de guía único automáticamente (Ej: TC-8492)
    $numero_guia = "TC-" . rand(1000, 9999);

    $stmt = $conn->prepare("INSERT INTO envios (numero_guia, origen, destino, peso, dimensiones, tipo_servicio, estado) VALUES (?, ?, ?, ?, ?, ?, 'En Bodega')");
    $stmt->bind_param("sssds s", $numero_guia, $origen, $destino, $peso, $dimensiones, $servicio);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "guia" => $numero_guia, "message" => "Envío registrado con éxito."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al registrar el envío: " . $stmt->error]);
    }

    $stmt->close();
}
$conn->close();
?>