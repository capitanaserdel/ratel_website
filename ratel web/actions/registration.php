<?php
//session_start();
include '../conn/config.php';
ob_start();
if (isset($_POST['formData'])) {
$reference = str_pad(mt_rand(1,99999999),8,'0',STR_PAD_LEFT);
$pics1=mysqli_real_escape_string($config,$_POST['pics1']);
$pics2=mysqli_real_escape_string($config,$_POST['pics2']);
$mobile=$_POST['mobile'];
$fname=mysqli_real_escape_string($config,$_POST['fname']);
$sname=mysqli_real_escape_string($config,$_POST['sname']);
$email=mysqli_real_escape_string($config,$_POST['email']);
//$loc=mysqli_real_escape_string($config,$_POST['loc']);
$loc="Abuja (09)";
$addr=mysqli_real_escape_string($config,$_POST['addr']);
$source=mysqli_real_escape_string($config,$_POST['source']);
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
    $query = mysqli_query($config, "INSERT INTO `registration`(mobile,calling_card,fname,sname,reference,gender,email,loc,nin,addr,pics1,pics2,pics3,amount,source,rc_number,date_of_inc,company_services,no_of_lline)VALUES('$mobile','$price','$fname','$sname','$reference','$gender','$email','$loc','$nin','$addr','$pics1','$pics2','$pics3','$amount','$source','$rc','$dateof','$compserv','$noL')")or die (mysqli_error($config));
       if ($query) {
        $last_id = mysqli_insert_id($config);
        echo "Success";
        echo    "<script>setTimeout(function(){

        $.redirect('subs/pay_sub.php', {formData:1,pics1:'$pics1',pics2:'$pics2',mobile:'$mobile',price:'$price',fname:'$fname',sname:'$sname',reference:$reference,gender:'$gender',email:'$email',loc:'$loc',nin:'$nin',addr:'$addr',amount:'$amount',lastID:'$last_id',source:'$source'});
        },3000);
        </script>";
}
}
}
?>
<script src="plugins/jquery/jquery.post.js"></script>