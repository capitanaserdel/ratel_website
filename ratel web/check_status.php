<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once('conn/config.php');

$reference = isset($_GET['reference']) ? $_GET['reference'] : '';
if ($reference === '') {
    echo json_encode(['found' => false, 'credited' => false, 'reason' => 'missing_reference']);
    exit;
}

$reference = mysqli_real_escape_string($config, $reference);
$result = mysqli_query($config, "SELECT `status`,`flags`,`switch_status`,`channels` FROM `opay_payment` WHERE reference='$reference' AND date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1");
$row = $result ? mysqli_fetch_assoc($result) : null;

if (!$row) {
    echo json_encode(['found' => false, 'credited' => false, 'reason' => 'not_found']);
    exit;
}

$credited = ($row['flags'] == 1) || ($row['switch_status'] === 'balance added successfully');

echo json_encode([
    'found' => true,
    'credited' => (bool) $credited,
    'status' => $row['status'],
    'switch_status' => $row['switch_status'],
    'channels' => $row['channels'],
]);
