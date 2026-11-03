<?php
// api/users.php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'PUT':
        handlePut($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée."]);
        break;
}

function handleGet($pdo) {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "Utilisateur ID manquant."]);
        return;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, role, name, manager_name as managerName, license, email, phone, city, currency, website, bio, hours, profile_photo as profilePhoto, ref_code as refCode, parrainages_count as parrainagesCount, instagram, tiktok, whatsapp, facebook FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Utilisateur introuvable."]);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
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
        echo json_encode(["error" => "Utilisateur ID ou données manquantes."]);
        return;
    }

    $name = $data['name'] ?? null;
    $bio = $data['bio'] ?? null;
    $location = $data['location'] ?? null;
    $hours = $data['hours'] ?? null;
    $instagram = $data['instagram'] ?? null;
    $tiktok = $data['tiktok'] ?? null;
    $whatsapp = $data['whatsapp'] ?? null;
    $facebook = $data['facebook'] ?? null;
    $phone = $data['phone'] ?? null;
    $profilePhoto = $data['profilePhoto'] ?? null;

    try {
        // Obtenir les valeurs actuelles pour préserver si non fournies
        $stmtSelect = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmtSelect->execute([$id]);
        $current = $stmtSelect->fetch();
        if (!$current) {
            http_response_code(404);
            echo json_encode(["error" => "Utilisateur introuvable."]);
            return;
        }

        $name = ($name !== null) ? $name : $current['name'];
        $bio = ($bio !== null) ? $bio : $current['bio'];
        $location = ($location !== null) ? $location : $current['city'];
        $hours = ($hours !== null) ? $hours : $current['hours'];
        $instagram = ($instagram !== null) ? $instagram : $current['instagram'];
        $tiktok = ($tiktok !== null) ? $tiktok : $current['tiktok'];
        $whatsapp = ($whatsapp !== null) ? $whatsapp : $current['whatsapp'];
        $facebook = ($facebook !== null) ? $facebook : $current['facebook'];
        $phone = ($phone !== null) ? $phone : $current['phone'];
        $profilePhoto = ($profilePhoto !== null) ? $profilePhoto : $current['profile_photo'];

        $stmt = $pdo->prepare("UPDATE users SET name = ?, bio = ?, city = ?, hours = ?, instagram = ?, tiktok = ?, whatsapp = ?, facebook = ?, phone = ?, profile_photo = ? WHERE id = ?");
        $stmt->execute([$name, $bio, $location, $hours, $instagram, $tiktok, $whatsapp, $facebook, $phone, $profilePhoto, $id]);
        
        echo json_encode(["success" => true]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur de mise à jour : " . $e->getMessage()]);
    }
}
?>
