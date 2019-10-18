package app.clases;

public class AlertaConfiguracion {
	private String alertaNombre;
	private String frecuencia;
	
	
	public String getAlertaNombre() {
		return alertaNombre;
	}
	
	public void setAlertaNombre(String alertaNombre) {
		this.alertaNombre = alertaNombre;
	}
	
	public String getFrecuencia() {
		return frecuencia;
	}
	
	public void setFrecuencia(String frecuencia) {
		this.frecuencia = frecuencia;
	}
	
	public AlertaConfiguracion() {
		super();
	}

	public AlertaConfiguracion(String alertaNombre, String frecuencia) {
		super();
		this.alertaNombre = alertaNombre;
		this.frecuencia = frecuencia;
	}
}