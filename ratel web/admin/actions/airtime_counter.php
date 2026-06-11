<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT sum(amount_r) as sumall FROM `opay_payment` WHERE date(`timestamp`)=curdate()and `status`=1 and `switch_status`='balance added successfully'");
$rows = mysqli_fetch_assoc($result); 
echo "<font color='darkgreen'>&#x20A6;".number_format($rows['sumall'],2)."</font>";
?>

