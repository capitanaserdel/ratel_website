<?php include('include/title.php');?>
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

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Main CSS File -->
  <link href="assets/css/main.css" rel="stylesheet">

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
include('include/menuvar.php');
include('include/header.php'); ?>

  <main class="main">

    <!-- Page Title -->
    <div class="page-title light-background">
      <div class="container">
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.php">Home</a></li>
            <li class="current">Business Subscribers</li>
          </ol>
        </nav>
        <h1>Business Subscribers</h1>
      </div>
    </div><!-- End Page Title -->

    <!-- Portfolio Details Section -->
     <section id="pricings" class="contact section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2>Business Subscribers</h2>
         <p>We usually respond within 24 hours. If you have an urgent feedback, kindly reach out using our chat.</p>
      </div><!-- End Section Title -->

      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">
          <div class="col-lg-4">
  <img src="assets/img/Webinar2.jpg"alt="" width="100%"style="border-radius: 25px;">
        </div>
        <div class="col-lg-8">
              <form action="#" method="post" enctype="multipart/form-data" data-aos="fade-up" data-aos-delay="200" id="formData" name="formData" class="php-email-forms">
              <div class="row gy-4">
   
   <div class="col-md-6">
                  <input type="text" name="fname" id="fname" class="form-control" placeholder="REGISTERED COMPANY NAME *" required="">
                </div>

                <div class="col-md-6 ">
                  <input type="text" class="form-control" name="rc" id="rc" placeholder="RC-NUMBER *" required="">
                  
                </div>
                <div class="col-md-6">
                  <input type="text" class="form-control" name="dateof" id="dateof" placeholder="DATE OF INCORPORATION/-REGISTRATION *" onfocus="(this.type='date')" onblur="(this.type='date')" onfocusout="(this.type='text')" required="">
                </div>

                <div class="col-md-6 ">
                 <input type="text" class="form-control" name="text" id="addr" placeholder="BUSINESS ADDRESS *" required="">
                  <input type="hidden"  id="picvld1" value="" >
                  <input type="hidden"  id="picvld2" value="" >
                  <input type="hidden"  id="picvld3" value="" >
                </div>
<div class="col-md-6">
  <input type="Number"  min="0" name="mobile" id="mobile" class="form-control" placeholder="CONTACT PHONE NUMBER *" required="" >
                  
                </div>

                <div class="col-md-6 ">
                 <input type="text" class="form-control" name="compserv" id="compserv" placeholder="COMPANY SERVICES *" required="">
                </div>
                <div class="col-md-6">
                  <input type="text" class="form-control" name="sname" id="sname" placeholder="DIRECTOR’S NAME *" required="">
                </div>
                 <div class="col-md-6 ">
                 <input type="email" class="form-control" name="email" id="email" placeholder="Email *" required="">
                  
                </div>
                 
               <div class="col-md-6">
                  <select class="form-control" name="loc" id="loc" required="">
                    <option value="" disabled selected>Select Ratel Number Location *</option>
                   <option>Abuja (09)</option>
                    <option>Kano (064)</option>
                  </select>
                </div>
                <div class="col-md-6 ">
                 <input type="text" class="form-control" name="noL" id="noL" placeholder="NUMBER OF LINES REQUIRED? *" readonly value="1">
                   
                </div>
                <div class="col-12">
                  <hr>
                  <p><i onclick="document.getElementById('upload_image_background').click();">Upload the following Image(s) *</i></p>
                  <ol>
                    <li>UPLOAD CAC CERTIFICATE</li>
                   <li>VALID ID *</li>
                   <li>UPLOAD PROOF OF ADDRESS *</li>
                </ol>
                <hr>
                </div>
                <div class="col-md-12 ">
                 <fieldset class="upload_dropZone text-center mb-3 p-4">

    <legend class="visually-hidden">Image uploader</legend>

    <svg class="upload_svg" width="60" height="60" aria-hidden="true">
      <use href="#icon-imageUpload"></use>
    </svg>

    <p class="small my-2">Drag &amp; Drop background image(s) inside dotted region<br><i>or</i></p>

    <input type="file" id="fileElem" accept="image/*" style="display:none">
<div id="drop-area" class="drop-area">
    <label class="btn btn-upload mb-3" id="browse">Choose file(s)</label>
  </div>
    <p>Maximum upload size: 516MB</p>
    <div class="gallery" id="gallery"></div>
<div id="preview-container" class="preview-container">
            <img id="preview-image" alt="Image Preview">
            <div id="loder2"></div>
            <div>
              
                <span class="btn-upload" id="upload-btn">Upload</span>
                <span class="btn-cancel" id="cancel-btn">Cancel</span>
            </div>
        </div>

  </fieldset>
  
  <svg style="display:none">
  <defs>
    <symbol id="icon-imageUpload" clip-rule="evenodd" viewBox="0 0 96 96">
      <path d="M47 6a21 21 0 0 0-12.3 3.8c-2.7 2.1-4.4 5-4.7 7.1-5.8 1.2-10.3 5.6-10.3 10.6 0 6 5.8 11 13 11h12.6V22.7l-7.1 6.8c-.4.3-.9.5-1.4.5-1 0-2-.8-2-1.7 0-.4.3-.9.6-1.2l10.3-8.8c.3-.4.8-.6 1.3-.6.6 0 1 .2 1.4.6l10.2 8.8c.4.3.6.8.6 1.2 0 1-.9 1.7-2 1.7-.5 0-1-.2-1.3-.5l-7.2-6.8v15.6h14.4c6.1 0 11.2-4.1 11.2-9.4 0-5-4-8.8-9.5-9.4C63.8 11.8 56 5.8 47 6Zm-1.7 42.7V38.4h3.4v10.3c0 .8-.7 1.5-1.7 1.5s-1.7-.7-1.7-1.5Z M27 49c-4 0-7 2-7 6v29c0 3 3 6 6 6h42c3 0 6-3 6-6V55c0-4-3-6-7-6H28Zm41 3c1 0 3 1 3 3v19l-13-6a2 2 0 0 0-2 0L44 79l-10-5a2 2 0 0 0-2 0l-9 7V55c0-2 2-3 4-3h41Z M40 62c0 2-2 4-5 4s-5-2-5-4 2-4 5-4 5 2 5 4Z"/>
    </symbol>
  </defs>
