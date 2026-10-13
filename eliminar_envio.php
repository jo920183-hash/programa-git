<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$numero_guia = $_POST['numero_guia'] ?? $_GET['numero_guia'] ?? '';

if (empty($numero_guia)) {
    echo json_encode(['success' => false, 'message' => 'Número de guía requerido para eliminar.']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM envios WHERE numero_guia = ?");
    $stmt->execute([$numero_guia]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => "Envío con guía $numero_guia eliminado correctamente."]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró el envío a eliminar.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar: ' . $e->getMessage()]);
}
?>