<?php
// ─── Admin API: Auth & Registrations ─────────────
session_start();
require_once __DIR__ . '/config.php';
corsHeaders();

$action = $_GET['action'] ?? '';

// ─── LOGIN ────────────────────────────────────────
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (!$username || !$password) {
        jsonError('Username and password required');
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonError('Invalid credentials', 401);
    }

    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_user'] = $user['username'];
    jsonResponse(['success' => true, 'username' => $user['username']]);
}

// ─── CHECK AUTH ───────────────────────────────────
if ($action === 'check') {
    if (!empty($_SESSION['admin_id'])) {
        jsonResponse(['authenticated' => true, 'username' => $_SESSION['admin_user']]);
    }
    jsonResponse(['authenticated' => false], 401);
}

// ─── LOGOUT ───────────────────────────────────────
if ($action === 'logout') {
    session_destroy();
    jsonResponse(['success' => true]);
}

// ─── Protected routes below ───────────────────────
if (empty($_SESSION['admin_id'])) {
    jsonError('Unauthorized', 401);
}

// ─── GET ALL REGISTRATIONS ────────────────────────
if ($action === 'registrations' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = getDB();
    $status = $_GET['status'] ?? 'all';
    $search = $_GET['search'] ?? '';

    $sql = "SELECT * FROM registrations WHERE 1=1";
    $params = [];

    if ($status !== 'all') {
        $sql .= " AND status = ?";
        $params[] = $status;
    }
    if ($search) {
        $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR institution LIKE ?)";
        $like = "%$search%";
        $params = array_merge($params, [$like, $like, $like, $like]);
    }

    $sql .= " ORDER BY created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $registrations = $stmt->fetchAll();

    // Count by status
    $countStmt = $db->query("SELECT status, COUNT(*) as count FROM registrations GROUP BY status");
    $counts = ['total' => 0, 'pending' => 0, 'approved' => 0, 'rejected' => 0];
    foreach ($countStmt->fetchAll() as $row) {
        $counts[$row['status']] = (int)$row['count'];
        $counts['total'] += (int)$row['count'];
    }

    jsonResponse(['registrations' => $registrations, 'counts' => $counts]);
}

// ─── UPDATE STATUS ────────────────────────────────
if ($action === 'update-status' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);
    $status = $input['status'] ?? '';

    if (!$id || !in_array($status, ['pending', 'approved', 'rejected'])) {
        jsonError('Invalid id or status');
    }

    $db = getDB();
    $stmt = $db->prepare("UPDATE registrations SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);

    jsonResponse(['success' => true]);
}

// ─── DELETE REGISTRATION ──────────────────────────
if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if (!$id)
        jsonError('Invalid id');

    $db = getDB();
    // Delete associated files
    $stmt = $db->prepare("SELECT payment_proof, abstract_file FROM registrations WHERE id = ?");
    $stmt->execute([$id]);
    $reg = $stmt->fetch();
    if ($reg) {
        if ($reg['payment_proof'] && file_exists(__DIR__ . '/../' . $reg['payment_proof'])) {
            unlink(__DIR__ . '/../' . $reg['payment_proof']);
        }
        if ($reg['abstract_file'] && file_exists(__DIR__ . '/../' . $reg['abstract_file'])) {
            unlink(__DIR__ . '/../' . $reg['abstract_file']);
        }
    }

    $stmt = $db->prepare("DELETE FROM registrations WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['success' => true]);
}

// ─── EXPORT CSV ───────────────────────────────────
if ($action === 'export') {
    $db = getDB();
    $stmt = $db->query("SELECT * FROM registrations ORDER BY created_at DESC");
    $rows = $stmt->fetchAll();

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="bmc_registrations_' . date('Y-m-d') . '.csv"');

    $out = fopen('php://output', 'w');
    if (!empty($rows)) {
        fputcsv($out, array_keys($rows[0]));
        foreach ($rows as $row) {
            fputcsv($out, $row);
        }
    }
    fclose($out);
    exit;
}

jsonError('Unknown action', 404);
