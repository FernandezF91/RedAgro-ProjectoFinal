package app.clases;

public class Consumidor {

	public Consumidor (Long id, Usuario usuario) {
		this.setId(id);
		this.setUsuario(usuario);
	}

	private Long id;
	private Usuario usuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}
