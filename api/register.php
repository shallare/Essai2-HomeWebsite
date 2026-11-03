<?php
// api/register.php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides."]);
    exit();
}

$role = $data['role'] ?? 'particulier';
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$phone = $data['phone'] ?? null;
$city = $data['city'] ?? 'Cotonou';
$currency = $data['currency'] ?? 'FCFA';
$website = $data['website'] ?? null;
$manager_name = $data['managerName'] ?? null;
$license = $data['license'] ?? null;

if (empty($name) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Veuillez remplir tous les champs obligatoires."]);
    exit();
}

// Hacher le mot de passe
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Générer le code de parrainage
$cleanName = preg_replace("/[^A-Za-z0-9]/", "_", strtoupper($name));
$refCode = $cleanName . "_" . rand(1000, 9999);

try {
    $stmt = $pdo->prepare("INSERT INTO users (role, name, manager_name, license, email, phone, city, currency, website, password, ref_code, parrainages_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
    $stmt->execute([$role, $name, $manager_name, $license, $email, $phone, $city, $currency, $website, $hashedPassword, $refCode]);

    $lastId = $pdo->lastInsertId();
    
    // Récupérer l'utilisateur créé
    $stmtUser = $pdo->prepare("SELECT id, role, name, email, phone, city, currency, ref_code, parrainages_count FROM users WHERE id = ?");
    $stmtUser->execute([$lastId]);
    $user = $stmtUser->fetch();
    
    http_response_code(201);
    echo json_encode($user);
} catch (\PDOException $e) {
    if ($e->errorInfo[1] == 1062) {
        http_response_code(400);
        echo json_encode(["error" => "Cette adresse e-mail est déjà utilisée."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de l'inscription : " . $e->getMessage()]);
    }
}
?>
