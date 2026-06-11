<?php
$reference="85355937";
$MerchantId="256624031449374";
$data = ['country' => 'NG','reference' => "$reference"];
$data2 = (string)json_encode($data,JSON_UNESCAPED_SLASHES);
$secretKey="OPAYPRV17104990638040.8293043468167578";
$auth = hash_hmac('sha512', $data2, $secretKey);  

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_TIMEOUT => 60,
  CURLOPT_URL => "https://liveapi.opaycheckout.com/api/v1/international/cashier/status",
  CURLOPT_SSL_VERIFYHOST, false,
CURLOPT_SSL_VERIFYPEER=>false,
CURLOPT_HEADER => false,
CURLOPT_POST=> true,
  CURLOPT_FAILONERROR=> true,
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,

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
$httpStatusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$error=curl_error($curl);
        curl_close($curl);

if (200 != $httpStatusCode) {
            print_r($error);
        }else{
        echo $response;
    }
 



