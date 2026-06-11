<?php
  require '../forms/phpmailer/class.phpmailer.php'; 
  $mail = new PHPMailer;
//$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->SMTPDebug = 1;
$mail->Host = 'smtp.sendgrid.net';  // Specify main and backup SMTP servers
//$mail->SMTPAuth = false;                               // Enable SMTP authentication
//$mail->Username = '';                 // SMTP username
//$mail->Password = '';// SMTP password
//$mail->Port = 465;
//$mail->SMTPSecure = 'ssl';                           // Enable encryption, 'ssl' also accepted
$to="munzali@ereg.ng";
$mail->From = $_POST['email'];
$mail->FromName = $_POST['name'];
$mail->addAddress($to);               // Name is optional
$mail->isHTML(true);                              // Set email format to HTML 
$mail->Subject = $_POST['subject'];
$mail->Body = $_POST['message'];
$mail->AltBody = '';
echo $mail->send();