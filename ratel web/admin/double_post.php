<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
   
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
                    <h4>Double Posting Airtime</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th class="text-center">
                              #
                            </th>
                            <th>Reference</th>
                             <th>RatelNumber</th>
                            <th>Channel</th>
                            <th>Amount</th>
                            <th>Phone</th>
                            <th>Recharge Count</th>
                            <th>Switch Status</th>
                            <th>Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                          <?php require_once("../conn/config.php");
$query = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `recharger_count`>1 and date(`timestamp`)=curdate() and `status`=1 and `switch_status`='balance added successfully'order by `id` desc");
$j=0;
while (($data3 = mysqli_fetch_assoc($query))){
  $j++;
  $reference=$data3['reference'];
  $rnumber=$data3["ratelnumber"];
  $channel=$data3["channels"];
  $amount=$data3["amount_r"];
  $cus_no=$data3["cus_number"];
  $rcount=$data3["recharger_count"];
  $switch=$data3["switch_status"];
  $Time=$data3["timestamp"];
   
  ?>
  <tr>
      <td><?php echo $j; ?></td>
      <td><?php echo $reference; ?></td>
      <td class="align-middle"><?php echo $rnumber; ?></td>
      <td><?php echo $channel; ?></td>
      <td><?php echo $amount; ?></td>
      <td><?php echo $cus_no; ?></td>
      <td><?php echo $rcount; ?></td>
      <td><?php echo $switch; ?></td>
      <td><?php echo $Time; ?></td>



</tr>
<?php }?>
                          
                        </tbody>
                      </table>
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


<!-- datatables.html  21 Nov 2019 03:55:25 GMT -->
</html>