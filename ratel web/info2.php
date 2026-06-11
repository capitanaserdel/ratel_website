<?php
include 'conn/config.php';
$check_sts =mysqli_query($config,"SELECT `switch_status`,`opay_status`,`recharger_count` FROM `opay_payment` WHERE reference='$reference' limit 1");
$row_sts = mysqli_fetch_assoc($check_sts);
$switch_status_db=$row_sts['switch_status'];
$msv=$row_sts['opay_status'];
$recharger_count=$row_sts['recharger_count'];
//mail("munzali@ratelplus.net","B4 Update Tab4",$switch_status_db." ".$msv);
//////////////////
if($row_sts){
    echo 1;
}
else{
    echo 0;
}