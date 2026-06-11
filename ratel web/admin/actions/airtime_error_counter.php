<?php require_once('../conn/config.php');
$result = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE  opay_status='SUCCESS' and (`switch_status` is Null OR `switch_status`='customer not found')  and `amount_r`>0 and (date(`timestamp`)=curdate())");
$rows2 = mysqli_num_rows($result);
if($rows2!=0){
	echo "<font color='red'>#". (number_format($rows2)) ."</font>";
}
else{
	echo "<font color='darkgreen'>No Error</font>";
} 

?>

