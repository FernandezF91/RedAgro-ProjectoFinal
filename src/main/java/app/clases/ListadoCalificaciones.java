package app.clases;

import java.math.BigInteger;
import java.util.Date;

public class ListadoCalificaciones {
	private BigInteger id;
	private Date fecha_calificacion;
	private int valor;
	private String comentario;
	private BigInteger reserva_id;
	private String estado;
	private String nombre_consumidor;
	private String apellido_consumidor;

	public BigInteger getId() {
		return id;
	}
	
	public void setId(BigInteger id) {
		this.id = id;
	}	
	
	public Date getFechaCalificacion() {
		return fecha_calificacion;
	}
	
	public void setId(Date fecha_calificacion) {
		this.fecha_calificacion = fecha_calificacion;
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
	
	public BigInteger getReserva() {
		return reserva_id;
	}
	
	public void setReserva(BigInteger reserva_id) {
		this.reserva_id = reserva_id;
	}
	
	public String getEstado() {
		return estado;
	}
	
	public void getEstado(String estado) {
		this.estado = estado;
	}
	
	public String getNombreConsumidor() {
		return nombre_consumidor;
	}
	
	public void setNombreConsumidor(String nombre_consumidor) {
		this.nombre_consumidor = nombre_consumidor;
	}
	
	public String getApellidoConsumidor() {
		return apellido_consumidor;
	}
	
	public void getApellidoConsumidor(String apellido_consumidor) {
		this.apellido_consumidor = apellido_consumidor;
	}
	
	public ListadoCalificaciones(BigInteger id, Date fechaCalificacion, BigInteger reservaId, String estado, int valor, String comentario, String nombreConsumidor, String apellidoConsumidor) {
		super();
		this.id = id;
		this.fecha_calificacion = fechaCalificacion;
		this.reserva_id = reservaId;
		this.estado = estado;
		this.valor = valor;
		this.comentario = comentario;
		this.nombre_consumidor = nombreConsumidor;
		this.apellido_consumidor = apellidoConsumidor;
	}
}