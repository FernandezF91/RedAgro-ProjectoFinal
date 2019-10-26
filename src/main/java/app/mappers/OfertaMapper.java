package app.mappers;

import app.clases.Oferta;
import app.modelos.EntidadOferta;

public class OfertaMapper {

	public Oferta mapFromEntity(EntidadOferta entidad) {

		Oferta mapeoOferta = new Oferta(entidad.getId(), entidad.getProductoProductorId(), entidad.getPorcentaje(),
				entidad.getActivo());
		return mapeoOferta;
	}

	public EntidadOferta mapToEntity(Oferta oferta) {
		EntidadOferta mapeoOferta = new EntidadOferta();
		mapeoOferta.setId(oferta.getId());
		mapeoOferta.setProductoProductorId(oferta.getProductoProductorId());
		mapeoOferta.setPorcentaje(oferta.getPorcentaje());
		mapeoOferta.setActivo(oferta.getActivo());

		return mapeoOferta;
	}
}
