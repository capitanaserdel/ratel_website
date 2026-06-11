<?php
include '../conn/config.php';
  if (isset($_POST['confirmR'])) {
   $passwd = mysqli_real_escape_string($config, $_POST['password']);
	$action = mysqli_real_escape_string($config, $_POST['action']);
	$password=password_hash($passwd, PASSWORD_BCRYPT);
	////////////////////////////////////////
	if (!empty($passwd) && !empty($action)) {
		$query_ch = mysqli_query($config, "SELECT * FROM `admin_user` WHERE passreset='$action'")or die (mysqli_error($config));;
      $result = mysqli_num_rows($query_ch);
	  if($result > 0){    
      $sql="UPDATE `admin_user` SET `password`='$password',`passreset`='reseted' WHERE passreset='$action'";
$query_upd=mysqli_query($config,$sql)or die (mysqli_error($config));
	   if ($query_upd) {
	   	 //require 'mail.php';
          echo    "<div class='alert alert-success text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Your New Password has been reset successfully!</strong>
                </div>";
				echo    "<script>setTimeout(function(){window.location='/';},4200);</script>";
        } else {
           
      echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Error reseting password!</strong>
                </div>";
    }
       
	}
	else{
		echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Error please try again!.</strong>
                </div>";
	}
	}		
  }
  
?>