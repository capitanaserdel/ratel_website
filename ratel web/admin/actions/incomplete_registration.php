<?php 
if(session_status()===PHP_SESSION_NONE){
session_start();
} 
$coyID = $_SESSION['coy'];
$usergroup=$_SESSION['usergroup'];
require_once("../conn/config.php");
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);
$staff=$row_staff_rec['email'];
$priv=$row_staff_rec['priv'];
if($priv==1 or $priv==2){
$result = mysqli_query($config,"SELECT * FROM `reg_payment` WHERE `channels` like '%@%' and amount=0  is not null and date(`timestamp`)=curdate()");
}else{
	$result = mysqli_query($config,"SELECT * FROM `reg_payment` WHERE `channels` like '%@%' and amount=0  is not null and date(`timestamp`)=curdate() and (`channels`='$staff' or `channels` is null)");
}
$rows2 = mysqli_num_rows($result);
if($rows2!=0){
	echo "<font color='white'>#". (number_format($rows2)) ."</font>";
}
else{
	echo "<font color='darkgreen'>No Record</font>";
} 

?>

 