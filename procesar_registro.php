<?php
header('Content-Type: application/json');
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre           = trim($_POST['nombre'] ?? '');
    $email            = trim($_POST['email'] ?? '');
    $tipo_documento   = trim($_POST['tipo_documento'] ?? '');
    $numero_documento = trim($_POST['numero_documento'] ?? '');
    $fecha_nacimiento = trim($_POST['fecha'] ?? '');
    $password_raw     = trim($_POST['password'] ?? '');

    // Validar campos obligatorios
    if (empty($nombre) || empty($email) || empty($tipo_documento) || empty($numero_documento) || empty($fecha_nacimiento) || empty($password_raw)) {
        echo json_encode(["success" => false, "message" => "Por favor complete todos los campos requeridos."]);
        exit();
    }

    // Encriptar la contraseña
    $password = password_hash($password_raw, PASSWORD_BCRYPT);

    // Preparar la consulta SQL
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, tipo_documento, numero_documento, fecha_nacimiento, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $nombre, $email, $tipo_documento, $numero_documento, $fecha_nacimiento, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "¡Registro completado exitosamente!"]);
    } else {
        if ($conn->errno === 1062) {
            echo json_encode(["success" => false, "message" => "El correo o número de documento ya se encuentra registrado."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar el usuario: " . $stmt->error]);
        }
    }
    $stmt->close();
}
$conn->close();
?>