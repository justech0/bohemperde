<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

$id = $_POST['id'] ?? null;
if (!$id) {
    json_response(false, null, 'id zorunludur', 400);
}

$title = $_POST['title'] ?? null;
$subtitle = $_POST['subtitle'] ?? null;
$cta_text = $_POST['cta_text'] ?? null;
$cta_link = $_POST['cta_link'] ?? null;
$sort_order = isset($_POST['sort_order']) ? (int)$_POST['sort_order'] : 1;
$is_active = isset($_POST['is_active']) ? (int)$_POST['is_active'] : 1;
$image_path = $_POST['image_path'] ?? null;

try {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../uploads';
        $saved = save_image_as_webp($_FILES['image'], $uploadDir);
        if ($saved) {
            $image_path = 'uploads/' . basename($saved);
        }
    }

    $pdo = get_db_connection();
    $stmt = $pdo->prepare('UPDATE hero_slides SET image_path=:img, title=:title, subtitle=:subtitle, cta_text=:cta_text, cta_link=:cta_link, sort_order=:sort_order, is_active=:is_active WHERE id=:id');
    $stmt->execute([
        ':img' => $image_path,
        ':title' => $title,
        ':subtitle' => $subtitle,
        ':cta_text' => $cta_text,
        ':cta_link' => $cta_link,
        ':sort_order' => $sort_order,
        ':is_active' => $is_active,
        ':id' => $id
    ]);
    $slide = $pdo->query('SELECT * FROM hero_slides WHERE id=' . (int)$id)->fetch();
    json_response(true, $slide, 'Slide güncellendi');
} catch (Exception $e) {
    json_response(false, null, 'Slide güncellenemedi', 500, $e->getMessage());
}
