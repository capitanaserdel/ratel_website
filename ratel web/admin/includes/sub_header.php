<?php
if(session_status()===PHP_SESSION_NONE){
session_start();
} 
$coyID = $_SESSION['coy'];
$usergroup=$_SESSION['usergroup'];
require "conn/config.php";

if(!isset($_SESSION['admin'])and(!isset($_SESSION['ict']))and(!isset($_SESSION['care']))){
echo "<script>window.location='/';</script>";
}
else{
    
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);
}
function allow_access($admin, $ict, $care, $usergroup){

    if ($admin == 0 AND $usergroup == 1) {

        echo "style='display:none;'";

    }

    if ($ict == 0  AND $usergroup == 2) {

        echo "style='display:none;'";

    }

    if ($care == 0  AND $usergroup == 3) {

        echo "style='display:none;'";

    }
}