<?php
include '../conn/config.php';
ob_start();
require_once("../forms/phpmailer/class.phpmailer.php");
$mail = new PHPMailer;
if (isset($_POST['formData'])) {
$fname=mysqli_real_escape_string($config,$_POST['fname']);
$email=mysqli_real_escape_string($config,$_POST['email']);
$subject=mysqli_real_escape_string($config,$_POST['subject']);
$msg=mysqli_real_escape_string($config,$_POST['msg']);
$from=$email;
$to="support@ratelplus.net";

//////////////////////////
$mylogo='<img src="https://ratelplus.net/assets/img/rATEL-LOGO.png" />';
$defaultPath = $mylogo.'<br>'.'The following is a message from: <a href="https://ratelplus.net">RatelPlus</a>';
               $headers  = "From: $from\r\n"; 
               $headers .= "MIME-Version: 1.0\r\n";
               $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
               

               $fullMessage = 
                       "<html style=\"height: 70%;\">
                         <body style=\"height: 70%;\">
                            <div style=\"min-height: 100%;height: auto !important;height: 70%;margin: 0 auto 63px;\">
                            <div style=\"min-height: 20px;padding: 8px;margin-bottom: 20px;background-color: #f5f5f5;border: 1px solid #e3e3e3;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);width: 100%;\"><center>$defaultPath</center></div>
                            <div class=\"visitorMessage\">
                                <table style=\"width: 100%;\">
                                     
                                    <tr><td style=\"border:3px solid #FF704D;;text-align:center;font-family:Helvetica,Arial,sans-serif; font-size:14px;padding:10px;text-align:left;\"><h2><center>$subject</center></h2><br>$msg</td></tr>
                                </table>
                            </div>
                            
                            </div>
                             
                         </body>
                       </html>";
//////////////////////////////////
$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->SMTPDebug = 1;
$mail->Host = 'mail.ratelplus.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = FALSE;                               // Enable SMTP authentication
$mail->Username = 'smtp@ratelplus.net';                 // SMTP username
$mail->Password = 'smtp@ratel';                         // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = $from;
$mail->FromName = $fname;

$mail->addAddress($to, 'RatelPlus');               // Name is optional
//$mail->addReplyTo('no-reply@ratelplus.net' , 'RatelPlus');

$mail->isHTML(true);                                  // Set email format to HTML 

$mail->Subject = $subject;
$mail->Body = $fullMessage;


$mail->AltBody = '';
if($mail->send()){
echo "Your message has been sent. Thank you!";
echo    "<script>setTimeout(function(){
window.location.href = '/';
        },3000)";
}
 
else{
echo "Error Sending Mail";
}
}else{
    die;
}