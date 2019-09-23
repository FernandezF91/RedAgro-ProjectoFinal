package app.clases;

public class MailConfirmacion extends MailSender{
	
public MailConfirmacion(String to) {
	
	
		
		this.setTo(to);
		this.setFrom("confirmacion-cuenta@culturaverde.com.ar");
		this.setContenido_email(
				"<div> <h1>Bienvenido a culturaVerde!,</h1>"
				+ "<br>"
				+"gracias por registrarte en nuestra sistema."
				+ "<br>"
				+ "<br>"
				+ "Para poder utilizar nuestra p"+"&aacute"+"gina, confirm"+"&aacute"+" tu cuenta por favor."
				+"<br>"
				+"<br>"
				+"<a href="+"http://localhost:3000/login>"+"<button "+"class="+"button "+"style="+
				"background-color:#4CAF50; border:none; color:white; padding: 15px 32px; text-align: center; text-decoration: none>"
				+"Confirmar"+"</button>"+"</a><div>"
				+"<br>"
				+"<br>"
				+"Saludos,"
				+"<br>"
				+"Equipo de culturaVerde"
				
				);
		this.setAsunto("Confirmación de cuenta en culturaVerde");	
		
	}

public void enviarMail() {
	
	super.enviarMail();
	
}


}
