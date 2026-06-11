<?php
include '../conn/config.php';
if(isset($_POST['accn']) and (!empty($_POST['staff'])) and (!empty($_POST['amount']))and (!empty($_POST['bank']))and (!empty($_POST['closebv']))) {
$closeb=$_POST['closebv'];
$cus_number=$_POST['accn'];
$staff=$_POST['staff'];
$koboToNaira=$_POST['amount'];
$bank=$_POST['bank'];
$reference=str_pad(mt_rand(1,99999999),8,'0',STR_PAD_LEFT);
$check = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `opay_payment` WHERE `reference`='$reference'"));

if($koboToNaira>20000){
    echo "Amount Should NOT be more than 20,000";
    die;
}

 if ($check == 0) {

$query="INSERT INTO `opay_payment`(`reference`,`ratelnumber`,`opay_status`,`progress`,`devices_os`,`channels`,`staff`,`close_balance`,`bank_teller`,`method`)VALUES('$reference','$cus_number','INITIAL',25,'web','Ratel','$staff','$closeb','$bank','Ratel')";
mysqli_query($config,$query);
}
}else{
echo "Error data not complete";
    die;
 
}
////////////door
$getdoor =mysqli_query($config,"SELECT `door` FROM `opay_payment` WHERE `reference`='$reference' order by id desc LIMIT 1 ");
$row_getdoor = mysqli_fetch_array($getdoor);
$door=$row_getdoor['door'];
if($door=="Open"){
$querydoor="UPDATE `opay_payment` SET door='close' WHERE reference='$reference'";
mysqli_query($config,$querydoor);
}else{
  //mail("munzali@ratelplus.net","Door Close"." ".$reference," ".$reference);
die;
}

/////////////FLAG
$getFlag =mysqli_query($config,"SELECT `flags` FROM `opay_payment` WHERE `reference`='$reference' order by id desc LIMIT 1 ");
$row_getFlag = mysqli_fetch_array($getFlag);
$flag=$row_getFlag['flags'];
if($flag==1){
//mail("munzali@ratelplus.net","Flag","reference:".$reference);
  die;
 }
$getRn =mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `reference`='$reference'");
$row_getRn = mysqli_fetch_array($getRn);
$account=$row_getRn['ratelnumber'];
$switch_status_db=$row_getRn['switch_status'];
$msv=$row_getRn['opay_status'];
$recharger_count=$row_getRn['recharger_count'];
$sts=$row_getRn['status'];

if (substr($account, 0, 2) == '06') {
    $account = '020' . substr($account, 1);
     
}elseif(substr($account, 0, 2) == '09') {
    $account = '020' . substr($account, 1);
  
}else{
    $account=$account;
}
////////////////Check customerID====>
$check_id =mysqli_query($config,"SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$account'");
$row_id = mysqli_fetch_assoc($check_id);
$cus_ids=$row_id['cus_id'];
$customer_id=$cus_ids;
 //////////////////////////specific transaction
$check =mysqli_query($config,"SELECT `status`,`cus_id`,`recharger_count`,`switch_status` FROM `opay_payment` WHERE `ratelnumber`='$account' and `reference`='$reference'");
$row_opens = mysqli_fetch_assoc($check);
if(($row_id) and ($recharger_count==0)){///////////////Optional
$query3="UPDATE `opay_payment` SET `progress`=50 WHERE `reference`='$reference' and `ratelnumber`='$account'";
mysqli_query($config,$query3);
}

if(($sts==0)and($recharger_count==0) and ($cus_ids!="")){
$query2="UPDATE `opay_payment` SET `progress`=75,`cus_id`='$customer_id',`amount_r`='$koboToNaira',`opay_status`='$SUCCESS' WHERE `reference`='$reference' and `ratelnumber`='$account'";
mysqli_query($config,$query2);
//require_once('ratelhelper_opay_whl.php');
$getR2 =mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `reference`='$reference'");
$row_getR2 = mysqli_fetch_array($getR2);
$switch_status_db2=$row_getR2['switch_status'];

if(($switch_status_db2!="balance added successfully" and $switch_status_d2!="validation failed" and $switch_status_d2!="customer not found" and $switch_status_d2!="Operation timeout" and $recharger_count==0)){

$curl_balance = curl_init();
curl_setopt($curl_balance, CURLOPT_URL, "https://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=7&id=$customer_id&money=$koboToNaira");
    curl_setopt($curl_balance, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string
    curl_setopt($curl_balance, CURLOPT_POST, true); // Set as POST request
    curl_setopt($curl_balance, CURLOPT_SSL_VERIFYPEER,false); // POST data
    curl_setopt($curl_balance, CURLOPT_FAILONERROR, true);
$response3 = curl_exec($curl_balance);
if (curl_errno($curl_balance)) {
  mail("munzali@ratelplus.net","Curl Error",curl_error($curl_balance)." ".$reference);
  die;
}else{
$array3 = json_decode($response3, true); //decode the JSON response
 //mail("munzali@ratelplus.net","Curl Res",$array3['status']." ".$reference);
}
$switch_status=$array3['status'];
curl_close($curl_balance);
//////////////////Final
mysqli_begin_transaction($config);
$getR =mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `reference`='$reference' FOR UPDATE");
$row_getR = mysqli_fetch_array($getR);
$recharger_count2=$row_getR['recharger_count'];
//////////////////
if(($switch_status=="balance added successfully") and ($switch_status!="") and($recharger_count2==0)) {
    
    $query4="UPDATE `opay_payment` SET `status`=1,`time_cron`='$time',`cus_number`='$cus_number',`channels`='Added by web API',`switch_status`='$switch_status',`progress`=100,`recharger_count`=`recharger_count` + 1,`flags`=1 WHERE `reference`='$reference' and `ratelnumber`='$account' ORDER BY `id` ASC LIMIT 1";
mysqli_query($config,$query4);
echo $switch_status;
mysqli_commit($config);

 
}
}
else{
  //mail("munzali@ratelplus.net","Not executed Exit",$switch_status." ".$reference);

  exit;  
}
}
 exit;
 //mysqli_commit($config);
 