<?php require_once('../conn/config.php');
if(session_status()===PHP_SESSION_NONE){
session_start();
} 
$coyID = $_SESSION['coy'];
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);

$staffEmail=$row_staff_rec['email'];

$result = mysqli_query($config,"SELECT * FROM `registration` where `mail_status`=1 and (`staff`='$staffEmail') and date(`timestamp`)=curdate() and `rnAllocated`!='Not Assign'");
$num_rows = mysqli_num_rows($result);
echo "  <font color='darkgreen'>(".$num_rows.")</font>";
?>
