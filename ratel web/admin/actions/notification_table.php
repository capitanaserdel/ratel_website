<?php 
if(session_status()===PHP_SESSION_NONE){
session_start();
} 
$coyID = $_SESSION['coy'];
$usergroup=$_SESSION['usergroup'];
require_once("../conn/config.php");
if(isset($coyID)){
$query_all_staff = "SELECT * FROM `admin_user` WHERE `id`=$coyID";

$all_staff = mysqli_query($config,$query_all_staff);

$row_staff_rec = mysqli_fetch_assoc($all_staff);
$staff=$row_staff_rec['email'];
$query = mysqli_query($config,"SELECT * FROM `registration` WHERE `mail_status`= 0 and prev=1 and isPaid=1 and (`staff`='$staff' or `staff` is null) order by `id` desc limit 5");
 
while (($data = mysqli_fetch_assoc($query))){
?>
<?php 
  $id=$data['id'];
	$pics1=$data["pics1"];
	$fname=$data["fname"];
	$sname=$data["sname"];
	$email=$data["email"];;
	$timestamp=$data["timestamp"];
	$element="'"."frm".$id."'";
// $link="href='registration_payment_details.php?r=$reference.'";

// 	switch ($channel) {
// 		case 'Opay':
// 			$img='<img alt="image" src="https://doc.opaycheckout.com/img/logos/opay_logo_dark.png" width="75">';
// 			break;
// 		case 'Paystack':
// 		$img='<img alt="image" src="https://i.imgur.com/YnKuEKq.png" width="85">';
// 		break;
// 		default:
// 			$img='<img alt="image" src="https://ratelplus.net/assets/img/rATEL-LOGO.png" width="85">';
// 			break;
	//}
echo '<span class="dropdown-list-content dropdown-list-message">
<form method="post" action="email-read.php" name="id" >
<input type="submit" id="frm'.$id.'" name="id" value="'.$id.'"  style="display:none">
                <a href="#" onclick="document.getElementById('.$element.').click();" class="dropdown-item"> <span class="dropdown-item-avatar
											text-white"> <img alt="image" src="https://ratelplus.net/uploads/'.$pics1.'" class="rounded-circle">
                  </span> <span class="dropdown-item-desc"> <span class="message-user">'.$fname." ".$sname.'</span>
                    <span class="time messege-text">'.$email.'</span>
                    <span class="time">'.$timestamp.'</span>
                  </span>
                  </a>
                  </form>
                </span>';
?>
<?php }}?>