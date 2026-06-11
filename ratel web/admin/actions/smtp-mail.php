<?php

require_once("../../forms/phpmailer/class.phpmailer.php");

$mail = new PHPMailer;
$sender="no-reply@ratelplus.net";
$subject="Password Reset";
$mylogo='<img src="https://ratelplus.net/assets/img/rATEL-LOGO.png" />';

$defaultPath = $mylogo.'<br>'.'The following is a message from: <a href="https://ratelplus.net">RatelPlus</a>';

$mbody="Dear,  $fname <br>A request was made to reset your password on the Ratel Admin Dashboard. If this was not from you, please ignore.<br>
<br>
Follow this link to complete the reset:<br>
<br>
<a href='https://site.ratelplus.net/user-password-reset.php?action=$TenDigitRandomNumber'><font color='blue'><strong>Reset Password</strong></font></a><br>";

 

 

               $headers  = "From: $sender\r\n"; 

               $headers .= "MIME-Version: 1.0\r\n";

               $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

               $fullMessage = 

                       "<html style=\"height: 70%;\">

                         <body style=\"height: 70%;\">

                            <div style=\"min-height: 100%;height: auto !important;height: 70%;margin: 0 auto 63px;\">

                            <div style=\"min-height: 20px;padding: 8px;margin-bottom: 20px;background-color: #f5f5f5;border: 1px solid #e3e3e3;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);width: 100%;\"><center>$defaultPath</center></div>

                            <div class=\"visitorMessage\">

                                <table style=\"width: 100%;\">

                                     

                                    <tr><td style=\"border:3px solid #FF704D;;text-align:center;font-family:Helvetica,Arial,sans-serif; font-size:14px;padding:10px;text-align:left;\">$mbody</td></tr>

                                </table>

                            </div>

                            

                            </div>

                             

                         </body>

                       </html>";

//////////////////////////////////

$mail->isSMTP();                                    // Set mailer to use SMTP

$mail->SMTPDebug = 0;

$mail->Host = 'ratelplus.net';  // Specify main and backup SMTP servers

$mail->SMTPAuth = FALSE;                               // Enable SMTP authentication

$mail->Username = 'smtp@ratelplus.net';                  // SMTP username

$mail->Password = 'smtp@ratel';                         // SMTP password

$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted



$mail->From = $sender;

$mail->FromName = "RatelPlus Admin Dashboard";



$mail->addAddress($usermail, 'RatelPlus');               // Name is optional

//$mail->addReplyTo('no-reply@evrs.ng' , 'eVRS');



$mail->isHTML(true);                                  // Set email format to HTML 



$mail->Subject = $subject;

$mail->Body = $fullMessage;



// //$attach_file = $folder."".$file_name;

// $path="/home/ratesour/public_html/test.ratelplus.net/uploads/";

 

// $file_to_attach1 = $path.$pic1;

// $file_to_attach2 = $path.$pic2;

// $file_to_attach3 = $path.$pic3;



// $mail->AddAttachment( $file_to_attach1);

// $mail->AddAttachment( $file_to_attach2);

// $mail->AddAttachment( $file_to_attach3);



$mail->AltBody = '';

$mail->send();

?>