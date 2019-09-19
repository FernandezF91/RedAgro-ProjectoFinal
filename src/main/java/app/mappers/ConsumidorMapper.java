package app.mappers;

import app.modelos.EntidadConsumidor;
import app.clases.Consumidor;

public class ConsumidorMapper {

	public Consumidor mapFromEntity(EntidadConsumidor entidad) {
		UsuarioMapper usuarioMapper = new UsuarioMapper();
		Consumidor consumidor = new Consumidor(entidad.getId(), usuarioMapper.mapFromEntity(entidad.getUsuario()));

		return consumidor;
	}
	
	public EntidadConsumidor mapToEntity(Consumidor modelo) {
		UsuarioMapper usuarioMapper = new UsuarioMapper();
		EntidadConsumidor entidad = new EntidadConsumidor();
		entidad.setId(modelo.getId());
		entidad.setUsuario(usuarioMapper.mapToEntity(modelo.getUsuario()));
		return entidad;
	}
}
