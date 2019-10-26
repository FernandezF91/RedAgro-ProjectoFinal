package app.mappers;

import app.clases.Reserva;
import app.clases.EstadoReserva;
import app.clases.DetalleReserva;
import app.clases.Productor;
import app.clases.Calificacion;
import app.clases.Consumidor;
import app.clases.PuntoEntrega;
import app.modelos.EntidadReserva;
import java.util.List;
import java.util.ArrayList;

public class ReservaMapper {

	public Reserva mapFromEntity(EntidadReserva entidad) {
		DetalleReservaMapper mapeoDetalle = new DetalleReservaMapper();
		List<DetalleReserva> listaDetalle = mapeoDetalle.mapFromEntity(entidad.getDetallesReserva());

		ProductorMapper mapeoProductor = new ProductorMapper();
		Productor productor = mapeoProductor.mapFromEntity(entidad.getProductor());

		ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
		Consumidor consumidor = mapeoConsumidor.mapFromEntity(entidad.getConsumidor());

		PuntoEntregaMapper mapeoPtoEntrega = new PuntoEntregaMapper();
		PuntoEntrega ptoEntrega = null;
		if (entidad.getPunto_entrega() != null) {
			ptoEntrega = mapeoPtoEntrega.mapFromEntity(entidad.getPunto_entrega());
		}

		EstadoReservaMapper mapeoEstado = new EstadoReservaMapper();
		EstadoReserva estado = mapeoEstado.mapFromEntity(entidad.getEstado_reserva());

		CalificacionMapper mapeoCalificacion = new CalificacionMapper();
		Calificacion calificacion = null;
		if (entidad.getCalificacion() != null) {
			calificacion = mapeoCalificacion.mapFromEntity(entidad.getCalificacion());
		}

		Reserva reserva = new Reserva(entidad.getId(), listaDetalle, productor, consumidor, ptoEntrega, estado,
				entidad.getFecha(), entidad.getFecha_creacion(), entidad.getTotal_reserva(), entidad.getForma_retiro(),
				entidad.getPersona_retiro(), calificacion);
		return reserva;
	}

	public List<Reserva> mapFromEntity(List<EntidadReserva> listaEntidadReserva) {
		List<Reserva> listaReservas = new ArrayList<>();

		for (EntidadReserva entidad : listaEntidadReserva) {
			Reserva reserva = mapFromEntity(entidad);
			listaReservas.add(reserva);
		}
		
		return listaReservas;
	}

	public EntidadReserva mapToEntity(Reserva modelo) {
		EntidadReserva entidad = new EntidadReserva();
		DetalleReservaMapper mapeoDetalle = new DetalleReservaMapper();
		ProductorMapper mapeoProductor = new ProductorMapper();
		ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
		PuntoEntregaMapper mapeoPtoEntrega = new PuntoEntregaMapper();
		EstadoReservaMapper mapeoEstado = new EstadoReservaMapper();
		CalificacionMapper mapeoCalificacion = new CalificacionMapper();

		entidad.setId(modelo.getId());
		entidad.setDetallesReserva(mapeoDetalle.mapToEntity(modelo.getDetalleReserva()));
		entidad.setProductor(mapeoProductor.mapToEntity(modelo.getProductor()));
		entidad.setConsumidor(mapeoConsumidor.mapToEntity(modelo.getConsumidor()));
		entidad.setPunto_entrega(mapeoPtoEntrega.mapToEntity(modelo.getPunto_entrega()));
		entidad.setEstado_reserva(mapeoEstado.mapToEntity(modelo.getEstado_reserva()));
		entidad.setFecha(modelo.getFecha());
		entidad.setFecha_creacion(modelo.getFecha_creacion());
		entidad.setTotal_reserva(modelo.getTotal_reserva());
		entidad.setForma_retiro(modelo.getForma_retiro());
		entidad.setPersona_retiro(modelo.getForma_retiro());
		entidad.setCalificacion(mapeoCalificacion.mapToEntity(modelo.getCalificacion()));

		return entidad;
	}

	public List<EntidadReserva> mapToEntity(List<Reserva> listaReservas) {
		List<EntidadReserva> listaEntidadReserva = new ArrayList<>();

		for (Reserva modelo : listaReservas) {
			EntidadReserva entidad = mapToEntity(modelo);
			listaEntidadReserva.add(entidad);
		}
		return listaEntidadReserva;
	}
}
