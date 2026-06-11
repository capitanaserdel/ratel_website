<script src="https://ratelplus.net/plugins/jquery/jquery.post.js"></script>
<?php
//session_start();
include '../conn/config.php';

ob_start();
if (isset($_POST['formData'])) {
$referenceids = mysqli_real_escape_string($config,$_POST['referenceids']);
$mobile=$_POST['mobile'];
$fname=mysqli_real_escape_string($config,$_POST['fname']);
$sname=mysqli_real_escape_string($config,$_POST['sname']);
$email=mysqli_real_escape_string($config,$_POST['email']);
$loc=mysqli_real_escape_string($config,$_POST['loc']);
$addr=mysqli_real_escape_string($config,$_POST['addr']);
$source=mysqli_real_escape_string($config,$_POST['source']);
$staff=mysqli_real_escape_string($config,$_POST['staff']);
if (isset($_POST['pics1'])and (!empty($_POST['pics2']))){
$pics1=mysqli_real_escape_string($config,$_POST['pics1']);
$pics2=mysqli_real_escape_string($config,$_POST['pics2']);
}
else{
$query_pics= "SELECT * FROM `registration` WHERE `reference`=$referenceids";
$all_pics = mysqli_query($config,$query_pics);
$row_pics = mysqli_fetch_assoc($all_pics);
$pics1=$row_pics['pics1'];
$pics2=$row_pics['pics2'];
}
if(isset($_POST['price'])){
$price=mysqli_real_escape_string($config,$_POST['price']);
switch($price){
    case '100 Minutes' :
    $amount=2000;
    break;
    case '200 Minutes' :
    $amount=3000;
    break;
    case '500 Minutes' :
    $amount=6000;
    break;
    default:
    
    }
}else{
    $price=0;
    $amount=$_POST['amount'];
}

if(isset($_POST['rc'])){
    $rc=mysqli_real_escape_string($config,$_POST['rc']);
    $dateof=mysqli_real_escape_string($config,$_POST['dateof']);
    $compserv=mysqli_real_escape_string($config,$_POST['compserv']);
    $noL=mysqli_real_escape_string($config,$_POST['noL']);
    $pics3=mysqli_real_escape_string($config,$_POST['pics3']);
    $gender=null;
    $nin=null;
}else{
    $rc=null;
    $dateof=null;
    $compserv=null;
    $noL=null;
    $gender=mysqli_real_escape_string($config,$_POST['gender']);
    $nin=mysqli_real_escape_string($config,$_POST['nin']);
    $pics3=null;

}
if (!empty($pics1) && !empty($mobile)) {
    $query = mysqli_query($config, "UPDATE `registration` SET mobile='$mobile',calling_card='$price',fname='$fname',sname='$sname',gender='$gender',email='$email',loc='$loc',nin='$nin',addr='$addr',pics1='$pics1',pics2='$pics2',pics3='$pics3',amount='$amount',source='$source',rc_number='$rc',date_of_inc='$dateof',company_services='$compserv',no_of_lline='$noL',staff='$staff',isPaid=1,upt=1 WHERE
 `reference`=$referenceids")or die (mysqli_error($config));
        if ($query) {
        $last_id = mysqli_insert_id($config);
        echo "Successfully updated";
        echo    "<script>setTimeout(function(){

        $.redirect('subs/pay_sub_update.php', {formData:1,pics1:'$pics1',pics2:'$pics2',mobile:'$mobile',price:'$price',fname:'$fname',sname:'$sname',reference:$referenceids,gender:'$gender',email:'$email',loc:'$loc',nin:'$nin',addr:'$addr',amount:'$amount',lastID:'$last_id',source:'$source',staff:'$staff'});
        },3000);
        </script>";
}
}
}