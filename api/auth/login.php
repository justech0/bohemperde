<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

$input = get_input_json();
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

if ($username === '' || $password === '') {
    json_response(false, null, 'Kullanıcı adı ve şifre zorunludur', 400);
}

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = :u LIMIT 1');
    $stmt->execute([':u' => $username]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, $user['password_hash'])) {
        json_response(false, null, 'Kullanıcı adı veya şifre hatalı', 401);
    }
    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_username'] = $user['username'];
    json_response(true, ['id' => $user['id'], 'username' => $user['username']], 'Giriş başarılı');
} catch (Exception $e) {
    json_response(false, null, 'Giriş başarısız', 500, $e->getMessage());
}
