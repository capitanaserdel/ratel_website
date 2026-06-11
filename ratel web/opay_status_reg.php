<?php
ob_start();
require_once('conn/config.php');
if(isset($_GET['vpcode'])){
$reference=$_GET['vpcode'];// if isset to call on click ok
//$handler="GET method";
}else{
////////////////////////////////Opay callback url
//Receive the RAW post data.
    $paymentStatusJson = trim(file_get_contents("php://input"));

    //Attempt to decode the incoming RAW post data from JSON.
    $result = json_decode($paymentStatusJson, true);
    //json vars
    $reference = $result['payload']['reference']; 
    //$handler="POST Json method";
    //mail("munzali@ratelplus.net","payload Opay","Response:".$paymentStatusJson."<br><br><br>Reference:".$reference);
}
$MerchantId="256624031449374";
$data = ['country' => 'NG','reference' => "$reference"];
$data2 = (string)json_encode($data,JSON_UNESCAPED_SLASHES);
$secretKey="OPAYPRV17104990623690.9884777666523573";
$auth = hash_hmac('sha512', $data2, $secretKey);  

 //////////////////////////
///Get Para for email
$getEmail =mysqli_query($config,"SELECT * FROM `registration` WHERE reference='$reference'");
$row_getEmail = mysqli_fetch_assoc($getEmail);
//vars
if($row_getEmail !== null) {
$pic1=$row_getEmail['pics1'];
$pic2=$row_getEmail['pics2'];
$pic3=$row_getEmail['pics3'];
$email=$row_getEmail['email'];
$fname=$row_getEmail['fname'];
$sname=$row_getEmail['sname'];
$gender=$row_getEmail['gender'];
$addr=$row_getEmail['addr'];
$RnLoc=$row_getEmail['loc'];
$nin=$row_getEmail['nin'];
$timestmp=$row_getEmail['timestamp'];
$dateof=$row_getEmail['date_of_inc'];
$compS=$row_getEmail['company_services'];
$rc=$row_getEmail['rc_number'];
$NumberOf=$row_getEmail['no_of_lline'];
$source=$row_getEmail['source'];
$phone=$row_getEmail['mobile'];
$amount=$row_getEmail['amount'];
}
else{
  exit;
}
//////////////////////////////////
 
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://liveapi.opaycheckout.com/api/v1/international/cashier/status",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n    \"country\":\"NG\",\n    \"reference\": \"$reference\"\n}",
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer ".$auth,
    "Content-Type: application/json",
    "MerchantId: ".$MerchantId
  ],
]); 

$response = curl_exec($curl);
$array = json_decode($response, true); //decode the JSON response
$err = curl_error($curl);
//mail("munzali@ratelplus.net","payload Opay","Response:".$response."<br><br><br>Reference:".$reference);
//print_r($array);
$msg=$array['data']['status'];
$amountoPay=$array['data']['amount']['total'];   
$koboToNaira=($amountoPay/100);
$sts1=$row_getEmail['isPaid'];
if(($msg=="SUCCESS") and ($sts1==0)){
$check = mysqli_num_rows(mysqli_query($config,"SELECT reference FROM `reg_payment` WHERE reference='$reference'"));
 if ($check == 0) {
$query="INSERT INTO `reg_payment`(reference,`phone`,`channels`,`amount`,`source`,`status`,`time_cron`)VALUES('$reference','$phone','Opay','$amount','$source','$msg','$time')";
mysqli_query($config,$query);
$query_r4="UPDATE `registration` SET `isPaid`=1 WHERE `reference`='$reference'";
     mysqli_query($config,$query_r4);
$check_pics =mysqli_query($config,"SELECT * FROM `registration` WHERE reference='$reference'");
$row_attach = mysqli_fetch_assoc($check_pics);
$pic1=$row_attach['pics1']; 
$pic2=$row_attach['pics2'];
$pic3=$row_attach['pics3'];
$email=$row_attach['email'];
$fname=$row_attach['fname'];
$sname=$row_attach['sname'];
$gender=$row_attach['gender'];
$addr=$row_attach['addr'];
$RnLoc=$row_attach['loc'];
$nin=$row_attach['nin'];
$timestmp=$row_attach['timestamp'];
$dateof=$row_attach['date_of_inc'];
$compS=$row_attach['company_services'];
$rc=$row_attach['rc_number'];
$NumberOf=$row_attach['no_of_lline'];
include 'smtp.php';
header('location:https://ratelplus.net/payment_success.php');
}else{
header('location:https://ratelplus.net/payment_success.php');
}
}else{
 exit; 
}
