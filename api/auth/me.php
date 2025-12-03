<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';
require_admin();

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT id, username, created_at FROM admin_users WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $_SESSION['admin_id']]);
    $user = $stmt->fetch();
    json_response(true, $user);
} catch (Exception $e) {
    json_response(false, null, 'Kullanıcı bilgisi alınamadı', 500, $e->getMessage());
}
