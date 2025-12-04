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
$savedPath = save_image_as_webp($file, $uploadDir);

if (!$savedPath) {
    json_response(false, null, 'Desteklenmeyen dosya türü veya dönüştürülemedi', 400);
}

$publicPath = 'uploads/' . basename($savedPath);
json_response(true, ['path' => $publicPath], 'Yüklendi');
