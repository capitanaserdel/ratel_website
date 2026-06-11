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
  <?php if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){
    $query_trans=$_GET['r_r'];
 ?>
 <script type="text/javascript">
    $(document).ready(function(){
      //$("#formData").submit(function(e){
      var account="<?php echo $query_trans;?>";
     $.ajax({//Airtime_payment_Data
        url: "actions/balance_table.php",
        method: "post",
        data: {displayAmount:13,account:account},
         
         success: function(data){
          $("#balance").html(data);
          //var closeb=2;
           
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
                    <h4>Balance top-up</h4>

                  </div>
                  
                  <div class="card-body">
                    <?php if(!isset($_GET['r_r'])and (empty($_GET['r_r']))){?>
                      <div class="empty-state" data-height="400">
                      
                       <h2>Ratel Number</h2>
                      <form  method="get" id="formData">
                      <input type="number" min="0"class="form-control" name="r_r"><br>
                      <button class="btn btn-primary mr-1" type="submit">Search</button>
                       
                      </form>
                    </div>
                     <?php }?>
                        
                    
                    <?php if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){?>
                      <div class="buttons date pull-right"><span  id="balance" style="color:darkred" title="Available Balance">Balance</span> <a href="#" id="addb" class="btn btn-icon btn-primary btn-sm" title="Add balance"><i class="far fa-edit"></i><div id="loadme"></div></a></div>

                    <div class="table-responsive">
                    <table class="table table-striped" id="tableExport">

                        <thead>

                          <tr>

                      <th class="text-center">Reference</th>

                        <th>Ratel</th>

                        <th>Payment User</th>
                      <th>Bank</th>

                        <th>Amount</th>
                        <th>closing Balance</th>
                        <th>New Balance</th>
                        <th>Switch</th>

                        <th>Time</th>

                       

                      </tr>

                        </thead>

                        <tbody>

                          <?php require_once("../conn/config.php");

if(isset($_GET['r_r'])and (!empty($_GET['r_r']))){
$query = mysqli_query($config,"SELECT * FROM `opay_payment` where `ratelnumber`='$query_trans' and `amount_r`>0 and `close_balance`!='' and `staff`='$staffEmail' order by `id` desc");
}

while (($data = mysqli_fetch_assoc($query))){

    ?>
<tr>
 <td><?php echo $data['reference']; ?></td>

      <td><?php echo $data['ratelnumber']; ?></td>

      <td><div class="badge badge-dark badge-shadow"><?php echo $data['staff']; ?></div></td>
 
<td><?php echo $data['bank_teller']; ?></td>
<td><div class="badge badge-success badge-shadow"><?php if(isset($data['amount_r'])and (!empty($data['amount_r']))){?><?php echo number_format($data['amount_r'],2); ?><?php }?></div></td>
<td><div class="badge badge-info badge-shadow"><?php if(isset($data['close_balance'])and (!empty($data['close_balance']))){?><?php echo $data['close_balance']; ?><?php }?></div></td>
<td><div class="badge badge-success badge-shadow"><?php if(isset($data['close_balance'])and (!empty($data['close_balance']))){?><?php echo $data['close_balance']+$data['amount_r']; ?><?php }?></div></td>
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
  <script>
   $("#addb").click(function () {
    var account="<?php echo $query_trans;?>";
    var staff="<?php echo $staffEmail;?>";
  swal({
    title: 'Note: Maximum of \u20A620,000 is allow',
   icon: 'info',
    content: {
      element: 'input',
      attributes: {
        placeholder: 'Amount to add',
        type: 'number',
        min:1,
        max:20000,
        
      },
    },
  }).then((data1) => {
    if(data1>0){
var addsub="added to";
/////Charge back will not work
    }
    else{
      var addsub="added to";
    }
   swal('\u20A6'+data1 +'\n'+ 'Will be '+addsub+'\n'+ account,{
    title: 'Bank Name',
    icon: 'warning',
    content: {
      element: 'input',
      attributes: {
        placeholder: 'Bank / Teller',
        type: 'text',
        
      },
    },
  }).then((data2) => {
    $(document).ready(function(){
      var closeb=$('#balance').html();
        $.ajax({
            url: "actions/topup.php",
            method: "post",
            data: {accn:account,staff:staff,amount:data1,bank:data2,closebv:closeb},
            beforeSend: function(){

    $('#loadme').html('<img src="assets/img/ajax3.gif" width="25" />');
            },
            success: function(data){
              if(data=="Error data not complete"){
               iziToast.error({
               title: 'Customer Balance',
               message: data,
               position: 'topRight'
             });
              }else if(data=="Amount Should NOT be more than 20,000"){
                iziToast.error({
               title: 'Customer Balance',
               message: data,
               position: 'topRight'
               });
             }
              else{
                iziToast.success({
               title: 'Customer Balance',
               message: data,
               position: 'topRight'
             });
              }
               
        setTimeout(function(){
        location.reload();  
        }, 4000)  
       }
          })
 });
  });
});
  });
 
  </script>
</body>
</html>