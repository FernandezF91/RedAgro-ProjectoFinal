package app.mappers;

import app.modelos.EntidadProductor;
import app.clases.Productor;

public class ProductorMapper {
	
	public Productor mapFromEntity( EntidadProductor entidad) {
		
		UsuarioMapper user_mapper = new UsuarioMapper();
		
		Productor modelo = new Productor (entidad.getId(),entidad.getRazon_social(),user_mapper.mapFromEntity(entidad.getUsuario()));
		return modelo;
	}
	
	public EntidadProductor mapToEntity( Productor modelo) {
		EntidadProductor entidad = new EntidadProductor ();
		entidad.setId(modelo.getId());
		entidad.setRazon_social(modelo.getRazon_social());
		return entidad;
	}
}
