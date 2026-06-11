<?php
include '../conn/config.php';
  if (isset($_POST['formData'])) {
  	$fname = mysqli_real_escape_string($config, $_POST['fname']);
  	$lname = mysqli_real_escape_string($config, $_POST['lname']);
  	$fullname=$fname.' '.$lname;
  	$email = mysqli_real_escape_string($config, $_POST['email']);
  	$priv = mysqli_real_escape_string($config, $_POST['priv']);
  	$posi = mysqli_real_escape_string($config, $_POST['posi']);
   $passwd = mysqli_real_escape_string($config, $_POST['passwd']);
	 $password=password_hash($passwd, PASSWORD_BCRYPT);
	////////////////////////////////////////
	if (!empty($passwd) && !empty($email)) {
		$query_ch = mysqli_query($config, "SELECT * FROM `admin_user` WHERE `email`='$email'")or die (mysqli_error($config));;
      $result = mysqli_num_rows($query_ch);
	  if($result == 0){

$query = mysqli_query($config, "INSERT INTO `admin_user`(`fullname`,`email`,`priv`,`position`,`password`,`profPic`)VALUES('$fullname','$email','$priv','$posi','$password','admin.jpg')")or die (mysqli_error($config));

	   if ($query) {
	   	 //require 'mail.php';
          echo    "Successfully!";
        } else {
           
      echo    "<font color='red'>Error Creating Account!</font>";
    }
       
	}
	else{
		echo    "<font color='red'>Error! User already Exist</font>";
	}
	}		
  }
  
?>