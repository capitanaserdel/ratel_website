<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
<script type="text/javascript">
    var updateInterval = 2000;
    setInterval(updatePlayerCount, updateInterval);
     function updatePlayerCount() {
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
      }
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
          <div class="section-body">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Live Calls -- <span class="badge rounded-pill bg-success" id="livecall_count3"></span></h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            
                            <th class="text-center">Call ID</th>
                            <th>caller</th>
                            <th>callee</th>
                            <th>Duration</th>
                            <th>keepTime</th>
                            <th>Callee info</th>
                            <th>Caller info</th>
                            <th>Gateway</th>
                         </tr>
                        </thead>
                        <tbody id="livecall">
                          
                        </tbody>
                      </table>
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
  <script src="assets/bundles/datatables/datatables.min.js"></script>
  <script src="assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js"></script>
  <script src="assets/bundles/jquery-ui/jquery-ui.min.js"></script>
  <!-- Page Specific JS File -->
  <script src="assets/js/page/datatables.js"></script>
  <!-- Template JS File -->
  <script src="assets/js/scripts.js"></script>
  <!-- Custom JS File -->
  <script src="assets/js/custom.js"></script>
</body>


<!-- datatables.html  21 Nov 2019 03:55:25 GMT -->
</html>