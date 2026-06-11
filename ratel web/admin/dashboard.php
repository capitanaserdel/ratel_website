<?php 
require "../conn/config.php";
include 'includes/sub_header.php';
?>
<!DOCTYPE html>
<html lang="en">
<!-- index.html  21 Nov 2019 03:44:50 GMT -->
<?php include 'includes/header.php';?>
 
  <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
  <script type="text/javascript">
    // $(document).ready(function(){
    // var updateInterval = 2000000;
    // setInterval(updatePlayerCount, updateInterval);
    // function updatePlayerCount() {
    $.ajax({//Registration
        url: "actions/reg_counter.php",
        method: "post",
        data: {displayAmount:2},
         
         success: function(data){
          $("#reg_pay").html(data);
        }
      })

     
   var updateInterval = 2500;
    setInterval(updatePlayerCount, updateInterval);
     function updatePlayerCount() {
     
    
      
    $.ajax({//switch sts
        url: "actions/switch_sts.php",
        method: "post",
        data: {displayAmount:9},
         
         success: function(data){
          $("#swt").html(data);
           
        }
      })
     //Cronjob Counter
  $.ajax({//Email Counter inbox
        url: "actions/cron_count.php",
        method: "post",
        data: {displayAmount:61},
         
         success: function(data){
          $("#cronj").html(data);
           
        }
      })

  $.ajax({//Airtime_Real_Time
        url: "actions/airtime_real_time.php",
        method: "post",
        data: {displayAmount:10},
         
         success: function(data){
          $("#airtime_real").html(data);
           
        }
      }) 
   
      }
     
   $.ajax({//Airtime
        url: "actions/airtime_counter.php",
        method: "post",
        data: {displayAmount:3},
         
         success: function(data){
          $("#airtime").html(data);
        }
      })
      $.ajax({//Airtime_Real_Time
        url: "actions/double_post_table.php",
        method: "post",
        data: {displayAmount:10},
         
         success: function(data){
          $("#double_post").html(data);
           
        }
      }) 

      
      
     $.ajax({//Live Calls Count
        url: "actions/live_calls_count_table.php",
        method: "post",
        data: {displayAmount:15},
         
         success: function(data){
          //$("#livecall_count").html(data);
         // $("#livecall_count2").html(data);
          $("#livecall_count3").html(data);
           
        }
      }) 
      
     $.ajax({//Registration_payment_Amount
        url: "actions/reg_payment2.php",
        method: "post",
        data: {displayAmount:9},
         
         success: function(data){
          $("#reg_payment20").html(data);
           
        }
      })
     $.ajax({//Airtime_Real_Time
        url: "actions/ratelunallocated.php",
        method: "post",
        data: {displayAmount:10},
         
         success: function(data){
          $("#ratelunallocated").html(data);
           
        }
      }) 
     //}//No Interval
     
     $.ajax({//Airtime_Real_Time
        url: "actions/incomplete_registration.php",
        method: "post",
        data: {displayAmount:10},
         
         success: function(data){
          $("#incomplete_registration").html(data);
           
        }
      }) 
     
     
      $.ajax({//Airtime error
        url: "actions/airtime_error_counter.php",
        method: "post",
        data: {displayAmount:5},
         
         success: function(data){
          $("#airtime_error").html(data);
        }
      })
      
     // $.ajax({//Registration_payment_Amount
     //    url: "actions/reg_payment2.php",
     //    method: "post",
     //    data: {displayAmount:9},
         
     //     success: function(data){
     //      $("#reg_payment20").html(data);
           
     //    }
     //  })
     $.ajax({//Customer Counter
        url: "actions/cus_counter.php",
        method: "post",
        data: {displayAmount:1},
         
         success: function(data){
          $("#cus").html(data);
        }
      })
     //});
     
  </script>
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
          <div class="row">
              <div class="col-6">
                <div class="card">
          
                   <div class="card-body">
                    <div class="table-responsive">
                    </div>
                    Double Posting Airtime: <span id="double_post" class="badge rounded-pill bg-success" onclick="javascript:window.location='double_post.php';" style="cursor: pointer;"></span></div>
                    
                  </div>
                  </div>
                  
                  <div class="col-6">
                <div class="card">
          
                   <div class="card-body">
                    <div class="table-responsive">
                    </div>
                    Manual Registration: <span id="incomplete_registration" class="badge rounded-pill bg-success" onclick="javascript:window.location='registration_payment.php?r=1';" style="cursor: pointer;"></span></div>
                    
                  </div>
                  </div>
                   <div class="col-6">
                <div class="card">
          
                   <div class="card-body">
                    <div class="table-responsive">
                    </div>
                    Unallocated Ratel Number: <span id="ratelunallocated" class="badge rounded-pill bg-success" onclick="#" style="cursor: pointer;"></span></div>
                    
                  </div>
                  </div>
                  
                  <div class="col-6">
                <div class="card">
          
                   <div class="card-body">
                    <div class="table-responsive">
                    </div>
                    <div id="swt" onclick="javascript:window.open('https://portal.ratelplus.net');">
                    </div>
                    
                  </div>
                  </div>
                
                  </div>
          
             </div>   
           
          <div class="row ">
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div class="card">
                <div class="card-statistic-4">
                  <div class="align-items-center justify-content-between">
                    <div class="row ">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                        <div class="card-content">
                          <h5 class="font-15">Error Airtime Recharge</h5>
                          <h2 class="mb-3 font-18"><span id="airtime_error"></span></h2>
                          <p class="mb-0"><a href="error_airtime.php">Details</a></p>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                        <div class="banner-img">
                          <img src="assets/img/banner/1.png" alt="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12" <?php allow_access(1,1,0,$usergroup); ?>>
              <div class="card">
                <div class="card-statistic-4">
                  <div class="align-items-center justify-content-between">
                    <div class="row ">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                        <div class="card-content">
                          <h5 class="font-15">Registration Payments</h5>
                          <h2 class="mb-3 font-18"><span id="reg_pay"></span></h2>
                           <p class="mb-0"><a href="registration_payment.php">Details</a></p>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                        <div class="banner-img">
                          <img src="assets/img/banner/3.png" alt="">
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12" <?php allow_access(1,1,0,$usergroup); ?>>
              <div class="card">
                <div class="card-statistic-4">
                  <div class="align-items-center justify-content-between">
                    <div class="row ">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                        <div class="card-content">
                          <h5 class="font-15">Airtime Revenue</h5>
                          <h2 class="mb-3 font-18"><span id="airtime"></span></h2>
                          <p class="mb-0"><a href="airtime_payment.php">Details</a></p>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                        <div class="banner-img">
                          <img src="assets/img/banner/4.png" alt="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12" <?php allow_access(1,1,0,$usergroup); ?>>
              <div class="card">
                <div class="card-statistic-4">
                  <div class="align-items-center justify-content-between">
                    <div class="row ">
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                        <div class="card-content">
                          <h5 class="font-15"> Customers</h5>
                          <h2 class="mb-3 font-18"><span id="cus"></span></h2>
                          <p class="mb-0"><a href="live_calls.php">Live Calls:</a></p>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                         
                        <div class="banner-img">
                          <img src="assets/img/banner/2.png" alt="">
                        </div>
                        <span id="livecall_count3" class="badge rounded-pill bg-success" onclick="javascript:window.location='live_calls.php';" style="cursor: pointer;"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Airtime Recharge</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <div style="float:right;"><a href="query_trans.php">Advance Search</a></div>
                      <table class="table table-striped" id="tableExport">
                        <thead>
                          <tr>
                       <th class="text-center">
                              Bank Status
                            </th>
                      <th>Reference</th>
                        <th>Ratel</th>
                        <th>Method</th>
                        <th>Progress Status</th>
                        <th>Channel</th>
                        <th>Amount</th>
                        <th>Switch</th>
                        <th>Time</th>
                       
                      </tr>
                      
                        </thead>
                        <tbody id="airtime_real">
                           
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
   
  <!-- Page Specific JS File --><script type="text/javascript">
    
  </script>
  <script src="assets/js/page/index.js" type="text/javascript">
    
  </script>
  <!-- Template JS File -->
  <script src="assets/js/scripts.js"></script>
  <!-- Custom JS File -->
  <script src="assets/js/custom.js"></script>
<script src="assets/bundles/apexcharts/apexcharts.min.js"></script>
<!-- JS Libraies -->
  <script src="assets/bundles/datatables/datatables.min.js"></script>
  <script src="assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js"></script>
  <script src="assets/bundles/jquery-ui/jquery-ui.min.js"></script>
  <!-- Page Specific JS File -->
  <script src="assets/js/page/datatables.js"></script>
</body>


<!-- index.html  21 Nov 2019 03:47:04 GMT -->
</html>