<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
<?php

// Handle status messages

if (!empty($_GET['status'])) {

    switch ($_GET['status']) {

        case 'succ':

            $statusType = 'alert-success';

            $statusMsg = 'Data imported successfully.';

            break;

        case 'err':

            $statusType = 'alert-danger';

            $statusMsg = 'An error occurred. Please try again.';

            break;

        case 'invalid_file':

            $statusType = 'alert-danger';

            $statusMsg = 'Please upload a valid CSV file.';

            break;

        default:

            $statusType = '';

            $statusMsg = '';

    }

}

?>
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
                    <h4>Add Ratel Number (CSV format only!)</h4>
                  </div>
                  <div class="card-body">
                    <div style="float:right;">
                      <a href="javascript:void(0);" class="btn btn-success" onclick="formToggle('importFrm');"><i class="plus"></i> Import</a>
                    </div>
                    <div class="empty-state" data-height="400">
                       <?php if (!empty($statusMsg)) { ?>

    <div class="col-xs-12">

        <div class="alert <?= $statusType ?>"><?= $statusMsg ?></div>

    </div>

<?php } ?>
                       <div class="col-md-12" id="importFrm" style="display: none;">

        <form action="inportcsv.php" method="post" enctype="multipart/form-data">

            <input type="file" name="file" />

            <input type="submit" class="btn btn-primary" name="importSubmit" value="IMPORT">

        </form>

    </div>
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
  <script>

function formToggle(ID){

    var element = document.getElementById(ID);

    if(element.style.display === "none"){

        element.style.display = "block";

    }else{

        element.style.display = "none";

    }

}
var a='<?php echo $statusMsg ?>';

if(a!=''){
setTimeout(function () {
                  window.location = 'addnumberscsv.php';
                          }, 5000);
}
 
</script>
</body>
</html>