<?php
//Receive the RAW post data.
    $paymentStatusJson = trim(file_get_contents("php://input"));

    //Attempt to decode the incoming RAW post data from JSON.
    $result = json_decode($paymentStatusJson, true);
    //json vars
    $reference = $result['payload']['reference']; 
    //$handler="POST Json method";
    mail("munzali@ratelplus.net","payload Monnify","Response:".$paymentStatusJson."<br><br><br>Reference:".$reference);