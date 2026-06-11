<?php
require_once('conn/config.php');
$curl_balance = curl_init();
curl_setopt_array($curl_balance, [
  CURLOPT_URL => "http://portal.ratelplus.net/api/customer_api?token=bTCRAod9cl&action_type=2",
 CURLOPT_BUFFERSIZE>=2048,
 CURLOPT_NOPROGRESS=> false,
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  
  CURLOPT_MAXREDIRS => 100,
  CURLOPT_TIMEOUT => 0,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_FOLLOWLOCATION=> true,
  CURLOPT_POSTREDIR =>4,
  CURLOPT_POSTFIELDS => "",
]);

$response = curl_exec($curl_balance);
$array=array($response);
$array_get = json_decode($array[0], true);
 
////////////////////
if(!$array_get){
echo "Error endpoint not responding";
  die;
  }
$main=$array_get['data'];
  
  $startIndex = 109955; // Start from the element at index 

    $slicedArray = array_slice($main, $startIndex);
  
// if (json_last_error() !== JSON_ERROR_NONE) {
//     die("Error decoding JSON: " . json_last_error_msg());
// }

// 4. Loop through the array
if (is_array($slicedArray)) {
 foreach($slicedArray as $result) {
$id=$result['id'];
//die;
$ratelnumber=$result['account'];
 $check = mysqli_num_rows(mysqli_query($config,"SELECT `cus_id` FROM `switch_data` WHERE `ratelnumber`='$ratelnumber'"));
 if ($check == 0) {
  //echo $id;   
$query="INSERT INTO `switch_data`(`cus_id`,`ratelnumber`)VALUES($id,'$ratelnumber')";
mysqli_query($config,$query);
//$i++;
}
}
echo "Success<br><script>window.close()</script>";
} else {
    echo "The JSON file does not contain a top-level array.";
}
  

