<?php
declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

const MAX_FILES = 5;
const MAX_FILE_SIZE = 8388608;
const MAX_TOTAL_UPLOAD = 20971520;
const MAX_REQUEST_SIZE = 23000000;
const MIN_SECONDS_TO_SUBMIT = 2;
const RATE_LIMIT_SECONDS = 45;

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function clean_text(string $value, int $max = 5000): string
{
    $value = trim($value);
    $value = preg_replace("/\r\n|\r/", "\n", $value) ?? '';
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function post_value(string $key, int $max = 5000): string
{
    return clean_text((string)($_POST[$key] ?? ''), $max);
}

function header_value(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function html_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function load_quote_config(): array
{
    $config = [
        'QUOTE_TO_EMAIL' => 'info@affinitycreative.ca',
        'MAIL_FROM_EMAIL' => 'website@affinitycreative.ca',
        'MAIL_FROM_NAME' => 'Affinity Creative Website',
        'SEND_CUSTOMER_CONFIRMATION' => true,
        'QUOTE_TEST_MODE' => false,
    ];

    $paths = [
        '/home/ydhxqex4/private/affinity-quote-config.php',
        __DIR__ . '/quote-config.php',
    ];

    foreach ($paths as $path) {
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

    $config['SEND_CUSTOMER_CONFIRMATION'] = filter_var($config['SEND_CUSTOMER_CONFIRMATION'], FILTER_VALIDATE_BOOLEAN);
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
    if (!$originHost || !$host) {
        return false;
    }
    return strtolower($originHost) === strtolower(preg_replace('/:\d+$/', '', $host));
}

function rate_limit_key(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'affinity_quote_rate_' . hash('sha256', $ip);
}

function enforce_rate_limit(): void
{
    $now = time();
    $sessionLast = (int)($_SESSION['quote_builder_last_submit'] ?? 0);
    $file = rate_limit_key();
    $fileLast = is_file($file) ? (int)@file_get_contents($file) : 0;
    if (($sessionLast > 0 && $now - $sessionLast < RATE_LIMIT_SECONDS) || ($fileLast > 0 && $now - $fileLast < RATE_LIMIT_SECONDS)) {
        respond(429, ['ok' => false, 'message' => 'Please wait a moment before sending another quote request.']);
    }
}

function mark_rate_limit(): void
{
    $_SESSION['quote_builder_last_submit'] = time();
    @file_put_contents(rate_limit_key(), (string)time(), LOCK_EX);
}

function request_id(): string
{
    return 'AC-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));
}

function parse_answers(string $json): array
{
    $decoded = json_decode($json, true);
    if (!is_array($decoded)) {
        return [];
    }
    return $decoded;
}

function flatten_answers(array $steps): array
{
    $flat = [];
    foreach ($steps as $step) {
        foreach (($step['fields'] ?? []) as $field) {
            if (!is_array($field) || !isset($field['id'])) {
                continue;
            }
            $flat[(string)$field['id']] = $field['value'] ?? '';
        }
    }
    return $flat;
}

function value_to_text(mixed $value): string
{
    if (is_array($value)) {
        $parts = [];
        foreach ($value as $key => $item) {
            if (is_array($item)) {
                $nested = [];
                foreach ($item as $subKey => $subValue) {
                    if (trim((string)$subValue) !== '') {
                        $nested[] = $subKey . ': ' . $subValue;
                    }
                }
                if ($nested) {
                    $parts[] = implode(', ', $nested);
                }
            } elseif (trim((string)$item) !== '') {
                $parts[] = is_string($key) ? $key . ': ' . $item : (string)$item;
            }
        }
        return $parts ? implode('; ', $parts) : 'Not answered';
    }
    $text = trim((string)$value);
    return $text !== '' ? $text : 'Not answered';
}

function validate_submission(array $flat): array
{
    $errors = [];
    $name = clean_text((string)($flat['fullName'] ?? post_value('fullName', 160)), 160);
    $email = clean_text((string)($flat['email'] ?? post_value('email', 180)), 180);
    $phone = clean_text((string)($flat['phone'] ?? post_value('phone', 80)), 80);
    $consent = clean_text((string)($flat['consent'] ?? post_value('consent', 20)), 20);

    if ($name === '') {
        $errors['fullName'] = 'Full name is required.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'A valid email address is required.';
    }
    if (strlen(preg_replace('/\D+/', '', $phone)) < 7) {
        $errors['phone'] = 'A valid phone number is required.';
    }
    if ($consent !== 'Yes' && $consent !== '1' && strtolower($consent) !== 'true') {
        $errors['consent'] = 'Consent is required.';
    }

    $date = clean_text((string)($flat['requiredDate'] ?? $flat['preferredLaunchDate'] ?? post_value('requiredDate', 40)), 40);
    if ($date !== '') {
        $dateTime = date_create($date);
        if (!$dateTime) {
            $errors['requiredDate'] = 'Enter a valid date.';
        }
    }

    return $errors;
}

function allowed_mime(string $ext, string $mime): bool
{
    $mime = strtolower($mime);
    $image = ['image/jpeg', 'image/png', 'image/webp'];
    if (in_array($ext, ['jpg', 'jpeg'], true)) return in_array($mime, ['image/jpeg', 'image/pjpeg'], true);
    if ($ext === 'png') return in_array($mime, ['image/png', 'image/x-png'], true);
    if ($ext === 'webp') return in_array($mime, ['image/webp'], true);
    if ($ext === 'pdf') return $mime === 'application/pdf';
    if ($ext === 'svg') return in_array($mime, ['image/svg+xml', 'text/xml', 'application/xml', 'text/plain'], true);
    if ($ext === 'zip') return in_array($mime, ['application/zip', 'application/x-zip-compressed', 'application/octet-stream'], true);
    if (in_array($ext, ['ai', 'eps'], true)) return in_array($mime, ['application/postscript', 'application/illustrator', 'application/pdf', 'application/octet-stream'], true);
    return in_array($mime, $image, true);
}

function collect_uploads(): array
{
    if (empty($_FILES['files']) || !is_array($_FILES['files']['name'])) {
        return [];
    }

    $names = $_FILES['files']['name'];
    $tmpNames = $_FILES['files']['tmp_name'];
    $errors = $_FILES['files']['error'];
    $sizes = $_FILES['files']['size'];
    $labels = $_POST['fileLabels'] ?? [];
    $count = count($names);

    if ($count > MAX_FILES) {
        respond(413, ['ok' => false, 'message' => 'Please upload no more than ' . MAX_FILES . ' files.']);
    }

    $total = 0;
    $uploads = [];
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg', 'ai', 'eps', 'zip'];
    $dir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'affinity_quote_uploads';
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        throw new RuntimeException('Unable to create temporary upload directory.');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);

    for ($i = 0; $i < $count; $i++) {
        if ((int)$errors[$i] === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ((int)$errors[$i] !== UPLOAD_ERR_OK) {
            respond(400, ['ok' => false, 'message' => 'One uploaded file could not be received.']);
        }
        $size = (int)$sizes[$i];
        if ($size > MAX_FILE_SIZE) {
            respond(413, ['ok' => false, 'message' => 'Each file must be 8 MB or smaller.']);
        }
        $total += $size;
        if ($total > MAX_TOTAL_UPLOAD) {
            respond(413, ['ok' => false, 'message' => 'Total uploads must be 20 MB or smaller.']);
        }
        $originalName = clean_text((string)$names[$i], 240);
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowed, true)) {
            respond(400, ['ok' => false, 'message' => 'One uploaded file type is not accepted.']);
        }
        $tmp = (string)$tmpNames[$i];
        $mime = $finfo->file($tmp) ?: 'application/octet-stream';
        if (!allowed_mime($ext, $mime)) {
            respond(400, ['ok' => false, 'message' => 'One uploaded file does not match an accepted file type.']);
        }
        $safePath = $dir . DIRECTORY_SEPARATOR . bin2hex(random_bytes(16)) . '.' . $ext;
        if (!is_uploaded_file($tmp) || !move_uploaded_file($tmp, $safePath)) {
            respond(400, ['ok' => false, 'message' => 'One uploaded file could not be processed.']);
        }
        $uploads[] = [
            'path' => $safePath,
            'name' => $originalName,
            'mime' => $mime,
            'label' => clean_text((string)($labels[$i] ?? 'Uploaded file'), 160),
            'size' => $size,
        ];
    }

    return $uploads;
}

function steps_html(array $steps): string
{
    $html = '';
    foreach ($steps as $step) {
        $title = html_escape((string)($step['title'] ?? 'Step'));
        $html .= '<h3 style="margin:24px 0 8px;font-size:18px;color:#11110f;">' . $title . '</h3>';
        $html .= '<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #ded8cf;">';
        foreach (($step['fields'] ?? []) as $field) {
            $label = html_escape((string)($field['label'] ?? 'Field'));
            $value = html_escape(value_to_text($field['value'] ?? ''));
            $html .= '<tr><th align="left" valign="top" style="width:34%;border-bottom:1px solid #eee7dd;background:#f8f5ef;color:#68645e;">' . $label . '</th><td valign="top" style="border-bottom:1px solid #eee7dd;color:#11110f;">' . nl2br($value) . '</td></tr>';
        }
        $html .= '</table>';
    }
    return $html;
}

function steps_text(array $steps): string
{
    $text = '';
    foreach ($steps as $step) {
        $text .= "\n" . (string)($step['title'] ?? 'Step') . "\n";
        foreach (($step['fields'] ?? []) as $field) {
            $text .= '- ' . (string)($field['label'] ?? 'Field') . ': ' . value_to_text($field['value'] ?? '') . "\n";
        }
    }
    return $text;
}

function attachment_list_html(array $uploads): string
{
    if (!$uploads) {
        return '<p>No files uploaded.</p>';
    }
    $items = '';
    foreach ($uploads as $upload) {
        $items .= '<li>' . html_escape($upload['label']) . ': ' . html_escape($upload['name']) . ' (' . number_format((int)$upload['size'] / 1024, 1) . ' KB)</li>';
    }
    return '<ul>' . $items . '</ul>';
}

function build_admin_email(string $requestId, array $steps, array $flat, array $uploads, string $serviceName, string $sourcePage): array
{
    $submittedAt = date('Y-m-d H:i:s T');
    $name = value_to_text($flat['fullName'] ?? '');
    $company = value_to_text($flat['companyName'] ?? '');
    $email = value_to_text($flat['email'] ?? '');
    $phone = value_to_text($flat['phone'] ?? '');

    $html = '<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:Arial,sans-serif;color:#11110f;">'
        . '<div style="max-width:760px;margin:0 auto;padding:28px;">'
        . '<div style="background:#fff;border:1px solid #ded8cf;border-radius:16px;padding:28px;">'
        . '<h1 style="margin:0 0 8px;font-size:28px;">Affinity Creative quote request</h1>'
        . '<p style="margin:0 0 18px;color:#68645e;">Request ID: <strong>' . html_escape($requestId) . '</strong></p>'
        . '<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #ded8cf;">'
        . '<tr><th align="left">Submitted</th><td>' . html_escape($submittedAt) . '</td></tr>'
        . '<tr><th align="left">Service</th><td>' . html_escape($serviceName) . '</td></tr>'
        . '<tr><th align="left">Source page</th><td>' . html_escape($sourcePage) . '</td></tr>'
        . '<tr><th align="left">Customer</th><td>' . html_escape($name) . '</td></tr>'
        . '<tr><th align="left">Company</th><td>' . html_escape($company) . '</td></tr>'
        . '<tr><th align="left">Email</th><td>' . html_escape($email) . '</td></tr>'
        . '<tr><th align="left">Phone</th><td>' . html_escape($phone) . '</td></tr>'
        . '</table>'
        . steps_html($steps)
        . '<h3 style="margin:24px 0 8px;font-size:18px;">Uploaded files</h3>' . attachment_list_html($uploads)
        . '<div style="margin-top:24px;padding:16px;background:#fff4ee;border-left:4px solid #ff5a2f;">'
        . '<strong>Reply to customer:</strong><br>' . html_escape($name) . ' &lt;' . html_escape($email) . '&gt;'
        . '</div></div></div></body></html>';

    $text = "Affinity Creative quote request\n"
        . "Request ID: {$requestId}\n"
        . "Submitted: {$submittedAt}\n"
        . "Service: {$serviceName}\n"
        . "Source page: {$sourcePage}\n"
        . "Customer: {$name}\n"
        . "Company: {$company}\n"
        . "Email: {$email}\n"
        . "Phone: {$phone}\n"
        . steps_text($steps)
        . "\nUploaded files:\n";

    foreach ($uploads as $upload) {
        $text .= '- ' . $upload['label'] . ': ' . $upload['name'] . "\n";
    }

    $text .= "\nReply to customer: {$name} <{$email}>\n";

    return [$html, $text];
}

function build_customer_email(string $requestId, array $flat, string $serviceName): array
{
    $name = value_to_text($flat['fullName'] ?? '');
    $summary = value_to_text($flat['mainService'] ?? $flat['projectType'] ?? $flat['garmentCategories'] ?? $flat['printProducts'] ?? $flat['services'] ?? '');

    $html = '<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:Arial,sans-serif;color:#11110f;">'
        . '<div style="max-width:680px;margin:0 auto;padding:28px;">'
        . '<div style="background:#fff;border:1px solid #ded8cf;border-radius:16px;padding:28px;">'
        . '<h1 style="margin:0 0 12px;font-size:26px;">We received your quote request.</h1>'
        . '<p>Thank you' . ($name !== 'Not answered' ? ', ' . html_escape($name) : '') . '. Affinity Creative has received your request.</p>'
        . '<p><strong>Request ID:</strong> ' . html_escape($requestId) . '</p>'
        . '<p><strong>Service:</strong> ' . html_escape($serviceName) . '</p>'
        . '<p><strong>Summary:</strong> ' . html_escape($summary) . '</p>'
        . '<p>We normally respond within one business day. You can reply to this email with corrections or additional files.</p>'
        . '</div></div></body></html>';

    $text = "We received your Affinity Creative quote request.\n\n"
        . "Request ID: {$requestId}\n"
        . "Service: {$serviceName}\n"
        . "Summary: {$summary}\n\n"
        . "We normally respond within one business day. You can reply to this email with corrections or additional files.\n";

    return [$html, $text];
}

function encoded_subject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function build_mime_body(string $html, string $text, array $uploads = []): array
{
    $mixed = 'AC_MIXED_' . bin2hex(random_bytes(8));
    $alt = 'AC_ALT_' . bin2hex(random_bytes(8));

    $body = "--{$mixed}\r\n";
    $body .= "Content-Type: multipart/alternative; boundary=\"{$alt}\"\r\n\r\n";
    $body .= "--{$alt}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n{$text}\r\n\r\n";
    $body .= "--{$alt}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n{$html}\r\n\r\n";
    $body .= "--{$alt}--\r\n";

    foreach ($uploads as $upload) {
        $content = chunk_split(base64_encode((string)file_get_contents($upload['path'])));
        $filename = addcslashes($upload['name'], "\"\\");
        $mime = header_value($upload['mime']);
        $body .= "--{$mixed}\r\n";
        $body .= "Content-Type: {$mime}; name=\"{$filename}\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
        $body .= $content . "\r\n";
    }

    $body .= "--{$mixed}--\r\n";
    return [$body, $mixed];
}

function send_email(string $to, string $subject, string $html, string $text, string $fromEmail, string $fromName, string $replyToEmail, string $replyToName, array $uploads = [], bool $testMode = false): bool
{
    [$body, $boundary] = build_mime_body($html, $text, $uploads);
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'From: ' . header_value($fromName) . ' <' . header_value($fromEmail) . '>',
        'Reply-To: ' . header_value($replyToName) . ' <' . header_value($replyToEmail) . '>',
        'X-Mailer: PHP/' . phpversion(),
    ];

    if ($testMode) {
        error_log("[Affinity quote test mail] To: {$to}; Subject: {$subject}\n" . $text);
        return true;
    }

    return mail(header_value($to), encoded_subject($subject), $body, implode("\r\n", $headers));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Use the quote builder to send a request.']);
}

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_REQUEST_SIZE) {
    respond(413, ['ok' => false, 'message' => 'The upload is too large. Please keep files under the listed limits.']);
}

