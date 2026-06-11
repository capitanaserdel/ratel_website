<?php require_once('../conn/config.php');
include 'includes/sub_header.php';
$coyID = $_SESSION['coy'];
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";
$all_staff = mysqli_query($config,$query_all_staff);
$row_staff_rec = mysqli_fetch_assoc($all_staff);
$staffEmail=$row_staff_rec['email'];
if(isset($_GET['id'])and (isset($_GET['act']))) {
$id=$_GET['id'];
$act=$_GET['act'];
$result = mysqli_query($config,"UPDATE `admin_user` SET `status`=$act,`by_staff`='$staffEmail' where `id`=$id");

 if($result){

   header("location:admin_users.php");

 }else{

   echo mysqli_error($config);

 }

}

else{

   header("location:admin_users.php");

}

?>

