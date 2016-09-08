<?php
if($_POST)
{
	echo(json_encode($_POST,JSON_PRETTY_PRINT));
	extract($_POST);
	$para      = 'info@solucionescrv.com';
	$titulo    = 'Información de contacto WebSite';
	$cabeceras = 'MIME-Version: 1.0' . "\r\n";
	$cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$cabeceras .= 'From: concat_client@solucionescrv.com' . "\r\n" .'X-Mailer: PHP/' . phpversion();
	$mensaje   = 'De: '.$NombreRemitente
				.', Telefono: '.$TelefonoRemitente
				.'<br/>Responder al email:"'
				.$EmailRemitente
				.'"<h1>Mensaje</h1>'
				.$mensajeRemitente;
	mail($para, $titulo, $mensaje, $cabeceras);
}
?>