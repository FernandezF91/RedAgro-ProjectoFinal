package app.clases;

public class Oferta {
	public Oferta(long id, ProductoProductor productoProductor, float porcentaje, boolean activo) {
		this.setId(id);
		this.setProductoProductor(productoProductor);
		this.setPorcentaje(porcentaje);
		this.setActivo(activo);
	}

	private long id;
	private ProductoProductor productoProductor;
	private float porcentaje;
	private boolean activo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ProductoProductor getProductoProductor() {
		return productoProductor;
	}
	
	public void setProductoProductor(ProductoProductor productoProductor) {
		this.productoProductor = productoProductor;
	}
	
	public float getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(float porcentaje) {
		this.porcentaje = porcentaje;
	}

	public boolean getActivo() {
		return activo;
	}
	
	public void setActivo(boolean activo) {
		this.activo = activo;
	}
}
