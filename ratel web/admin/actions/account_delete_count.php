<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT * FROM `account_delete` where `action`=0");
$num_rows = mysqli_num_rows($result);
echo "<font color='darkgreen'>#".number_format($num_rows)."</font>";
?>

