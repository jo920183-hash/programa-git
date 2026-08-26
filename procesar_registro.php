<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$nombre   = $_POST['nombre'] ?? '';
$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($nombre) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado.']);
        exit;
    }

    $passHash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$nombre, $email, $passHash]);

    echo json_encode(['success' => true, 'message' => 'Usuario registrado con éxito.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar usuario: ' . $e->getMessage()]);
}
?>