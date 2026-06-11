<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT COUNT(cron_status) as cnt FROM `opay_payment` where `switch_status`='balance added successfully' and `cron_status`='Done' and date(timestamp)=curdate()");
$rows  = mysqli_fetch_assoc($result)['cnt']; 
echo $rows;
?>