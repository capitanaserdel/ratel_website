<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>

<html lang="en">

<?php include 'includes/header.php';?>

 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">

  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <script type="text/javascript">
     var updateInterval = 2000;
    setInterval(updatePlayerCount, updateInterval);
     function updatePlayerCount() {
    $.ajax({//Airtime Payment
        url: "actions/cronjob_topup.php",
        method: "post",
        data: {displayAmount:4},
         
         success: function(data){
          $("#cron").html(data);
        }
      })
  }
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

                    <h4>Cronjob Recod -- <span id="cron"></span></h4>

                  </div>

                  <div class="card-body">

                    <div class="table-responsive">

                     
 
                      <table class="table table-striped" id="tableExport">

                        <thead>

                          <tr>

                      <th>Reference</th>

                        <th>Ratel</th>

                        <th>Phone No</th>

                        <th>Recharge Count</th>
                        <th>Cron Status</th>

                        <th>Channel</th>

                        <th>Amount</th>

                        <th>Switch</th>

                        <th>Time</th>

                       

                      </tr>

                        </thead>

                        <tbody>

                          <?php require_once("../conn/config.php");

$query = mysqli_query($config,"SELECT * FROM `opay_payment` where `switch_status`='balance added successfully' and status='1'and opay_status='success' and date(`timestamp`)=curdate() and `cron_status`='Done' order by `id`");

  

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

      

      <td><div class="badge badge-success badge-shadow"><?php echo $data['reference']; ?></div></td>

      <td><?php echo $data['ratelnumber']; ?></td>

      <td><?php echo $data['cus_number']; ?></td>

      <td><div class="badge badge-danger badge-shadow"><?php echo $data['recharger_count']; ?></div></td>
      <td><div class="badge badge-success badge-shadow"><?php echo $data['cron_status']; ?></div></td>

      <td><?php echo $img; ?></td>

      <td><?php echo number_format($data['amount_r'],2); ?></td>

      <td><div class="badge badge-info badge-shadow"><?php echo $data['switch_status']; ?></div></td>

      <td><?php echo $data['timestamp']; ?></td>

                            

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