<?php require_once("../conn/config.php");
$query = mysqli_query($config,"SELECT * FROM `opay_payment` where date(`timestamp`)=curdate() order by `id` desc limit 15");
$j=0;
while (($data = mysqli_fetch_assoc($query))){
	$j++;
?>
<?php 
	$reference=$data["reference"];
	$phone=$data["method"];
	$ratel=$data["ratelnumber"];
	$channel=$data["channels"];
	$bankstatus=$data["opay_status"];
	$amount="&#8358; ".number_format($data["amount_r"]);
	$timestamp=$data["timestamp"];
	if(isset($data["progress"])){
	$progress=$data["progress"];
}else{
	$progress=58;
}
	switch ($progress) {
		case 25:
			$pbadge='danger';
			break;
			case 50:
			$pbadge='orange';
			break;
		case 75:
			$pbadge='purple';
			break;
			case 100:
			$pbadge='success';
			break;
			default:
			$pbadge='danger';
			//$progress=4;
			break;

	}
	$switch_status=$data["switch_status"];;
 switch ($switch_status) {
 	case 'balance added successfully':
 		$switch="Success";
 		$badge='success">';
 		break;
 		case '':
 		$switch="Waiting";
 		$badge='info">';
 		break;
 	default:
 		$switch=$switch_status;
 		$badge='danger">';
 		break;
 }

	switch ($channel) {
		case 'Opay':
			$img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="55">';
			break;
		case 'Paystack':
		$img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="65">';
		break;
		default:
			$img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="55">';
			break;
	}
	$dw="data-width=";
	$p="100%";
echo '<tr><td><div class="badge badge-info">'.$bankstatus.'</div></td>
                        <td>'.$reference.'</td>
                        <td>'.$ratel.'</td>
                        <td><div class="badge badge-info">'.$phone.'</div></td>
                        <td>
                          <div class="progress-text">'.$progress.'%</div>
                       <div class="progress progress-xs">
                                <div class="progress-bar bg-'.$pbadge.' width-per-'.$progress.'">
                                </div>
                              </div>
 
                        </td>
                        <td>'.$img.'</td>
                        <td>'.$amount.'</td>
                        <td>
                          <div class="badge badge-'.$badge.$switch.'</div>
                          </td>
                          <td>'.$timestamp.'</td>
                         </tr>';
?>
<?php }?>
