package app.clases;

import java.util.Calendar;

public class FechaEntrega {
	
	public FechaEntrega(Long id, PuntoEntrega puntoEntrega, Calendar Fecha, Calendar horario) {
		this.setId(id);
		this.setPunto_entrega(puntoEntrega);
		this.setFecha(Fecha);
		this.setHorario(horario);		
	}
	
	private Long id;
	private PuntoEntrega punto_entrega;
	private Calendar fecha;
	private Calendar horario;
	
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
	public Calendar getFecha() {
		return fecha;
	}
	public void setFecha(Calendar fecha) {
		this.fecha = fecha;
	}
	public Calendar getHorario() {
		return horario;
	}
	public void setHorario(Calendar horario) {
		this.horario = horario;
	}	
}
