<?php
if ($_FILES['image']['error'] == 0) {
    $target_dir = '/home/ratesour/ratelplus.net/uploads/';
    $target_file = $target_dir . basename($_FILES['image']['name']);
     
     $uploadOk = 1;
     $extension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    if (file_exists($target_file)) {
   echo json_encode(['status' => 'error', 'message' => 'Image name already exist '. '('.basename($_FILES['image']['name'].')'.' please rename and Upload it again.')]);
  $uploadOk = 0;
}else{

if(($extension!='jpg') && ($extension!='png') && ($extension!='jpeg')){
    echo json_encode(['status' => 'error', 'message' => 'Invalid Image format. Only jpg,jpeg or pnd.']);
   
}else{
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        echo json_encode(['status' => 'success', 'file' => basename($_FILES['image']['name'])]);

    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload']);
    }}}
} else {
    echo json_encode(['status' => 'error', 'message' => 'File error or size is too big.']);
}
 
?>
