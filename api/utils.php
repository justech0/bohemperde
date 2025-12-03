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
