<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

$input = get_input_json();
$id = $input['id'] ?? null;
if (!$id) {
    json_response(false, null, 'id zorunludur', 400);
}

$name = trim($input['name'] ?? '');
$slug = trim($input['slug'] ?? '');
$category_id = $input['category_id'] ?? $input['categoryId'] ?? null;
$description = $input['description'] ?? '';
$price = $input['price'] ?? null;
$is_new = isset($input['is_new']) ? (int)$input['is_new'] : 0;
$is_active = isset($input['is_active']) ? (int)$input['is_active'] : 1;
$colors = $input['colors'] ?? [];
$images = $input['images'] ?? [];

if ($name === '' || !$category_id || $description === '') {
    json_response(false, null, 'Ad, kategori ve açıklama zorunludur', 400);
}
if ($slug === '') {
    $slug = sanitize_slug($name);
}
if (count($images) > 3) {
    json_response(false, null, 'En fazla 3 görsel yüklenebilir', 400);
}

try {
    $pdo = get_db_connection();
    $pdo->beginTransaction();

    $stmt = $pdo->prepare('UPDATE products SET category_id=:cid, name=:name, slug=:slug, description=:description, price=:price, is_new=:is_new, is_active=:is_active WHERE id=:id');
    $stmt->execute([
        ':cid' => $category_id,
        ':name' => $name,
        ':slug' => $slug,
        ':description' => $description,
        ':price' => $price,
        ':is_new' => $is_new,
        ':is_active' => $is_active,
        ':id' => $id
    ]);

    // refresh colors
    $pdo->prepare('DELETE FROM product_colors WHERE product_id=:pid')->execute([':pid' => $id]);
    if (is_array($colors)) {
        $colorStmt = $pdo->prepare('INSERT INTO product_colors (product_id, color_name) VALUES (:pid, :color)');
        foreach ($colors as $color) {
            if (trim($color) !== '') {
                $colorStmt->execute([':pid' => $id, ':color' => $color]);
            }
        }
    }

    // refresh images
    $pdo->prepare('DELETE FROM product_images WHERE product_id=:pid')->execute([':pid' => $id]);
    if (is_array($images)) {
        $imgStmt = $pdo->prepare('INSERT INTO product_images (product_id, image_path, sort_order) VALUES (:pid, :path, :sort_order)');
        $sort = 1;
        foreach ($images as $img) {
            if (trim($img) !== '') {
                $imgStmt->execute([':pid' => $id, ':path' => $img, ':sort_order' => $sort]);
                $sort++;
            }
        }
    }

    $pdo->commit();
    $product = $pdo->prepare('SELECT * FROM products WHERE id = :id');
    $product->execute([':id' => $id]);
    json_response(true, $product->fetch(), 'Ürün güncellendi');
} catch (Exception $e) {
    if ($pdo && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(false, null, 'Ürün güncellenemedi', 500, $e->getMessage());
}
