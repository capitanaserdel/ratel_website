<?php
require_once('../conn/config.php');
$source_post=$_POST['source'];

$source = str_replace(' ', '_', $source_post);
$reference = $_POST['reference'];
//////////////////////////////////
if(isset($_POST['ratelnumber'])){
   
$number_validate=$_POST['ratelnumber'];
$links="ratelpay.php?&reference=".$reference; 
}else{
$number_validate=$_POST['phone'];
$links="/subs/payupdate.php?id=".$reference."&phone=".$number_validate;
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
   
<script>
   var handler = PaystackPop.setup({
                      key: 'pk_live_f794eddafa6e2897901b7b801b901188a9526863',
                      email: '<?php echo $email; ?>',
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
           
          <?php }else{?>
            <?php
        $basic_auth_token="Bearer OPAYPUB17104990623630.8753455192233814";
        $check = mysqli_num_rows(mysqli_query($config,"SELECT `reference` FROM `opay_payment` WHERE `reference`=$reference"));
 if ($check == 0) {
$query="INSERT INTO `opay_payment`(`reference`,`ratelnumber`,`opay_status`)VALUES($reference,$ratelnumber,'INITIAL')";
$qr=mysqli_query($config,$query);

 $data=array(
'country' => 'NG',
'reference' => $reference,
//'amount' => array('total'=>3*100,'currency'=>'NGN'),
'amount' => array('total'=>$total,'currency'=>'NGN'),
'returnUrl' => 'https://ratelplus.net/opay_status.php?vpcode='.$reference,
'callbackUrl' => 'https://ratelplus.net/opay_status.php',
'cancelUrl' => 'https://ratelplus.net/',
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
            header("location:/airtime.php");
           }
              $array2 = json_decode($result, true); //decode the JSON response
            //   echo print_r($array2);
            //   die;
              if($result){
              $msg=$array2['message'];
    $redurl=$array2['data']['cashierUrl'];
 if($msg=="SUCCESSFUL"){
header("location:$redurl");
 }
}else{
  echo "<script>history.back();</script>";
}
}else{
header("location:/airtime.php");
}
?>
<?php }?>
</body>