<?php
require_once('conn/config.php');
$i = 1;
do {

  $i++;
$query="SELECT * FROM `opay_payment` WHERE  cron_status is null and status='0' and (`opay_status`='INITIAL') and `switch_status` is Null and `staff`='Added by web API' and (channels='Opay' OR channels='Paystack') order by id asc";
//$query="SELECT * FROM `opay_payment` WHERE `reference`=33867562";
$check = mysqli_query($config,$query);
$row=mysqli_fetch_assoc($check);
 //$reference="08175502";
$reference=$row['reference'];
$account=$row['ratelnumber'];
$cus_ids=$row['cus_id'];
$status=$row['status'];
$current_amount=$row['amount_r'];
$channels=$row['channels'];
$rechage_count=$row['recharger_count'];
///////////////////////////////////////////
$mysql_timestamp = $row['timestamp'];
$unix_timestamp = strtotime($mysql_timestamp);

// Format the Unix timestamp to display only the time (24-hour format)
$time_only = date('H:i:s', $unix_timestamp);
//query data from dbase
$currentTime1 =date("H:i:s");

//convert time readable
$currentTime2 = strtotime($currentTime1);
$TransTime2 = strtotime($time_only);
//get diff in secs
$diff = $currentTime2 - $TransTime2;
//mail("munzali@ratelplus.net","payload Opay","Response:".$channels."<br><br><br>Reference:".$reference);
if($diff>=180){//Interval of 3m or higher
   
$query3="UPDATE `opay_payment` SET `cron_status`='Done' WHERE `reference`='$reference' and `ratelnumber`='$account'";
         mysqli_query($config,$query3);
//header("location:https://ratelplus.net/ratelpay_dragJ.php?reference=$reference");
         switch($channels){
          case "Paystack":
        echo "<script>window.location='https://ratelplus.net/ratelpay_dragJ.php?reference=$reference';</script>";
        break;
        case "Opay":
        echo "<script>window.location='https://ratelplus.net/opay_status_whl.php?vpcode=$reference';</script>";
        //mail("munzali@ratelplus.net","payload Opay2x","Response:".$reference."<br><br><br>Reference:".$reference);
        break;

       }
}else{
  echo 'No Job'.'<br>';
}
} while ($i < 21);