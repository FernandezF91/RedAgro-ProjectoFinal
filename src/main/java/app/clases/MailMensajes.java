package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailMensajes extends MailSender {

	public MailMensajes(String to, Usuario usuarioEmisor, Usuario usuarioReceptor) {
		this.setTo(to);

		this.setContenido_email("<div>"
				+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" /> </center>"
				+ "<br>"
				+ "Hola " + usuarioReceptor.getNombre() + ", " + "</br>" + "<p> Tu "
				+ usuarioEmisor.getRol().toLowerCase() + " <em>" + usuarioEmisor.getNombre() + " "
				+ usuarioEmisor.getApellido() + "</em> te ha enviado un nuevo mensaje. "
				+ "Ingresá a Cultura Verde para responder.</p>" + "<br>" + "Saludos," + "<br>"
				+ "Equipo de Cultura Verde");

		this.setAsunto("Tenes un nuevo mensaje en Cultura Verde");
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}
}
