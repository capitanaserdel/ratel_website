<?php
 include 'conn/config.php';
if(isset($_GET['action'])and(!empty($_GET['action']))){
$action=$_GET['action'];
$query = mysqli_query($config, "SELECT * FROM `admin_user` WHERE `passreset`='$action'");
     $result = mysqli_num_rows($query);

    if (!$result > 0) {
      echo "Invalid Token";
      die();
     }
     $raw=mysqli_fetch_assoc($query); 

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
                <p class="text-muted">Enter Your New Password</p>
                <form method="POST"  action="#">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="email" tabindex="1" value="<?php echo $raw['email']; ?>" readonly>
                  </div>
                  <div class="form-group">
                    <label for="password">New Password</label>
                    <input id="password" type="password" class="form-control pwstrength" autofocus data-indicator="pwindicator"
                      name="password" tabindex="2" required>
                    <div id="pwindicator" class="pwindicator">
                      <div class="bar"></div>
                      <div class="label"></div>
                    </div>
                  </div>
                   
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4" id="confirmR">
                      Reset Password
                    </button>
                  </div>
                  <span id="status"></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <script type="text/javascript">
  $(document).ready(function(){
      $("#confirmR").click(function(event){
        event.preventDefault();
        var action = '<?php echo $action; ?>';
        var password = $('#password').val();            
        $.ajax({
            url: "actions/reset-pass.php",
            method: "post",
            data: {confirmR:1, password:password,action:action},

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


<!-- auth-reset-password.html  21 Nov 2019 04:05:02 GMT -->
</html>