</svg>
   
</div>
                 
 
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

<?php include('include/footer.php'); ?>

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
  <script src="plugins/jquery/jquery.min.js"></script>

 <script type="text/javascript">
 $(document).ready(function(){
      $("#formData").submit(function(event){

        event.preventDefault();
        //var formData = new FormData(this);
        
        var pics1 = $('#picsID-1').val();
        var pics2 = $('#picsID-2').val();
        var pics3 = $('#picsID-3').val();
        var mobile = $('#mobile').val();
        var fname = $('#fname').val();
        var sname = $('#sname').val();
        var gender = $('#gender').val();
        var email = $('#email').val();
        var loc = $('#loc').val();
        var nin = $('#nin').val();
        var addr = $('#addr').val();
        var source = "Business Subscriber";
        var rc = $('#rc').val();
        var dateof = $('#dateof').val();
        var compserv = $('#compserv').val();
        var noL = $('#noL').val();
        var picValidation1 = $('#picvld1').val();
        var picValidation2 = $('#picvld2').val();
        var picValidation3 = $('#picvld3').val();
        if(picValidation1=='' || picValidation2=='' || picValidation3==''){
          alert("Please upload Images");

        }else{
        $.ajax({
            url: "actions/registration.php",
            method: "post",
            data: {formData:1,pics1:pics1,pics2:pics2,pics3:pics3,mobile:mobile,fname:fname,sname:sname,gender:gender,email:email,loc:loc,nin:nin,addr:addr,source:source,rc:rc,dateof:dateof,compserv:compserv,noL:noL,amount:5000},

            beforeSend: function(){
              $('#submit').prop("disabled",true);
                $('#loder').html('<center><img src="assets/img/loader.gif" width="50px" /><br>Please Wait...</center>');
            },
            success: function(data){
                $("#status").html(data);
            }

        })
       
  }});
  });


</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/js/bootstrap.min.js'></script>
      <script>
        const dropArea = document.getElementById('drop-area');
        const fileElem = document.getElementById('fileElem');
        const previewContainer = document.getElementById('preview-container');
        const previewImage = document.getElementById('preview-image');
        const uploadBtn = document.getElementById('upload-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const gallery = document.getElementById('gallery');
       
        let selectedFile;

        // Highlight the drop area when dragging over
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('dragover');
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('dragover');
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        document.getElementById('browse').addEventListener('click', () => {
            fileElem.click();
        });

        fileElem.addEventListener('change', () => {
            handleFiles(fileElem.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                selectedFile = files[0];
                previewImage.src = URL.createObjectURL(selectedFile);
                previewContainer.style.display = 'block';
                dropArea.style.display = 'none';
            }
        }

        cancelBtn.addEventListener('click', () => {
            selectedFile = null;
            previewContainer.style.display = 'none';
            dropArea.style.display = 'block';
            previewImage.src = '';
        });

        uploadBtn.addEventListener('click', () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                 $('#loder2').html('<center><img src="assets/img/ajax3.gif" width="80px"/><br>Image upload in progress...</center>');
    uploadBtn.innerHTML="";
                uploadImage(formData);
            }
        });

        function uploadImage(formData) {
            fetch('ajax_call_card_image.php', {
                method: 'POST',
                body: formData,
                data: formData
       })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Append the uploaded image to the gallery
                    const img = document.createElement('img');
                    img.src = 'uploads/' + data.file;  // Assuming the image is saved in 'uploads' directory
                    gallery.appendChild(img);
                    ////////////////////////////MMMMMM
                     uploadBtn.innerHTML="Upload";
                    $('#loder2').html('');
                    var i=0;
                     
                    if(document.getElementById('picsID-1')){
                      i=1;
                      $('#picvld1').val(1);
                      
                    }  
                      if(document.getElementById('picsID-2')){
                        i=2;
                       $('#picvld2').val(2);
                        document.getElementById('fileElem').disabled = true;
                      }
  var form = document.getElementById('formData');
  var input = document.createElement('INPUT');
  input.type = 'hidden';
  input.name = 'reference';
  input.value = (data.file);
  input.id = `picsID-${i + 1}`;
  form.appendChild(input);
  $('#picvld3').val(3);
 
                    // Reset the preview and form
                    previewContainer.style.display = 'none';
                    previewImage.src = '';
                    selectedFile = null;
                    dropArea.style.display = 'block';
                } else {
                    //console.error(data.message);  // Log any error message from the server
                  //alert(data.message);
                  document.getElementById('errormsg').innerHTML = data.message;
                  setTimeout(function(){
                  document.getElementById('errormsg').innerHTML = '';
                },3500);
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        }

  </script>
    <!-- jQuery -->
  
</body>

</html>