package app.mappers;

import app.modelos.EntidadProductor;
import app.clases.Productor;

public class ProductorMapper {
	
	public Productor mapFromEntity( EntidadProductor entidad) {
		Productor modelo = new Productor (entidad.getId(), entidad.getRazon_social());
		return modelo;
	}
	
	public EntidadProductor mapToEntity( Productor modelo) {
		EntidadProductor entidad = new EntidadProductor ();
		entidad.setId(modelo.getId());
		entidad.setRazon_social(modelo.getRazon_social());
		return entidad;
	}
}
