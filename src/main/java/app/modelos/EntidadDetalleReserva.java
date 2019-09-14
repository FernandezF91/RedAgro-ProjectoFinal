package app.modelos;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Detalle_reserva")
public class EntidadDetalleReserva implements Serializable{
	
	@Id
    @Column(name = "id_reserva")
    private long id_reserva;
	
	@ManyToOne()
    @JoinColumn(name = "id_reserva", nullable = false)
    private EntidadReserva reserva;
	
	@Id
    @Column(name = "id_producto")
    private long id_producto;
	
	@ManyToOne
    @JoinColumn(name="id_producto", nullable = false)
    private EntidadProducto producto;
	
	@Column(name="cantidad",nullable = false)
	private int cantidad;
	
	@Column(name="activo",nullable = false)
	private Boolean activo;

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

	public void setId_producto(long id_producto) {
		this.id_producto = id_producto;
	}

	public EntidadProducto getProducto() {
		return producto;
	}

	public void setProducto(EntidadProducto producto) {
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

}
