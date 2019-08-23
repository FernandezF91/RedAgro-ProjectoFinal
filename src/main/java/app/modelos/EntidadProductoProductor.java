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
@Table(name = "Producto_productor")
public class EntidadProductoProductor {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@ManyToOne()
    @JoinColumn(name = "productor_id", nullable = true)
    private EntidadProductor productor;
	
	@ManyToOne()
    @JoinColumn(name = "producto_id", nullable = true)
    private EntidadProducto producto;
	
	@Column(name="descripcion",nullable = false)
	private String descripcion;
	
	@Column(name="imagen",nullable = false)
	private String imagen;
	
	@Column(name="tipo_unidad",nullable = false)
	private String tipo_unidad;
	
	@Column(name="tipo_produccion",nullable = false)
	private String tipo_produccion;
	
	@Column(name="stock",nullable = false)
	private int stock;
	
	@Column(name="fecha_vencimiento",nullable = false)
	private Date fecha_vencimiento;
	
	@Column(name="precio",nullable = false)
	private int precio;
	
	@Column(name="tiempo_preparacion",nullable = false)
	private int tiempo_preparacion;

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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getTipo_unidad() {
		return tipo_unidad;
	}

	public void setTipo_unidad(String tipo_unidad) {
		this.tipo_unidad = tipo_unidad;
	}

	public String getTipo_produccion() {
		return tipo_produccion;
	}

	public void setTipo_produccion(String tipo_produccion) {
		this.tipo_produccion = tipo_produccion;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Date getFecha_vencimiento() {
		return fecha_vencimiento;
	}

	public void setFecha_vencimiento(Date fecha_vencimiento) {
		this.fecha_vencimiento = fecha_vencimiento;
	}

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public int getTiempo_preparacion() {
		return tiempo_preparacion;
	}

	public void setTiempo_preparacion(int tiempo_preparacion) {
		this.tiempo_preparacion = tiempo_preparacion;
	}
		
	
	
}
