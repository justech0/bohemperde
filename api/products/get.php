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
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
    } else {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE slug = :slug LIMIT 1');
        $stmt->execute([':slug' => $slug]);
    }
    $product = $stmt->fetch();
    if (!$product) {
        json_response(false, null, 'Ürün bulunamadı', 404);
    }

    $imgStmt = $pdo->prepare('SELECT * FROM product_images WHERE product_id = :pid ORDER BY sort_order ASC, id ASC');
    $imgStmt->execute([':pid' => $product['id']]);
    $product['images'] = $imgStmt->fetchAll();

    $colorStmt = $pdo->prepare('SELECT color_name FROM product_colors WHERE product_id = :pid');
    $colorStmt->execute([':pid' => $product['id']]);
    $product['colors'] = array_column($colorStmt->fetchAll(), 'color_name');

    json_response(true, $product);
} catch (Exception $e) {
    json_response(false, null, 'Ürün alınamadı', 500, $e->getMessage());
}
