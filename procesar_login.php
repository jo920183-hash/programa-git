<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingrese correo y contraseña.']);
    exit;
}

try {
    // Buscar al usuario por correo electrónico
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    // Verificar contraseña con el hash BCRYPT almacenado
    if ($usuario && password_verify($password, $usuario['password'])) {
        echo json_encode([
            'success' => true, 
            'message' => '¡Inicio de sesión exitoso! Bienvenido ' . $usuario['nombre']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}
?>