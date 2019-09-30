package app.modelos;

import java.sql.Date;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne()
    @JoinColumn(name = "punto_entrega_id", nullable = false)
	private EntidadPuntoEntrega punto_entrega;
	
	@Column(name="fecha", nullable=false)
	private String fecha;
		
	@Column(name="hora_inicio", nullable=false)
	private int hora_inicio;
	
	@Column(name="hora_fin", nullable=false)
	private int hora_fin;

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
