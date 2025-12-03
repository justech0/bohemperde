<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';

$categoryId = $_GET['categoryId'] ?? null;

try {
    $pdo = get_db_connection();
    if ($categoryId) {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE category_id = :cid ORDER BY created_at DESC');
        $stmt->execute([':cid' => $categoryId]);
    } else {
        $stmt = $pdo->query('SELECT * FROM products ORDER BY created_at DESC');
    }
    $products = $stmt->fetchAll();

    $ids = array_column($products, 'id');
    $images = [];
    $colors = [];
    if ($ids) {
        $in = implode(',', array_fill(0, count($ids), '?'));
        $imgStmt = $pdo->prepare("SELECT * FROM product_images WHERE product_id IN ($in) ORDER BY sort_order ASC, id ASC");
        $imgStmt->execute($ids);
        while ($row = $imgStmt->fetch()) {
            $images[$row['product_id']][] = $row;
        }

        $colorStmt = $pdo->prepare("SELECT * FROM product_colors WHERE product_id IN ($in)");
        $colorStmt->execute($ids);
        while ($row = $colorStmt->fetch()) {
            $colors[$row['product_id']][] = $row['color_name'];
        }
    }

    foreach ($products as &$p) {
        $p['images'] = $images[$p['id']] ?? [];
        $p['colors'] = $colors[$p['id']] ?? [];
    }

    json_response(true, $products);
} catch (Exception $e) {
    json_response(false, null, 'Ürünler alınamadı', 500, $e->getMessage());
}
