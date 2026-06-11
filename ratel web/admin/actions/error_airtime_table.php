<?php
//Remove Page
echo "Error";
die;
require_once("../conn/config.php");
$query = mysqli_query($config,"SELECT * FROM `opay_payment` WHERE `status`=0 and opay_status='SUCCESS' and `switch_status` is Null and `amount_r`>0 and date(`timestamp`)=curdate() order by `id` desc");
  $j=0;
while (($data = mysqli_fetch_assoc($query))){
	$j++;
  switch ($data["channels"]) {
    case 'Opay':
      $img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="55">';
      $link="'"."https://ratelplus.net/opay_status.php?vpcode=".$data['reference']."','','popup','width=600,height=600'";
      break;
    case 'Paystack':
    $img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';
    $link="'"."https://ratelplus.net/ratelpay.php?&reference=".$data['reference']."','','popup','width=600,height=600'";
    break;
    default:
      $img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="55">';
     $link="#";
      break;
  }
  $reference=$data["reference"];
	$ratelnumber=$data["ratelnumber"];
	$channel=$data["channels"];
	$amount="&#8358; ".number_format($data["amount_r"]);
	$status="Error";
	$timestamp=$data["timestamp"];
  $qr="$('#rv".$j."').prop('type', 'text')";

echo '<tr>
     <td>'.$j.'</td>
      <td>'.$reference.'</td>
      <td class="align-middle"><input type="hidden" name="rnumber" id="rv'.$j.'" value="'.$ratelnumber.'">'.$ratelnumber.'</td>
      <td><span id="edt" style="display:block"><a href="#" onclick="'.$qr.'">Edit</a></span></td>
      <td>'.$img.'</td>
                            <td><div class="badge badge-success badge-shadow">'.$amount.'</div></td>
                            <td><div class="badge badge-success badge-danger">'.$status.'</div></td>
<td><form action="../opay_statuss" method="get" target="print_popup" name="form'.$reference.'"><input type="hidden" name="rnumber" value="" id="rnumber"><input type="hidden" name="vpcode" value="'.$reference.'"><button type="submit" class="btn btn-info" onmousemove="myf()">Retry</button></form></td>
                           </tr>';
?>
<?php }?>