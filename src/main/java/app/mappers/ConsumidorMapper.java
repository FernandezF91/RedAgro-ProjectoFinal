package app.mappers;

import app.modelos.EntidadConsumidor;
import app.clases.Consumidor;

public class ConsumidorMapper {

	public Consumidor mapFromEntity(EntidadConsumidor entidad) {

		Consumidor consumidor = new Consumidor(entidad.getId());

		return consumidor;
	}
	
	public EntidadConsumidor mapToEntity(Consumidor modelo) {

		EntidadConsumidor entidad = new EntidadConsumidor();
		entidad.setId(modelo.getId());

		return entidad;
	}
}
