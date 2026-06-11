<?php
if(isset($_POST['reference'])){

$reference=$_POST['reference'];

$MerchantId="256624031449374";
$data = ['country' => 'NG','reference' => "$reference"];
$data2 = (string)json_encode($data,JSON_UNESCAPED_SLASHES);
$secretKey="OPAYPRV17722214161430.6084944301747499";
$auth = hash_hmac('sha512', $data2, $secretKey);  

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


 $amt=$array['data']['amount']['total']/100;
echo "<center><u>RESPONSE FROM OPAY</u></center><br>Message: ".$res=$array['message']."<br>Reference: ".$array['data']['reference']."<br>Order No.: ".$array['data']['orderNo']."<br>Payment Status: ".$array['data']['status']."<br>Payer No:. ".$array['data']['payInstrumentAccount']."<br>Instrument Type: ".$array['data']['instrumentType']."<br>Amount: ".number_format($amt,2);
}
else{
  echo "Please Supply Reference No.";
}

 



