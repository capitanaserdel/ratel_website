<?php
include '../conn/config.php';
//The parameter after verify/ is the transaction reference to be verified
$id = $_GET['id'];
//$phone=$_GET['phone'];
//Ratel Number064700048
$url = 'https://api.paystack.co/transaction/verify/' . $id;
//PayStack Important
//define('PAYSTACK_PUBLIC', 'pk_live_f794eddafa6e2897901b7b801b901188a9526863');
//define('PAYSTACK_SECRET', 'sk_test_94952266a83bb5858848a40fc963c9ced8ea8914');

if (file_exists(__DIR__ . '/../conn/paystack_key.php')) {
    include_once __DIR__ . '/../conn/paystack_key.php';
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
    // echo print_r($result);
    // die;
    if ($result['data']['status'] == 'success') {
               //something came
    $reference= $result['data']['reference'];
    $phone=$result['data']['metadata']['custom_fields'][0]['value'];
    $amount= $result['data']['amount']/100;
    $source= $result['data']['metadata']['custom_fields'][0]['variable_name'];
    $sts=$result['data']['status'];
                 
                //Do something here
                $check = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `reg_payment` WHERE `reference`=$id"));
 if ($check == 0) {
$query="INSERT INTO `reg_payment`(`reference`,`phone`,`channels`,`amount`,`source`,`status`,`time_cron`)VALUES('$reference','$phone','Paystack','$amount','$source','$sts','$time')";
if(mysqli_query($config,$query)){
    $query_r4="UPDATE `registration` SET `isPaid`=1,gateway_amount='$amount' WHERE `reference`='$reference'";
     mysqli_query($config,$query_r4);
$check_pics =mysqli_query($config,"SELECT * FROM `registration` WHERE `reference`='$reference'");
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
$source2=$row_attach['source'];
include 'smtp.php';
//header('location:https://ratelplus.net/payment_success.php');
 echo "<script>window.location='https://ratelplus.net/payment_success.php';</script>";
}else{
  echo mysqli_error($config);
}

 
}else{
  //header('location:https://ratelplus.net/payment_success.php');
    echo "<script>window.location='https://ratelplus.net/payment_success.php';</script>";
}
 }
    else{
 // header('location:/');
  echo print_r($result);
 }
}  