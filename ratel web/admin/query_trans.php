<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <?php if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){
    $query_trans=$_GET['r_r'];
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
                    <h4>Transaction History</h4>
                  </div>
                  
                  <div class="card-body">
                    <?php if(!isset($_GET['r_r'])and (empty($_GET['r_r']))){?>
                      <div class="empty-state" data-height="400">
                      
                       <h2>Ratel No. or Reference</h2>
                      <form  method="get" id="formData">
                      <input type="number" class="form-control" name="r_r"><br>
                      <button class="btn btn-primary mr-1" type="submit">Check</button>
                       
                      </form>
                    </div>
                     <?php }?>
                        
                    
                    <?php if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){?>
                    <div class="table-responsive">
                     
                      <table class="table table-striped" id="tableExport">

                        <thead>

                          <tr>

                      <th class="text-center">Reference</th>

                        <th>Ratel</th>

                        <th>Bank Status</th>

                        <th>Recharge Count</th>

                        <th>Channel</th>

                        <th>Amount</th>

                        <th>Switch</th>

                        <th>Time</th>

                       

                      </tr>

                        </thead>

                        <tbody>

                          <?php require_once("../conn/config.php");

if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){
$query = mysqli_query($config,"SELECT * FROM `opay_payment` where `reference`='$query_trans' or `ratelnumber`='$query_trans' and `amount_r`>0 order by id desc");
}

while (($data = mysqli_fetch_assoc($query))){

  switch ($data["channels"]) {

    case 'Opay':

      $img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="55">';

      break;

    case 'Paystack':

    $img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';

    break;

    default:

      $img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="55">';

      break;

  }

  ?>

                          <tr>

      

      <td><?php echo $data['reference']; ?></td>

      <td><?php echo $data['ratelnumber']; ?></td>

      <td><?php echo $data['opay_status']; ?></td>

      <td><?php echo $data['recharger_count']; ?></td>

      <td><?php echo $img; ?></td>

      <td><?php echo number_format($data['amount_r'],2); ?></td>

      <td><div class="badge badge-info badge-shadow"><?php echo $data['switch_status']; ?></div></td>

      <td><?php echo $data['timestamp']; ?></td>

                            

                           </tr>

                          <?php }?>

                        </tbody>

                      </table>
                  </div>
                  <?php }?>
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