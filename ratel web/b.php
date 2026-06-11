<?php
require_once("forms/phpmailer/class.phpmailer.php");
$mail = new PHPMailer;

 $mbody="Testing Mail Server";
//////////////////////////
$mylogo='<img src="https://ratelplus.net/assets/img/rATEL-LOGO.png" />';
$defaultPath = $mylogo.'<br>'.'The following is a message from: <a href="https://ratelplus.net">RatelPlus</a>';

 
 
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
                                     
                                    <tr><td style=\"border:3px solid #FF704D;;text-align:center;text-align:left;\">$mbody</td></tr>
                                </table>
                            </div>
                            
                            </div>
                             
                         </body>
                       </html>";
//////////////////////////////////
$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->SMTPDebug = 3;
$mail->Host = 'ratelplus.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'smtp@ratelplus.net';                  // SMTP username
$mail->Password = 'smtp@ratel';                         // SMTP password

$mail->From = "munzali@ratelplus.net";
$mail->FromName = "Munzali Test";
$mail->addAddress('munzalihassan030@gmail.com');               // Name is optional

$mail->isHTML(true);                                  // Set email format to HTML 

$mail->Subject = "smtp test 33";
$mail->Body = $fullMessage;
 
$mail->AltBody = '';
$mail->send();
?>