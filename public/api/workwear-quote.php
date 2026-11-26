<?php
declare(strict_types=1);

// Workwear landing page quote endpoint (/workwear/).
// Reuses the site's CSRF token (api/csrf.php) and mail configuration
// (private config file, api/quote-config.php or environment variables).
// Delivery uses PHP mail() like the existing quote endpoints.

session_start();
date_default_timezone_set('America/Toronto');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

const MAX_FILES = 3;
const MAX_FILE_SIZE = 8388608;      // 8 MB per file
const MAX_TOTAL_UPLOAD = 15728640;  // 15 MB per request
const MIN_SECONDS_TO_SUBMIT = 3;
const RATE_LIMIT_SECONDS = 45;
const MAX_ITEMS = 8;

const PRODUCT_CATALOGUE = [
    'polo' => ['name' => 'Embroidered Polo (Gildan 64800)', 'price' => 19],
    'hoodie' => ['name' => 'Custom Hoodie (Gildan 18500)', 'price' => 38],
    'tshirt' => ['name' => 'Printed T-Shirt', 'price' => 18],
    'beanie' => ['name' => 'Embroidered Beanie', 'price' => 15],
];

const ALLOWED_FILES = [
    'pdf' => ['application/pdf'],
    'png' => ['image/png'],
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'webp' => ['image/webp'],
    'ai' => ['application/pdf', 'application/postscript', 'application/illustrator'],
    'eps' => ['application/postscript', 'image/x-eps', 'application/eps'],
];

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function clean_text(string $value, int $max = 5000, bool $multiline = false): string
{
    $value = trim($value);
    $value = preg_replace("/\r\n|\r/", "\n", $value) ?? '';
    $value = preg_replace($multiline ? '/[^\P{C}\n\t]/u' : '/\p{C}+/u', $multiline ? '' : ' ', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

function post_value(string $key, int $max = 500, bool $multiline = false): string
{
    $raw = $_POST[$key] ?? '';
    return is_string($raw) ? clean_text($raw, $max, $multiline) : '';
}

function header_value(string $value): string
{
    return trim(str_replace(["\r", "\n", "\0", '<', '>', '"'], '', $value));
}

function load_config(): array
{
    $config = [
        'QUOTE_TO_EMAIL' => 'info@affinitycreative.ca',
        'MAIL_FROM_EMAIL' => 'website@affinitycreative.ca',
        'MAIL_FROM_NAME' => 'Affinity Creative Website',
        'QUOTE_TEST_MODE' => false,
    ];
    foreach (['/home/ydhxqex4/private/affinity-quote-config.php', __DIR__ . '/quote-config.php'] as $path) {
        if (is_file($path)) {
            $loaded = include $path;
            if (is_array($loaded)) {
                $config = array_merge($config, $loaded);
            }
        }
    }
    foreach (array_keys($config) as $key) {
        $env = getenv($key);
        if ($env !== false && $env !== '') {
            $config[$key] = $env;
        }
    }
    $config['QUOTE_TEST_MODE'] = filter_var($config['QUOTE_TEST_MODE'], FILTER_VALIDATE_BOOLEAN);
    return $config;
}

function same_origin_allowed(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }
    $originHost = parse_url($origin, PHP_URL_HOST);
    $host = $_SERVER['HTTP_HOST'] ?? '';
    return $originHost && $host && strtolower($originHost) === strtolower((string)preg_replace('/:\d+$/', '', $host));
}

function rate_limit_file(): string
{
    return sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'affinity_workwear_rate_' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function sniff_ok(string $ext, string $path): bool
{
    $head = (string)file_get_contents($path, false, null, 0, 16);
    $mime = function_exists('finfo_open') ? (string)finfo_file(finfo_open(FILEINFO_MIME_TYPE), $path) : '';
    switch ($ext) {
        case 'pdf': return str_starts_with($head, '%PDF-');
        case 'png': return str_starts_with($head, "\x89PNG\r\n\x1a\n");
        case 'jpg':
        case 'jpeg': return str_starts_with($head, "\xFF\xD8\xFF");
        case 'webp': return str_starts_with($head, 'RIFF') && substr($head, 8, 4) === 'WEBP';
        case 'ai': return str_starts_with($head, '%PDF-') || str_starts_with($head, '%!PS');
        case 'eps': return str_starts_with($head, '%!PS') || str_starts_with($head, "\xC5\xD0\xD3\xC6");
    }
    return $mime !== '' && in_array($mime, ALLOWED_FILES[$ext] ?? [], true);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Use the quote form to send a request.']);
}
if (!same_origin_allowed()) {
    respond(403, ['ok' => false, 'message' => 'This request could not be verified. Please refresh and try again.']);
}

// Honeypot: pretend success so bots learn nothing.
if (post_value('website', 200) !== '') {
    respond(200, ['ok' => true, 'message' => 'Thanks for your request.']);
}

$token = post_value('csrfToken', 128);
$sessionToken = (string)($_SESSION['quote_csrf_token'] ?? '');
if ($sessionToken === '' || $token === '' || !hash_equals($sessionToken, $token)) {
    respond(422, ['ok' => false, 'message' => 'The secure form token expired. Refresh the page and try again.']);
}

$startedAt = (int)post_value('formStartedAt', 20);
if ($startedAt > 0 && time() - $startedAt < MIN_SECONDS_TO_SUBMIT) {
    respond(200, ['ok' => true, 'message' => 'Thanks for your request.']);
}

$now = time();
$fileLast = is_file(rate_limit_file()) ? (int)@file_get_contents(rate_limit_file()) : 0;
$sessionLast = (int)($_SESSION['workwear_last_submit'] ?? 0);
if (($now - $fileLast < RATE_LIMIT_SECONDS) || ($now - $sessionLast < RATE_LIMIT_SECONDS)) {
    respond(429, ['ok' => false, 'message' => 'Please wait a moment before sending another request.']);
}

$name = post_value('fullName', 120);
$company = post_value('companyName', 160);
$email = post_value('email', 180);
$phone = post_value('phone', 60);
$preferred = post_value('preferredContact', 40);
$requiredDate = post_value('requiredDate', 40);
$notes = post_value('projectDetails', 4000, true);

$errors = [];
if ($name === '') $errors['fullName'] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if ($phone !== '' && !preg_match('/^[0-9+().\-\s]{7,30}$/', $phone)) $errors['phone'] = 'Please enter a valid phone number.';
if (!in_array($preferred, ['', 'Email', 'Phone', 'WhatsApp'], true)) $errors['preferredContact'] = 'Choose one of the listed options.';
if ($requiredDate !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $requiredDate)) $errors['requiredDate'] = 'Use a valid date.';
if (post_value('consent', 5) !== '1') $errors['consent'] = 'Please confirm we can contact you about this request.';

// Selected products: validated against the server-side catalogue; prices are recomputed here.
$items = [];
$total = 0;
$decoded = json_decode((string)($_POST['selection'] ?? '[]'), true);
if (is_array($decoded)) {
    foreach (array_slice($decoded, 0, MAX_ITEMS) as $row) {
        if (!is_array($row) || !isset($row['id']) || !is_string($row['id']) || !isset(PRODUCT_CATALOGUE[$row['id']])) continue;
        $qty = max(0, min(100000, (int)($row['qty'] ?? 0)));
        $item = PRODUCT_CATALOGUE[$row['id']];
        $items[] = [
            'name' => $item['name'],
            'price' => $item['price'],
            'qty' => $qty,
            'colour' => clean_text((string)($row['colour'] ?? ''), 80),
            'notes' => clean_text((string)($row['notes'] ?? ''), 400, true),
        ];
        $total += $qty * $item['price'];
    }
}
if (!$items && $notes === '') {
    $errors['projectDetails'] = 'Choose at least one product or tell us what you need.';
}

// Artwork uploads.
$attachments = [];
$uploads = $_FILES['artwork'] ?? null;
if (is_array($uploads) && isset($uploads['name'])) {
    $names = is_array($uploads['name']) ? $uploads['name'] : [$uploads['name']];
    $count = 0;
    $sum = 0;
    foreach ($names as $i => $orig) {
        $err = is_array($uploads['error']) ? $uploads['error'][$i] : $uploads['error'];
        if ($err === UPLOAD_ERR_NO_FILE) continue;
        $tmp = is_array($uploads['tmp_name']) ? $uploads['tmp_name'][$i] : $uploads['tmp_name'];
        $size = (int)(is_array($uploads['size']) ? $uploads['size'][$i] : $uploads['size']);
        if (++$count > MAX_FILES) { $errors['artwork'] = 'Attach up to ' . MAX_FILES . ' files.'; break; }
        if ($err !== UPLOAD_ERR_OK || !is_uploaded_file($tmp)) { $errors['artwork'] = 'A file could not be uploaded. Try again or email it to us.'; break; }
        $sum += $size;
        if ($size <= 0 || $size > MAX_FILE_SIZE || $sum > MAX_TOTAL_UPLOAD) { $errors['artwork'] = 'Each file must be under 8 MB (15 MB total).'; break; }
        $ext = strtolower(pathinfo((string)$orig, PATHINFO_EXTENSION));
        if (!isset(ALLOWED_FILES[$ext]) || !sniff_ok($ext, $tmp)) { $errors['artwork'] = 'Artwork must be a PDF, PNG, JPG, WebP, AI or EPS file.'; break; }
        $safe = preg_replace('/[^A-Za-z0-9._-]+/', '-', pathinfo((string)$orig, PATHINFO_FILENAME)) ?: 'artwork';
        $attachments[] = ['name' => mb_substr($safe, 0, 60) . '.' . $ext, 'path' => $tmp, 'type' => ALLOWED_FILES[$ext][0]];
    }
}

if ($errors) {
    respond(422, ['ok' => false, 'message' => 'Please check the highlighted fields.', 'errors' => $errors]);
}

// Campaign attribution (plain text only, length limited).
$utm = [];
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as $key) {
    $value = preg_replace('/[^A-Za-z0-9 _.\-]/', '', post_value($key, 100)) ?? '';
    $utm[$key] = $value;
}

