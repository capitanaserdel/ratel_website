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
                    <h4>Error Recharge Advance <i class="fas fa-times bg-danger text-white"></i></h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      
                      <table class="table table-striped" id="tableExport">
                        <thead>
                          <tr>
                            <th class="text-center">Bank Status</th>
                      <th>Reference</th>
                        <th>Ratel Number</th>
                        <th></th>
                        <th>Channel</th>
                        <th>Devices</th>
                        <th>Amount</th>
                        <th>Switch</th>
                        <th>Action</th>
                       
                      </tr>
                        </thead>
                        <tbody>
                          <?php
require_once("../conn/config.php");
 

$query = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `switch_status` is Null and (date(`timestamp`)=curdate()) order by `id` Asc");
  //$j=0;
while (($data = mysqli_fetch_assoc($query))){
  //$j++;
  switch ($data["channels"]) {
    case 'Opay':
      $img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="55">';
      $link="https://ratelplus.net/opay_status_whl.php";
      break;
    case 'Paystack':
    $img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';
    $link="https://ratelplus.net/ratelpay.php?reference=".$data['reference'];
    break;
    default:
      $img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="55">';
     $link="#";
      break;
  }
    
  $amount="&#8358; ".number_format($data["amount_r"]);
  $status="Error";
  $qr="$('#rv".$j."').prop('type', 'text')";
  $rnumber="rnumber".$j;
  ?>
                          <tr>
     <td><?php echo $data['opay_status']; ?></td>
      <td><?php echo $data['reference'];?></td>
      <td class="align-middle"><input type="hidden" name="rnumber" class="form-control" id="rv<?php echo $j;?>" value="<?php echo $data['ratelnumber'];?>"><?php echo $data['ratelnumber'];?></td>
      <td><span id="edt"><span onclick="<?php echo $qr;?>" style="color:darkblue; cursor:pointer;">Edit</span></span></td>
      <td><?php echo $img; ?></td>
      <td><?php echo $data['devices_os']; ?></td>
      <td><div class="badge badge-success badge-shadow"><?php echo $amount;?></div></td>
                            <td><div class="badge badge-success badge-danger"><?php echo $status;?></div></td>
<td><form action="<?php echo $link; ?>" method="get" target="print_popup" name="form<?php echo $data['reference'];?>"><input type="hidden" name="rnumber" value="" id="<?php echo $rnumber;?>"><input type="hidden" name="vpcode" value="<?php echo $data['reference'];?>"><input type="hidden" name="reference" value="<?php echo $data['reference'];?>"><button type="submit" class="btn btn-info" onmousemove="var rv=$('#rv<?php echo $j?>').val();$('#rnumber<?php echo $j?>').val(rv)">Retry</button></form></td>
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
  <script type="text/javascript">
  function myf(){
   
      var rv=$("#rv").val();
      if(rv!==""){
      $("#rnumber").val(rv);
      $("edt").hide();
    }
}
function myf1(){
 $("#rv").prop('type', 'text');
 $("#edt").hide();
 $("#cnl").show();
}
</script>
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