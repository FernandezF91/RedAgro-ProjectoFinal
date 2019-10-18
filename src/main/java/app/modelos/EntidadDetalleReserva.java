package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Detalle_reserva")
@IdClass(EntidadDetalleReservaPK.class)
public class EntidadDetalleReserva{
	
	@Id
    @Column(name = "id_reserva")
    private long id_reserva;
	
	@ManyToOne
    @JoinColumn(name = "id_reserva", nullable = false, updatable = false, insertable = false)
    private EntidadReserva reserva;
	
	@Id
    @Column(name = "id_producto")
    private long id_producto;
	
	@ManyToOne
    @JoinColumn(name="id_producto", nullable = false, updatable = false, insertable = false)
    private EntidadProductoProductor producto;
	
	@Column(name="cantidad",nullable = false)
	private int cantidad;
	
	@Column(name="activo",nullable = false)
	private Boolean activo;
	
	@Column(name = "precio_por_unidad", nullable = false)
	private float precio_por_unidad;

	public long getId_reserva() {
		return id_reserva;
	}

	public void setId_reserva(long id_reserva) {
		this.id_reserva = id_reserva;
	}

	public EntidadReserva getReserva() {
		return reserva;
	}

	public void setReserva(EntidadReserva reserva) {
		this.reserva = reserva;
	}

	public long getId_producto() {
		return id_producto;
	}

	public float getPrecio_por_unidad() {
		return precio_por_unidad;
	}
	
	public void setId_producto(long id_producto) {
		this.id_producto = id_producto;
	}

	public EntidadProductoProductor getProducto() {
		return producto;
	}

	public void setProducto(EntidadProductoProductor producto) {
		this.producto = producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}
	
	public void setPrecio_por_unidad(float precio_por_unidad) {
		this.precio_por_unidad = precio_por_unidad;
	}
}
