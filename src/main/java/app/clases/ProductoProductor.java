package app.clases;

import java.sql.Date;
import java.util.List;

public class ProductoProductor {

	public ProductoProductor(long id, Productor productor, Producto producto, String titulo, String descripcion, List<Imagen> imagenes,
							 String tipo_produccion, int stock, Date fecha_vencimiento, String contenido, String unidad_venta, float precio, int tiempo_preparacion) {
		this.setId(id);
		this.setProductor(productor);
		this.setProducto(producto);
		this.setTitulo(titulo);
		this.setDescripcion(descripcion);
		this.setImagenes(imagenes);
		this.setTipo_produccion(tipo_produccion);
		this.setStock(stock);
		this.setFecha_vencimiento(fecha_vencimiento);
		this.setPrecio(precio);
		this.setTiempo_preparacion(tiempo_preparacion);
		this.setContenido(contenido);
		this.setUnidad_venta(unidad_venta);
	}

	private long id;
	private Productor productor;
	private Producto producto;
	private String titulo;
	private String descripcion;
	private List<Imagen> imagenes;
	private String tipo_produccion;
	private int stock;
	private Date fecha_vencimiento;
	private float precio;
	private int tiempo_preparacion;
	private String contenido;
	private String unidad_venta;
	

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

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public int getTiempo_preparacion() {
		return tiempo_preparacion;
	}

	public void setTiempo_preparacion(int tiempo_preparacion) {
		this.tiempo_preparacion = tiempo_preparacion;
	}
	
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	public String getUnidad_venta() {
		return unidad_venta;
	}

	public void setUnidad_venta(String unidad_venta) {
		this.unidad_venta = unidad_venta;
	}

	
}
