package app.clases;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

public class MailProductoInteres extends MailSender {

	public MailProductoInteres(String to, String nombre, ProductoProductor producto) {
		this.setTo(to);
		this.setContenido_email("<div>"
				+ "<center> <img src=\"https://i.ibb.co/z5Dtpqh/cultura-verde.png\" alt=\"cultura-verde\" width=\"250px\" height=\"auto\" alt=\"Cultura Verde\" border=\"0\" /> </center>"
				+ "<br>"
				+ "<p>Hola " + nombre + "! </br>" + "El/La productor/a "
				+ producto.getProductor().getUsuario().getNombre() + " "
				+ producto.getProductor().getUsuario().getApellido()
				+ " ha agregado un producto que podría interesarte: </p>" + "<h4>" + producto.getTitulo() + "</h4>"
				+ "<p> Descripción: " + producto.getDescripcion() + "<br> Tipo de producción: "
				+ producto.getTipo_produccion()
				+ "<br>¿Querés ver más? Ingresá a tu cuenta en Cultura Verde para ver el detalle completo de este y otros productos!  </p>"
				+ "<br>" + "Saludos, </br>" + "Equipo de Cultura Verde </div>");

		this.setAsunto("Tenemos un nuevo producto que podría interesarte...");
	}

	public void enviarMail() throws AddressException, MessagingException {
		super.enviarMail();
	}

}
