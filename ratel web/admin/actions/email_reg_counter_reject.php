<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT * FROM `registration` where `mail_status`=2");
$num_rows = mysqli_num_rows($result);
echo "  <font color='darkgreen'>(".$num_rows.")</font>";
?>
