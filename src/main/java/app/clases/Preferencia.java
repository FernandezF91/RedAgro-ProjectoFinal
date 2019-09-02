package app.clases;

public class Preferencia {

	public Preferencia(long ID, Consumidor consumidor, Producto producto) {
		this.setId(ID);
		this.setConsumidor(consumidor);
		this.setProducto(producto);
	}

	private Long id;
	private Consumidor consumidor;
	private Producto producto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
