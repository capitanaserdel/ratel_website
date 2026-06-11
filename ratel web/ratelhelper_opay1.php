<?php
//include 'conn/config.php';
//mail("munzali@ratelplus.net","B4 Update Tab40",$reference." ".$msv);
$check_sts =mysqli_query($config,"SELECT `switch_status`,`opay_status`,`recharger_count` FROM `opay_payment` WHERE reference='$reference' order by `id` desc limit 1");
$row_sts = mysqli_fetch_assoc($check_sts);
$switch_status_db=$row_sts['switch_status'];
$msv=$row_sts['opay_status'];
$recharger_count=$row_sts['recharger_count'];

//mail("munzali@ratelplus.net","B4 Update Tab4",$switch_status_db." ".$msv);
//////////////////
if($check_sts){
    /////////////No option except!
if(($switch_status_db!="balance added successfully" and $switch_status_db!="validation failed" and $switch_status_db!="customer not found" and $switch_status_db!="Operation timeout" and $msv=="SUCCESS" and $recharger_count==0)){
//mail("munzali@ratelplus.net","Track Update".$reference,$switch_status_db." ".$sts." ".$reference);
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
if($recharger_count==0){
$response3 = curl_exec($curl_balance);
$array3 = json_decode($response3, true); //decode the JSON response
}
else{
exit;
}
$switch_staus=$array3['status'];
if(($switch_staus=="balance added successfully") and ($switch_staus!="")){
    
$query4="UPDATE `opay_payment` SET `status`=1,`cus_number`='$cus_number',`cus_id`='$customer_id',`channels`='Opay',`switch_status`='$switch_staus',`progress`=100,recharger_count=recharger_count + 1 WHERE `reference`='$reference' and `ratelnumber`='$account' ORDER BY `id` ASC LIMIT 1";
mysqli_query($config,$query4);
exit;
}
}
else{
  exit;  
}

}else{
exit; 
}
?>
 