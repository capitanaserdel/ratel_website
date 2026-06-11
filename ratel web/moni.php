<?php

$apikey ="MK_TEST_GTA4W564V5" ;
$secretKey="H1VTZ5Y4J7JVK0VBMB0FS02MYHJD9VX1";
$credentials = $apikey . ":" . $secretKey;
$base64Credentials = base64_encode($credentials);
$ch = curl_init("https://sandbox.monnify.com/api/v1/auth/login");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Basic '.$base64Credentials]);

$tokenexe=curl_exec($ch);
$array = json_decode($tokenexe, true);
//echo print_r($array);
$token=$array['responseBody']['accessToken'];
define('token', $token);
curl_close($ch);
/////////////////////////////////
$reference='86427333';

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://sandbox.monnify.com/api/v2/transactions/MNFY7C677C202207251119577C000283",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "{\n    \"paymentReference\": \"$reference\"\n}",
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer ".token
  ],
]); 
echo $request = curl_exec($curl);
//$result = json_decode($request, true);
//echo print_r($result);
