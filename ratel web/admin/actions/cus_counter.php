<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT * FROM `switch_data`");
$num_rows = mysqli_num_rows($result);
echo "<font color='darkgreen'>#".number_format($num_rows)."</font>";
?>

