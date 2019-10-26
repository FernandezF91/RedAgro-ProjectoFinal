package app.clases;

public class Oferta {
	public Oferta(long id, long productoProductorId, float porcentaje, boolean activo) {
		this.setId(id);
		this.setProductoProductorId(productoProductorId);
		this.setPorcentaje(porcentaje);
		this.setActivo(activo);
	}

	private long id;
	private long productoProductorId;
	private float porcentaje;
	private boolean activo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getProductoProductorId() {
		return productoProductorId;
	}

	public void setProductoProductorId(long productoProductorId) {
		this.productoProductorId = productoProductorId;
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
