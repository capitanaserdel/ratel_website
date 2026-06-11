<?php
if(isset($_POST['reference'])){

$reference=$_POST['reference'];

$url = 'https://api.paystack.co/transaction/verify/' . $reference;

//PayStack Important

//define('PAYSTACK_PUBLIC', 'pk_live_f794eddafa6e2897901b7b801b901188a9526863');

//define('PAYSTACK_SECRET', 'sk_test_94952266a83bb5858848a40fc963c9ced8ea8914');



if (file_exists(__DIR__ . '/../../conn/paystack_key.php')) {
    include_once __DIR__ . '/../../conn/paystack_key.php';
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

$array = json_decode($request, true);
 
//echo print_r($result);
//die;

$amt=$array['data']['amount']/100;
echo "<center><u>RESPONSE FROM PAYSTACK</u></center><br>Message: ".$array['message']."<br>Reference: ".$array['data']['reference']."<br>Payment Status: ".$array['data']['status']."<br>Amount: ".number_format($amt,2);
}else{
echo "Please Supply Reference No.";
}

 



