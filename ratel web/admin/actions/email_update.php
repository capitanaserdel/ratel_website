<?php require_once('../conn/config.php');
if(isset($_GET['r']) or (isset($_GET['rd']))){
	if(isset($_GET['r'])){
		$sql="`mail_status`=1";
		$reference=$_GET['r'];
	}else{
		$sql="`mail_status`=2";
		$reference=$_GET['rd'];
	}
	
	$result = mysqli_query($config,"UPDATE `registration` SET $sql where `reference`=$reference");
 if($result){
 	header("location:../registration.php");
 }else{
 	echo mysqli_error($config);
 }
}
else{
	header("location:../registration.php");
}
?>
