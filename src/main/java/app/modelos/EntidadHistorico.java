package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Historico_venta")
public class EntidadHistorico {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name = "productor_id", nullable = false)
	private EntidadProductor productor;

	@ManyToOne()
	@JoinColumn(name = "producto_id", nullable = false)
	private EntidadProducto producto;

	@Column(name = "tipo_producto", nullable = false)
	private String tipo_producto;

	@Column(name = "tipo_certificacion", nullable = false)
	private String tipo_certificacion;

	@Column(name = "cantidad_vendida", nullable = false)
	private int cantidad_vendida;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getTipo_produccion() {
		return tipo_producto;
	}

	public void setTipo_produccion(String tipo_produccion) {
		this.tipo_producto = tipo_produccion;
	}

	public String getTipo_certificacion() {
		return tipo_certificacion;
	}

	public void setTipo_certificacion(String tipo_certificacion) {
		this.tipo_certificacion = tipo_certificacion;
	}

	public int getCantidad_vendida() {
		return cantidad_vendida;
	}

	public void setCantidad_vendida(int cantidad_vendida) {
		this.cantidad_vendida = cantidad_vendida;
	}
}
