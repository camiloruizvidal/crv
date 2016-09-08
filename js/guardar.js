function guardar()
{
	var NombreRemitente=$('#NombreRemitente').val();
	var TelefonoRemitente	=$('#TelefonoRemitente').val();
	var EmailRemitente=$('#EmailRemitente').val();
	var mensajeRemitente	=$('#mensajeRemitente').val();
	if(NombreRemitente!=''||TelefonoRemitente!=''||EmailRemitente!=''||mensajeRemitente!='')
	{
		$.ajax(
		{
			url:'mail.php',
			type:'POST',
			data:
			{
				NombreRemitente:NombreRemitente,
				TelefonoRemitente:TelefonoRemitente,
				EmailRemitente:EmailRemitente,
				mensajeRemitente:mensajeRemitente
			},
			success:function()
			{
				Command: toastr["success"]("En breve nos contactaremos con usted.", "Su correo fue enviado")
				toastr.options = {
				  "closeButton": true,
				  "debug": false,
				  "newestOnTop": false,
				  "progressBar": false,
				  "positionClass": "toast-top-center",
				  "preventDuplicates": false,
				  "onclick": null,
				  "showDuration": "300",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "1000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
				}
			}
		});
	}
	else
	{
		Command: toastr["error"]("Por favor complete el formulario.", "Su correo no ha sido enviado")
		toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-center",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		$('#Form_contacto').hide();
		$('#Form_contacto').show('slow');
	}
}