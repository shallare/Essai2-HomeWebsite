<?php
// api/publications.php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'PUT':
        handlePut($pdo);
        break;
    case 'DELETE':
        handleDelete($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée."]);
        break;
}

function handleGet($pdo) {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT p.*, u.name as agencyName, u.profile_photo as agencyPhoto, u.phone as agencyPhone, u.whatsapp as agencyWhatsapp, u.instagram as agencyInstagram, u.tiktok as agencyTiktok FROM publications p JOIN users u ON p.user_id = u.id WHERE p.id = ?");
        $stmt->execute([$_GET['id']]);
        $pub = $stmt->fetch();
        if ($pub) {
            $pub['images'] = json_decode($pub['images'], true);
            echo json_encode($pub);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Annonce introuvable."]);
        }
        return;
    }

    $category = $_GET['category'] ?? null;
    $city = $_GET['city'] ?? null;
    $maxPrice = $_GET['maxPrice'] ?? null;

    $query = "SELECT p.*, u.name as agencyName, u.profile_photo as agencyPhoto, u.phone as agencyPhone, u.whatsapp as agencyWhatsapp, u.instagram as agencyInstagram, u.tiktok as agencyTiktok FROM publications p JOIN users u ON p.user_id = u.id WHERE 1=1";
    $params = [];

    if ($category && $category !== 'Tous') {
        $query .= " AND p.category = ?";
        $params[] = $category;
    }
    if ($city && $city !== 'Toutes les zones') {
        $query .= " AND p.location LIKE ?";
        $params[] = "%$city%";
    }
    if ($maxPrice && $maxPrice !== 'Tous budgets') {
        $query .= " AND p.price <= ?";
        $params[] = floatval($maxPrice);
    }

    $query .= " ORDER BY p.created_at DESC";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        foreach ($rows as &$row) {
            $row['images'] = json_decode($row['images'], true);
        }
        echo json_encode($rows);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
    }
}

function handlePost($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "Données invalides."]);
        return;
    }

    $user_id = $data['user_id'] ?? null;
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $location = $data['location'] ?? '';
    $category = $data['category'] ?? '';
    $beds = $data['beds'] ?? 0;
    $area = $data['area'] ?? 0;
    $price = $data['price'] ?? 0;
    $images = $data['images'] ?? [];
    $anonymous = isset($data['anonymous']) ? intval($data['anonymous']) : 0;

    if (!$user_id || empty($title) || empty($description) || empty($location) || empty($category)) {
        http_response_code(400);
        echo json_encode(["error" => "Veuillez remplir tous les champs obligatoires."]);
        return;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO publications (user_id, title, description, location, category, beds, area, price, images, anonymous, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 45)");
        $stmt->execute([$user_id, $title, $description, $location, $category, $beds, $area, $price, json_encode($images), $anonymous]);
        
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de la publication : " . $e->getMessage()]);
    }
}

function handlePut($pdo) {
    $id = $_GET['id'] ?? null;
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$id && $data) {
        $id = $data['id'] ?? null;
    }

    if (!$id || !$data) {
        http_response_code(400);
        echo json_encode(["error" => "Publication ID ou données manquantes."]);
        return;
    }

    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $location = $data['location'] ?? '';
    $category = $data['category'] ?? '';
    $beds = $data['beds'] ?? 0;
    $area = $data['area'] ?? 0;
    $price = $data['price'] ?? 0;
    $images = $data['images'] ?? [];
    $anonymous = isset($data['anonymous']) ? intval($data['anonymous']) : 0;

    try {
        $stmt = $pdo->prepare("UPDATE publications SET title = ?, description = ?, location = ?, category = ?, beds = ?, area = ?, price = ?, images = ?, anonymous = ? WHERE id = ?");
        $stmt->execute([$title, $description, $location, $category, $beds, $area, $price, json_encode($images), $anonymous, $id]);
        
        echo json_encode(["success" => true]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur de modification : " . $e->getMessage()]);
    }
}

function handleDelete($pdo) {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;
    }

    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Publication ID manquant."]);
        return;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM publications WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur de suppression : " . $e->getMessage()]);
    }
}
?>
