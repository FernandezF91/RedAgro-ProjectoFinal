package app.modelos;

import java.io.Serializable;

@SuppressWarnings("serial")
public class EntidadDetalleReservaPK implements Serializable {

	private long id_reserva;
	private long id_producto;

	public long getId_reserva() {
		return id_reserva;
	}

	public long getId_producto() {
		return id_producto;
	}

}
