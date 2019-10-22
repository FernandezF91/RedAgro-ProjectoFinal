package app.mappers;

import app.clases.Oferta;
import app.clases.ProductoProductor;
import app.modelos.EntidadOferta;
import app.modelos.EntidadProductoProductor;

public class OfertaMapper {

	public Oferta mapFromEntity(EntidadOferta entidad) {

		ProductoProductorMapper mapeoProductoProductor = new ProductoProductorMapper();
		ProductoProductor productoProductor = mapeoProductoProductor.mapFromEntity(entidad.getProductoProductor());

		Oferta mapeoOferta = new Oferta(entidad.getId(), productoProductor, entidad.getPorcentaje(),
				entidad.getActivo());
		return mapeoOferta;
	}

	public EntidadOferta mapToEntity(Oferta oferta) {
		
		ProductoProductorMapper mapeoProductoProductor = new ProductoProductorMapper();
		EntidadProductoProductor productoProductor = mapeoProductoProductor.mapToEntity(oferta.getProductoProductor());

		EntidadOferta mapeoOferta = new EntidadOferta();
		mapeoOferta.setId(oferta.getId());
		mapeoOferta.setProductoProductor(productoProductor);
		mapeoOferta.setPorcentaje(oferta.getPorcentaje());
		mapeoOferta.setActivo(oferta.getActivo());
		
		return mapeoOferta;
	}
}
