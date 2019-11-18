package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailConfirmacion extends MailSender {

	public MailConfirmacion(String to, Long id) {

		this.setTo(to);
		this.setContenido_email("<div> "
				+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" /> </center>"
				+ "<br>"
				+ "<h1>¡Bienvenido a Cultura Verde!</h1>"
				+ "Gracias por registrarte en nuestra sistema." + "<br>" + "<br>"
				+ "Para poder utilizar nuestra página, confirmá tu cuenta haciendo click en el siguiente botón:" + "<br>" + "<br>" + "<a href="
				+ "http://localhost:3000/confirmar_cuenta/" + id + ">" + "<button " + "class=" + "button " + "style="
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
