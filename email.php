<?php
// var_dump($_POST);exit();
$name = $_POST['name'];
$email = $_POST['email'];
// $asunto = $_POST['asunto'];
$message = $_POST['message'];
 
$to = "booking@puntacanayachtcharters.com"; 
$subject = $name. " Send a message"; 
$body = ' 
<html> 
<head> 
   <title>Contacto:</title> 
</head> 
<body>
<p><strong>Nombre:</strong></p> 
<p>'.$name.'</p>  
<p><strong>Mensaje:</strong></p> 
<p>'.$message.'</p> 
</body> 
</html> 
'; 

//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=UTF-8" ."\r\n"; 

$headers .= "From: ".$name." <". $email .">\r\n"; 

$mail = mail($to,$subject,$body,$headers);

if(mail($to, $subject, $message, $headers)) {
  echo 'Email sent successfully.';
} else {
  echo 'Email sending failed.';
}

header("Location:contact.html");

?>