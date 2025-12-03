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

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
    $stmt->execute([':id' => $id]);
    json_response(true, null, 'Ürün silindi');
} catch (Exception $e) {
    json_response(false, null, 'Ürün silinemedi', 500, $e->getMessage());
}
