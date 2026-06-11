<?php include 'includes/sub_header.php';
if(isset($_GET['r'])){
  $sql="where date(`timestamp`)=curdate() and `status`='success' and amount=0 and channels like '%@%'";
}
//$sql2="WHERE date(`timestamp`)=curdate() and `status`='success' and amount=0 and channels like '%@%'";
elseif(isset($_GET['staff'])and(!empty($_GET['from']))and(!empty($_GET['to']))) {
  $from=$_GET['from'];
  $to=$_GET['to'];
  $staff=$_GET['staff'];
  switch($staff){
    case 'all':
    $sql2="and channels like'%@%'";
    break;
    default;
    $sql2="and channels='$staff'";
  }
  $sql="where (date(`timestamp`) between '$from' and '$to') and `status`='success' and amount=0 ".$sql2;

 }else{
  $sql="where date(`timestamp`)=curdate() and `status`='success' and amount>0";
 }
 $result = mysqli_query($config,"SELECT * FROM `reg_payment` $sql");
$rows = mysqli_num_rows($result);
$ttl=(1000)*($rows);
 
 ?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <script type="text/javascript">
    $.ajax({//Registration_payment_Amount
        url: "actions/reg_payment2.php<?php if(isset($_GET['r'])==true){echo '?r=true';}?>",
        method: "post",
        data: {displayAmount:9},
         
         success: function(data){
          $("#reg_payment2").html(data);
           
        }
      })
    // $.ajax({//Registration_payment
    //     url: "actions/reg_payment.php",
    //     method: "post",
    //     data: {displayAmount:12},
         
    //      success: function(data){
    //       $("#reg_payment").html(data);
           
    //     }
    //   }) 
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
                    <?php if(isset($_GET['staff'])){?>
                    <h4>Total <span ><?php echo "<font color='darkgreen'>&#x20A6;".number_format($ttl,2)."</font>";?></span></h4>
                  <?php }else{?>
                    <h4>Registration Real Time Payment -- <span id="reg_payment2"></span></h4>
                    <?php }?>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      
                      <table class="table table-striped" id="tableExport">
                        <thead>
                          <tr>
                            <th class="text-center">
                              #
                            </th>
                            <th>Reference</th>
                            <th>Allocated Number</th>
                            <th>Phone</th>
                            <th>Staff</th>
                            <th>Amount</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Timestamp</th>
                            <th>Details</th>
                         </tr>
                        </thead>
                        <tbody>
<?php require_once("../conn/config.php");
$query = mysqli_query($config,"SELECT * FROM `reg_payment` $sql order by `id` desc");
$j=0;
while (($data = mysqli_fetch_assoc($query))){
  $j++;
  $reference=$data['reference'];
  $link="href='registration_payment_details.php?r=$reference'";
  $channel=$data["channels"];
  $reference=$data["reference"];
  switch ($channel) {
    case 'Opay':
      $img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="75">';
      break;
    case 'Paystack':
    $img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';
    break;
    default:
      $img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="85">';
      break;
  }
  ?>
  <tr>
      <td><?php echo $j; ?></td>
      <td><?php echo $data['reference']; ?></td>
      <td class="align-middle"><div class="btn btn-outline-danger"><?php echo $data['rnAllocated']; ?></div></td>
      <td class="align-middle"><?php echo $data['phone']; ?></td>
     <td><?php echo $data['channels']; ?></td>
      <td><div class="badge badge-success badge-shadow"><?php echo $data['amount']; ?></div></td>
      <td><?php echo $data['source']; ?></td>
      <td><div class="badge badge-info badge-shadow"><?php echo $data['status']; ?></div></td>
      <td><?php echo $data['timestamp']; ?></td>
      <td><a class="btn btn-primary" href='registration_payment_details.php?r=<?php echo $data['reference']; ?>'>Detail</a></td>



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