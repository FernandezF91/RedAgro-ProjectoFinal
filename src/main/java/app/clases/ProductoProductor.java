package app.clases;

import java.sql.Date;
import java.util.List;

public class ProductoProductor {

	public ProductoProductor(long id, Productor productor, Producto producto, String titulo, List<Imagen> imagenes, String tipo_unidad,
							 String tipo_produccion, int stock, Date fecha_vencimiento, int precio, int tiempo_preparacion) {
		this.setId(id);
		this.setProductor(productor);
		this.setProducto(producto);
		this.setTitulo(titulo);
		this.setImagenes(imagenes);
		this.setTipo_unidad(tipo_unidad);
		this.setTipo_produccion(tipo_produccion);
		this.setStock(stock);
		this.setFecha_vencimiento(fecha_vencimiento);
		this.setPrecio(precio);
		this.setTiempo_preparacion(tiempo_preparacion);
	}

	private long id;
	private Productor productor;
	private Producto producto;
	private String titulo;
	private List<Imagen> imagenes;
	private String tipo_unidad;
	private String tipo_produccion;
	private int stock;
	private Date fecha_vencimiento;
	private int precio;
	private int tiempo_preparacion;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Productor getProductor() {
		return productor;
	}

	public void setProductor(Productor productor) {
		this.productor = productor;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public List<Imagen> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<Imagen> imagenes) {
		this.imagenes = imagenes;
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
