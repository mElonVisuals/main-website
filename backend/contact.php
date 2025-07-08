<?php
header('Content-Type: application/json');

// Allow cross-origin requests for development (REMOVE OR RESTRICT IN PRODUCTION)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get the POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$name = sanitize_input($data['name'] ?? '');
$email = sanitize_input($data['email'] ?? '');
$subject = sanitize_input($data['subject'] ?? 'Website Contact Form');
$message = sanitize_input($data['message'] ?? '');

// Server-side validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

// Email configuration
$to = 'your-email@example.com'; // REPLACE THIS WITH YOUR ACTUAL EMAIL ADDRESS
$email_subject = "MelonVisuals.me Contact: " . $subject;
$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n";
$email_body .= "Message:\n" . $message . "\n";

$headers = "From: no-reply@melonvisuals.me\r\n"; // REPLACE WITH A NO-REPLY EMAIL FROM YOUR DOMAIN
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send your message. Please try again later.']);
}
?>