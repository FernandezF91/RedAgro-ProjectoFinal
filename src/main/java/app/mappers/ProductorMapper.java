package app.mappers;

import app.modelos.EntidadProductor;
import app.clases.Productor;
import app.clases.PuntoEntrega;

import java.util.ArrayList;
import java.util.List;

public class ProductorMapper {

	public Productor mapFromEntity(EntidadProductor entidad) {

		UsuarioMapper user_mapper = new UsuarioMapper();
		PuntoEntregaMapper entrega_mapper = new PuntoEntregaMapper();
		List<PuntoEntrega> entregas = new ArrayList<PuntoEntrega>();
		if (entidad.getPuntos_entrega().size() > 0) {
			 entregas = entrega_mapper.mapFromEntity(entidad.getPuntos_entrega());
		}

		Productor modelo = new Productor(entidad.getId(), entidad.getRazon_social(),
				user_mapper.mapFromEntity(entidad.getUsuario()), entregas);
		return modelo;
	}

	public EntidadProductor mapToEntity(Productor modelo) {
		PuntoEntregaMapper entrega_mapper = new PuntoEntregaMapper();
		EntidadProductor entidad = new EntidadProductor();
		entidad.setId(modelo.getId());
		entidad.setRazon_social(modelo.getRazon_social());
		entidad.setPuntos_entrega(entrega_mapper.mapToEntity(modelo.getPuntosEntrega()));
		return entidad;
	}

	public Productor mapFromEntityWithoutPtoEntrega(EntidadProductor entidad) {

		UsuarioMapper user_mapper = new UsuarioMapper();
		List<PuntoEntrega> entregas = new ArrayList<PuntoEntrega>();
		Productor modelo = new Productor(entidad.getId(), entidad.getRazon_social(),
				user_mapper.mapFromEntity(entidad.getUsuario()), entregas);
		return modelo;
	}

	public EntidadProductor mapToEntityWithoutPtoEntrega(Productor modelo) {
		EntidadProductor entidad = new EntidadProductor();
		entidad.setId(modelo.getId());
		entidad.setRazon_social(modelo.getRazon_social());
		return entidad;
	}
}
