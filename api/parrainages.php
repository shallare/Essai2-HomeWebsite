<?php
// api/parrainages.php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Incrémenter les parrainages d'un utilisateur
    $id = $_GET['id'] ?? null;
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$id && $data) {
        $id = $data['id'] ?? null;
    }
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Utilisateur ID manquant."]);
        exit();
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE users SET parrainages_count = parrainages_count + 1 WHERE id = ?");
        $stmt->execute([$id]);
        
        $stmtSelect = $pdo->prepare("SELECT parrainages_count as count FROM users WHERE id = ?");
        $stmtSelect->execute([$id]);
        $res = $stmtSelect->fetch();
        
        echo json_encode(["success" => true, "count" => $res['count']]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
    }
} else if ($method === 'GET') {
    // Obtenir le nombre de parrainages
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Utilisateur ID manquant."]);
        exit();
    }
    
    try {
        $stmtSelect = $pdo->prepare("SELECT parrainages_count as count, ref_code as refCode FROM users WHERE id = ?");
        $stmtSelect->execute([$id]);
        $res = $stmtSelect->fetch();
        if ($res) {
            echo json_encode($res);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Utilisateur non trouvé."]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
    }
}
?>
