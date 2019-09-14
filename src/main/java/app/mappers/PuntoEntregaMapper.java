package app.mappers;

import app.clases.PuntoEntrega;
import app.clases.Productor;
import app.clases.FechaEntrega;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadProductor;;

public class PuntoEntregaMapper {
	
	public PuntoEntrega mapFromEntity(EntidadPuntoEntrega entidad) {
		
		ProductorMapper mapeoProductor = new ProductorMapper();
		Productor productor = mapeoProductor.mapFromEntity(entidad.getProductor());
		
		PuntoEntrega entrega = new PuntoEntrega(entidad.getId(), productor,  entidad.getPais(), entidad.getProvincia(), 
												entidad.getLocalidad(), entidad.getCod_postal(), entidad.getDireccion());
		return entrega;
	}
	
	public EntidadPuntoEntrega mapToEntity(PuntoEntrega modelo) {
		
		ProductorMapper mapeoProductor = new ProductorMapper();
		EntidadProductor entidadProductor = mapeoProductor.mapToEntity(modelo.getProductor());
		
		EntidadPuntoEntrega entidad = new EntidadPuntoEntrega ();
		
		entidad.setId(modelo.getId());
		entidad.setProductor(entidadProductor);
		entidad.setPais(modelo.getPais());
		entidad.setProvincia(modelo.getProvincia());
		entidad.setLocalidad(modelo.getLocalidad());
		entidad.setCod_postal(modelo.getCod_postal());
		entidad.setDireccion(modelo.getDireccion());
		
		return entidad;
	}
}

