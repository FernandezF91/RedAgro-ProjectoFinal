package app.clases;
import java.util.List;

public class Productor {

	public Productor(long id, String razon_social, Usuario usuario, List<PuntoEntrega> puntosEntrega) {
		this.setId(id);
		this.setRazon_social(razon_social);
		this.setUsuario(usuario);
		this.setPuntosEntrega(puntosEntrega);
	}

	private long id;
	private String razon_social;
	private Usuario usuario;
	private List<PuntoEntrega> puntosEntrega;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRazon_social() {
		return razon_social;
	}

	public void setRazon_social(String razon_social) {
		this.razon_social = razon_social;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public List<PuntoEntrega> getPuntosEntrega() {
		return puntosEntrega;
	}

	public void setPuntosEntrega(List<PuntoEntrega> puntosEntrega) {
		this.puntosEntrega = puntosEntrega;
	}
	
}
