<?php
session_start();
include '../conn/config.php';
ob_start();
  if (isset($_POST['login'])) {
    $email = mysqli_real_escape_string($config, $_POST['email']);
    $password = mysqli_real_escape_string($config, $_POST['password']);
    if (!empty($email) && !empty($password)) {
      $query = mysqli_query($config, "SELECT * FROM `admin_user` WHERE `email`='$email'");
      $result = mysqli_num_rows($query);  
      if ($result > 0) {
        $row = mysqli_fetch_array($query);
        $account_status = $row['status'];
        
        if ($account_status == 0) {
          echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Your account has been deactivated!</strong>
                </div>";
        } else {
          if (password_verify($password, $row['password'])){


            $priv=$row['priv'];
           $_SESSION['usergroup']=$priv;
            $_SESSION['coy'] = $row['id'];
      switch($priv){
        case 1:
        $_SESSION['admin']=$row['priv'];
        if(isset($_SESSION['admin']) and (!empty($_SESSION['admin']))){
        
  //  header("location:dashboard.php");
  echo'<script>location.href="/dashboard.php";</script>';
  
  }break;
  case 2:
        $_SESSION['ict']=$row['priv'];

        if(isset($_SESSION['ict']) and (!empty($_SESSION['ict']))){
          
  //header("Location:dashboard/admin/dashboard.php");
  echo'<script>location.href="/dashboard.php";</script>';
  
  }break;
  case 3:
        $_SESSION['care']=$row['priv'];

        if(isset($_SESSION['care']) and (!empty($_SESSION['care']))){
          
  //header("Location:dashboard/admin/dashboard.php");
  echo'<script>location.href="/dashboard.php";</script>';
}
  break;
  default;
 echo'<script>location.href="/";</script>';
  
  
  
        
      }
             
          } else {
            echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Invalid Password!</strong>
                </div>";
          }
        }
      } else {
        echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Invalid Email!</strong>
                </div>";
      }
    } else {
      echo    "<div class='alert alert-danger text-center' role='alert' style='margin-bottom: 0px;'>
                  <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                  <strong>Enter Login Details!</strong>
                </div>";
    }
  }
?>