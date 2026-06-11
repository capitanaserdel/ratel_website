<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <?php if(isset($_POST['reference'])and (!empty($_POST['reference']))){
    $reference=$_POST['reference'];
  ?>
  <script type="text/javascript">
    $(document).ready(function(){
      //$("#formData").submit(function(e){
      var reference="<?php echo $reference; ?>";
     $.ajax({//Airtime_payment_Data
        url: "actions/trans_table_opay.php",
        method: "post",
        data: {displayAmount:14,reference:reference},
         
         success: function(data){
          $("#response").html(data);
           
        }
      }) 
   });
 // });
   
  </script>
<?php }?>
<body>
  <div class="loader"></div>
  <div id="app">
    <div class="main-wrapper main-wrapper-1">
      <div class="navbar-bg"></div>
      <?php include 'includes/nav_menu.php'; ?>
     <?php include 'includes/main_menu.php'; ?>
      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-body">
            <div class="row">
               <div class="col-12 col-md-12 col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Transaction</h4>
                  </div>
                  <div class="card-body">
                    <p class="lead"><span id="response"></span>
                    <div class="empty-state" data-height="400">
                      
                       <img src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="15%">
                       
                      <h2>Reference No:</h2>
                      <form action="#" method="post" id="formData">
                      <input type="text" class="form-control" name="reference"><br>
                      <button class="btn btn-primary mr-1" type="submit">Check</button>
                       
                      </form>
                      <br>
                         
                      </p>
                    </div>
                  </div>
                </div>
              </div>
             
          </div>
        </section>
        
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
</body>
</html>