<?php
require_once __DIR__ . '/../utils.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

session_destroy();
json_response(true, null, 'Çıkış yapıldı');
