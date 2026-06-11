<?php

require_once('conn/config.php');

if (isset($_POST['importSubmit'])) {

    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');

    if (!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)) {

        if (is_uploaded_file($_FILES['file']['tmp_name'])) {

            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            

            fgetcsv($csvFile);

            while (($line = fgetcsv($csvFile)) !== false) {

                $rnm   = $line[0];

                $passwd  = $line[1];
                
             $prevQuery = "SELECT `ratelnumber` FROM `unallocated_Rno` WHERE ratelnumber = '$rnm'";

                $prevResult = mysqli_query($config,$prevQuery);
                $num_rows = mysqli_num_rows($prevResult);
            

                if ($num_rows == 0) {
            $query="INSERT INTO `unallocated_Rno`(`ratelnumber`,`passwd`)VALUES('$rnm','$passwd')";
              mysqli_query($config,$query);
            }  

            }

            fclose($csvFile);

            $qstring = '?status=succ';

        } else {

            $qstring = '?status=err';

        }

    } else {

        $qstring = '?status=invalid_file';

    }

}

header("Location: addnumberscsv.php".$qstring);
?>
