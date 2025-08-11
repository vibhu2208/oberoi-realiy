<?php
// mailer.php - Receives form data and sends an email using PHPMailer
// Requirements:
// 1) Install PHPMailer via Composer on your server: composer require phpmailer/phpmailer
// 2) Configure the SMTP settings below
// 3) Deploy on a PHP-enabled host (GitHub Pages won't run PHP)

header('Content-Type: application/json');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Load PHPMailer (Composer autoload)
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'PHPMailer not installed. Run: composer require phpmailer/phpmailer'
    ]);
    exit;
}

require $autoloadPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Helper to sanitize text
function sanitize($value) {
    return htmlspecialchars(trim((string)$value), ENT_QUOTES, 'UTF-8');
}

try {
    // Collect fields from both forms
    $formSource   = isset($_POST['form_source']) ? sanitize($_POST['form_source']) : 'unknown';

    // Footer/luxury form fields
    $fullName     = isset($_POST['fullName']) ? sanitize($_POST['fullName']) : '';
    $phoneNumber  = isset($_POST['phoneNumber']) ? sanitize($_POST['phoneNumber']) : '';
    $emailAddress = isset($_POST['emailAddress']) ? sanitize($_POST['emailAddress']) : '';

    // Popup form fields
    $name         = isset($_POST['name']) ? sanitize($_POST['name']) : '';
    $phone        = isset($_POST['phone']) ? sanitize($_POST['phone']) : '';
    $email        = isset($_POST['email']) ? sanitize($_POST['email']) : '';

    // Determine which set is present
    $isFooter = !empty($fullName) || !empty($phoneNumber) || !empty($emailAddress) || $formSource === 'footer_form';
    $isPopup  = !empty($name) || !empty($phone) || !empty($email) || $formSource === 'schedule_popup';

    if (!$isFooter && !$isPopup) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No valid form data received']);
        exit;
    }

    // Basic validation
    if ($isFooter) {
        if (empty($fullName) || empty($phoneNumber)) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Full name and phone are required.']);
            exit;
        }
    }

    if ($isPopup) {
        if (empty($name) || empty($phone)) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Name and phone are required.']);
            exit;
        }
    }

    // Compose email content
    $subject = $isFooter ? 'New Inquiry - Luxury Contact Form' : 'New Inquiry - Schedule Visit Popup';

    $rows = [];
    if ($isFooter) {
        $rows[] = ['label' => 'Full Name', 'value' => $fullName];
        $rows[] = ['label' => 'Phone Number', 'value' => $phoneNumber];
        if (!empty($emailAddress)) $rows[] = ['label' => 'Email Address', 'value' => $emailAddress];
    } else {
        $rows[] = ['label' => 'Name', 'value' => $name];
        $rows[] = ['label' => 'Phone', 'value' => $phone];
        if (!empty($email)) $rows[] = ['label' => 'Email', 'value' => $email];
    }

    $rows[] = ['label' => 'Form Source', 'value' => $formSource];
    $rows[] = ['label' => 'Submitted From', 'value' => isset($_SERVER['HTTP_REFERER']) ? sanitize($_SERVER['HTTP_REFERER']) : 'Unknown'];
    $rows[] = ['label' => 'IP', 'value' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'];
    $rows[] = ['label' => 'User Agent', 'value' => isset($_SERVER['HTTP_USER_AGENT']) ? sanitize($_SERVER['HTTP_USER_AGENT']) : 'Unknown'];

    $html = '<h2>New Website Inquiry</h2>';
    $html .= '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">';
    foreach ($rows as $row) {
        $html .= '<tr><td><strong>' . $row['label'] . '</strong></td><td>' . $row['value'] . '</td></tr>';
    }
    $html .= '</table>';

    // Configure PHPMailer
    $mail = new PHPMailer(true);

    // SMTP settings - UPDATE THESE
    // If your host provides SMTP (e.g., cPanel), fill these with correct values
    $mail->isSMTP();
    $mail->Host       = 'smtp.example.com'; // e.g., smtp.gmail.com
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your_smtp_username@example.com'; // SMTP username
    $mail->Password   = 'your_smtp_password';             // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    // or PHPMailer::ENCRYPTION_SMTPS
    $mail->Port       = 587;                               // 587 for STARTTLS, 465 for SMTPS

    // From/To - UPDATE recipient
    $fromEmail = 'no-reply@yourdomain.com';
    $fromName  = 'Oberoi Realty Website';
    $toEmail   = 'recipient@example.com'; // Your email to receive inquiries
    $toName    = 'Sales';

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail, $toName);

    // Optional: reply-to the user's email if present
    $replyEmail = $isFooter ? $emailAddress : $email;
    $replyName  = $isFooter ? $fullName : $name;
    if (!empty($replyEmail)) {
        $mail->addReplyTo($replyEmail, $replyName);
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $html;

    // Plain text alternative
    $text = "New Website Inquiry\n\n";
    foreach ($rows as $row) {
        $text .= $row['label'] . ': ' . $row['value'] . "\n";
    }
    $mail->AltBody = $text;

    // Send
    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Email sent']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mailer error: ' . $e->getMessage()]);
} catch (\Throwable $t) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $t->getMessage()]);
}
