<?php
//The parameter after verify/ is the transaction reference to be verified
//$id = $_GET['ref'];
//Ratel Number 02064700069
$reference=$_GET['reference'];
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


    