<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
<?php
if(isset($_GET['reference'])and (!empty($_GET['reference']))){
$referenceid=$_GET['reference'];
$result = mysqli_query($config,"SELECT * FROM `registration` where `reference`=$referenceid");
$num_rows = mysqli_fetch_assoc($result);
}
else{
header("location:registration.php");
}
?>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17155921740"></script>
 <!-- Fonts -->
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
   
 <style>
 .visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within){width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}.visually-hidden-focusable:not(:focus):not(:focus-within):not(caption),.visually-hidden:not(caption){position:absolute!important}.visually-hidden *,.visually-hidden-focusable:not(:focus):not(:focus-within) *{overflow:hidden!important}.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;content:""}
  /* Fonts */
:root {
  --default-font: "Roboto",  system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --heading-font: "Nunito Sans",  sans-serif;
  --nav-font: "Poppins",  sans-serif;
}
/* Global Colors - The following color variables are used throughout the website. Updating them here will change the color scheme of the entire website */
:root { 
  --background-color: #ffffff; /* Background color for the entire website, including individual sections */
  --default-color: #555555; /* Default color used for the majority of the text content across the entire website */
  --heading-color: #364146; /* Color for headings, subheadings and title throughout the website */
  --accent-color: #FF704D; /* Accent color that represents your brand on the website. It's used for buttons, links, and other elements that need to stand out */
  --surface-color: #ffffff; /* The surface color is used as a background of boxed elements within sections, such as cards, icon boxes, or other elements that require a visual separation from the global background. */
  --contrast-color: #ffffff; /* Contrast color for text, ensuring readability against backgrounds of accent, heading, or default colors. */
}
/* Nav Menu Colors - The following color variables are used specifically for the navigation menu. They are separate from the global colors to allow for more customization options */
:root {
  --nav-color: #828c91;  /* The default color of the main navmenu links */
  --nav-hover-color: #009cea; /* Applied to main navmenu links when they are hovered over or active */
  --nav-mobile-background-color: #ffffff; /* Used as the background color for mobile navigation menu */
  --nav-dropdown-background-color: #ffffff; /* Used as the background color for dropdown items that appear when hovering over primary navigation items */
  --nav-dropdown-color: #555555; /* Used for navigation links of the dropdown items in the navigation menu. */
  --nav-dropdown-hover-color: #009cea; /* Similar to --nav-hover-color, this color is applied to dropdown navigation links when they are hovered over. */
}
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
  outline-color: #00b3bb, #0576bd;
  background-color: var(--colorPrimaryEighth, #c8dadf);
}
.upload_svg {
  fill: var(--colorPrimaryNormal, #0576bd);
}
.btn-upload {
  color: #fff;
  font-weight:bold;
  background-color: #00b3bb;
  border-radius: 3px;
  cursor: pointer;
}
.btn-upload:hover,
.btn-upload:focus {
  color: #00b3bb;
  background-color:#00cdd7;
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
     .php-email-forms .error-message {
  
  background: #df1529;
  color: #ffffff;
  text-align: left;
  padding: auto;
  margin-bottom: 24px;
  font-weight: 600;
}
.php-email-forms .sent-message {
   
  color: #ffffff;
  background: #059652;
  text-align: center;
  padding: auto;
  margin-bottom: 24px;
  font-weight: 600;
}   

</style>
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
                      <h4>Personal Subscribers Update</h4>
                    </div>
                    <div class="card-body">
                <form action="#" method="post" enctype="multipart/form-data" data-aos="fade-up" data-aos-delay="200" id="formData" name="formData" class="php-email-forms">
                  <div class="row">
                   <div class="form-group col-6">
                   	 <label>First Name</label>
                  <input type="text" name="fname" id="fname" class="form-control" value="<?php echo $num_rows['fname']; ?>" required="">
                </div>

                <div class="form-group col-6 ">
                	 <label>Surname</label>
                  <input type="text" class="form-control" name="sname" id="sname" value="<?php echo $num_rows['sname']; ?>" required="">
                  
                </div>
                <div class="form-group col-6">
                	<label>Gender</label>
                  <select class="form-control" id="gender" name="gender" required="">
                    <option value="<?php echo $num_rows['gender']; ?>" disabled selected>Selected:-{<?php echo $num_rows['gender']; ?>}</option>
                   <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div class="form-group col-6 ">
                 <label>Email Address</label>
                 <input type="email" class="form-control" name="email" id="email" value="<?php echo $num_rows['email']; ?>" required="">
                  <input type="hidden"  id="picvld1" value="<?php echo $num_rows['pics1']; ?>" >
                  <input type="hidden"  id="picvld2" value="<?php echo $num_rows['pics2']; ?>" >
                </div>
<div class="form-group col-6">
	<label>Phone Number (GSM)</label>
  <input type="Number"  min="0" name="mobile" id="mobile" class="form-control" value="<?php echo $num_rows['mobile']; ?>" required="">
                  
                </div>

                <div class="form-group col-6 ">
                	<label>NIN</label>
                 <input type="text" class="form-control" name="nin" id="nin" value="<?php echo $num_rows['nin']; ?>">
                </div>
                <div class="form-group col-12">
                	<label>Ratel Number Location</label>
                  <select class="form-control" name="loc" id="loc" required="">
                    <option value="<?php echo $num_rows['loc']; ?>" disabled selected>Selected:-{<?php echo $num_rows['loc']; ?>}</option>
                   <option>Abuja (09)</option>
                    <option>Kano (064)</option>
                  </select>
                </div>

                 
               <div class="col-12">
               	<label>Address</label>
                  <textarea class="form-control" name="addr" id="addr" rows="6" required="" ><?php echo $num_rows['addr']; ?></textarea>
                  <input type="hidden" name="staff" id="staff"name="staff" value="<?php echo $row_staff_rec['email']?>">
                  <input type="hidden" name="staff" id="referenceids" name="referenceids" value="<?php echo $_GET['reference']?>">
                </div>
                 <div class="row">
                            <div class="col-md-2">
                              <a href="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>">
                                <img class="img-thumbnail img-responsive" alt="attachment"
                                  src="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" target="_blank">
                              </a>
                              <a class="name" href="https://ratelplus.net/uploads/<?php echo $num_rows['pics1'];?>" target="_blank"> <?php echo $num_rows['pics1'];?>
                                <span>20KB</span>
                              </a>
                            </div>
                            <div class="col-md-2">
                              <a href="https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>">
                                <img class="img-thumbnail img-responsive" alt="attachment"
                                  src="https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>" target="_blank">
                              </a>
                              <a class="name" href="https://ratelplus.net/uploads/<?php echo $num_rows['pics2'];?>" target="_blank"><?php echo $num_rows['pics2'];?>
                                <span>22KB</span>
                              </a>
                            </div>
                            
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
    <p>Maximum upload size: 14MB</p>
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
                  <button type="submit" name="submit" id="submit" class="btn btn-primary">UPDATE</button>
               </div>
                </div>
              </form>
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
  <script src="assets/bundles/jquery-ui/jquery-ui.min.js"></script>
  <!-- Template JS File -->
  <script src="assets/js/scripts.js"></script>
  <!-- Custom JS File -->
  <script src="assets/js/custom.js"></script>
 <script type="text/javascript">
 $(document).ready(function(){
      $("#formData").submit(function(event){

        event.preventDefault();
        //var formData = new FormData(this);
        var pics1 = $('#picsID-1').val();
        var pics2 = $('#picsID-2').val();
        var mobile = $('#mobile').val();
        var fname = $('#fname').val();
        var sname = $('#sname').val();
        var gender = $('#gender').val();
        var email = $('#email').val();
        var staff = $('#staff').val();
        //var amount = $('#amount').val();;
        var loc = $('#loc').val();
        var nin = $('#nin').val();
        var addr = $('#addr').val();
        var referenceids = $('#referenceids').val();
        var source = "Personal Subscriber";
        var picValidation1 = $('#picvld1').val();
        var picValidation2 = $('#picvld2').val();
        if(picValidation1=='' || picValidation2==''){
          alert("Please upload Images");

        }else{
        $.ajax({
            url: "actions/registration_update.php",
            method: "post",
            data: {formData:1,pics1:pics1,pics2:pics2,mobile:mobile,fname:fname,sname:sname,gender:gender,email:email,loc:loc,nin:nin,addr:addr,source:source,amount:0,staff:staff,referenceids:referenceids},

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
                //////////////////////////MMMMMM
    $('#loder2').html('<center><img src="assets/img/ajax3.gif" width="80px"/><br>Image upload in progress...</center>');
    uploadBtn.innerHTML="";
    
    
    //////////////////////////////
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
                    img.src = 'https://ratelplus.net/uploads/' + data.file;  // Assuming the image is saved in 'uploads' directory
                    gallery.appendChild(img);
                    ////////////////////////////MMMMMM
                    uploadBtn.innerHTML="Upload";
                    $('#loder2').html('');
                    var i=0;
                     
                    if(document.getElementById('picsID-1')){
                      i=1;
                      $('#picvld1').val(1);
                      document.getElementById('fileElem').disabled = true;
                    }  
                      // if(document.getElementById('picsID-2')){
                      //   i=2;
                      // }
  var form = document.getElementById('formData');
  var input = document.createElement('INPUT');
  input.type = 'hidden';
  input.name = 'reference';
  input.value = (data.file);
  input.id = `picsID-${i + 1}`;
  form.appendChild(input);
  $('#picvld2').val(2);
 
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
</body>
 
</html>