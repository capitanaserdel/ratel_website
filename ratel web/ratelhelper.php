<?php
$redirect_origin = isset($_GET['redirect_origin']) ? $_GET['redirect_origin'] : 'https://ratelplus.net';
$jsonMode = isset($_GET['format']) && $_GET['format'] === 'json';
if ($jsonMode) {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
}
$url = 'https://api.paystack.co/transaction/verify/' . $reference;
//PayStack Important
//define('PAYSTACK_PUBLIC', 'pk_live_f794eddafa6e2897901b7b801b901188a9526863'); 
if (file_exists(__DIR__ . '/conn/paystack_key.php')) {
    include_once __DIR__ . '/conn/paystack_key.php';
} else {
    define('PAYSTACK_SECRET', 'PLACEHOLDER_PAYSTACK_SECRET');
}


$ch_stack = curl_init();
curl_setopt($ch_stack, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch_stack, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch_stack, CURLOPT_URL, $url);
curl_setopt($ch_stack, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch_stack, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . PAYSTACK_SECRET]
);
$request = curl_exec($ch_stack);
curl_close($ch_stack);

$results = "";

if ($request) {

    $result = json_decode($request, true);
    
    // print_r($result);
    // die;
    if ($result) {
        if ($result['data']) {
            //something came in
            //if ($result['data']['status'] == 'success') {
               $sts=$result['data']['status'];
                $amount = $result['data']['amount'];
                $koboToNaira = $amount / 100;
                $cus_number=$result['data']['customer']['phone'];
                $method=$result['data']['channel'];
              //mail("munzali@ratelplus.net","PAYSTACK",$cus_number." ".$method);
           
  
           // }
        }else{
         $sts=$result['message'];
        }
    }

$queryTran="UPDATE `opay_payment` SET `amount_r`='$koboToNaira',`opay_status`='$sts',`progress`='75' WHERE `reference`='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1";
mysqli_query($config,$queryTran);
mysqli_commit($config);
}
 //include 'stack.php';

$doorcheck=true;
$getFlag =mysqli_query($config,"SELECT `flags` FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1 ");
$row_getFlag = mysqli_fetch_array($getFlag);
$flag=$row_getFlag['flags'];
if($flag==1){
if ($jsonMode) {
    echo json_encode(['success' => true, 'credited' => true, 'reason' => 'already_credited']);
    exit;
}
header('location:' . $redirect_origin . '/airtime?status=success&reference=' . $reference);
}else{
  mysqli_begin_transaction($config);
 $check_sts =mysqli_query($config,"SELECT * FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1 FOR UPDATE");

$row_sts = mysqli_fetch_assoc($check_sts);
$switch_status_db=$row_sts['switch_status'];
// $msv=$row_sts['opay_status'];
$recharger_count=$row_sts['recharger_count'];
$stsupd=$row_sts['status'];
$progress=$row_sts['progress'];
$Stus=$row_sts['status'];
$ratelnumber=$row_sts['ratelnumber'];
$repeaters=$row_sts['repeaters'];
//Customer Care
// if($repeatersChecker==true){

// }else{
//  $repeaters=5;   
// }
//mysqli_commit($config);
////////////door
$check_id =mysqli_query($config,"SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$ratelnumber'");
$row_id = mysqli_fetch_array($check_id);
$cus_ids=$row_id['cus_id'];
$customer_id=$cus_ids;
if($doorcheck==true){
$getdoor =mysqli_query($config,"SELECT `door` FROM `opay_payment` WHERE `reference`='$reference' and date(`timestamp`)=curdate() order by id desc LIMIT 1 ");
$row_getdoor = mysqli_fetch_array($getdoor);
$door=$row_getdoor['door'];
if($door=="Open"){
/////////////////////

if($row_id !== null){

}
////////////////////
$querydoor="UPDATE `opay_payment` SET door='close',`progress`='75',`opay_status`='$sts',`cus_id`='$cus_ids' WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1";
mysqli_query($config,$querydoor);
} 
}

if(($switch_status_db!='balance added successfully' and $recharger_count==0 and $Stus==0 and ($repeaters==5 || empty($repeaters)) and $sts=='success')){
//if($recharger_count==0){
  

$curl_balance = curl_init();
curl_setopt_array($curl_balance, [
  CURLOPT_URL => "https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=7&id=$cus_ids&money=$koboToNaira",
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
]);

$response = curl_exec($curl_balance);
$array = json_decode($response, true); //decode the JSON response
//echo print_r($array);
$switch_staus=$array['status'];
$ss="UPDATE `opay_payment` SET `switch_status`='$switch_staus' WHERE reference='$reference'";
mysqli_query($config,$ss);
//mail("munzali@ratelplus.net",$reference,$method." ".$reference);
mysqli_commit($config);
 if(($switch_staus=="balance added successfully") and ($switch_staus!="") and ($recharger_count==0) and ($stsupd==0)) {
$query2="UPDATE `opay_payment` SET `status`=1,`cus_number`='$cus_number',`cus_id`='$customer_id',`channels`='Paystack',`ratelnumber`='$ratelnumber',`switch_status`='$switch_staus',`recharger_count`=recharger_count+1,`flags`=1,`amount_r`='$koboToNaira', `opay_status`='$sts',`time_cron`='$time',`progress`=100,`door`='close',`method`='$method' WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1";
mysqli_query($config,$query2);
mysqli_commit($config);
  if ($jsonMode) {
      echo json_encode(['success' => true, 'credited' => true, 'reason' => 'credited_now']);
      exit;
  }
  header('location:' . $redirect_origin . '/airtime?status=success&reference=' . $reference);
}else{
  if ($jsonMode) {
      echo json_encode(['success' => false, 'credited' => false, 'reason' => 'switch_rejected', 'switch_status' => $switch_staus]);
      exit;
  }
}

}else{
  //mail("munzali@ratelplus.net","recharger_count Paystack".$reference,$switch_status_db);
  if ($jsonMode) {
      echo json_encode(['success' => false, 'credited' => false, 'reason' => 'not_ready', 'paystack_status' => $sts]);
      exit;
  }
  header('location:' . $redirect_origin . '/airtime?status=success&reference=' . $reference);
 }
}


