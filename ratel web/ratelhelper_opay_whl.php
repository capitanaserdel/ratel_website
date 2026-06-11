<?php
die;
//mail("munzali@ratelplus.net","B4 Update Tab4",$switch_status_db." ".$reference);

if(($switch_status_db!="balance added successfully" and $switch_status_db!="validation failed" and $switch_status_db!="customer not found" and $switch_status_db!="Operation timeout" and $recharger_count==0)){
$curl_balance = curl_init();
curl_setopt_array($curl_balance, [
  CURLOPT_URL => "https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=7&id=$customer_id&money=$koboToNaira",
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "",
]);

$response3 = curl_exec($curl_balance);
$array3 = json_decode($response3, true); //decode the JSON response
$switch_status=$array3['status'];
if(($switch_status=="balance added successfully") and ($switch_status!="") and($recharger_count==0)) {
    
    $query4="UPDATE `opay_payment` SET `status`=1,`time_cron`='$time',`cus_number`='$cus_number',`channels`='Opay',`switch_status`='$switch_status',`progress`=100,recharger_count=recharger_count + 1 WHERE `reference`='$reference' and `ratelnumber`='$account' ORDER BY `id` ASC LIMIT 1";
if(mysqli_query($config,$query4)){
  exit;
}
else{
//mail("munzali@ratelplus.net","Not executed",$switch_status." ".$reference);
}
}
}
else{
  //mail("munzali@ratelplus.net","Not executed Exit",$switch_status." ".$reference);

  exit;  
}

?>