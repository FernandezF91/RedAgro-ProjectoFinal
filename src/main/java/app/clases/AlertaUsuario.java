package app.clases;

public class AlertaUsuario {
	public AlertaUsuario(long id, Alerta alerta, AlertaFrecuencia frecuencia, Usuario usuario) {
		this.setId(id);
		this.setAlerta(alerta);
		this.setFrecuencia(frecuencia);
		this.setUsuario(usuario);
	}

	private long id;
	private Alerta alerta;
	private AlertaFrecuencia alertaFrecuencia;
	private Usuario usuario;

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

	public AlertaFrecuencia getFrecuencia() {
		return alertaFrecuencia;
	}

	public void setFrecuencia(AlertaFrecuencia alertaFrecuencia) {
		this.alertaFrecuencia = alertaFrecuencia;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}