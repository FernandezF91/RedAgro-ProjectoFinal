package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailNuevaCalificacion extends MailSender {

	public MailNuevaCalificacion(String to, Reserva reserva) {
		this.setTo(to);
		this.setContenido_email("<div><h4>Felicitaciones " + reserva.getProductor().getUsuario().getNombre() +"!</h4></br>"
				+ "Te han calificado por la atención brindada durante la reserva #" + reserva.getId()  
				+ "</br>"
				+ "<p>¿Querés saber que opinaron? Ingresá a cuenta en Cultura Verde para ver el detalle!</p>"
				+ "<br>"
				+ "<br>"
				+ "Saludos," + "<br>"
				+ "Equipo de Cultura Verde");

		this.setAsunto("Te calificaron por la reserva  #" + reserva.getId()+ "!");
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}
}
