<?php
// api/login.php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides."]);
    exit();
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Veuillez remplir tous les champs."]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Adresse e-mail ou mot de passe incorrect."]);
        exit();
    }
    
    unset($user['password']);
    echo json_encode($user);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la connexion : " . $e->getMessage()]);
}
?>
