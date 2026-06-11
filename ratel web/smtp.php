<?php
require_once("forms/phpmailer/class.phpmailer.php");
$mail = new PHPMailer;
$from=$email;
$to="customercare@ratelplus.net";
 
 
//////////////////////////
$mylogo='<img src="https://ratelplus.net/assets/img/rATEL-LOGO.png" />';
$defaultPath = $mylogo.'<br>'.'The following is a message from: <a href="https://ratelplus.net">RatelPlus</a>';
    $subject =  $source2." {Opay} ".$reference;
 
 
               $headers  = "From: $from\r\n"; 
               $headers .= "MIME-Version: 1.0\r\n";
               $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
               
if($source=='Personal_Subscriber'){//Personal Subs Opay
$message="<b>Customer Name:</b>  $fname $sname<hr>
<b>Gender: </b> $gender<hr>
<b>Email Address:</b> $email<hr>
<b>Mobile Number:</b> $phone<hr>
<b>Residential Address:</b> $addr<hr>
<b>Ratel Number Location:</b> $RnLoc<hr>
<b>NIN Number:</b> $nin<hr>
<b>Valid Identification:</b> $pic1<hr>
<b>Passport Photo:</b> $pic2<hr>
<b>Request:</b> $source<hr>
<b>Amount Paid:</b> &#8358;$amount<hr>
<b>Payment Source:</b>Opay<hr>
<b>TimeStamp:</b> $timestmp<hr>
";
}elseif($source=='Business Subscriber'){//Business Subs Opay
                   
$message="<b>REGISTERED COMPANY NAME:</b> $fname<hr>
<b>RC-NUMBER: </b> $rc<hr>
<b>DATE OF INCORPORATION/-REGISTRATION: </b> $dateof<hr>
<b>BUSINESS ADDRESS:</b> $addr<hr>
<b>CONTACT PHONE NUMBER:</b> $phone<hr>
<b>COMPANY SERVICES:</b> $compS<hr>
<b>DIRECTOR'S NAME:</b> $sname<hr>
<b>EMAIL:</b> $email<hr>
<b>UPLOADED CAC CERTIFICATE:</b> $pic1<hr>
<b>VALID ID:</b>$pic2<hr>
<b>UPLOADED PROOF OF ADDRESS:</b> $pic3<hr>
<b>NUMBER OF LINES REQUIRED:</b> $NumberOf<hr>
<b>RATEL NUMBER LOCATION:</b> $RnLoc<hr>
<b>AMOUNT PAID:</b> &#8358;$amount<hr>
<b>Payment Source:</b>Opay<hr>
<b>TIMESTAMP:</b> $timestmp<hr>
";
}else{//Calling Card Opay
    $message="<b>Customer Name:</b>  $fname $sname<hr>
<b>Gender: </b> $gender<hr>
<b>Email Address:</b> $email<hr>
<b>Mobile Number:</b> $phone<hr>
<b>Residential Address:</b> $addr<hr>
<b>Ratel Number Location:</b> $RnLoc<hr>
<b>NIN Number:</b> $nin<hr>
<b>Valid Identification:</b> $pic1<hr>
<b>Passport Photo:</b> $pic2<hr>
<b>Request:</b> $source<hr>
<b>Amount Paid:</b> &#8358;$amount<hr>
<b>Payment Source:</b>Opay<hr>
<b>TimeStamp:</b> $timestmp<hr>
";
}
 
               $fullMessage = 
                       "<html style=\"height: 70%;\">
                         <body style=\"height: 70%;\">
                            <div style=\"min-height: 100%;height: auto !important;height: 70%;margin: 0 auto 63px;\">
                            <div style=\"min-height: 20px;padding: 8px;margin-bottom: 20px;background-color: #f5f5f5;border: 1px solid #e3e3e3;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);width: 100%;\"><center>$defaultPath</center></div>
                            <div class=\"visitorMessage\">
                                <table style=\"width: 100%;\">
                                     
                                    <tr><td style=\"border:3px solid #FF704D;;text-align:center;font-family:Helvetica,Arial,sans-serif; font-size:14px;padding:10px;text-align:left;\">$message</td></tr>
                                </table>
                            </div>
                            
                            </div>
                             
                         </body>
                       </html>";
//////////////////////////////////
$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->SMTPDebug = 1;
$mail->Host = 'ratelplus.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = FALSE;                               // Enable SMTP authentication
$mail->Username = 'smtp@ratelplus.net';                 // SMTP username
$mail->Password = 'smtp@ratel';                         // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = $from;
$mail->FromName = $fname." ".$sname;

$mail->addAddress($to, 'RatelPlus');               // Name is optional
//$mail->addReplyTo('no-reply@evrs.ng' , 'eVRS');

$mail->isHTML(true);                                  // Set email format to HTML 

$mail->Subject = $subject;
$mail->Body = $fullMessage;

//$attach_file = $folder."".$file_name;
$path="/home/ratesour/public_html/ratelplus.net/uploads/";
 
$file_to_attach1 = $path.$pic1;
$file_to_attach2 = $path.$pic2;
$file_to_attach3 = $path.$pic3;

$mail->AddAttachment( $file_to_attach1);
$mail->AddAttachment( $file_to_attach2);
$mail->AddAttachment( $file_to_attach3);

$mail->AltBody = '';
if($mail->send()){
$msg="Message has been sent successfully.";
}
else{
echo "Error Sending Mail";
}