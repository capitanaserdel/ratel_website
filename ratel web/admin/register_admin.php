<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="assets/bundles/izitoast/css/iziToast.min.css">
<body>
  <?php include 'includes/nav_menu.php'; ?>
     <?php include 'includes/main_menu.php'; ?>
  <div class="loader"></div>
  <div id="app">
 <div class="main-content">
 <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="card card-primary">
              <div class="card-header">
                <h4>Register</h4>
              </div>
              <div class="card-body">
              <form class="composeForm" id="formData" action="#" method="post">
                  <div class="row">
                    <div class="form-group col-6">
                      <label for="frist_name">First Name</label>
                      <input id="fname" type="text" class="form-control" name="frist_name" autofocus required>
                    </div>
                    <div class="form-group col-6">
                      <label for="last_name">Last Name</label>
                      <input id="lname" type="text" class="form-control" name="last_name" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="email" required>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label for="password" class="d-block">Privilege</label>
                     <select class="form-control" id="priv" required>
                      <option value="" selected>::SELECT::</option>
                       <option value="1">Admin</option>
                       <option value="2">ICT</option>
                       <option value="3">Customer Care</option>
                     </select>
                    </div>
                    <div class="form-group col-6">
                      <label for="password2" class="d-block">Position</label>
                      <input id="posi" type="text" class="form-control" name="position" required>
                    </div>
                  </div>
                   <div class="row">
                    <div class="form-group col-12">
                      <label for="password" class="d-block">Password</label>
                      <input id="passwd" type="password" class="form-control pwstrength" data-indicator="pwindicator"
                        name="password" required>
                      
                    </div>
                    
                  </div>
                 
                  <div class="form-group">
                    <button type="submit" id="btn" class="btn btn-primary btn-lg btn-block">
                      Register
                    </button>
                  </div>
                 </form>
                
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>

        
      <?php include 'includes/footer.php'; ?>
    </div>
  </div>
  <!-- General JS Scripts -->
  <script src="assets/js/app.min.js"></script>
  <!-- JS Libraies -->
  <script src="assets/bundles/datatables/datatables.min.js"></script>
  <script src="assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js"></script>
  <script src="assets/bundles/jquery-ui/jquery-ui.min.js"></script>
  <!-- Page Specific JS File -->
  <script src="assets/js/page/datatables.js"></script>
  <!-- Template JS File -->
  <script src="assets/js/scripts.js"></script>
  <!-- Custom JS File -->
  <script src="assets/js/custom.js"></script>
  <script src="assets/js/page/toastr.js"></script>
<script src="assets/bundles/izitoast/js/iziToast.min.js"></script>

  <script type="text/javascript">
    $(document).ready(function(){
      $("#formData").submit(function(event){
        event.preventDefault();
        //var formData = new FormData(this);
        var fname = $('#fname').val();
        var lname = $('#lname').val();
         var email = $('#email').val();
        var priv = $('#priv').val();
        var posi = $('#posi').val();
        var passwd = $('#passwd').val();
       $.ajax({
            url: "actions/register.php",
            method: "post",
            data: {formData:1,fname:fname,lname:lname,email:email,priv:priv,posi:posi,passwd:passwd},
            beforeSend: function(){
              //$('#submit').prop("disabled",true);
                //$('#loadme').html('<center>Please Wait...<br><img src="../assets/img/loading.gif"/></center>');
                $('#btn').prop('disabled', true);
            },
            success: function(data){
                iziToast.success({
               title: email,
               message: data,
               position: 'topRight'
             });
                setTimeout(function(){
                  window.location.href = 'register_admin.php';
                },5000);

           }
          })
       });
  });
  </script>
</body>
</html>