<?php include('../include/title.php');
if (isset($_POST['formData'])) {
	$email=$_POST['email'];
	$amount=$_POST['amount'];
  $phone=$_POST['mobile'];
  switch ($_POST['price']) {
  case '100 Minutes':
    $amountp="2000";
    break;
  case '200 Minutes':
    $amountp="3000";
    break;
    case '500 Minutes':
    $amountp="6000";
    break;
  default:
    $amountp="";
    break;
}
}
else{
echo "<script>window.location='/';</script>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title><?php echo $title; ?></title>
  <meta name="description" content="">
  <meta name="keywords" content="">

  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon">
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="../assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="../assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Main CSS File -->
  <link href="../assets/css/main.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Scaffold
  * Template URL: https://bootstrapmade.com/scaffold-bootstrap-metro-style-template/
  * Updated: Aug 07 2024 with Bootstrap v5.3.3
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
 

  <script>
  window.console = window.console || function(t) {};
</script>
</head>

<body class="portfolio-details-page">

  <?php 
include('../include/menuvar.php');
include('../include/header.php'); ?>

  <main class="main">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container">
        <nav class="breadcrumbs">
          <ol>
            <li><a href="../index.php">Home</a></li>
            <li class="current"><?php if(isset($_POST['source'])and !empty($_POST['source'])){echo $_POST['source'];}?></li>
          </ol>
        </nav>
        <h1>Registration Airtime</h1>
      </div>
    </div><!-- End Page Title -->

    <!-- Portfolio Details Section -->
     <section id="pricings" class="contact section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2><?php if(isset($_POST['source'])and !empty($_POST['source'])){echo $_POST['source'];}?> <span style="color:darkgreen;"><?php if(isset($amountp)and !empty($amountp)){ echo "(".$_POST['price']."@ "."&#8358;".$amountp.")";}elseif(isset($amount)and !empty($amount)){ echo "(&#8358;".$amount.")";} ?></span></h2>
         <p>We usually respond within 5 minutes 8:00am to 10:00pm Nigerian time.
For instant response, kindly reach out using our chat.</p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-4">
  <img src="../assets/img/atm.png"alt="" width="100%"style="border-radius: 25px;">
        </div>
        <div class="col-lg-8">
              <form action="payer.php" method="post" enctype="multipart/form-data" data-aos="fade-up" data-aos-delay="200" id="formData" name="formData" class="php-email-forms">
              <div class="row gy-4">
   
   <div class="col-md-12">
                  <input type="email" class="form-control" name="email" value="<?php echo $email; ?>" readonly >
                </div>

                 <div class="col-md-6 ">
                  <input type="text" class="form-control" name="currency" id="sname" value="NGN" disabled readonly >
                </div>

                <div class="col-md-6">
                  <input type="text" name="amount_disply" value="<?php echo "&#8358;".$amount; ?>" class="form-control" readonly >
                </div>

                
<div class="col-md-12">
                  <input type="number" class="form-control" name="phone" value="<?php echo $phone; ?>" readonly >
                </div>

                 
 
                <div class="col-12 text-center">
                  <div id="loder"></div>
                  <div id="errormsg" class="error-message"></div>
                  <div id="status" class="sent-message"></div>
                  <input   class="position-absolute invisible" type="file" >
                  <button type="submit" name="opay" id="submit" style="background-color: #44d7b6;">Pay with Opay</button>
                  <button type="submit" name="paystack" id="submit">Pay with Paystack</button>
               </div>
                </div>
 
              </div>
         <input type="hidden" name="fname" value="<?php echo $_POST['fname'];?>" readonly>
         <input type="hidden" name="lname" value="<?php echo $_POST['sname'];?>" readonly>
         <input type="hidden" name="amount" value="<?php echo $amount;?>" readonly> 
         <input type="hidden" name="source" value="<?php echo $_POST['source'];?>" readonly> 
         <input type="hidden" name="price" value="<?php echo $_POST['price'];?>" readonly>
         <input type="hidden" name="reference" value="<?php echo $_POST['reference'];;?>" readonly> 
          </form></div><!-- End Contact Form -->
        </div>
      </div>

    </section><!-- /Contact Section -->

  </main>

<?php include('../include/footer.php'); ?>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/vendor/php-email-form/validate.js"></script>
  <script src="../assets/vendor/aos/aos.js"></script>
  <script src="../assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="../assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
  <script src="../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="../assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!-- Main JS File -->
  <script src="../assets/js/main.js"></script>
 

 
  
</body>

</html>