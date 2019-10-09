package app.clases;

import java.sql.Date;
import java.util.List;

public class Reserva {

	public Reserva(long id, List<DetalleReserva> detalleReserva, Productor productor, Consumidor consumidor,
			PuntoEntrega punto_entrega, EstadoReserva estado_reserva, Date fecha, Date fecha_creacion,
			int total_reserva, String forma_retiro, String persona_retiro) {

		this.setId(id);
		this.setDetalleReserva(detalleReserva);
		this.setProductor(productor);
		this.setConsumidor(consumidor);
		this.setPunto_entrega(punto_entrega);
		this.setEstado_reserva(estado_reserva);
		this.setFecha(fecha);
		this.setFecha_creacion(fecha_creacion);
		this.setTotal_reserva(total_reserva);
		this.setForma_retiro(forma_retiro);
		this.setPersona_retiro(persona_retiro);
	}

	private long id;

	private List<DetalleReserva> detalleReserva;

	private Productor productor;

	private Consumidor consumidor;

	private PuntoEntrega punto_entrega;

	private EstadoReserva estado_reserva;

	private Date fecha;

	private Date fecha_creacion;

	private int total_reserva;

	private String forma_retiro;

	private String persona_retiro;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Productor getProductor() {
		return productor;
	}

	public void setProductor(Productor productor) {
		this.productor = productor;
	}

	public Consumidor getConsumidor() {
		return consumidor;
	}

	public void setConsumidor(Consumidor consumidor) {
		this.consumidor = consumidor;
	}

	public PuntoEntrega getPunto_entrega() {
		return punto_entrega;
	}

	public void setPunto_entrega(PuntoEntrega punto_entrega) {
		this.punto_entrega = punto_entrega;
	}

	public EstadoReserva getEstado_reserva() {
		return estado_reserva;
	}

	public void setEstado_reserva(EstadoReserva estado_reserva) {
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

	public List<DetalleReserva> getDetalleReserva() {
		return detalleReserva;
	}

	public void setDetalleReserva(List<DetalleReserva> detalleReserva) {
		this.detalleReserva = detalleReserva;
	}
}