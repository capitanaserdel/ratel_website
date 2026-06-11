<?php
if(session_status()===PHP_SESSION_NONE){
session_start();
} 
$coyID = $_SESSION['coy'];
$usergroup=$_SESSION['usergroup'];
require_once("../conn/config.php");
if(isset($coyID)){
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);
$staff=$row_staff_rec['email'];
$result = mysqli_query($config,"SELECT * FROM `registration` where `mail_status`=0 and prev=1 and isPaid=1 and (`staff`='$staff' or `staff` is null)");
$num_rows = mysqli_num_rows($result);
echo $num_rows;
}
?>
