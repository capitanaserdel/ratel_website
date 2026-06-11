<?php
require_once('conn/config.php');
ob_start();
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
//////////////////////
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
//$cus_number=$array['data']['payInstrumentAccount'];
if(isset($array['data']['payInstrumentAccount'])){
   $cus_number=$array['data']['payInstrumentAccount']; 
}else{
  $cus_number=0;   
}
$str = ltrim($cus_number, '+');
$koboToNaira=($amountoPay/100);
///////////////////////////////////////////Customer Care
if(isset($_GET['rnumber'])){
    $rnUpd=$_GET['rnumber'];///CustomerCare Only
    $queryc="UPDATE `opay_payment` SET ratelnumber='$rnUpd' WHERE reference='$reference'";
mysqli_query($config,$queryc);
}

$getRn =mysqli_query($config,"SELECT ratelnumber,status FROM opay_payment WHERE reference='$reference'");
$row_getRn = mysqli_fetch_array($getRn);
$account=$row_getRn['ratelnumber'];
$sts1=$row_getRn['status'];

if(($msg=="SUCCESS") and ($sts1==0)){
$query2="UPDATE `opay_payment` SET `opay_status`='$msg',`time_cron`='$time',`channels`='Opay',`amount_r`='$koboToNaira',`progress`=50 WHERE `reference`='$reference' and `ratelnumber`='$account'";
mysqli_query($config,$query2);

if (substr($account, 0, 2) == '06') {
    $account = '020' . substr($account, 1);
     
}elseif(substr($account, 0, 2) == '09') {
    $account = '020' . substr($account, 1);
  
}else{
    $account=$account;
}
 ////////////////Check customerID
 $check_id =mysqli_query($config,"SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$account'");
$row_id = mysqli_fetch_assoc($check_id);
 //////////////////////////specific transaction
$check =mysqli_query($config,"SELECT `status`,`cus_id`,`recharger_count`,`switch_status` FROM `opay_payment` WHERE `ratelnumber`='$account' and `reference`='$reference'");
$row_opens = mysqli_fetch_assoc($check);
///////////////Optional
$query3="UPDATE `opay_payment` SET `progress`=75 WHERE `reference`='$reference' and `ratelnumber`='$account'";
mysqli_query($config,$query3);
///////////////////////
//vars
 $switch_status_db=$row_opens['switch_status'];
 $rechargC=$row_opens['recharger_count'];
$sts=$row_opens['status'];

if($row_id !==null){
$cus_ids=$row_id['cus_id'];
}else{
$cus_ids='';
}
if ($sts == 0) {
$curl2 = curl_init();
curl_setopt_array($curl2, [
CURLOPT_URL => "https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=2",
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_CONNECTTIMEOUT => 0,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
]);
 
if(!$cus_ids){
$response2 = curl_exec($curl2);
$array2=array($response2);

$array_get = json_decode($array2[0], true);

/*echo print_r($array_get);
die;
*/
$main=$array_get['data'];
 
//echo $id=$main[0]['id'];

foreach($main as $result2) {
    //echo $result['account'], '<br>';
    $a=$result2['account'];
    if (in_array($result2['account'],array($account))) {
    //find Customer ID by Account.
    $customer_id=$result2['data']['id'];
    //$customer_id. "<br>";
     $query_b4="UPDATE `opay_payment` SET `cus_id`='$customer_id',`progress`=75 WHERE `ratelnumber`='$account'";
     mysqli_query($config,$query_b4);
     mail("munzali@ratelplus.net","Opay callback foreach",$customer_id." ".$sts." ".$handler);
    require_once('ratelhelper_opay.php');
}
else{
        echo "This number <a href='#'>".$account."</a> does not belong to RatelPlus Please contact <a href='https://wa.me/2347010553861'>support!</a>";
        die;
    } 
}
}else{
     
   $customer_id=$cus_ids;
  //mail("cronjobs@rateplus.net","Opay callback",$customer_id." ".$sts." ".$handler);
    require_once('ratelhelper_opay.php');
    
 
}
}//Payment is been made on callback
 header('location:https://ratelplus.net/payment_success.php');
   //header('location:ratelopay.php?account='.$ratelnumber."&koboToNaira=".$koboToNaira."&vpcode=".$reference."&cusnumber=".$str);
}else{
    exit;
}