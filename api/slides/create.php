<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

$title = $_POST['title'] ?? null;
$subtitle = $_POST['subtitle'] ?? null;
$cta_text = $_POST['cta_text'] ?? null;
$cta_link = $_POST['cta_link'] ?? null;
$sort_order = isset($_POST['sort_order']) ? (int)$_POST['sort_order'] : 1;
$is_active = isset($_POST['is_active']) ? (int)$_POST['is_active'] : 1;
$image_path = $_POST['image_path'] ?? null;

if (!$title) {
    json_response(false, null, 'Başlık zorunludur', 400);
}

try {
    // handle upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../uploads';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $filename = time() . '_' . basename($_FILES['image']['name']);
        $target = $uploadDir . '/' . $filename;
        move_uploaded_file($_FILES['image']['tmp_name'], $target);
        $image_path = 'uploads/' . $filename;
    }

    if (!$image_path) {
        json_response(false, null, 'Görsel zorunludur', 400);
    }

    $pdo = get_db_connection();
    $stmt = $pdo->prepare('INSERT INTO hero_slides (image_path, title, subtitle, cta_text, cta_link, sort_order, is_active) VALUES (:img, :title, :subtitle, :cta_text, :cta_link, :sort_order, :is_active)');
    $stmt->execute([
        ':img' => $image_path,
        ':title' => $title,
        ':subtitle' => $subtitle,
        ':cta_text' => $cta_text,
        ':cta_link' => $cta_link,
        ':sort_order' => $sort_order,
        ':is_active' => $is_active
    ]);
    $id = $pdo->lastInsertId();
    $slide = $pdo->query('SELECT * FROM hero_slides WHERE id=' . (int)$id)->fetch();
    json_response(true, $slide, 'Slide oluşturuldu');
} catch (Exception $e) {
    json_response(false, null, 'Slide oluşturulamadı', 500, $e->getMessage());
}
