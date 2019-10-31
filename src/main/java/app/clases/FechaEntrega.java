package app.clases;

import java.sql.Time;

public class FechaEntrega {
	
	public FechaEntrega(Long id, PuntoEntrega puntoEntrega, String Fecha, String hora_inicio, String hora_fin) {
		this.setId(id);
		this.setPunto_entrega(puntoEntrega);
		this.setFecha(Fecha);
		this.setHora_inicio(hora_inicio);
		this.setHora_fin(hora_fin);
	}
	
	private Long id;
	private PuntoEntrega punto_entrega;
	private String fecha;
	private String hora_inicio;
	private String hora_fin;
	
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
	public String getHora_inicio() {
		return hora_inicio;
	}
	public void setHora_inicio(String hora_inicio) {
		this.hora_inicio = hora_inicio;
	}
	public String getHora_fin() {
		return hora_fin;
	}
	public void setHora_fin(String hora_fin) {
		this.hora_fin = hora_fin;
	}

}
