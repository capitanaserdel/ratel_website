<?php require_once('../conn/config.php');
$resultd = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `recharger_count`>1 and date(`timestamp`)=curdate() and `status`=1 and `switch_status`='balance added successfully'");
$rowsd = mysqli_num_rows($resultd); 
echo "<font color='white'># ".$rowsd;
?>

