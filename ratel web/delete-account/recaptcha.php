<?php
    $public_key = "6LewHtwqAAAAAOgYE2BrH93dI7HvcZR1qqsYNT5l";
    $private_key = "6LewHtwqAAAAABey4lpM_AFjIQxF0-zdDZigTkmD";
    $url = "https://www.google.com/recaptcha/api/siteverify";
        
    if(isset($_POST['g-recaptcha-response'])){

        $response_key = $_POST['g-recaptcha-response'];
        $response = file_get_contents($url.'?secret='.$private_key.'&response='.$response_key.'&remoteip='.$_SERVER['REMOTE_ADDR']);
        $response = json_decode($response);

        if($response->success == 1)
        {
            
        }else{
            echo "You are a robot and we don't like robots.";
        }
    }
?>