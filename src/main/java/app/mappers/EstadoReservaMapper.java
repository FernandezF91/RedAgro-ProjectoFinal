package app.mappers;

import java.util.ArrayList;
import java.util.List;

import app.clases.EstadoReserva;
import app.modelos.EntidadEstadoReserva;

public class EstadoReservaMapper {

	public EstadoReserva mapFromEntity(EntidadEstadoReserva entidad) {
		EstadoReserva estado = new EstadoReserva(entidad.getId(), entidad.getNombre());
		return estado;
	}

	public List<EstadoReserva> mapFromEntity(List<EntidadEstadoReserva> listaEntidad) {
		List<EstadoReserva> listaEstados = new ArrayList<>();

		for (EntidadEstadoReserva entidad : listaEntidad) {
			EstadoReserva estado = new EstadoReserva(entidad.getId(), entidad.getNombre());
			listaEstados.add(estado);
		}
		return listaEstados;
	}

	public EntidadEstadoReserva mapToEntity(EstadoReserva modelo) {
		EntidadEstadoReserva entidad = new EntidadEstadoReserva();
		entidad.setId(modelo.getId());
		entidad.setNombre(modelo.getNombre());
		return entidad;
	}
}
