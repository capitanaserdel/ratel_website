<?php include('../include/title.php');
if(isset($_GET['rid'])and (!empty($_GET['rid']))) {
  $resprnumber=$_GET['rid'];
}else{
  echo "<script>window.location='/'</script>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title><?php echo "Delete Account"; ?></title>
  <meta name="description" content="">
  <meta name="keywords" content="">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17155921740"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17155921740');
</script>
<!-- Google tag (gtag.js) -->
<!-- Event snippet for Cheap Calls to Nigeria conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-17155921740/KHZaCICxruYaEMyuyvQ_',
      'value': 5.0,
      'currency': 'USD',
      'transaction_id': ''
  });
</script>
<!-- Event snippet for Cheap Calls to Nigeria conversion page -->
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
  <style>
/* Bootstrap 5 CSS and icons included */
:root {
  --colorPrimaryNormal: #00b3bb;
  --colorPrimaryDark: #00979f;
  --colorPrimaryGlare: #00cdd7;
  --colorPrimaryHalf: #80d9dd;
  --colorPrimaryQuarter: #bfecee;
  --colorPrimaryEighth: #dff5f7;
  --colorPrimaryPale: #f3f5f7;
  --colorPrimarySeparator: #f3f5f7;
  --colorPrimaryOutline: #dff5f7;
  --colorButtonNormal: #00b3bb;
  --colorButtonHover: #00cdd7;
  --colorLinkNormal: #00979f;
  --colorLinkHover: #00cdd7;
}
 

.upload_dropZone {
  color: #0f3c4b;
  background-color: var(--colorPrimaryPale, #c8dadf);
  outline: 2px dashed #dfdfdf;
  outline-offset: -12px;
  transition:
    outline-offset 0.2s ease-out,
    outline-color 0.3s ease-in-out,
    background-color 0.2s ease-out;
}
.upload_dropZone.highlight {
  outline-offset: -4px;
  outline-color: var(--colorPrimaryNormal, #0576bd);
  background-color: var(--colorPrimaryEighth, #c8dadf);
}
.upload_svg {
  fill: var(--colorPrimaryNormal, #0576bd);
}
.btn-upload {
  color: #fff;
  font-weight:bold;
  background-color: var(--colorPrimaryNormal);
  border-radius: 3px;
  cursor: pointer;
}
.btn-upload:hover,
.btn-upload:focus {
  color: #fff;
  background-color: var(--colorPrimaryGlare);
}
.upload_img {
  max-width: 80px;
    
  object-fit: contain;
}

.preview-container {
            display: none;
            margin-top: 20px;
            text-align: center;
        }

        .preview-container img {
            max-width:25%;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
        }

        .preview-container button {
            padding: 10px 20px;
            margin: 0 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .btn-upload {
            background-color: #28a745;
            color: #fff;
        }

        .btn-cancel {
            background-color: #dc3545;
            color: #fff;
            font-weight:bold;
            border-radius: 3px;
            cursor: pointer;
        }
        .gallery {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }

        .gallery img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .drop-area {
            border: 2px dotted; #007bff;
            padding: 50px;
             
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .drop-area.dragover {
            background-color: #e9f7fe;
        }

        .drop-area p {
            font-size: 16px;
            color: #666;
        }

        .drop-area span {
            color: #007bff;
            cursor: pointer;
        }
        .mybtn {
    background: var(--accent-color);
    color: var(--contrast-color);
    border: 0;
    padding: 10px 30px;
    transition: 0.4s;
    border-radius: 4px;
}

</style>

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
            <li class="current">Delete Account</li>
          </ol>
        </nav>
        <h1>Unsubscribe</h1>
      </div>
    </div><!-- End Page Title -->

    <!-- Portfolio Details Section -->
     <section id="pricings" class="contact section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2>Delete Account (Unsubscribe)</h2>
          <p>You are about to Delete your Ratel Account<br><strong style="color:red">(<?php echo $resprnumber; ?>)</strong></p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-4">
  <img src="../assets/img/delete.jpg"alt="" width="100%"style="border-radius: 25px;">
        </div>
        <div class="col-lg-8">
              <form action="#" method="post" enctype="multipart/form-data" data-aos="fade-up" data-aos-delay="200" id="formData" name="formData" class="php-email-forms">
              <div class="row gy-4">
   
   <div class="col-md-6">
                  <input type="text" readonly name="rnumber" id="rnumber" class="form-control" required="" value="<?php echo $resprnumber;?>">
                </div>

                <div class="col-md-6 ">
                 
                  <input type="Number"  min="0" name="mobile" id="mobile" class="form-control" placeholder="Mobile Number *" required>
                </div>
                

                <div class="col-md-6 ">
                 <input type="email" class="form-control" name="email" id="email" placeholder="Email *" required="">
                  <input type="hidden"  id="picvld1" value="" >
                  <input type="hidden"  id="picvld2" value="" >
                </div>
                <div class="col-md-6 ">
                 <input type="text" class="form-control" name="nin" id="nin" placeholder="NIN Number"  required>
                </div>
 <div id="recaptcha" data-type="image" data-sitekey="some-key (original is right)"></div>
                <div class="col-12 text-center">
                  <div id="loder"></div>
                  <div id="errormsg" class="error-message"></div>
                  <div id="status" class="sent-message"></div>
                  <input   class="position-absolute invisible" type="file" >
                  <button type="submit" name="submit" id="submit" class="mybtn">NEXT</button>
               </div>
                </div>
 
              </div>
         
          </form></div><!-- End Contact Form -->
        </div>
      </div>

    </section><!-- /Contact Section -->

  </main>
<!-- Add jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Add recaptcha explicitly -->
<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&?fallback=true" async defer></script>
</script>
<!-- render and verify by ajax -->
<script>

    var onloadCallback = function() {
        grecaptcha.render('recaptcha', {
            'sitekey' : '6LewHtwqAAAAAOgYE2BrH93dI7HvcZR1qqsYNT5l',
            'callback' : verifyCallback,
        });
    }

    var verifyCallback = function(response) {
        $.post('recaptcha.php', {'g-recaptcha-response' : response}, function(data){
            //alert(data);
        });
    };
        
</script>
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
  <script src="../plugins/jquery/jquery.min.js"></script>

 <script type="text/javascript">
 $(document).ready(function(){
      $("#formData").submit(function(event){
        var rn='<?php echo $resprnumber;?>';
        var r = confirm("You are deleting "+rn+" Click Ok to continue");
if (r == true) {
        event.preventDefault();
        var mobile = $('#mobile').val();
        var rnumber = $('#rnumber').val();
        var email = $('#email').val();
        var nin = $('#nin').val();
        if (grecaptcha.getResponse() == ""){
    alert("You can't proceed! verify you are not a robot");
} else {
     
        $.ajax({
            url: "../actions/account-delete.php",
            method: "post",
            data: {formData:1,mobile:mobile,rnumber:rnumber,email:email,nin:nin},

            beforeSend: function(){
              $('#submit').prop("disabled",true);
                $('#loder').html('<center><img src="../assets/img/loader.gif" width="50px" /><br>Please Wait...</center>');
            },
            success: function(data){
                $("#status").html(data);
            }

        })
       
  }
}else{
 event.preventDefault(); 
}
}

  );
  });


</script>
  
</body>

</html>