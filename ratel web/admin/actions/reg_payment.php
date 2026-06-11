<?php require_once("../conn/config.php");
echo "Error";//Remove page
die;
$query = mysqli_query($config,"SELECT * FROM `reg_payment` where `status`='success' order by `id` desc");
 $j=0;
while (($data = mysqli_fetch_assoc($query))){
	$j++;
	?>
	<?php 
	$reference=$data["reference"];
	$phone=$data["phone"];
	$channel=$data["channels"];
	$amount=$data["amount"];
	$source=$data["source"];
	$status=$data["status"];
	$timestamp=$data["timestamp"];
$link="href='registration_payment_details.php?r=$reference'";

	switch ($channel) {
		case 'Opay':
			$img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="75">';
			break;
		case 'Paystack':
		$img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';
		break;
		default:
			$img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="85">';
			break;
	}
echo '<tr>
     <td>'.$j.'</td>
      <td>'.$reference.'</td>
      <td class="align-middle">'.$phone.'</td>
      <td>'.$img.'</td>
                            <td><div class="badge badge-success badge-shadow">'.$amount.'</div></td>
                            <td>'.$source.'</td>
                            <td><div class="badge badge-info badge-shadow">'.$status.'</div></td>
                            <td>'.$timestamp.'</td>
                           <td><a class="btn btn-primary"'.$link.'>Detail</a></td>
                           </tr>';
?>
<?php }?>