<?php
//session_start();
include '../conn/config.php';
ob_start();
if (isset($_POST['formData'])) {
$reference = str_pad(mt_rand(1,99999999),8,'0',STR_PAD_LEFT);
$mobile=$_POST['mobile'];
$rnumber=mysqli_real_escape_string($config,$_POST['rnumber']);
$email=mysqli_real_escape_string($config,$_POST['email']);
$nin=mysqli_real_escape_string($config,$_POST['nin']);

$query_ch = mysqli_query($config, "SELECT * FROM `account_delete` WHERE `rnumber`='$rnumber' or `mobile`='$mobile'")or die (mysqli_error($config));;
      $result = mysqli_num_rows($query_ch);
	  if($result == 0){

    $query = mysqli_query($config, "INSERT INTO `account_delete`(mobile,rnumber,reference,email,nin)VALUES('$mobile','$rnumber','$reference','$email','$nin')")or die (mysqli_error($config));
       if ($query) {
        echo "Success, One of our agents will call you back within 48 working hours to verify your request.";
        echo    "<script>setTimeout(function() {
      window.location='/';
    }, 3000);
        </script>";
    }
}else{
	echo "Your request already in progress.";
	echo    "<script>setTimeout(function() {
      window.location='/';
    }, 3000);
        </script>";
}
}
?>
<script src="plugins/jquery/jquery.post.js"></script>

