<?php
require_once('conn/config.php');
if(isset($_GET['reference'])and (!empty($_GET['reference']))){
$reference=$_GET['reference'];
}else{
    //Receive the RAW post data.
    $paymentStatusJson = trim(file_get_contents("php://input"));

    //Attempt to decode the incoming RAW post data from JSON.
    $result = json_decode($paymentStatusJson, true);
    //json vars
    $reference = $result['data']['reference']; 
    //mail("munzali@ratelplus.net","payload Opay","Response:".$paymentStatusJson."<br><br><br>Reference:".$reference);
}

 //$repeatersChecker=true;

 ///////////////////////////////////////////Customer Care
if(isset($_GET['rnumber'])){
    $rnUpd=$_GET['rnumber'];///CustomerCare Only
    //$doorcheck=false;
    //$repeatersChecker=false;
$queryc="UPDATE `opay_payment` SET `ratelnumber`='$rnUpd' WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1";
mysqli_query($config,$queryc);
}
///Get Ratel Number
$getRn =mysqli_query($config,"SELECT `ratelnumber`,`reference`,`cus_id` FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1");
$row_getRn = mysqli_fetch_assoc($getRn);
$account=$row_getRn['ratelnumber'];
//$reference=strval($row_getRn['reference']);
$temCus_ID=$row_getRn['cus_id'];
if($temCus_ID==null){

$check_id =mysqli_query($config,"SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$account'");
$row_id = mysqli_fetch_array($check_id);
$newID=$row_id['cus_id'];
mysqli_query($config,"UPDATE `opay_payment` SET `cus_id`='$newID' WHERE reference='$reference' ORDER BY `id` desc LIMIT 1");
}
// $check2 =mysqli_query($config,"SELECT `status`,`cus_id` FROM `opay_payment` WHERE `ratelnumber`='$account' and reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1");
// $row_opens = mysqli_fetch_assoc($check2);
 
//$sts=$row_opens['status'];
//$customer_id=$cus_ids;
///Optional
$queryp="UPDATE `opay_payment` SET `progress`='50' WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1";
mysqli_query($config,$queryp);
   require_once('ratelhelper.php');
 
