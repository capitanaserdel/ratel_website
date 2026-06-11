<?php include 'includes/sub_header.php';?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/header.php';?>
 <link rel="stylesheet" href="assets/bundles/datatables/datatables.min.css">
  <link rel="stylesheet" href="assets/bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css">
<body>
  <div class="loader"></div>
  <div id="app">
    <div class="main-wrapper main-wrapper-1">
      <div class="navbar-bg"></div>
      <?php include 'includes/nav_menu.php'; ?>
     <?php include 'includes/main_menu.php'; ?>
      <!-- Main Content -->
      <div class="main-content" <?php allow_access(1,1,0,$usergroup); ?>>
        <section class="section">
          <div class="section-body">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Users <i class="fas fa-users "></i></h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      
                      <table class="table table-striped" id="tableExport" >
                        <thead>
                          <tr>
                            <th class="text-center">#</th>
                      <th>Fullname</th>
                      <th>Status</th>
                        <th>Picture</th>
                        <th>Position</th>
                        <th>Email</th>  
                        <th>Action</th>
                       
                      </tr>
                        </thead>
                        <tbody>
                          <?php
require_once("../conn/config.php");
 

$query = mysqli_query($config,"SELECT * FROM `admin_user`");
  $j=0;
while (($data = mysqli_fetch_assoc($query))){
  $j++;
  $status=$data["status"];
  switch ($status) {
    case '1':
      $status="Active";
     $td='<td><div class="badge badge-success">'.$status.'</div></td>';
      break;
    case '0':
   $status="Deactivated";
   $td='<td><div class="badge badge-danger">'.$status.'</div></td>';
    break;
    default:
     $status="Unknown";
      break;
}
  ?>
                          <tr>
     <td><?php echo $j; ?></td>
     <td><?php echo $data['fullname'];?></td>
    <?php echo $td;?>
    
      <td class="text-truncate">
                          <ul class="list-unstyled order-list m-b-0 m-b-0">
                            <li class="team-member team-member-sm"><img class="rounded-circle"
                                src="assets/img/users/<?php echo $data['profPic'];?>" alt="user" data-toggle="tooltip" title=""
                                data-original-title="<?php echo $data['fullname'];?> "></li>
                             
                             
                          </ul>
                        </td>
      <td><?php echo $data['position'];?></td>
      <td><?php echo $data['email'];?></td>
      
<td><?php if($data['status']==0){?>
<button  onclick="window.location='admin_users_update.php?id=<?php echo $data['id'];?>&act=1'" class="btn btn-success waves-effect btn-compose m-b-15">Active</button><?php }else{?>
  <button onclick="window.location='admin_users_update.php?id=<?php echo $data['id'];?>&act=0'"  class="btn btn-danger waves-effect btn-compose m-b-15">Deactivate</button><?php }?></td>
                           </tr>
                         <?php }?>
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
  <script type="text/javascript">
  function myf(){
   
      var rv=$("#rv").val();
      if(rv!==""){
      $("#rnumber").val(rv);
      $("edt").hide();
    }
}
function myf1(){
 $("#rv").prop('type', 'text');
 $("#edt").hide();
 $("#cnl").show();
}
</script>
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