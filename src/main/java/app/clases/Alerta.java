package app.clases;

public class Alerta {
	public Alerta(long id, String nombre) {
		this.setId(id);
		this.setNombre(nombre);
	}

	private long id;
	private String nombre;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}