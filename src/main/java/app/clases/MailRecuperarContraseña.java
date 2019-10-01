package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailRecuperarContraseña extends MailSender{

	public MailRecuperarContraseña(String to, Long id) {
		this.setTo(to);
		this.setContenido_email(
				"<div> <h1>Recuperá tu contraseña</h1>"
				+"No te preocupes!!"
				+ "<br>"
				+ "<br>"
				+ "Puedes restablecer tu contraseña haciendo click en el siguiente enlace:"
				+"<br>"
				+"<br>"
				+"<a href="+"http://localhost:3000/recuperar_email/"+id+">"+"<button "+"class="+"button "+"style="+
				"background-color:#4CAF50; border:none; color:white; padding: 15px 32px; text-align: center; text-decoration: none>"
				+"Recuperar"+"</button>"+"</a><div>"
				+"<br>"
				+"<br>"
				+"Saludos,"
				+"<br>"
				+"Equipo de culturaVerde"
				);
		this.setAsunto("Restablecer la contraseña");
	}
	
	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}
	
}
