package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Entity
@Table(name = "Calificacion")
public class EntidadCalificacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Column(name = "reserva_id")
    private long reserva_id;

	@OneToOne()
	@JoinColumn(name = "reserva_id", nullable = false, updatable = false, insertable = false)
	private EntidadReserva reserva;

	@Column(name = "valor", nullable = false)
	private int valor;

	@Column(name = "comentario", nullable = true)
	private String comentario;
	
	@CreationTimestamp
	@Column(name = "fecha_calificacion", nullable = false)
	private Date fecha_calificacion;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
