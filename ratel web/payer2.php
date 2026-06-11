<?php
require_once('conn/config.php');
$device_ip = $_SERVER['REMOTE_ADDR'];
function isMobileDevice() {
return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo
|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i"
,$_SERVER["HTTP_USER_AGENT"]);
}
$device="";
if(isMobileDevice()){
  $device='Mobile';
}
else {
    $device='Web';
}
if(isset($_POST['reference'])and (!empty($_POST['source']))){
$source_post=$_POST['source'];
$source = str_replace(' ', '_', $source_post);
$reference = $_POST['reference'];
}else{
echo "<script>window.location='airtime.php';</script>";
}
//////////////////////////////////
if(isset($_POST['ratelnumber'])){
   
$number_validate=$_POST['ratelnumber'];
//$links="ratelpay.php?&reference=".$reference; 
$links="https://ratelplus.net/payment_success.php"; 
}else{
$number_validate=$_POST['phone'];
//$links="/subs/payupdate.php?id=".$reference."&phone=".$number_validate;
}
$ratelnumber=$number_validate;
$ratelnumber2=bin2hex($ratelnumber);
$reference2=bin2hex($reference);

//////////////////////////////////
if(isset($_POST['fname']) and (isset($_POST['email'])) and ($source_post!="Airtime")){
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$email=$_POST['email'];
$price=$_POST['price'];

//$phone=$_POST['phone'];
switch ($_POST['source']) {
  case 'Personal Subscriber':
    $amount=1000;
    $total=($amount*100);
    break;
  case 'Business Subscriber':
    $amount="1500";
    $total=($amount*100);
    break;
    
  default:
    $amount=0;
    $total=(0*100);
    break;
}
/////////////////////Calling Card
if(isset($_POST['price'])and (!empty($_POST['price']))){
switch($price){
    case '100 Minutes' :
    $amount=2000;
    $total=($amount*100);
    break;
    case '200 Minutes' :
    $amount=3000;
    $total=($amount*100);
    break;
    case '500 Minutes' :
    $amount=6000;
    $total=($amount*100);
    break;
    default:
    $amount=0;
    $total=(0*100);
    
 }
}
}
else{/////////Airtime Recharge
if($source_post=="Airtime"){
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$email=$_POST['email'];
$amount=$_POST['amount'];
$total=($amount*100);
   
}
}
?>
<script src="https://js.paystack.co/v1/inline.js"></script>
<body>
<?php if(isset($_POST['paystack'])=="paystack"){?>
<?php $check = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1"));
 if ($check == 0) {
$query="INSERT INTO `opay_payment`(`reference`,`ratelnumber`,`opay_status`,`progress`,`devices_os`,`device_ip`,`channels`)VALUES('$reference','$ratelnumber','INITIAL',25,'$device','$device_ip','Paystack')";
$qr=mysqli_query($config,$query);?>
<script>
   var handler = PaystackPop.setup({
                      key: 'pk_live_f794eddafa6e2897901b7b801b901188a9526863',
      
                      amount: <?php echo $amount * 100 ?>, 
                      firstname: '<?php echo $fname; ?>',
                       phone: '<?php echo $ratelnumber; ?>',
                       ref: '<?php echo $reference; ?>',
                       
                                                   
                      metadata: {
                          custom_fields: [
                              {
                                  display_name: "Descriptions",
                                  variable_name: "<?php echo $source; ?>",
                                  value: "<?php echo $reference; ?>"
                              }
                          ]
                      },
                      callback: function (response) {
                          setTimeout(function () {
                  window.location = "<?php echo $links; ?>";
                          }, 200);
                      },
                      onClose: function () {
                        history.back();
                      }
                  });
                  handler.openIframe();
              
</script>
<?php }else{
//header("location:/airtime.php");
echo "<script>window.location='/airtime.php';</script>";
}?>
<?php }elseif(isset($_POST['opay'])=="opay") {?>
<?php
        $basic_auth_token="Bearer OPAYPUB17722214161430.48667319872775505";
        $check2 = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1"));
 if ($check2 == 0) {
$query2="INSERT INTO `opay_payment`(`reference`,`ratelnumber`,`opay_status`,`progress`,`devices_os`,`device_ip`,`channels`)VALUES('$reference','$ratelnumber','INITIAL',25,'$device','$device_ip','Opay')";
$qr=mysqli_query($config,$query2);
//'returnUrl' => 'https://ratelplus.net/opay_status.php?vpcode='.$reference,
 $data=array(
'country' => 'NG',
'reference' => $reference,
'amount' => array('total'=>$total,'currency'=>'NGN'),
'returnUrl' => 'https://ratelplus.net/payment_success.php',
'callbackUrl' => 'https://ratelplus.net/opay_status_whl.php',
'cancelUrl' => 'https://ratelplus.net/airtime.php',
'displayName' =>'RatelPlus',
'expireAt' => '300',
'userInfo' =>array('userEmail' =>$email,'userId' =>$reference,'userMobile' =>$ratelnumber,'userName' => $fname.' '.$lname),
'product' => array('description'=>'Buying of Airtime using Opay endpoing','name'=>'Airtime purchase')
);
  $url = "https://liveapi.opaycheckout.com/api/v1/international/cashier/create";
$payload = json_encode($data);
// echo $payload;
// die;
  
$ch = curl_init($url);
              curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
              curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                  "Authorization:".$basic_auth_token,
                  "Content-Type: application/json",
                  "MerchantId: 256624031449374"
              ));
              curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


             if($qr){
             $result = curl_exec($ch);
           }else{
           // header("location:/airtime.php");
            echo "<script>window.location='/airtime.php';</script>";
           }
              $array2 = json_decode($result, true); //decode the JSON response
              //mail("munzali@ratelplus.net","payload Opay","Response:".$result."<br><br><br>Reference:".$reference);
            //   echo print_r($array2);
            //   die;
 if($result){
              $msg=$array2['message'];
    $redurl=$array2['data']['cashierUrl'];
if($msg=="SUCCESSFUL"){
    echo "<script>window.location='$redurl';</script>";
//header("Location:$redurl");

}
}else{
  echo "<script>history.back();</script>";
}
}else{
//header('location:/airtime.php');
 echo "<script>window.location='airtime.php';</script>";

}
ob_end_flush();
?>
<?php }elseif(isset($_POST['moni'])=="moni") {?>
	<?php $check3 = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `opay_payment` WHERE reference='$reference' and date(`timestamp`)=curdate() ORDER BY `id` desc LIMIT 1"));
 if ($check3 == 0) {
$query3="INSERT INTO `opay_payment`(`reference`,`ratelnumber`,`opay_status`,`progress`,`devices_os`,`device_ip`,`channels`)VALUES('$reference','$ratelnumber','INITIAL',25,'$device','$device_ip','Monipoint')";
$qr=mysqli_query($config,$query3);
$key="MK_TEST_GTA4W564V5";
$links="https://ratelplus.net/payment_success.php";?>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="https://sdk.monnify.com/plugin/monnify.js"></script>
<script>
    $(document).ready(function() {
      MonnifySDK.initialize({
        amount: 100,
        currency: "NGN",
        reference: <?php echo $reference; ?>,
        customerFullName: "<?php echo $fname; ?>",
        customerEmail: "<?php echo $email; ?>",
        apiKey: "<?php echo $key; ?>",
        contractCode: "8492039654",
        paymentDescription: "Buying of Airtime using Monipoint",
        metadata: {
          name: "<?php echo $fname; ?>",
          age: 45,
        },
      paymentMethods: [
       "CARD",
       "ACCOUNT_TRANSFER",
       "USSD",
       "PHONE_NUMBER"
        ],
        
        onComplete: function (response) {
         
          window.location="https://ratelplus.net/payment_success.php";
        },
        onClose: function (data) {
          //history.back();
          window.location="https://ratelplus.net/airtime.php";
          //console.log(data);
        },
      });
      });
  </script>
  <?php }else{
//header("location:/airtime.php");
echo "<script>window.location='/airtime.php';</script>";
}?>
  <?php }else{echo "<script>window.location='airtime.php';</script>";}?>

</body>