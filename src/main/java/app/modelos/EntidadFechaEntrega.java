package app.modelos;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Fecha_entrega")
public class EntidadFechaEntrega {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@ManyToOne()
    @JoinColumn(name = "punto_entrega_id", nullable = false)
	private EntidadPuntoEntrega punto_entrega;
	
	@Column(name="fecha", nullable=false)
	private Calendar fecha;
		
	@Column(name="horario", nullable=false)
	private Calendar horario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadPuntoEntrega getPunto_entrega() {
		return punto_entrega;
	}

	public void setPunto_entrega(EntidadPuntoEntrega punto_entrega) {
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
