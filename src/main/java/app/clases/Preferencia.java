package app.clases;

public class Preferencia {

	public Preferencia(long id, Consumidor consumidor, Producto producto) {
		this.setId(id);
		this.setConsumidor(consumidor);
		this.setProducto(producto);
	}

	private long id;
	private Consumidor consumidor;
	private Producto producto;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Consumidor getConsumidor() {
		return consumidor;
	}

	public void setConsumidor(Consumidor consumidor) {
		this.consumidor = consumidor;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
}
