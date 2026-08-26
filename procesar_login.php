<?php
header('Content-Type: application/json');
session_start();
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Ingrese usuario/correo y contraseña."]);
        exit();
    }

    // Buscar al usuario por correo o por nombre
    $stmt = $conn->prepare("SELECT id, nombre, email, password FROM usuarios WHERE email = ? OR nombre = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_nombre'] = $user['nombre'];
            
            echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso.", "usuario" => $user['nombre']]);
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "El usuario o correo ingresado no existe."]);
    }
    $stmt->close();
}
$conn->close();
?>