package app.mappers;

import app.clases.EstadoReserva;
import app.modelos.EntidadEstadoReserva;

public class EstadoReservaMapper {

	public EstadoReserva mapFromEntity(EntidadEstadoReserva entidad) {
		EstadoReserva estado = new EstadoReserva(entidad.getId(), entidad.getNombre());
		return estado;
	}
	
	public EntidadEstadoReserva mapToEntity(EstadoReserva modelo) {
		EntidadEstadoReserva entidad = new EntidadEstadoReserva();
		entidad.setId(modelo.getId());
		entidad.setNombre(modelo.getNombre());
		return entidad;
	}
}
