<?php require_once('../conn/config.php');
if(isset($_GET['r'])==true){
	$result = mysqli_query($config,"SELECT * FROM `reg_payment` where date(`timestamp`)=curdate() and channels like '%@%'");
$num_rows = mysqli_num_rows($result);
echo "<font color='darkgreen'>&#x20A6;".number_format(1000*($num_rows))."</font>";


 }
 else{
 
  $result = mysqli_query($config,"SELECT sum(amount) as sumall FROM `reg_payment` WHERE date(`timestamp`)=curdate() and `status`='success' and amount>0");
$rows = mysqli_fetch_assoc($result); 
echo "<font color='darkgreen'>&#x20A6;".number_format($rows['sumall'])."</font>";
 }

?>