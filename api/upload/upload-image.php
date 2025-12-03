<?php
require_once __DIR__ . '/../utils.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Geçersiz istek yöntemi', 405);
}

if (!isset($_FILES['file'])) {
    json_response(false, null, 'Yüklenecek dosya bulunamadı', 400);
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    json_response(false, null, 'Dosya yüklenemedi', 400, $file['error']);
}

$uploadDir = __DIR__ . '/../uploads';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
$filename = time() . '_' . basename($file['name']);
$target = $uploadDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    json_response(false, null, 'Dosya taşınamadı', 500);
}

json_response(true, ['path' => 'uploads/' . $filename], 'Yüklendi');
