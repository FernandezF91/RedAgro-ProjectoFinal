package app.modelos;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "Reserva")
public class EntidadReserva {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToMany(mappedBy = "reserva", targetEntity = EntidadDetalleReserva.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	private List<EntidadDetalleReserva> detallesReserva = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "productor_id", nullable = false)
	private EntidadProductor productor;

	@OneToOne
	@JoinColumn(name = "consumidor_id", nullable = false)
	private EntidadConsumidor consumidor;

	@OneToOne
	@JoinColumn(name = "punto_entrega_id", nullable = true)
	private EntidadPuntoEntrega punto_entrega;

	@OneToOne
	@JoinColumn(name = "estado_id", nullable = false)
	private EntidadEstadoReserva estado_reserva;

	@Column(name = "fecha", nullable = true)
	private Date fecha;

	@CreationTimestamp
	@Column(name = "fecha_creacion", nullable = false)
	private Date fecha_creacion;

	@Column(name = "total_reserva", nullable = false)
	private int total_reserva;

	@Column(name = "forma_retiro", nullable = false)
	private String forma_retiro;

	@Column(name = "persona_retiro", nullable = false)
	private String persona_retiro;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}

	public EntidadConsumidor getConsumidor() {
		return consumidor;
	}

	public void setConsumidor(EntidadConsumidor consumidor) {
		this.consumidor = consumidor;
	}

	public EntidadPuntoEntrega getPunto_entrega() {
		return punto_entrega;
	}

	public void setPunto_entrega(EntidadPuntoEntrega punto_entrega) {
		this.punto_entrega = punto_entrega;
	}

	public EntidadEstadoReserva getEstado_reserva() {
		return estado_reserva;
	}

	public void setEstado_reserva(EntidadEstadoReserva estado_reserva) {
		this.estado_reserva = estado_reserva;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Date getFecha_creacion() {
		return fecha_creacion;
	}

	public void setFecha_creacion(Date fecha_creacion) {
		this.fecha_creacion = fecha_creacion;
	}

	public int getTotal_reserva() {
		return total_reserva;
	}

	public void setTotal_reserva(int total_reserva) {
		this.total_reserva = total_reserva;
	}

	public String getForma_retiro() {
		return forma_retiro;
	}

	public void setForma_retiro(String forma_retiro) {
		this.forma_retiro = forma_retiro;
	}

	public String getPersona_retiro() {
		return persona_retiro;
	}

	public void setPersona_retiro(String persona_retiro) {
		this.persona_retiro = persona_retiro;
	}

	public List<EntidadDetalleReserva> getDetallesReserva() {
		return detallesReserva;
	}

	public void setDetallesReserva(List<EntidadDetalleReserva> detallesReserva) {
		this.detallesReserva = detallesReserva;
	}
}
