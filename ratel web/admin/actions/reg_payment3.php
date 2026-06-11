<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT sum(amount) as sumall FROM `registration` WHERE isPaid=0 and `gateway_amount` is null");
$rows = mysqli_fetch_assoc($result); 
echo "<font color='darkgreen'>&#x20A6;".number_format($rows['sumall'])."</font>";
?>

