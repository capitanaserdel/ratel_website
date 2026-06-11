<?php
session_start();
include '../conn/config.php';
ob_start();
  if (isset($_POST['resetme'])) {
    $email = mysqli_real_escape_string($config, $_POST['email']);
     if (!empty($email) && !empty($email)) {
      $query = mysqli_query($config, "SELECT * FROM `admin_user` WHERE `email`='$email'");
      $result = mysqli_num_rows($query);
         if ($result > 0) { 
        $row = mysqli_fetch_array($query);
        $usermail = $row['email']; 
        $fname = $row['fullname'];
        $TenDigitRandomNumber = rand(1000000000,9999999999);
$sql="UPDATE `admin_user` SET `passreset`='$TenDigitRandomNumber' WHERE `email`='$usermail'";
$query_upd=mysqli_query($config,$sql)or die (mysqli_error($config));
        require 'smtp-mail.php';
 
         
          echo    "<div class='alert alert-success text-center' role='alert' style='margin-bottom: 0px;'>
                   
                  <strong>A Password has been sent to your Email Address!<br>($usermail)</strong>
                </div>";
          
      } else {
        echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>This email $email does not Exist in our Server!</strong>
                </div>";
      }
      }
  }
?>