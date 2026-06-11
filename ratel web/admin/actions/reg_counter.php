<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT sum(amount) as sumall FROM `reg_payment` where date(`timestamp`)=curdate() and `status`='success'");
$row = mysqli_fetch_assoc($result); 
echo "<font color='darkgreen'>&#x20A6;".number_format($row['sumall'],2)."</font>";
?>

