package app.modelos;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Oferta")
public class EntidadOferta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name = "productor_id", nullable = false)
	private EntidadProductor productor;

	@ManyToOne()
	@JoinColumn(name = "producto_id", nullable = false)
	private EntidadProducto producto;

	@Column(name = "stock", nullable = false)
	private int stock;

	@Column(name = "fecha_inicio", nullable = false)
	private Date fecha_inicio;

	@Column(name = "fecha_fin", nullable = false)
	private Date fecha_fin;

	@Column(name = "precio", nullable = false)
	private int precio;

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}

	public EntidadProducto getProducto() {
		return producto;
	}

	public void setProducto(EntidadProducto producto) {
		this.producto = producto;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Date getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}

	public Date getFecha_fin() {
		return fecha_fin;
	}

	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}
}
