<?php
$curl_balance = curl_init();
curl_setopt_array($curl_balance, [
  CURLOPT_URL => "https://portal.ratelplus.net/api/livecalls?token=bTCRAod9cl",
CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "",
]);

$response = curl_exec($curl_balance);
$array = json_decode($response, true); //decode the JSON response
//print_r($array);
$count=count($array['live_calss']);
 for ($x = 0; $x <= $count-1; $x++) {

    $call_id=$array['live_calss'][$x]['callId'];
    $caller=$array['live_calss'][$x]['caller'];
    $callee=$array['live_calss'][$x]['callee'];
    $duration=$array['live_calss'][$x]['duration'];
    $keepTime=$array['live_calss'][$x]['keepTime'];
    $callee_info=$array['live_calss'][$x]['callee_info'];
    $caller_info=$array['live_calss'][$x]['caller_info'];
    $called_gateway=$array['live_calss'][$x]['called_gateway'];
    
 echo '<tr>
      <td>'.$call_id.'</td>
      <td class="align-middle">'.$caller.'</td>
      <td>'.$callee.'</td>
                            <td><div class="badge badge-success badge-shadow">'.$duration.'</div></td>
                            <td><div class="badge badge-warning">'.$keepTime.'</div></td>
                            <td><div class="badge badge-info badge-shadow">'.$callee_info.'</div></td>
                            <td>'.$caller_info.'</td>
                           <td>'.$called_gateway.'</td>
                           </tr>';
 }
 


