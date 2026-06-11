<?php include('include/title.php');
// Trailing splash is mistakly added after .php extension from Android/IOS Application
if( ($_SERVER['REQUEST_URI'] != "/") and preg_match('{/$}',$_SERVER['REQUEST_URI']) ) {
    header ('Location: '.preg_replace('{/$}', '', $_SERVER['REQUEST_URI']));
    exit();
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
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <!-- Main CSS File -->
  <link href="assets/css/main.css" rel="stylesheet">
<style>
  button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

.containerpop {
  padding: 16px;
  text-align: center;
}
.modalpop {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #f6f8fa;
  padding-top: 50px;
}
.modalpop-contentpop {

  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
}
.close {
  position: absolute;
  right: 35px;
  top: 50px;
  font-size: 40px;
  font-weight: bold;
  color: #b02a02;
}

.close:hover,
.close:focus {
  color: #b02a02;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
 @media screen and (min-width: 1200px) {
  .modalpop-contentpop {
     width: 40%;
  }
}
</style>
   

  <script>
  window.console = window.console || function(t) {};
</script>
</head>

<body class="portfolio-details-page">
<?php
include('include/menuvar.php');
include('include/header.php');
?>

  <main class="main">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container">
        <nav class="breadcrumbs">
          <ol>
            <li><a href="/">Home</a></li>
            <li class="current">Online Airtime</li>
          </ol>
        </nav>
        <h1>Online Airtime</h1>
      </div>
    </div><!-- End Page Title -->

    <!-- Portfolio Details Section -->
     <section id="contacts" class="contact section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2>Online Airtime</h2>
         <p>We usually respond within 5 minutes 24/7 Nigerian time. <br>For instant response, kindly reach out using our chat.</p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-4">
  <img src="assets/img/airtime.jpg"alt="" width="100%"style="border-radius: 25px;">
        </div>
        <div class="col-lg-8">
            <form action="payer2.php" method="post" class="php-email-forms" data-aos="fade-up" data-aos-delay="200">
              <div class="row gy-4">
  
                <div class="col-md-6">
                  <input type="text" name="fname" class="form-control" placeholder="First Name *" required="" id="fname">
                </div>

                <div class="col-md-6 ">
                  <input type="text" class="form-control" name="lname" placeholder="Last Name *" required="" id="lname">
                </div>
 

                <div class="col-md-12 ">
                  <input type="email" class="form-control" name="email" placeholder="Email *" required="" id="email">
                </div>


                <div class="col-md-12 ">
                  <input type="text" class="form-control" name="amount" placeholder="Amount in Naira*" required id="intTextAmt" id="amount">
                  <input type="hidden" name="source" value="Airtime">
                <input type="hidden" name="reference" value="<?php echo str_pad(mt_rand(1,99999999),8,'0',STR_PAD_LEFT);?>">
              </div>
               <div class="col-12">
<input type="text" class="form-control mb-2" name="ratelnumber" placeholder="Ratel Number" required id="intTextBox" maxlength="11" minlength="11" value="<?= (empty($_GET['number']) || ! is_numeric($_GET['number'])) ? '' : $_GET['number'] ?>" pattern="^0206470.*|^0209701.*|^0209702.*|^0209703.*|^0209704.*|^0209705.*|^0209706.*|^0209707.*|^0209708.*|^0209709.*|^0209710.*" />
                  <font color="darkred" style="font-size: 12px;">Note:</font><span style="font-size: 12px; text-wrap: auto; word-wrap: break-word; overflow-wrap: break-word;"> Ratel number must start with prefix (0206470, 0209701, 0209702, 0209703, 0209704, 0209705, 0209706, 0209707, 0209708, 0209709, 0209710)
                </div>

                <div id="id01" class="modalpop">
  <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
  <div class="modalpop-contentpop">
    <strong>PAY WITH</strong>
    <div class="containerpop">
      
    
      <div class="clearfix">
        <div class="col-md-12 ">
        <button type="submit" class="deletebtn" name="opay" value="opay" style="background-color: #1dcf9f;">Opay <i class="fa fa-circle-o-notch"></i></button>
      </div>
      <div class="col-md-12 ">
        <button type="submit" class="deletebtn" name="moni" value="moni" style="background-color: #031335;">Monipoint <i class="fa fa-meanpath"></i></button>
      </div>
      <div class="col-md-12 ">
        <button type="submit" class="deletebtn" name="paystack" value="paystack" style="background-color: #09a5db;">Paystack <i class="fa fa-bars"></i></button>
      </div>
      </div>
    </div>
 </div>
</div>
 </form>
</div>
          <center ><button  onclick="validateme()" class="minicss" style="width: 20%;">Pay Now</button> </center>
           </div>
          </div><!-- End Contact Form -->
        </div>
      </div>

    </section><!-- /Contact Section -->

  </main>

<?php include('include/footer.php');?>

  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

  <!-- Main JS File -->
  <script src="assets/js/main.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/js/bootstrap.min.js'></script>
       
</body>

</html>
<script>
    function setInputFilter(textbox, inputFilter, errMsg) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout","submit"].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value
        if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value - restore the previous one
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value - nothing to restore
        this.value = "";
      }
    });
  });
}


// Install input filters.
setInputFilter(document.getElementById("intTextBox"), function(value) {
  return /^-?\d*$/.test(value); }, "Input your Ratel Number");
setInputFilter(document.getElementById("intTextAmt"), function(value) {
  return /^-?\d*$/.test(value); }, "Amount must be a number!");
 var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function validateme(){
if($('#fname').val()==''||$('#lname').val()==''||$('#email').val()==''||$('#amount').val()==''||$('#intTextBox').val()==''){
  alert("Please supply all the required input");
  return false;
}else{
  $('#id01').show();
}
}
</script>
 