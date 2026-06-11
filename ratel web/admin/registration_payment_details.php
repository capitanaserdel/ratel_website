<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php
if(!isset($_GET['r'])and(empty($_GET['r']))){
header("location:registration_payment.php");
}else{
  $reference=$_GET['r'];
}
include 'includes/header.php';
$result = mysqli_query($config,"SELECT * FROM `registration` where `reference`=$reference");
$num_rows = mysqli_fetch_assoc($result);
 
?>
 
<link rel="stylesheet" href="assets/bundles/izitoast/css/iziToast.min.css">
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

              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-10" id="mainInfo">
                <div class="card">
                  <div class="boxs mail_listing">
                    <div class="inbox-body no-pad">
                      <section class="mail-list">
                        <div class="mail-sender">
                          <div class="mail-heading">
                            <h4 class="vew-mail-header">
                              <b><?php echo $num_rows['fname']." (".$num_rows['source'].")";?></b>
                            </h4>
                          </div>
                          <hr>
                          <div class="media">
                            <a href="#" class="table-img m-r-15">
                              <img alt="image" src="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" class="rounded-circle" width="35"
                                data-toggle="tooltip" title="Sachin Pandit">
                            </a>

                            <div class="media-body">
                               <?php if($num_rows['amount']==0){?><span class="date pull-left"><font color='red'>Register By:</font> <?php echo "<font color='#6777ef'>".$num_rows['staff']."</font>";?></span><?php }?>
                              <span class="date pull-right"><?php echo $num_rows['timestamp']; ?></span>
                              <h5 class="text-primary"><?php echo $num_rows['sname'];?></h5>
                               
                            </div>
                          </div>
                        </div>
                        <div class="view-mail p-t-20">
                       
                          <p><strong>Customer Name:</strong> <?php echo "<font color='#6777ef'>".$num_rows['fname']." ".$num_rows['sname']."</font>"; ?></p>
                          <p><strong>Gender:</strong> <?php echo "<font color='#6777ef'>".$num_rows['gender']."</font>"; ?></p>
                          <p><strong>Email Address:</strong> <?php echo "<font color='#6777ef'>".$num_rows['email']."</font>"; ?></p>
                          <p><strong>Mobile Number:</strong> <?php echo "<font color='#6777ef'>".$num_rows['mobile']."</font>"; ?></p>
                          <p><strong>Residential Address:</strong> <?php echo "<font color='#6777ef'>".$num_rows['addr']."</font>"; ?></p>
                          <p><strong>Ratel Number Location:</strong> <?php echo "<font color='#6777ef'>".$num_rows['loc']."</font>"; ?></p>
                          <p><strong>NIN Number:</strong> <?php echo "<font color='#6777ef'>".$num_rows['nin']."</font>"; ?></p>
                          <p><strong>Request:</strong> <?php echo "<font color='#6777ef'>".$num_rows['source']."</font>"; ?></p>
                          <p><strong>Amount Paid:</strong> <?php echo "<font color='#6777ef'>".$num_rows['amount']."</font>"; ?></p>
                          <p><strong style="color:darkred;">Ratel Number:</strong> <?php echo "<font color='#6777ef'>".$num_rows['rnAllocated']."</font>"; ?></p>
                          <p><strong>Reference No.:</strong> <?php echo "<font color='#6777ef'>".$num_rows['reference']."</font>"; ?></p>
                          <p><strong>TimeStamp:</strong> <?php echo "<font color='#6777ef'>".$num_rows['timestamp']."</font>"; ?></p>
                         <div class="replyBox m-t-20">
                         <center><a class="btn btn-primary" href="registration_payment.php">OK</a></center>
                             
                          </p>
                        </div>
                         
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mail Compose -->
               
        </section>
      
      </div>
      <?php include 'includes/footer.php'; ?>
    </div>
  </div>
  <!-- General JS Scripts -->
  <script src="assets/js/app.min.js"></script>
  <!-- JS Libraies -->
  <script src="assets/bundles/ckeditor/ckeditor.js"></script>
  <!-- Page Specific JS File -->
  <script src="assets/js/page/ckeditor.js"></script>
  <!-- Template JS File -->
  <script src="assets/js/scripts.js"></script>
  <!-- Custom JS File -->
  <script src="assets/js/custom.js"></script>
 <script src="assets/bundles/sweetalert/sweetalert.min.js"></script>
  <!-- Page Specific JS File -->
   
    <script src="assets/js/page/toastr.js"></script>
<script src="assets/bundles/izitoast/js/iziToast.min.js"></script>

  <script type="text/javascript">
    $(document).ready(function(){
      $("#formData").submit(function(event){
        event.preventDefault();
        //var formData = new FormData(this);
        var email = $('#email').val();
        var sender = $('#sender').val();
        var subject = $('#subject').val();
        var mbody = $('#mbody').val();
        var source = $('#source').val();
        var staff = $('#staff');
       $.ajax({
            url: "actions/mail_compose.php",
            method: "post",
            data: {formData:1,email:email,sender:sender,subject:subject,mbody:mbody,source:source,staff:1},
            beforeSend: function(){
              //$('#submit').prop("disabled",true);
                $('#loadme').html('<center>Please Wait...<br><img src="assets/img/loading.gif"/></center>');
            },
            success: function(data){
                iziToast.success({
               title: email,
               message: data,
               position: 'topRight'
             });
                setTimeout(function(){
                  $('#loadme').html('');
                 $("#mailCompose").hide();
  $("#mainInfo").show();
   $("#process").show();
   $("#reject").show();
   $("#action").show();
        },5000);

                 


            }
          })
       });
  });
    function confirmP(){
      var fname ="<?php echo $num_rows['fname'];?>";
      var email ="<?php echo $num_rows['email'];?>";
      var reference ="<?php echo $num_rows['reference'];?>";
    swal({
    title: 'Are you sure to Process?',
    text: 'Have you allocation RatelNumber to customer?\nEmail: '+email,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
          
        });
        location.href = "actions/email_update.php?r="+reference;
      } else {
        swal('Safe! No Update');
      }
    });
 }/////////////
 function confirmD(){
      var fname ="<?php echo $num_rows['fname'];?>";
      var email ="<?php echo $num_rows['email'];?>";
      var reference ="<?php echo $num_rows['reference'];?>";
    swal({
    title: 'Are you sure?',
    text: 'You are about to REJECT this customer?\nEmail: '+email+'\nRefence: '+reference+'\nStatus: Paid',
    icon: 'error',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
          
        });
        location.href = "actions/email_update.php?rd="+reference;
      } else {
        swal('Safe! No Update');
      }
    });
 }
</script>
</body>


<!-- email-read.html  21 Nov 2019 03:51:00 GMT -->
</html>