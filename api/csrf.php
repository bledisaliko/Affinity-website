<?php
declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if (empty($_SESSION['quote_csrf_token'])) {
    $_SESSION['quote_csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode([
    'ok' => true,
    'token' => $_SESSION['quote_csrf_token']
]);
