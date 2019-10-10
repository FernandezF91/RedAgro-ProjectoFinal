package app.clases;

public class AlertaFrecuencia {
	public AlertaFrecuencia(long id, String frecuencia) {
		this.setId(id);
		this.setFrecuencia(frecuencia);
	}

	private Long id;

	private String frecuencia;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFrecuencia() {
		return frecuencia;
	}

	public void setFrecuencia(String frecuencia) {
		this.frecuencia = frecuencia;
	}
}
