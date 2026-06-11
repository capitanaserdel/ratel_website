<?php include '../conn/config.php';?>
<?php
if (isset($_POST['formData'])) {
  $reference=$_POST['reference'];
  $phone=$_POST['mobile'];
  $staff=$_POST['staff'];
  $source=$_POST['source'];
	$email=$_POST['email'];
	$amount=$_POST['amount'];
  $phone=$_POST['mobile'];
}
else{
header("location:/");
}
 
$check = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `reg_payment` WHERE `reference`=$reference"));
 if ($check == 0) {
$query="INSERT INTO `reg_payment`(`reference`,`phone`,`channels`,`amount`,`source`,`email`,`status`,`time_cron`)VALUES('$reference','$phone','$staff','0','$source','$email','success','$time')";
if(mysqli_query($config,$query)){
    
$check_pics =mysqli_query($config,"SELECT * FROM `registration` WHERE `reference`=$reference");
$row_attach = mysqli_fetch_assoc($check_pics);
$pic1=$row_attach['pics1'];
$pic2=$row_attach['pics2'];
$pic3=$row_attach['pics3'];
$email=$row_attach['email'];
$fname=$row_attach['fname'];
$sname=$row_attach['sname'];
$gender=$row_attach['gender'];
$addr=$row_attach['addr'];
$RnLoc=$row_attach['loc'];
$nin=$row_attach['nin'];
$timestmp=$row_attach['timestamp'];
$dateof=$row_attach['date_of_inc'];
$compS=$row_attach['company_services'];
$rc=$row_attach['rc_number'];
$NumberOf=$row_attach['no_of_lline'];
$source2=$row_attach['source'];
//include 'smtp.php';
//header('location:../registration.php');
echo "<script>window.location='../registration.php'</script>";
}else{
  echo mysqli_error($config);
}
}
else{
 //header('location:../registration.php');
  echo "<script>window.location='../registration.php'</script>";
}
?>