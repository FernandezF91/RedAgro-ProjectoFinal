package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailNuevaReserva extends MailSender {

	public MailNuevaReserva(String to, Reserva reserva, String rol) {
		this.setTo(to);

		if (rol == "Consumidor") {
			this.setContenido_email("<div><h2>Felicitaciones " + reserva.getConsumidor().getUsuario().getNombre()
					+ "! Tu reserva ha sido confirmada.</h2>" + "</br>"
					+ "<h5><i>Chequeá el estado de tu reserva ingresando a tu cuenta</i></h5>" + "</br>" + "</br>"
					+ "<h4> Detalle de la reserva </h4>" + "Saludos," + "<br>" + "Equipo de Cultura Verde");

			this.setAsunto("Tu reserva #" + reserva.getId() + " fue realizada con éxito!");
		} else {
			this.setContenido_email("<div><h2>Felicitaciones " + reserva.getProductor().getUsuario().getNombre()
					+ "! Tenés una nueva reserva.</h2>" + "</br>"
					+ "<h5><i>Chequeá el estado de tu reserva ingresando a tu cuenta</i></h5>" + "</br>" + "</br>"
					+ "<h4> Detalle de la reserva </h4>" + "Saludos," + "<br>" + "Equipo de Cultura Verde");

			this.setAsunto("La reserva #" + reserva.getId() + " fue realizada con éxito!");
		}
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}

}
