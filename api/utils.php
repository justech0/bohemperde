<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function json_response($success, $data = null, $message = '', $code = 200, $errors = null) {
    http_response_code($code);
    header('Content-Type: application/json');
    $payload = ['success' => $success];
    if (!is_null($data)) {
        $payload['data'] = $data;
    }
    if ($message !== '') {
        $payload['message'] = $message;
    }
    if (!is_null($errors)) {
        $payload['errors'] = $errors;
    }
    echo json_encode($payload);
    exit;
}

function require_admin() {
    if (!isset($_SESSION['admin_id'])) {
        json_response(false, null, 'Yetkisiz erişim', 401);
    }
}

function get_input_json() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function sanitize_slug($text) {
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9-]+/u', '-', iconv('UTF-8', 'ASCII//TRANSLIT', $text));
    return trim($text, '-');
}

function save_image_as_webp($file, $uploadDir)
{
    if (!isset($file['tmp_name']) || $file['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $mime = mime_content_type($file['tmp_name']);
    $supported = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mime, $supported, true)) {
        return null;
    }

    switch ($mime) {
        case 'image/png':
            $image = imagecreatefrompng($file['tmp_name']);
            break;
        case 'image/webp':
            $image = imagecreatefromwebp($file['tmp_name']);
            break;
        default:
            $image = imagecreatefromjpeg($file['tmp_name']);
            break;
    }

    if (!$image) {
        return null;
    }

    $baseName = pathinfo($file['name'], PATHINFO_FILENAME);
    $safeBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', $baseName);
    $filename = time() . '_' . $safeBase . '.webp';
    $target = rtrim($uploadDir, '/\\') . '/' . $filename;
    imagepalettetotruecolor($image);
    imagewebp($image, $target, 80);
    imagedestroy($image);

    return $target;
}
