package app.clases;

public class Producto {
	
	public Producto(long id, String categoria, String tipo) {
		this.setId(id);
		this.setCategoria(categoria);
		this.setTipo(tipo);
	}

	private long id;
	private String categoria;
	private String tipo;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
}
