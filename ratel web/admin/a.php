<?php
$server_ip = $_SERVER['REMOTE_ADDR'];
echo "Server Internal IP Address is: $server_ip";
die;
require_once("../conn/config.php");
 

$query = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `switch_status` is Null and (date(`timestamp`)=curdate()) and channels='Paystack' order by `id` Asc limit 200");
  //$j=0;
while (($data = mysqli_fetch_assoc($query))){
  $reference=$data["reference"];
  echo "<script>window.open('https://ratelplus.net/ratelpay.php?reference=$reference');</script>";

}
  