$config = load_config();
$ref = 'WW-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));
$lines = [
    'New workwear quote request from affinitycreative.ca/workwear/',
    'Reference: ' . $ref,
    '',
    'Name: ' . $name,
    'Company: ' . ($company ?: '-'),
    'Email: ' . $email,
    'Phone: ' . ($phone ?: '-'),
    'Preferred contact: ' . ($preferred ?: '-'),
    'Required date: ' . ($requiredDate ?: '-'),
    '',
    'Selected products:',
];
if ($items) {
    foreach ($items as $it) {
        $lines[] = '- ' . $it['name'] . ' | Qty: ' . ($it['qty'] ?: 'not given') . ' | From $' . $it['price'] . ' each | Colour: ' . ($it['colour'] ?: 'Not sure yet');
        if ($it['notes'] !== '') $lines[] = '  Sizes/notes: ' . str_replace("\n", ' ', $it['notes']);
    }
    $lines[] = 'Estimated starting total (CAD, before tax, not a final quote): $' . number_format($total, 2);
} else {
    $lines[] = '- none selected';
}
$lines = array_merge($lines, [
    '',
    'Project details:',
    $notes ?: '-',
    '',
    'Artwork: ' . ($attachments ? count($attachments) . ' file(s) attached' : 'none attached'),
    '',
    'Campaign: ' . (implode(' / ', array_filter($utm)) ?: 'direct / none'),
    'Submitted: ' . date('Y-m-d H:i:s T'),
]);
$text = implode("\n", $lines);

