<?php
require_once('conn/config.php');

$delete=mysqli_query($config,"DELETE FROM `opay_payment` WHERE  `opay_status`='Transaction ID should be numeric.' OR `opay_status`='Transaction reference not found.' OR `opay_status`='abandoned' OR `opay_status`='failed' OR `opay_status`='CLOSE' OR `opay_status`='FAIL'");

?>