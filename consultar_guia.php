<?php
header('Content-Type: application/json');
require_once 'conexion.php';

// Obtener la guía por GET o POST
$numero_guia = trim($_REQUEST['numero_guia'] ?? $_REQUEST['guia'] ?? '');

if (empty($numero_guia)) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingrese un número de guía.']);
    exit;
}

try {
    // Buscar el envío en la base de datos por número de guía
    $stmt = $pdo->prepare("SELECT * FROM envios WHERE numero_guia = ?");
    $stmt->execute([$numero_guia]);
    $envio = $stmt->fetch();

    if ($envio) {
        echo json_encode([
            'success'     => true,
            'numero_guia' => $envio['numero_guia'],
            'origen'      => $envio['origen'],
            'destino'     => $envio['destino'],
            'peso'        => $envio['peso'],
            'dimensiones' => $envio['dimensiones'],
            'servicio'    => $envio['tipo_servicio'],
            'estado'      => $envio['estado'],
            'fecha'       => $envio['fecha_envio']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Número de guía no encontrado en el sistema.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al consultar la base de datos: ' . $e->getMessage()]);
}
?>