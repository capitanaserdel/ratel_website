<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT sum(amount_r) as sumall FROM `opay_payment` where `switch_status`='balance added successfully' and status='1'and opay_status='success'");
$rows = mysqli_fetch_assoc($result); 
echo "<font color='darkgreen'>&#x20A6;".number_format($rows['sumall'],2)."</font>";
?>

