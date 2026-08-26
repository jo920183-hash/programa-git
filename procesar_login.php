<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor completa todos los campos.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    if ($usuario && password_verify($password, $usuario['password'])) {
        echo json_encode(['success' => true, 'message' => '¡Inicio de sesión exitoso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}
?>