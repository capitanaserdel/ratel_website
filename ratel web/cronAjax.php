<?php
$basic_auth_token="Bearer OPAYPUB17104990623630.8753455192233814";
$reference = str_pad(mt_rand(1,99999999),8,'0',STR_PAD_LEFT);
$total="400";
$email="demo@demo.com";
$ratelnumber="0206470069";
$fname="Demo";
$lname="Bemo";
$data=array(
'country' => 'NG',
'reference' => $reference,
'amount' => array('total'=>$total,'currency'=>'NGN'),
'returnUrl' => 'http://localhost/return',
'callbackUrl' => 'http://localhost/callb',
'cancelUrl' => 'https://ratelplus.net/',
'displayName' =>'RatelPlus',
'expireAt' => '300',
'userInfo' =>array('userEmail' =>$email,'userId' =>$reference,'userMobile' =>$ratelnumber,'userName' => $fname.' '.$lname),
'product' => array('description'=>'Buying of Airtime using Opay endpoing','name'=>'Airtime purchase')
);
 $url = "https://sandboxapi.opaycheckout.com/api/v1/international/payment/create";
$payload = json_encode($data);
//echo $payload;
  
$ch = curl_init($url);
              curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
              curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                  "Authorization:".$basic_auth_token,
                  "Content-Type: application/json",
                  "MerchantId: 256624031449374"
              ));
              curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


             $result = curl_exec($ch);
              $array2 = json_decode($result, true); //decode the JSON response
              echo print_r($array2);
//    $msg=$array2['message'];
//    $redurl=$array2['data']['cashierUrl'];
//  if($msg=="SUCCESSFUL"){
// //header("location:$redurl");
//  }