package app.clases;

import java.util.Calendar;

public class FechaEntrega {
	
	public FechaEntrega(Long id, PuntoEntrega puntoEntrega, String Fecha, int hora_inicio, int hora_fin) {
		this.setId(id);
		this.setPunto_entrega(puntoEntrega);
		this.setFecha(Fecha);
		this.setHora_inicio(hora_inicio);
		this.setHora_fin(hora_fin);
	}
	
	private Long id;
	private PuntoEntrega punto_entrega;
	private String fecha;
	private int hora_inicio;
	private int hora_fin;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PuntoEntrega getPunto_entrega() {
		return punto_entrega;
	}
	public void setPunto_entrega(PuntoEntrega punto_entrega) {
		this.punto_entrega = punto_entrega;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public int getHora_inicio() {
		return hora_inicio;
	}
	public void setHora_inicio(int hora_inicio) {
		this.hora_inicio = hora_inicio;
	}
	public int getHora_fin() {
		return hora_fin;
	}
	public void setHora_fin(int hora_fin) {
		this.hora_fin = hora_fin;
	}

	
}
