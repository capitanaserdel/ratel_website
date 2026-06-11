<?php
//session_start();
include '../conn/config.php';

$reference=mysqli_real_escape_string($config,$_GET['reference']);
$newN='0'.mysqli_real_escape_string($config,$_GET['newN']);
 $time=mysqli_real_escape_string($config,$_GET['timest']);

        mysqli_query($config, "UPDATE `reg_payment` SET  `rnAllocated`='$newN',`timestamp`='$time' WHERE reference='$reference' limit 1")or die (mysqli_error($config));
    

 