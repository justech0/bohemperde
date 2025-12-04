<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';

$id = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;
if (!$id && !$slug) {
    json_response(false, null, 'id veya slug gerekli', 400);
}

try {
    $pdo = get_db_connection();
    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM categories WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
    } else {
        $stmt = $pdo->prepare('SELECT * FROM categories WHERE slug = :slug LIMIT 1');
        $stmt->execute([':slug' => $slug]);
    }
    $category = $stmt->fetch();
    if (!$category) {
        json_response(false, null, 'Kategori bulunamadı', 404);
    }
    json_response(true, $category);
} catch (Exception $e) {
    json_response(false, null, 'Kategori alınamadı', 500, $e->getMessage());
}
