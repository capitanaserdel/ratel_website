<?php
include 'includes/sub_header.php';
include 'includes/header.php';
//session_start();
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
}
?>
<!DOCTYPE html>
<html lang="en">
<?php

if(!isset($_POST['id'])and(empty($_POST['id']))){
//header("location:registration.php");
echo "<script>window.location='registration.php';</script>";
}else{
  $id=$_POST['id'];
}

$result = mysqli_query($config,"SELECT * FROM `registration` where `mail_status`=0 and `id`=$id");
$num_rows = mysqli_fetch_assoc($result);
if(!isset($num_rows['mail_status'])){
//header("location:registration.php");
echo "<script>window.location='registration.php';</script>";
}

?>
<script>
$(document).ready(function(){
  $("#mailCompose").hide();
  $("#replyme,#replyme2").click(function(){
    $("#mailCompose").show();
   $("#mainInfo").hide();
   $("#process").hide();
   $("#reject").hide();
   $("#action").hide();

});
  $("#discard").click(function(){
    $("#mailCompose").hide();
  $("#mainInfo").show();
   $("#process").show();
   $("#reject").show();
   $("#action").show();
  });
});
</script>
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
              <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <div class="card">
                  <div class="body">
                    <?php include 'includes/email_nav.php'; ?>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9" id="mainInfo">
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
                              <img alt="image" src="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" class="rounded-circle" width="40" data-toggle="tooltip">
                            </a>
                            <div class="media-body">
                              <?php if($num_rows['amount']==0){?><span class="date pull-left"><font color='red'>Register By:</font> <?php echo "<font color='#6777ef'>".$num_rows['staff']."</font>";?></span><?php }?>
                              <span class="date pull-right"><?php echo $num_rows['timestamp']; ?></span>
                              <h5 class="text-primary"><?php echo $num_rows['sname'];?></h5>
                              <small class="text-muted">From: <?php echo $num_rows['email'];?></small>
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
                          <p><strong>Amount Paid:</strong> <?php echo "<font color='#6777ef'>&#8358;".(number_format($num_rows['amount']))."</font>"; ?></p>
                          <p><strong>Ratel Number:</strong> <?php echo "<font color='darkred'>".$num_rows['rnAllocated']."</font>"; ?></p>
                          <p><strong>Reference No.:</strong> <?php echo "<font color='#6777ef'>".$num_rows['reference']."</font>"; ?></p>
                          <p><strong>TimeStamp:</strong> <?php echo "<font color='#6777ef'>".$num_rows['timestamp']."</font>"; ?></p>
                          </div>
                        <div class="attachment-mail">
                          <p>
                            <span>
                              <i class="fa fa-paperclip"></i> 2 attachments </span>
                            <a href="#">Download all attachments</a> |
                           <a href="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" target="_blank" onclick="window.open('https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>');">View all images</a>
                          </p>
                          <div class="row">
                            <div class="col-md-2">
                              <a href="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>">
                                <img class="img-thumbnail img-responsive" alt="attachment"
                                  src="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>">
                              </a>
                              <a class="name" href="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" target="_blank"> <?php echo $num_rows['pics1'];?>
                                <span>20KB</span>
                              </a>
                            </div>
                            <div class="col-md-2">
                              <a href="../uploads/<?php echo $num_rows['pics2'];?>">
                                <img class="img-thumbnail img-responsive" alt="attachment"
                                  src="https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>">
                              </a>
                              <a class="name" href="https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>" target="_blank"><?php echo $num_rows['pics2'];?>
                                <span>22KB</span>
                              </a>
                            </div>
                            
                          </div>
                        </div>
                        <div class="replyBox m-t-20">
                          <?php if($num_rows['rnAllocated']=="Not Assign"){?>
                          <p class="p-b-20">click here to
                            <a href="#" id="replyme2">Reply</a>
                          </p>
                        <?php }?>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mail Compose -->
              <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9" id="mailCompose">
                <div class="card">
                  <div class="boxs mail_listing">
                    <div class="inbox-center table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th colspan="1">
                              <div class="inbox-header">
                                Reply Mail
                              </div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <form class="composeForm" id="formData" action="#" method="post">
                          <div class="form-group">
                            <div class="form-line">
                              <input type="text" id="email" class="form-control" value="<?php echo $num_rows['email'];?>">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="form-line">
                              <input type="text" id="sender" name="sender" class="form-control" value="<?php echo 'customercare@ratelplus.net.ng'?>" readonly>
                             
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="form-line">
                               <select name="newN" id="newN" class="form-control" required onchange="noallocate()">
                                <option value="">Allocate Ratel Number</option>
              <?php $rowall ="SELECT * FROM `unallocated_Rno` WHERE `status`='INITIAL' order by id desc";
              $query=mysqli_query($config,$rowall);

             while (($data = mysqli_fetch_assoc($query))){
            ?>
            <option value="<?php echo $data['passwd']; ?>" readonly><?php echo $data['ratelnumber']; ?></option>
          <?php }?>
                              </select>
                             
                            </div>
                          </div>
                           <input type="hidden" id="subject" class="form-control" placeholder="Subject" required value="<?php echo $num_rows['source']; ?>">
                          <div class="form-group">
                            <div class="form-line">
                              <textarea class="form-control" id="mbody" required id="mbody" onmousemove="noallocate()" readonly></textarea>
                            </div>
                          </div>
                          <div id="loadme"></div>
                           <button type="button" class="btn btn-danger btn-border-radius waves-effect" id="discard">Discard</button>
                           <button type="submit" class="btn btn-info btn-border-radius waves-effect" id="submit">Send</button>
                          <input type="hidden" name="source" id="source" value="<?php echo $num_rows['source']; ?>">
                        </form>
                      </div>
                      <div class="col-lg-12">
                        <div class="m-l-25 m-b-20">
                          
                          
                        </div>
                      </div>
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
    function noallocate(){
  var selectedText = $('#newN option:selected').text();
  var selectedValue = $('#newN option:selected').val();
      var rn=$('#newN').val();
      var staff= '<?php echo $staff; ?>';
      var staffP= '<?php echo $staffP; ?>';
      if(rn!=""){
      $('#mbody').val('Prior to your application for Ratel Line, a line has been allocated to you with login details below:'+'<br><br>'+'Ratel Number: '+selectedText+'<br>Password: '+selectedValue+'<br><br><br>'+staff+'<br>'+staffP+'<br>Ratel Plus Nigeria Limited<br>Contacts: 02064700000; 02097030000<br>Whatsapp: 07010553861<br>Email: customercare@ratelplus.net.ng<br>Website: https://.ratelplus.net');
    }else{
      $('#mbody').val('');
    }
  }
    $(document).ready(function(){
      $("#formData").submit(function(event){
        event.preventDefault();
        //var formData = new FormData(this);
        var email = $('#email').val();
        var sender = $('#sender').val();
        var subject = $('#subject').val();
        var mbody = $('#mbody').val();
        var source = $('#source').val();
        var staffemail= '<?php echo $staffEmail; ?>';
        var cusname='<?php echo $num_rows['fname']." ".$num_rows['sname'];?>';
        var newN = $('#newN option:selected').text();
        var reference2 ="<?php echo $num_rows['reference'];?>";
       $.ajax({
            url: "actions/mail_compose.php",
            method: "post",
            data: {formData:1,email:email,sender:sender,subject:subject,mbody:mbody,source:source,staffemail:staffemail,cusname:cusname,newN:newN,reference2:reference2},
            beforeSend: function(){
              //$('#submit').prop("disabled",true);
                $('#loadme').html('<center>Please Wait...<br><img src="assets/img/loading.gif"/></center>');
            },
            success: function(data){
              $('#submit').prop('disabled', true);
              $('#newN').prop('disabled', true);
              if(data=="Number is Assign to another customer! pls retry"){

                iziToast.error({
               title: email,
               message: data,
               position: 'topRight'
             });
              }else{
                iziToast.success({
               title: email,
               message: data,
               position: 'topRight'
             });
              }

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