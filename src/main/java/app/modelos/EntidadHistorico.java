package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Historico_venta")
public class EntidadHistorico {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "categoria", nullable = true)
	private String categoria;
	
	@Column(name = "tipo_producto", nullable = false)
	private String tipo_producto;

	@Column(name = "cantidad_vendida", nullable = false)
	private int cantidad_vendida;
	
	@Column(name = "mes", nullable = true)
	private int mes;
	
	@Column(name = "zona", nullable = false)
	private String zona;


//	@ManyToOne()
//	@JoinColumn(name = "productor_id", nullable = false)
//	private EntidadProductor productor;

//	@ManyToOne()
//	@JoinColumn(name = "producto_id", nullable = false)
//	private EntidadProducto producto;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public int getCantidad_vendida() {
		return cantidad_vendida;
	}

	public void setCantidad_vendida(int cantidad_vendida) {
		this.cantidad_vendida = cantidad_vendida;
	}

	
	public String getTipo_producto() {
		return tipo_producto;
	}

	public void setTipo_producto(String tipo_producto) {
		this.tipo_producto = tipo_producto;
	}

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}
	
	public int getMes() {
		return mes;
	}

	public void setMes(int mes) {
		this.mes = mes;
	}
	
	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
}

	
//	public String getTipo_certificacion() {
//		return tipo_certificacion;
//	}
//
//	public void setTipo_certificacion(String tipo_certificacion) {
//		this.tipo_certificacion = tipo_certificacion;
//	}
//	
//	public EntidadProductor getProductor() {
//		return productor;
//	}
//
//	public void setProductor(EntidadProductor productor) {
//		this.productor = productor;
//	}
//
//	public EntidadProducto getProducto() {
//		return producto;
//	}
//
//	public void setProducto(EntidadProducto producto) {
//		this.producto = producto;
//	}