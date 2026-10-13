<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$numero_guia = $_POST['numero_guia'] ?? '';
$nuevo_estado = $_POST['estado'] ?? '';

if (empty($numero_guia) || empty($nuevo_estado)) {
    echo json_encode(['success' => false, 'message' => 'Número de guía y nuevo estado son requeridos.']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE envios SET estado = ? WHERE numero_guia = ?");
    $stmt->execute([$nuevo_estado, $numero_guia]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => "Estado de la guía $numero_guia actualizado a '$nuevo_estado'."]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la guía o el estado es el mismo.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $e->getMessage()]);
}
?>