package app.clases;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailNuevaReserva extends MailSender {

	public MailNuevaReserva(String to, Reserva reserva, String entrega, String rol) {
		this.setTo(to);
		String tablaDetalle = "<br> <table border=\"0\" style=\"width: 100%\"> <caption> <h3> Detalle de la reserva </h3> </caption> <tr> "
				+ "<th>Producto</th> " 
				+ "<th>Cantidad</th> " 
				+ "<th>Precio x Unidad</th> " 
				+ "<th>Subtotal</th> "
				+ "</tr>";
		
		for (DetalleReserva detalleReserva : reserva.getDetalleReserva()) {

			String unidadDeVenta = detalleReserva.getProducto().getUnidad_venta();

			if (detalleReserva.getCantidad() > 1) {
				if (detalleReserva.getProducto().getUnidad_venta() == "Bolsón")
					unidadDeVenta = "bolsones";
				else
					unidadDeVenta = unidadDeVenta + "s";
			}

			tablaDetalle = tablaDetalle + "<tr> <td align=\"center\">" + detalleReserva.getProducto().getTitulo() + " </td> "
					+ "<td align=\"center\">" + detalleReserva.getCantidad() + " " + unidadDeVenta + "</td>"
					+ "<td align=\"center\"> $ " + detalleReserva.getPrecio_por_unidad() + "</td>"
					+ "<td align=\"center\"> $ " + detalleReserva.getCantidad() * detalleReserva.getPrecio_por_unidad() +"</td> </tr>";
		}
		tablaDetalle = tablaDetalle + " </table>";
		

		String formaDeRetiro = "Forma de retiro: " + reserva.getForma_retiro();
		if(reserva.getForma_retiro() != "Acuerda con Productor") {
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			String fecha = dateFormat.format(reserva.getFecha());
			formaDeRetiro = "Retira <i>" + reserva.getPersona_retiro() + " </i> a partir del día "+ fecha + " por el punto de entrega: " + entrega + ".";
		} else {
			formaDeRetiro = "Retira <i>" + reserva.getPersona_retiro() + " </i>. Elegiste coordinar el punto y fecha de entrega con el productor";
		}

		if (rol == "Consumidor") {
			this.setContenido_email("<div>"
					+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" />"
					+ "<br>" + "<h2>¡Felicitaciones " + reserva.getConsumidor().getUsuario().getNombre()
					+ "! Tu reserva ha sido confirmada.</h2>" + "<br>"
					+ "Chequeá el estado de tu reserva ingresando a tu cuenta</i> </center>" + "<br />"
					+ "<div style=\"border-top: 1px solid gray;\" /> <br>" 
					+ tablaDetalle + "<br> "
					+ "Total de la Reserva: $" + reserva.getTotal_reserva() + "<br> "
					+ formaDeRetiro + "<br> <br> " 
					+ "Si tenes alguna duda, no dudes de contactar a tu productor. " 
					+ "<br> "
					+ "<br> " 
					+ "Saludos," + "<br>" + "Equipo de Cultura Verde </div>");

			this.setAsunto("Tu reserva #" + reserva.getId() + " fue realizada con éxito!");
		} else {
			this.setContenido_email("<div>"
					+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" />"
					+ "<br>" + "<h2>¡Felicitaciones " + reserva.getProductor().getUsuario().getNombre()
					+ "! Tenés una nueva reserva.</h2> " + "<br>"
					+ "<i>Chequeá el estado de tu reserva ingresando a tu cuenta</i></center>" + "<br />"
					+ "<div style=\"border-top: 1px solid gray;\" /> <br>" 
					+ tablaDetalle + "<br> "
					+ "Total de la Reserva: $" + reserva.getTotal_reserva() + "<br> "
					+ formaDeRetiro + "<br> <br> "
					+ "Si tenes alguna duda, no dudes de contactar a tu consumidor." 
					+ "<br> " 
					+ "<br> " 
					+ "Saludos," + "<br>" + "Equipo de Cultura Verde </div>");

			this.setAsunto("La reserva #" + reserva.getId() + " fue realizada con éxito!");
		}
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}

}
