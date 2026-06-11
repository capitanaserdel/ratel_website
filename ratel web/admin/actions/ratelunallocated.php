<?php require_once('../conn/config.php');
$result_un = mysqli_query($config,"SELECT * FROM `unallocated_Rno` WHERE `status`='INITIAL'");
$num_rows_un = mysqli_num_rows($result_un);
echo "<font color='white'>#".number_format($num_rows_un)."</font>";
?>

