package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailNuevaReserva extends MailSender {

	public MailNuevaReserva(String to, Reserva reserva, String rol) {
		this.setTo(to);
		String bodyDetalle = "";
		for(DetalleReserva detalleReserva : reserva.getDetalleReserva()) {
			bodyDetalle = bodyDetalle + "<li>" + detalleReserva.getProducto().getTitulo() + " " + detalleReserva.getCantidad() +" x $"+ detalleReserva.getPrecio_por_unidad()+ " c/u </li>";
		}
		
		String formaDeRetiro= "Forma de retiro: "+ reserva.getForma_retiro();
//		if(reserva.getForma_retiro() != "Acuerda con Productor") {
//			formaDeRetiro = " Retira por el punto de entrega elegido: "; //+ reserva.getPunto_entrega().getDireccion() + " " + reserva.getPunto_entrega().getLocalidad();
//		} else {
//			formaDeRetiro = " Punto de entrega a acordar con el productor";
//		}

		if (rol == "Consumidor") {
			this.setContenido_email("<div>"
					+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" />"
					+ "<br>" + "<h2>¡Felicitaciones " + reserva.getConsumidor().getUsuario().getNombre()
					+ "! Tu reserva ha sido confirmada.</h2>" + "<br>"
					+ "Chequeá el estado de tu reserva ingresando a tu cuenta</i> </center>" + "<br />"
					//+ "<hr width=\"95%\" align=\"center\"  size=\"1px\" color=\"gray\" />"
					+ "<div style=\"border-top: 1px solid gray;\" />"
					+ "<h4> Detalle de la reserva </h4>" 
					+ "<ul>"
					+ bodyDetalle
					+ "</ul>"
					+ "Total reservado: $" + reserva.getTotal_reserva() 
					+ "<br> "
					+ formaDeRetiro
					+ "<br> "
					+ "<br> "
					+ "Saludos," + "<br>"
					+ "Equipo de Cultura Verde </div>");

			this.setAsunto("Tu reserva #" + reserva.getId() + " fue realizada con éxito!");
		} else {
			this.setContenido_email("<div>"
					+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" />"
					+ "<br>" 
					+ "<h2>¡Felicitaciones " + reserva.getProductor().getUsuario().getNombre()
					+ "! Tenés una nueva reserva.</h2> " + "<br>"
					+ "<i>Chequeá el estado de tu reserva ingresando a tu cuenta</i></center>" + "<br />" 
					//+ "<hr align=\"center\" size=\"1px\" color=\"gray\" />" 
					+ "<div style=\"border-top: 1px solid gray;\" />"
					+ "<h4> Detalle de la reserva </h4>"
					+ "<ul>"
					+ bodyDetalle
					+ "</ul>"
					+ "Total reservado: $" + reserva.getTotal_reserva() 
					+ "<br> "
					+ formaDeRetiro
					+ "<br> "
					+ "<br> "
					+ "Saludos," + "<br>"
					+ "Equipo de Cultura Verde </div>");

			this.setAsunto("La reserva #" + reserva.getId() + " fue realizada con éxito!");
		}
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}

}
