package app.clases;

public class EstadoReserva {

	public EstadoReserva(long id, String nombre) {
		this.setId(id);
		this.setNombre(nombre);
	}

	private Long id;

	private String nombre;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