if (!same_origin_allowed()) {
    respond(400, ['ok' => false, 'message' => 'The quote request must be sent from affinitycreative.ca.']);
}

if (post_value('website', 200) !== '') {
    respond(200, ['ok' => true, 'requestId' => request_id(), 'message' => 'Quote request received.']);
}

$startedAt = (int)post_value('formStartedAt', 20);
if ($startedAt > 0 && time() - $startedAt < MIN_SECONDS_TO_SUBMIT) {
    respond(400, ['ok' => false, 'message' => 'Please review the form for a moment before sending.']);
}

enforce_rate_limit();

$uploads = [];

try {
    $config = load_quote_config();
    $serviceKey = post_value('serviceKey', 100);
    $serviceName = post_value('serviceName', 160);
    $sourcePage = post_value('sourcePage', 220);
    $steps = parse_answers(post_value('answers', 120000));
    $flat = flatten_answers($steps);

    if ($serviceKey === '' || $serviceName === '' || !$steps) {
        respond(400, ['ok' => false, 'message' => 'The quote request is missing required project details.']);
    }

    $errors = validate_submission($flat);
    if ($errors) {
        respond(400, ['ok' => false, 'message' => 'Please check the required fields.', 'errors' => $errors]);
    }

    $uploads = collect_uploads();
    $requestId = request_id();
    $customerEmail = header_value(value_to_text($flat['email'] ?? ''));
    $customerName = header_value(value_to_text($flat['fullName'] ?? 'Customer'));
    $company = header_value(value_to_text($flat['companyName'] ?? 'Customer'));

    [$adminHtml, $adminText] = build_admin_email($requestId, $steps, $flat, $uploads, $serviceName, $sourcePage);
    $subject = "[Affinity Quote Request] {$serviceName} - {$company} - {$requestId}";

    $adminSent = send_email(
        (string)$config['QUOTE_TO_EMAIL'],
        $subject,
        $adminHtml,
        $adminText,
        (string)$config['MAIL_FROM_EMAIL'],
        (string)$config['MAIL_FROM_NAME'],
        $customerEmail,
        $customerName,
        $uploads,
        (bool)$config['QUOTE_TEST_MODE']
    );

    if (!$adminSent) {
        throw new RuntimeException('Admin email failed.');
    }

    if ((bool)$config['SEND_CUSTOMER_CONFIRMATION']) {
        [$customerHtml, $customerText] = build_customer_email($requestId, $flat, $serviceName);
        $customerSent = send_email(
            $customerEmail,
            "We received your Affinity Creative quote request - {$requestId}",
            $customerHtml,
            $customerText,
            (string)$config['MAIL_FROM_EMAIL'],
            (string)$config['MAIL_FROM_NAME'],
            (string)$config['QUOTE_TO_EMAIL'],
            'Affinity Creative',
            [],
            (bool)$config['QUOTE_TEST_MODE']
        );
        if (!$customerSent) {
            throw new RuntimeException('Customer confirmation email failed.');
        }
    }

    mark_rate_limit();
    respond(200, ['ok' => true, 'requestId' => $requestId, 'message' => 'Quote request received.']);
} catch (Throwable $error) {
    error_log('[Affinity quote request] ' . $error->getMessage());
    respond(500, ['ok' => false, 'message' => 'The request could not be sent. Please email info@affinitycreative.ca directly.']);
} finally {
    foreach ($uploads as $upload) {
        if (isset($upload['path']) && is_file($upload['path'])) {
            @unlink($upload['path']);
        }
    }
}
