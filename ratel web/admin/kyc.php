<?php
include 'includes/sub_header.php';
?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  </script>
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
                    <h4>KYC -- Registration Data</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="tableExport">
                        <thead>
                          <tr>
                            <th class="text-center">
                              #
                            </th>
                            <th>Ratel number</th>
                            <th>Customer Name</th>
                            <th>NIN number</th>
                            <th>Activation date</th>
                            <th>Phone number</th>
                            <th>Email address</th>
                             <th>Remark</th>
                            <th>Home address</th>
                            <th>Means of ID (I)</th>
                            <th>Means of ID (II)</th>
                             
                          </tr>
                        </thead>
                        <tbody>
                          <?php require_once("../conn/config.php");
$query = mysqli_query($config,"SELECT * FROM `registration` where `isPaid`='1' order by `id` desc");
$j=0;
while (($data = mysqli_fetch_assoc($query))){
  $j++;
  ?>
  <tr>
      <td><?php echo $j; ?></td>
      <td><?php echo $data['rnAllocated']; ?></td>
      <td><?php echo $data['fname']." ".$data['sname']; ?></td>
       <td><?php echo $data['nin']; ?></td>
      <td class="align-middle"><?php echo $data['timestamp']; ?></td>
      <td><?php echo $data['mobile']; ?></td>
      <td style="width: 100px;word-break:break-all;white-space: normal;"><?php echo $data['email']; ?></td>
       <td style="width: 100px;word-break:break-all;white-space: normal;"><?php echo $data['staff']; ?></td>
      <td style="width: 30px;word-break:break-all;white-space: normal;"><?php echo $data['addr']; ?></td>
      <td style="width: 30px;word-break:break-all;white-space: normal;"><a href="<?php echo "https://ratelplus.net/uploads/".$data['pics1']; ?>" target="blank_"><?php echo "https://ratelplus.net/uploads/".$data['pics1']; ?></a></td>
      <td style="width: 30px;word-break:break-all;white-space: normal;"><a href="<?php echo "https://ratelplus.net/uploads/".$data['pics2']; ?>" target="blank_"><?php echo "https://ratelplus.net/uploads/".$data['pics2']; ?></a></td>


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