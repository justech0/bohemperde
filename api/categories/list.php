<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';

try {
    $pdo = get_db_connection();
    $stmt = $pdo->query('SELECT * FROM categories ORDER BY created_at DESC');
    $categories = $stmt->fetchAll();
    json_response(true, $categories);
} catch (Exception $e) {
    json_response(false, null, 'Kategoriler alınamadı', 500, $e->getMessage());
}
