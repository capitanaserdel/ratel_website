<?php include 'includes/sub_header.php';
$coyID = $_SESSION['coy'];
if(!isset($_SESSION['admin'])and(!isset($_SESSION['ict']))and(!isset($_SESSION['care']))){
echo "<script>window.location='/';</script>";
}
else{ 
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);
$staff=$row_staff_rec['fullname'];
$staffEmail=$row_staff_rec['email'];
$staffP=$row_staff_rec['position'];
}?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="assets/bundles/izitoast/css/iziToast.min.css">
  <?php
  if(isset($_GET['rn'])and (!empty($_GET['rn']))){
    $rn=$_GET['rn'];
    $sqlrn=" and ratelnumber='$rn'";
  }
  else{
    $sqlrn='';
  }
  ?>
  <?php if(isset($_GET['staff'])and (!empty($_GET['from']))and(!empty($_GET['to']))){
    $query_trans=$_GET['rn'];
    $from=$_GET['from'];
  $to=$_GET['to'];
  $staff=$_GET['staff'];
  switch($staff){
    case 'all':
    $sql2="and staff like'%@%'";
    break;
    default;
    $sql2="and staff='$staff'";
  }
  $sql="where (date(`timestamp`) between '$from' and '$to') and `status`=1 and amount_r>0 ".$sql2.$sqlrn;

 }else{
  $sql="where date(`timestamp`)=curdate() and `status`=1 and amount_r>0";
    }


$result = mysqli_query($config,"SELECT sum(amount_r) as sll FROM `opay_payment` $sql and `channels`='Added by web API'");

$rows = mysqli_fetch_assoc($result); 
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
                    <h4>Balance top-up Report (<?php echo "<font color='darkgreen'>&#x20A6;".number_format($rows['sll'],2)."</font>";?>)</h4>

                  </div>
                  
                  <div class="card-body">
                    
                  <?php if(isset($_GET['staff'])and (!empty($_GET['staff']))){?>

                    <div class="table-responsive">
                    <table class="table table-striped" id="tableExport">

                        <thead>

                          <tr>

                      <th class="text-center">Reference</th>

                        <th>Ratel</th>

                        <th>Payment User</th>
 

                        <th>Amount</th>
                        <th>close Balance</th>
                         <th>New Balance</th>
                        <th>Switch</th>
                        <th>Memo</th>

                        <th>Time</th>

                       

                      </tr>

                        </thead>

                        <tbody>

                          <?php require_once("../conn/config.php");

if(isset($_GET['staff'])and (!empty($_GET['staff']))){
$query = mysqli_query($config,"SELECT * FROM `opay_payment` $sql order by `id` desc");
}

while (($data = mysqli_fetch_assoc($query))){

    ?>
<tr>
 <td><?php echo $data['reference']; ?></td>

      <td><?php echo $data['ratelnumber']; ?></td>

      <td><div class="badge badge-dark badge-shadow"><?php echo $data['staff']; ?></div></td>
 

      

      <td><div class="badge badge-success badge-shadow"><?php echo number_format($data['amount_r'],2); ?></div></td>
<td><div class="badge badge-info badge-shadow"><?php echo number_format($data['close_balance'],2); ?></div></td>
<td><div class="badge badge-success badge-shadow"><?php echo number_format($data['close_balance']+$data['amount_r'],2); ?></div></td>
      <td><div class="badge badge-info badge-shadow"><?php echo $data['switch_status']; ?></div></td>
          <td><div class="badge badge-info badge-shadow"><?php echo $data['bank_teller']; ?></div></td>
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
   <script src="assets/bundles/sweetalert/sweetalert.min.js"></script>
  <!-- Page Specific JS File -->
  <script src="assets/js/page/sweetalert.js"></script>
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
</body>
</html>