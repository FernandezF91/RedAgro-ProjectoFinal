package app.mappers;

import java.util.ArrayList;
import java.util.List;

import app.clases.FechaEntrega;
import app.clases.PuntoEntrega;
import app.modelos.EntidadFechaEntrega;

public class FechaEntregaMapper {

	public FechaEntrega mapFromEntity(EntidadFechaEntrega entidad) {
		PuntoEntregaMapper mapeoPuntoEntrega = new PuntoEntregaMapper();

		PuntoEntrega puntoEntrega = mapeoPuntoEntrega.mapFromEntity(entidad.getPunto_entrega());

		FechaEntrega fechaEntrega = new FechaEntrega(entidad.getId(), puntoEntrega, entidad.getFecha(),
				entidad.getHora_inicio(), entidad.getHora_fin());

		return fechaEntrega;
	}

	public List<FechaEntrega> mapFromEntity(List<EntidadFechaEntrega> listaEntidad) {
		List<FechaEntrega> listaFechasEntrega = new ArrayList<>();

		for (EntidadFechaEntrega entidad : listaEntidad) {
			FechaEntrega fecha = mapFromEntity(entidad);
			listaFechasEntrega.add(fecha);
		}

		return listaFechasEntrega;
	}
	
	public FechaEntrega mapFromEntityWithoutPuntos(EntidadFechaEntrega entidad) {

		PuntoEntrega entregas = null;
		FechaEntrega fechaEntrega = new FechaEntrega(entidad.getId(), entregas, entidad.getFecha(),
				entidad.getHora_inicio(), entidad.getHora_fin());

		return fechaEntrega;
	}

	public List<FechaEntrega> mapFromEntityWithoutPuntos(List<EntidadFechaEntrega> listaEntidad) {
		List<FechaEntrega> listaFechasEntrega = new ArrayList<>();

		for (EntidadFechaEntrega entidad : listaEntidad) {
			FechaEntrega fecha = mapFromEntityWithoutPuntos(entidad);
			listaFechasEntrega.add(fecha);
		}

		return listaFechasEntrega;
	}
}