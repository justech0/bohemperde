<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

$input = get_input_json();
$name = trim($input['name'] ?? '');
$slug = trim($input['slug'] ?? '');
$image = $input['image'] ?? null;
$description = $input['description'] ?? null;
$is_active = isset($input['is_active']) ? (int)$input['is_active'] : 1;

if ($name === '') {
    json_response(false, null, 'Kategori adı zorunludur', 400);
}
if ($slug === '') {
    $slug = sanitize_slug($name);
}

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('INSERT INTO categories (name, slug, image, description, is_active) VALUES (:name, :slug, :image, :description, :is_active)');
    $stmt->execute([
        ':name' => $name,
        ':slug' => $slug,
        ':image' => $image,
        ':description' => $description,
        ':is_active' => $is_active
    ]);
    $id = $pdo->lastInsertId();
    $new = $pdo->query('SELECT * FROM categories WHERE id=' . (int)$id)->fetch();
    json_response(true, $new, 'Kategori oluşturuldu');
} catch (Exception $e) {
    json_response(false, null, 'Kategori kaydedilemedi', 500, $e->getMessage());
}
