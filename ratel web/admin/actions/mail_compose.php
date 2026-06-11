<?php
//session_start();
include '../conn/config.php';

if (isset($_POST['formData'])) {
$reference=mysqli_real_escape_string($config,$_POST['reference2']);
$email=mysqli_real_escape_string($config,$_POST['email']);
$sender=mysqli_real_escape_string($config,$_POST['sender']);
$subject=mysqli_real_escape_string($config,$_POST['subject']).' '.$reference;
$mbody=mysqli_real_escape_string($config,$_POST['mbody']);
$staffemail=mysqli_real_escape_string($config,$_POST['staffemail']);
$source=mysqli_real_escape_string($config,$_POST['source']);
$cusname=mysqli_real_escape_string($config,$_POST['cusname']);
$newN=mysqli_real_escape_string($config,$_POST['newN']);
///////////Check to avaid duplicate
        $result = mysqli_query($config,"SELECT `status` FROM `unallocated_Rno` WHERE ratelnumber='$newN'"); 
        $row_result = mysqli_fetch_assoc($result);
        $sts=$row_result['status'];
        if($sts=="INITIAL"){
        //////////
    $query = mysqli_query($config, "INSERT INTO `mail_reply`(toc,sender,subject,mbody,source,staff)VALUES('$email','$sender','$subject','$mbody','$source','$staffemail')")or die (mysqli_error($config));
       if ($query) {
        
        mysqli_query($config, "UPDATE `unallocated_Rno` SET  `status`='Allocated',`staff`='$staffemail' WHERE ratelnumber='$newN'")or die (mysqli_error($config));
        mysqli_query($config, "UPDATE `registration` SET  `rnAllocated`='$newN' WHERE reference='$reference' limit 1")or die (mysqli_error($config));
        mysqli_query($config, "UPDATE `reg_payment` SET  `rnAllocated`='$newN' WHERE reference='$reference' limit 1")or die (mysqli_error($config));
        include 'smtp.php';
        echo "Message was sent successfull";

    }else{
        echo mysqli_error($config);
    }
}else{
   echo "Number is Assign to another customer! pls retry"; 
}
}
