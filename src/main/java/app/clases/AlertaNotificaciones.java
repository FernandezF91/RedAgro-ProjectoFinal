package app.clases;

public class AlertaNotificaciones {
	
	public AlertaNotificaciones(long id, Alerta alerta,  Usuario usuario, String tipo, String titulo, String descripcion) { 
		this.setId(id);
		this.setAlerta(alerta);
		this.setUsuario(usuario);
		this.setTipo(tipo);
		this.setTitulo(titulo);
		this.setDescripcion(descripcion);		
	}
	
	private long id;
	private Alerta alerta;
	private Usuario usuario;
	private String tipo;
	private String titulo;
	private String descripcion;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Alerta getAlerta() {
		return alerta;
	}
	public void setAlerta(Alerta alerta) {
		this.alerta = alerta;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}
