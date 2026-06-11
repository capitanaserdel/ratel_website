<?php
$curl_balance = curl_init();
curl_setopt_array($curl_balance, [
  CURLOPT_URL => "https://portal.ratelplus.net/api/livecalls?token=bTCRAod9cl",
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "",
]);

$response = curl_exec($curl_balance);
$array = json_decode($response, true); //decode the JSON response
//print_r($array);
echo "<font color='white'>".count((array)$array['live_calss'])."</font>";
