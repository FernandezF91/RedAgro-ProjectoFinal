package app.clases;

import java.sql.Date;

public class Calificacion {
	public Calificacion(long id, long reserva_id, int valor, String comentario, Date fecha_calificacion) {
		this.setId(id);
		this.setReservaId(reserva_id);
		this.setValor(valor);
		this.setComentario(comentario);
		this.setFechaCalificacion(fecha_calificacion);
	}
	
	private long id;
	private long reserva_id;
	private int valor;
	private String comentario;
	private Date fecha_calificacion;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getReservaId() {
		return reserva_id;
	}
	
	public void setReservaId(long reserva_id) {
		this.reserva_id = reserva_id;
	}

	public int getValor() {
		return valor;
	}

	public void setValor(int valor) {
		this.valor = valor;
	}

	public String getComentario() {
		return comentario;
	}
	
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	
	public Date getFechaCalificacion() {
		return fecha_calificacion;
	}
	
	public void setFechaCalificacion(Date fecha_calificacion) {
		this.fecha_calificacion = fecha_calificacion;
	}
}