$fromEmail = header_value((string)$config['MAIL_FROM_EMAIL']);
$fromName = header_value((string)$config['MAIL_FROM_NAME']);
$subject = 'Workwear quote request - ' . header_value($company !== '' ? $company : $name) . ' (' . $ref . ')';
$to = (string)$config['QUOTE_TO_EMAIL'];

$headers = [
    'MIME-Version: 1.0',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . header_value($name) . ' <' . header_value($email) . '>',
    'X-Mailer: PHP/' . phpversion(),
];

if ($attachments) {
    $boundary = 'ww_' . bin2hex(random_bytes(12));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $body = '--' . $boundary . "\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . $text . "\r\n";
    foreach ($attachments as $file) {
        $body .= '--' . $boundary . "\r\nContent-Type: " . $file['type'] . '; name="' . $file['name'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n"
            . chunk_split(base64_encode((string)file_get_contents($file['path']))) . "\r\n";
    }
    $body .= '--' . $boundary . '--';
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $body = $text;
}

if ($config['QUOTE_TEST_MODE']) {
    $dir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'affinity-workwear-test';
    @mkdir($dir, 0700, true);
    $sent = (bool)file_put_contents($dir . DIRECTORY_SEPARATOR . $ref . '.eml', 'To: ' . $to . "\r\nSubject: " . $subject . "\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $body);
} else {
    $sent = mail($to, $subject, $body, implode("\r\n", $headers), '-f' . $fromEmail);
}

if (!$sent) {
    respond(500, ['ok' => false, 'message' => 'We could not send your request. Please email info@affinitycreative.ca or call 437-313-1510.']);
}

$_SESSION['workwear_last_submit'] = time();
$_SESSION['quote_csrf_token'] = bin2hex(random_bytes(32));
@file_put_contents(rate_limit_file(), (string)time(), LOCK_EX);

respond(200, [
    'ok' => true,
    'reference' => $ref,
    'message' => "Thanks for your request. We've received your workwear details and will be in touch to discuss your quote.",
]);
