<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$guia = $_GET['guia'] ?? '';

if (empty($guia)) {
    echo json_encode(['success' => false, 'message' => 'Ingrese una guía válida.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM envios WHERE UPPER(guia) = UPPER(?)");
    $stmt->execute([$guia]);
    $envio = $stmt->fetch();

    if ($envio) {
        echo json_encode(['success' => true, 'data' => $envio]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Guía no encontrada.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al consultar: ' . $e->getMessage()]);
}
?>