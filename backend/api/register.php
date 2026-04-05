<?php
// ─── POST /api/register.php — Handle registration form submission ───
require_once __DIR__ . '/config.php';
corsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

// ─── Validate required fields ─────────────────────
$required = ['first_name', 'email', 'whatsapp', 'institution', 'participant_type', 'nationality', 'country', 'sub_topic', 'presence', 'info_source'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        jsonError("Field '$field' is required");
    }
}

// ─── Validate email ───────────────────────────────
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    jsonError('Invalid email address');
}

// ─── Validate enums ───────────────────────────────
if (!in_array($_POST['participant_type'], ['Presenter', 'Non-Presenter'])) {
    jsonError('Invalid participant type');
}
if (!in_array($_POST['nationality'], ['Indonesian', 'Non-Indonesian'])) {
    jsonError('Invalid nationality');
}
if (!in_array($_POST['presence'], ['Offline', 'Online'])) {
    jsonError('Invalid presence option');
}

// ─── Handle file uploads ──────────────────────────
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

$paymentProofPath = null;
$abstractFilePath = null;

// Payment proof
if (isset($_FILES['payment_proof']) && $_FILES['payment_proof']['error'] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES['payment_proof']['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'pdf'])) {
        jsonError('Payment proof must be JPG, JPEG, PNG, or PDF');
    }
    if ($_FILES['payment_proof']['size'] > MAX_FILE_SIZE) {
        jsonError('Payment proof file too large (max 5MB)');
    }
    $filename = 'payment_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    move_uploaded_file($_FILES['payment_proof']['tmp_name'], UPLOAD_DIR . $filename);
    $paymentProofPath = 'uploads/' . $filename;
}

// Abstract file
if (isset($_FILES['abstract_file']) && $_FILES['abstract_file']['error'] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES['abstract_file']['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['pdf', 'doc', 'docx'])) {
        jsonError('Abstract must be PDF, DOC, or DOCX');
    }
    if ($_FILES['abstract_file']['size'] > MAX_FILE_SIZE) {
        jsonError('Abstract file too large (max 5MB)');
    }
    $filename = 'abstract_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    move_uploaded_file($_FILES['abstract_file']['tmp_name'], UPLOAD_DIR . $filename);
    $abstractFilePath = 'uploads/' . $filename;
}

// ─── Insert into database ─────────────────────────
try {
    $db = getDB();
    $stmt = $db->prepare("
        INSERT INTO registrations 
        (first_name, last_name, email, whatsapp, institution, participant_type, nationality, country, sub_topic, presence, payment_proof, abstract_file, info_source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        trim($_POST['first_name']),
        trim($_POST['last_name'] ?? ''),
        trim($_POST['email']),
        trim($_POST['whatsapp']),
        trim($_POST['institution']),
        $_POST['participant_type'],
        $_POST['nationality'],
        trim($_POST['country']),
        $_POST['sub_topic'],
        $_POST['presence'],
        $paymentProofPath,
        $abstractFilePath,
        $_POST['info_source'],
    ]);

    jsonResponse([
        'success' => true,
        'message' => 'Registration submitted successfully!',
        'id' => (int)$db->lastInsertId(),
    ], 201);
}
catch (PDOException $e) {
    jsonError('Database error: ' . $e->getMessage(), 500);
}
