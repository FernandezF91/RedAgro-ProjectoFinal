package app.mappers;

import app.clases.FechaEntrega;
import app.clases.Productor;
import app.clases.PuntoEntrega;
import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadPuntoEntrega;

public class FechaEntregaMapper {
	
	public FechaEntrega mapFromEntity(EntidadFechaEntrega entidad) {
		
		PuntoEntregaMapper epem = new PuntoEntregaMapper();

		PuntoEntrega epe = epem.mapFromEntity(entidad.getPunto_entrega());
	
		FechaEntrega fe= new FechaEntrega(entidad.getId(), epe,entidad.getFecha(),entidad.getHora_inicio(),entidad.getHora_fin());

		return fe;
	}
	
}
