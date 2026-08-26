<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$nombre           = $_POST['nombre'] ?? '';
$email            = $_POST['email'] ?? '';
$tipo_documento   = $_POST['tipo_documento'] ?? '';
$numero_documento = $_POST['numero_documento'] ?? '';
$fecha            = $_POST['fecha'] ?? '';
$password         = $_POST['password'] ?? '';

if (empty($nombre) || empty($email) || empty($password) || empty($numero_documento)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos marcados como obligatorios deben completarse.']);
    exit;
}

try {
    // Validar si el correo o documento ya existen
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ? OR numero_documento = ?");
    $stmt->execute([$email, $numero_documento]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo o número de documento ya está registrado.']);
        exit;
    }

    $passHash = password_hash($password, PASSWORD_BCRYPT);
    
    // Inserción exacta mapeando la columna fecha_nacimiento
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, tipo_documento, numero_documento, fecha_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $tipo_documento, $numero_documento, $fecha, $passHash]);

    echo json_encode(['success' => true, 'message' => '¡Usuario registrado exitosamente en la base de datos!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar en la BD: ' . $e->getMessage()]);
}
?>