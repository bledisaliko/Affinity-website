<?php
declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');

const RECIPIENT_EMAIL = 'info@affinitycreative.ca';
const FROM_EMAIL = 'info@affinitycreative.ca';
const FROM_NAME = 'Affinity Creative Website';
const MIN_SECONDS_TO_SUBMIT = 2;
const RATE_LIMIT_SECONDS = 20;

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function field(string $key, int $max = 2000): string
{
    $value = trim((string)($_POST[$key] ?? ''));
    $value = str_replace(["\r", "\n"], ' ', $value);
    return mb_substr($value, 0, $max);
}

function first_field(array $keys, int $max = 2000): string
{
    foreach ($keys as $key) {
        $value = field($key, $max);
        if ($value !== '') return $value;
    }
    return '';
}

function multiline_field(array $keys, int $max = 5000): string
{
    foreach ($keys as $key) {
        $value = trim((string)($_POST[$key] ?? ''));
        if ($value === '') continue;
        $value = preg_replace("/\r\n|\r/", "\n", $value);
        return mb_substr((string)$value, 0, $max);
    }
    return '';
}

function clean_header(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Use the contact form to send a request.']);
}

if (field('website') !== '') {
    respond(200, ['ok' => true, 'message' => 'Thanks. Your quote request was sent to Affinity Creative.']);
}

$postedToken = field('csrfToken', 128);
$sessionToken = (string)($_SESSION['quote_csrf_token'] ?? '');
if ($sessionToken === '' || $postedToken === '' || !hash_equals($sessionToken, $postedToken)) {
    respond(422, [
        'ok' => false,
        'message' => 'The secure form token expired. Refresh the page and try again.',
        'errors' => ['csrfToken' => 'Refresh the page and try again.']
    ]);
}

$startedAt = (int)field('formStartedAt', 20);
if ($startedAt > 0 && time() - $startedAt < MIN_SECONDS_TO_SUBMIT) {
    respond(200, ['ok' => true, 'message' => 'Thanks. Your quote request was sent to Affinity Creative.']);
}

$lastSubmit = (int)($_SESSION['quote_last_submit'] ?? 0);
if ($lastSubmit > 0 && time() - $lastSubmit < RATE_LIMIT_SECONDS) {
    respond(429, [
        'ok' => false,
        'message' => 'Please wait a moment before sending another request.'
    ]);
}

$name = first_field(['fullName', 'name'], 120);
$company = first_field(['companyName', 'company'], 160);
$email = first_field(['email'], 180);
$phone = first_field(['phone'], 80);
$preferredContact = first_field(['preferredContact'], 80);
$service = first_field(['serviceCategory', 'service'], 160);
$specificService = first_field(['specificService'], 160);
$quantity = first_field(['estimatedQuantity', 'quantity'], 120);
$requiredDate = first_field(['requiredDate'], 80);
$artwork = first_field(['artworkNotes', 'artwork'], 700);
$message = multiline_field(['projectDescription', 'message'], 5000);
$consent = field('consent', 10);

$errors = [];
if ($name === '') $errors['fullName'] = 'Name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'A valid email is required.';
if ($phone === '') $errors['phone'] = 'Phone is required.';
if ($preferredContact === '') $errors['preferredContact'] = 'Preferred contact method is required.';
if ($service === '') $errors['serviceCategory'] = 'Service is required.';
if ($message === '') $errors['projectDescription'] = 'Project details are required.';
if ($consent !== '1') $errors['consent'] = 'Consent is required.';

if ($errors) {
    respond(422, ['ok' => false, 'message' => 'Please check the form fields.', 'errors' => $errors]);
}

$safeName = clean_header($name);
$safeEmail = clean_header($email);
$subject = 'New quote request from Affinity Creative website';
$submittedAt = date('Y-m-d H:i:s T');
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$body = <<<TEXT
New quote request from affinitycreative.ca

Name: {$name}
Company: {$company}
Email: {$email}
Phone: {$phone}
Preferred Contact: {$preferredContact}
Service: {$service}
Specific Service: {$specificService}
Quantity: {$quantity}
Required Date: {$requiredDate}
Artwork Link or Notes: {$artwork}

Project Details:
{$message}

Submitted: {$submittedAt}
IP Address: {$ipAddress}
TEXT;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, [
        'ok' => false,
        'message' => 'The message could not be sent. Please email info@affinitycreative.ca directly.'
    ]);
}

$_SESSION['quote_last_submit'] = time();
$_SESSION['quote_csrf_token'] = bin2hex(random_bytes(32));

respond(200, ['ok' => true, 'message' => 'Thanks. Your quote request was sent to Affinity Creative.']);
