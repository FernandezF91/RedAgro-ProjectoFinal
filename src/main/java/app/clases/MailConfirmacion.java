package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailConfirmacion extends MailSender {

	public MailConfirmacion(String to, Long id) {

		this.setTo(to);
		this.setContenido_email("<div> <h1>Bienvenido a Cultura Verde!</h1>"
				+ "Gracias por registrarte en nuestra sistema." + "<br>" + "<br>"
				+ "Para poder utilizar nuestra página, confirmá tu cuenta por favor." + "<br>" + "<br>" + "<a href="
				+ "redAgro/confirmar_cuenta/" + id + ">" + "<button " + "class=" + "button " + "style="
				+ "background-color:#4CAF50; border:none; color:white; padding: 15px 32px; text-align: center; text-decoration: none>"
				+ "Confirmar" + "</button>" + "</a><div>" + "<br>" + "<br>" + "Saludos," + "<br>"
				+ "Equipo de Cultura Verde"

		);
		this.setAsunto("Confirmación de cuenta");

	}

	public void enviarMail() throws AddressException, MessagingException {

		super.enviarMail();

	}

}
