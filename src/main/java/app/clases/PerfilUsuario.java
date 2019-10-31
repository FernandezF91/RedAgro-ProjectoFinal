package app.clases;

public class PerfilUsuario {
	
	public PerfilUsuario(long id, String url, String descripcion) {
		this.setId(id);
		this.setDescripcion(descripcion);
		this.setUrl(url);
	}

	private long id;
	private String url;
	private String descripcion;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}

