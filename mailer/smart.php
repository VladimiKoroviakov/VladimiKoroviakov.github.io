<?php 

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

require_once('phpmailer/PHPMailerAutoload.php');
//require_once('src/PHPMailer.php');
//require 'src/SMTP.php';
//require 'src/Exception.php';
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mr.vladimir.vl8@gmail.com';                 // Наш логин
$mail->Password = 'uwip zdty kuyp pkad';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('example@gmail.com', 'Portfolio');   // От кого письмо 
$mail->addAddress('mr.vladimir.vl8@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Portfolio website form submitted';
$mail->Body    = '
	Notification from Portfolio Website!<br><br>
	The user left this data:<br>
	Name: ' . $name . ' <br>
	E-mail: ' . $email . '<br>
	Message: ' . $text . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>
