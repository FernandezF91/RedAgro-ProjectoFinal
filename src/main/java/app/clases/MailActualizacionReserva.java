package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailActualizacionReserva extends MailSender {

	public MailActualizacionReserva(String to, Usuario usuario, Reserva reserva) {
		this.setTo(to);

		switch (reserva.getEstado_reserva().getNombre()) {

		case "Disponible": {

			if (usuario.getRol().equals("Productor")) {
				this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>"
						+ "<p> Se ha actualizado el estado de tu reserva #" + reserva.getId() + " a <em><strong>"
						+ reserva.getEstado_reserva().getNombre()
						+ "</strong></em>. Acordate que podes contactar a tu consumidor "
						+ " y seguir el estado de tu reserva ingresando a tu cuenta en Cultura Verde. </p>"
						+ "</br>Saludos," + "</br>" + "Equipo de CulturaVerde");

				this.setAsunto("Tu reserva #" + reserva.getId() + " fue actualizada!");

			} else {

				if (reserva.getForma_retiro().equals("Acuerda con Productor")) {
					this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>"
							+ "<p>Ya podes retirar tu reserva #" + reserva.getId()
							+ " por el punto de entrega acordado! "
							+ "No te olvides de llevar los datos de tu reserva para que no haya inconvenientes al momento del retiro. </p>"
							+ "</br>" + "Saludos," + "</br>" + "Equipo de CulturaVerde");

				} else {
					this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>"
							+ "<p>Ya podes retirar tu reserva #" + reserva.getId() + " por "
							+ reserva.getPunto_entrega().getDireccion() + ", "
							+ reserva.getPunto_entrega().getLocalidad()
							+ "No te olvides de chequear el horario de atención y de llevar los datos de tu reserva para que no haya inconvenientes al momento del retiro. </p>"
							+ "</br>" + "Saludos," + "</br>" + "Equipo de CulturaVerde");
				}
				this.setAsunto("Tu reserva #" + reserva.getId() + " ya esta disponible para retirar!");
			}
			
			break;
		}

		case "Finalizado": {
			this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>" + "<p>Tu reserva #"
					+ reserva.getId() + " esta finalizada! Muchas gracias por ser parte de Cultura verde :) </p>"
					+ "</br>Saludos," + "</br>" + "Equipo de CulturaVerde");
			this.setAsunto("Tu reserva #" + reserva.getId() + " fue actualizada!");
			break;

		}

		case "Cancelado": {
			this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>"
					+ "<p>Lamentamos informarte que tu reserva #" + reserva.getId() + " fue cancelada. </p>"
					+ "</br>Saludos," + "</br>" + "Equipo de CulturaVerde");
			this.setAsunto("Tu reserva #" + reserva.getId() + " fue actualizada!");
			break;
		}

		default: {
			String rol;
			if (usuario.getRol().equals("Consumidor"))
				rol = "productor";
			else
				rol = "consumidor";

			this.setContenido_email("<div>Hola " + usuario.getNombre() + ", " + "</br>"
					+ "<p> Se ha actualizado el estado de tu reserva #" + reserva.getId() + " a <em><strong>"
					+ reserva.getEstado_reserva().getNombre() + "</strong></em>. Acordate que podes contactar a tu "
					+ rol + " y seguir el estado de tu reserva ingresando a tu cuenta en Cultura Verde. </p>"
					+ "</br>Saludos," + "</br>" + "Equipo de CulturaVerde");

			this.setAsunto("Tu reserva #" + reserva.getId() + " fue actualizada!");
		}
		}
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}
}
