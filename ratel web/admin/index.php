<?php
session_start();
if(isset($_SESSION['admin'])or(isset($_SESSION['ict']))or(isset($_SESSION['care']))){
header("location:dashboard.php");

}
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">

  <title>RatelPlus -- Admin Login</title>

  <!-- General CSS Files -->

  <link rel="stylesheet" href="assets/css/app.min.css">

  <link rel="stylesheet" href="assets/bundles/bootstrap-social/bootstrap-social.css">

  <!-- Template CSS -->

  <link rel="stylesheet" href="assets/css/style.css">

  <link rel="stylesheet" href="assets/css/components.css">

  <!-- Custom style CSS -->

  <link rel="stylesheet" href="assets/css/custom.css">

  <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

</head>



<body>

  <div class="loader"></div>

  <div id="app">

    <section class="section">

      <div class="container mt-5">

        <div class="row">

          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">

            <div class="card card-primary">

              <div class="card-header">

                <img src="https://ratelplus.net/admin/assets/img/logo.png" style="cursor:pointer;" onclick="window.location='/'">

              </div>

              <div class="card-body">

                <form method="POST" action="#" class="needs-validation" novalidate="">

                  <div class="form-group">

                    <label for="email">Email</label>

                    <input id="email" type="email" class="form-control" name="email" tabindex="1" required autofocus>

                    <div class="invalid-feedback">

                      Please fill in your email

                    </div>

                  </div>

                  <div class="form-group">

                    <div class="d-block">

                      <label for="password" class="control-label">Password</label>

                      <div class="float-right">

                        <a href="auth-forgot-password.php" class="text-small">

                          Forgot Password?

                        </a>

                      </div>

                    </div>

                    <input id="password" type="password" class="form-control" name="password" tabindex="2" required>

                    <div class="invalid-feedback">

                      please fill in your password

                    </div>

                  </div>

                  <div class="form-group">

                    <div class="custom-control custom-checkbox">

                      <input type="checkbox" name="remember" checked class="custom-control-input" tabindex="3" id="remember-me">

                      <label class="custom-control-label" for="remember-me">Remember Me</label>

                    </div>

                  </div>

                  <div class="form-group">

                    <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4" id="login">

                      Login

                    </button>



                  </div>

                  <span id="status"></span>

                </form>

                  

            </div>

             

          </div>

        </div>

      </div>

    </section>

  </div>

 <script src="assets/js/scripts.js"></script>

  <script type="text/javascript">

  $(document).ready(function(){

      $("#login").click(function(event){

        event.preventDefault();

        var email = $('#email').val();

        var password = $('#password').val();

      

        $.ajax({

            url: "actions/login.php",

            method: "post",

            data: {login:1, email:email, password:password},



            beforeSend: function(){

                $('#status').html('<center><img src="assets/img/loading.gif" /></center>');

            },

            success: function(data){

                $("#status").html(data);

            }



        })

      });

  });

</script>

  <!-- General JS Scripts -->

  <script src="assets/js/app.min.js"></script>

  <!-- JS Libraies -->

  <!-- Page Specific JS File -->

  <!-- Template JS File -->

  <script src="assets/js/scripts.js"></script>

  <!-- Custom JS File -->

  <script src="assets/js/custom.js"></script>

</body>
</html>