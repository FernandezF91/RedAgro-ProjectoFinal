package app.clases;

import app.modelos.EntidadReserva;

public class DetalleReserva {

	public DetalleReserva(long id, long id_producto, int cantidad, int precio_por_unidad, boolean activo) {
		this.setId_reserva(id);
		this.setId_producto(id_producto);
		this.setCantidad(cantidad);
		this.setPrecio_por_unidad(precio_por_unidad);
		this.setActivo(activo);
	}

	private long id_reserva;
	private long id_producto;
	private int cantidad;
	private int precio_por_unidad;
	private boolean activo;

	public long getId_reserva() {
		return id_reserva;
	}

	public void setId_reserva(long id_reserva) {
		this.id_reserva = id_reserva;
	}

	public long getId_producto() {
		return id_producto;
	}

	public void setId_producto(long id_producto) {
		this.id_producto = id_producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}
	
	public int getPrecio_por_unidad() {
		return precio_por_unidad;
	}

	public void setPrecio_por_unidad(int precio_por_unidad) {
		this.precio_por_unidad = precio_por_unidad;
	}
}
