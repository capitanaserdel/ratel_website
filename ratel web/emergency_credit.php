<?php
// Emergency credit script - ONE TIME USE
// Manually credit a failed OPay transaction to the switch
require_once('../conn/config.php');

$reference = '51123482';
$ratelnumber_raw = '02097070004'; // Already in 020 format

// Normalize number just in case
$account = $ratelnumber_raw;
if (substr($account, 0, 2) == '06' || substr($account, 0, 2) == '09') {
    $account = '020' . substr($account, 1);
}

// 1. Look up cus_id from switch_data
$check_id = mysqli_query($config, "SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$account' LIMIT 1");
$row_id = mysqli_fetch_assoc($check_id);
$cus_id = $row_id['cus_id'];

if (!$cus_id) {
    echo json_encode(['status' => 'error', 'message' => 'Customer not found in switch_data for: ' . $account]);
    die;
}

echo "Found cus_id: $cus_id for account: $account<br>";

// 2. Check current transaction state
$check_tx = mysqli_query($config, "SELECT * FROM `opay_payment` WHERE `reference`='$reference' LIMIT 1");
$tx = mysqli_fetch_assoc($check_tx);

if (!$tx) {
    echo json_encode(['status' => 'error', 'message' => 'Transaction not found: ' . $reference]);
    die;
}

echo "Transaction status: " . $tx['status'] . ", switch_status: " . $tx['switch_status'] . ", flags: " . $tx['flags'] . "<br>";

if ($tx['status'] == 1 || $tx['flags'] == 1) {
    echo json_encode(['status' => 'already_done', 'message' => 'Already credited!']);
    die;
}

$amount = $tx['amount_r'] ?: 100; // fallback to 100

// 3. Call the switch to credit
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=7&id=$cus_id&money=$amount",
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "",
]);

$response = curl_exec($curl);
$result = json_decode($response, true);
$switch_status = $result['status'];

echo "Switch response: $switch_status<br>";

// 4. Update DB
if ($switch_status === 'balance added successfully') {
    $time = date("h:i:sa");
    $update = mysqli_query($config, "UPDATE `opay_payment` SET 
        `status`=1, `cus_id`='$cus_id', `switch_status`='$switch_status', 
        `progress`=100, `door`='close', `flags`=1, `recharger_count`=recharger_count+1,
        `time_cron`='$time'
        WHERE `reference`='$reference' LIMIT 1");
    echo json_encode(['status' => 'success', 'message' => 'Airtime credited successfully! Amount: NGN ' . $amount]);
} else {
    echo json_encode(['status' => 'failed', 'switch_response' => $switch_status, 'raw' => $response]);
}
?>
