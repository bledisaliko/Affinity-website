<?php
declare(strict_types=1);

// Copy this file to one of these secure locations and fill in real values there:
// 1. /home/ydhxqex4/private/affinity-quote-config.php
// 2. api/quote-config.php
//
// Do not commit real SMTP usernames, passwords or private routing details.

return [
    'QUOTE_TO_EMAIL' => 'info@affinitycreative.ca',
    'MAIL_FROM_EMAIL' => 'website@affinitycreative.ca',
    'MAIL_FROM_NAME' => 'Affinity Creative Website',

    // Native PHP mail() is used by default because the current site does not
    // include PHPMailer or Composer. Keep these available for a future SMTP
    // mail helper if WHC mail() delivery is not reliable.
    'SMTP_HOST' => '',
    'SMTP_PORT' => '',
    'SMTP_USERNAME' => '',
    'SMTP_PASSWORD' => '',
    'SMTP_ENCRYPTION' => '',

    'SEND_CUSTOMER_CONFIRMATION' => true,

    // Set true only for server testing. It logs email content privately instead
    // of sending real mail.
    'QUOTE_TEST_MODE' => false,
];
