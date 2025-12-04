<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';

$onlyActive = isset($_GET['active']) ? (int)$_GET['active'] : 0;

try {
    $pdo = get_db_connection();
    if ($onlyActive) {
        $stmt = $pdo->query('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC, id DESC');
    } else {
        $stmt = $pdo->query('SELECT * FROM hero_slides ORDER BY sort_order ASC, id DESC');
    }
    $slides = $stmt->fetchAll();
    json_response(true, $slides);
} catch (Exception $e) {
    json_response(false, null, 'Slider verisi alınamadı', 500, $e->getMessage());
}
