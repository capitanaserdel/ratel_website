<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>

<html lang="en">

<?php include 'includes/header.php';
$staff=$row_staff_rec['email'];
 if (isset($_POST['readv'])) {

   $sql="`mail_status`= 1";

   $readmsg="Registered Customer";

   $readmoreClass='type="button" class="btn btn-success"';

  $readmoreValue="Registered";

 } 

 elseif(isset($_POST['readR'])) {

  $sql="`mail_status`= 2 and prev=1 and isPaid=1";

  $readmsg="Rejected Request";

  $readmoreClass='type="button" class="btn btn-danger"';

  $readmoreValue="Rejected";

 }else{

  $sql="`mail_status`= 0 and prev=1 and isPaid=1";

  $readmsg="Registration Request";

  $readmoreClass='type="submit" class="btn btn-info"';

  $readmoreValue="Details";

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

            <P><?php echo $readmsg; ?></P><hr><div class="row">

             <?php $rowall ="SELECT * FROM `registration` WHERE $sql and (`staff`='$staff' or `staff` is null) and date(`timestamp`)=curdate() order by `id`desc";

             $j=0;

            $query=mysqli_query($config,$rowall);

             while (($data = mysqli_fetch_assoc($query)))

        {$j++;?>

             

              <div class="col-12 col-sm-6 col-md-6 col-lg-3"><!-- foreach -->

                <article class="article">

                  <div class="article-header">

                    <div class="article-image" data-background="https://ratelplus.net/uploads/<?php echo $data['pics1'];?>">

                    </div>

                    <div class="article-title">

                      <h2><a href="#"><?php echo $j.". ".$data['source'];?></a></h2>

                    </div>

                  </div>

                  <div class="article-details">

                    <p><strong>First Name: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['fname'],15,"<br>\n",TRUE)."</font>"; ?><br>

                      <strong>Last Name: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['sname'],15,"<br>\n",TRUE)."</font>"; ?><br>

                      <strong>Email: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['email'],15,"<br>\n",TRUE)."</font>"; ?><br>
                      <strong>Reference No.: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['reference'],15,"<br>\n",TRUE)."</font>"; ?><br>

                    <strong>Mobile Number: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['mobile'],15,"<br>\n",TRUE)."</font>"; ?><br>

                    <strong>Amount Paid: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['amount'],15,"<br>\n",TRUE)."</font>"; ?><br>
                    <strong>Ratel Number: </strong><?php echo "<font color='darkred'>".wordwrap($data['rnAllocated'],15,"<br>\n",TRUE)."</font>"; ?><br>

                    <strong>TimeStamp: </strong><?php echo "<font color='#6777ef'>".wordwrap($data['timestamp'],15,"<br>\n",TRUE)."</font>"; ?><br>

                    </p>

                    <div class="article-cta">

                      <form method="post" name="<?php echo $data['id']; ?>" action="email-read.php">

                        

                      <button  value="<?php echo $data['id']; ?>" name="id" <?php echo $readmoreClass; ?>><?php echo $readmoreValue;?> </button><?php $staffWrap=$data['staff'];$break=10;
                      echo "<br><font color='red'>{".implode(PHP_EOL, str_split($staffWrap, $break))."}</font>"; ?><br>
                   </form>

                    </div>

                  </div>

                </article>

              </div><!--End foreach -->

            <?php }?>

                

            </div>

           </div>

        </section>

      </div>

        

      <?php include 'includes/footer.php'; ?>

    </div>

  </div>

  <!-- General JS Scripts -->

  <script src="assets/js/app.min.js"></script>

  <!-- JS Libraies -->

  <!-- Page Specific JS File -->

  <!-- Template JS File -->

  <script src="assets/js/scripts.js"></script>

  <!-- Custom JS File -->

  <script src="assets/js/custom.js"></script>

</body>





<!-- blog.html  21 Nov 2019 03:50:52 GMT -->

</html>