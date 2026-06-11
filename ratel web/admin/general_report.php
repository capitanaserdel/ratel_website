<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
   <link rel="stylesheet" href="assets/bundles/bootstrap-daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <?php if(isset($_POST['cbalance'])and (!empty($_POST['cbalance']))){
    $account=$_POST['cbalance'];
  ?>
  <script type="text/javascript">
    $(document).ready(function(){
      //$("#formData").submit(function(e){
      var account="<?php echo $account; ?>";
     $.ajax({//Airtime_payment_Data
        url: "actions/balance_table.php",
        method: "post",
        data: {displayAmount:13,account:account},
         
         success: function(data){
          $("#balance").html(data);
           
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
             
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Generate Report</h4>
                  </div>
                  <div class="card-body">
                   <div class="form-group row mb-4">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">REPORT</label>
                      <div class="col-sm-12 col-md-7">
                        
                        <select class="form-control" required id="report">
                          <option selected value="">Choose...</option>
                          <option value="1">Manual Registration</option>
                          <option value="2" onclick="javascript:alert('ok');">Balance Topup</option>
                          <option value="3">Ratel Number Allocation</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row mb-4"  id="rnumber">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Ratel Number(Optional)</label>
                      <div class="col-sm-12 col-md-7">
                        <input type="number" class="form-control" id="rn">
                      </div>
                    </div>
                    <div class="form-group row mb-4">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">STAFF</label>
                      <div class="col-sm-12 col-md-7">
                        <select class="form-control selectric" id="staff">
                          <option selected value="">Select Staff...</option>
                          <option value="all">All Staff...</option>
                          <?php $rowall ="SELECT * FROM `admin_user` WHERE `status`=1";
              $query=mysqli_query($config,$rowall);

             while (($data = mysqli_fetch_assoc($query))){
            ?>
            <option value="<?php echo $data['email']; ?>" readonly><?php echo $data['email']; ?></option>
          <?php }?>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row mb-4">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">FROM</label>
                      <div class="col-sm-12 col-md-7">
                        <input type="text" class="form-control datepicker" id="from">
                      </div>
                    </div>
                    <div class="form-group row mb-4">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">TO</label>
                      <div class="col-sm-12 col-md-7">
                        <input type="text" class="form-control datepicker" id="to">
                      </div>
                    </div>
                    <div class="form-group row mb-4">
                      <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                      <div class="col-sm-12 col-md-7">
                        <button class="btn btn-primary" onclick="checkme()">Generate</button>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            
             
          </div>
        </section>
        
      <?php include 'includes/footer.php'; ?>
    </div>
  </div>
  <script>
    $('#rnumber').hide();
    $('#report').change(function() {
    if ($(this).val() === '2') {
        //alert('here');
      $('#rnumber').show(100);
    }
    else{
      $('#rnumber').hide();
    }
});
    function checkme(){
      var report=$('#report').val();
      var staff=$('#staff').val();
      var from=$('#from').val();
      var to=$('#to').val();
      var rnum=$('#rn').val();

       if((report=='')||(staff=='')||(from=='')||(to=='')) {
        alert("Please make Selection");
       }
       else{
        switch(report){
        case '1':
          location.href = 'registration_payment.php?staff='+staff+'&from='+from+'&to='+to;
          break;
        case '2':
          location.href = 'balance_report.php?staff='+staff+'&from='+from+'&to='+to+'&rn='+rnum;
        }
       }
        
}
   
  </script>

  <!-- General JS Scripts -->
  <script src="assets/js/app.min.js"></script>
  <!-- JS Libraies -->
  <script src="assets/bundles/bootstrap-daterangepicker/daterangepicker.js"></script>

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