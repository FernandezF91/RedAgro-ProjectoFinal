package app.mappers;

import app.modelos.EntidadProductoProductor;
import app.clases.Oferta;
import app.clases.ProductoProductor;

import java.util.List;
import java.util.ArrayList;

public class ProductoProductorMapper {

	public ProductoProductor mapFromEntity(EntidadProductoProductor entidad) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();
		OfertaMapper mapeoOferta = new OfertaMapper();

		Oferta oferta = null;
		if (entidad.getOferta() != null) {
			oferta = mapeoOferta.mapFromEntity(entidad.getOferta());
		}

		ProductoProductor producto = new ProductoProductor(entidad.getId(),
				mapeoProductor.mapFromEntity(entidad.getProductor()),
				mapeoProducto.mapFromEntity(entidad.getProducto()), entidad.getTitulo(), entidad.getDescripcion(),
				mapeoImagen.mapFromEntity(entidad.getImagenes()), entidad.getTipo_produccion(), entidad.getStock(),
				entidad.getFecha_vencimiento(), entidad.getContenido(), entidad.getUnidad_venta(), entidad.getPrecio(),
				entidad.getTiempo_preparacion(), oferta, entidad.getActivo());
		return producto;
	}

	public List<ProductoProductor> mapFromEntity(List<EntidadProductoProductor> listaEntidad) {
		List<ProductoProductor> listaProdProductor = new ArrayList<>();

		for (EntidadProductoProductor entidad : listaEntidad) {
			ProductoProductor producto = mapFromEntity(entidad);
			listaProdProductor.add(producto);
		}
		return listaProdProductor;
	}

	public EntidadProductoProductor mapToEntity(ProductoProductor modelo) {
		EntidadProductoProductor entidad = new EntidadProductoProductor();
		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();
		OfertaMapper mapeoOferta = new OfertaMapper();

		entidad.setId(modelo.getId());
		entidad.setProductor(mapeoProductor.mapToEntity(modelo.getProductor()));
		entidad.setProducto(mapeoProducto.mapToEntity(modelo.getProducto()));
		entidad.setTitulo(modelo.getTitulo());
		entidad.setDescripcion(modelo.getDescripcion());
		entidad.setImagenes(mapeoImagen.mapToEntity(modelo.getImagenes()));
		entidad.setTipo_produccion(modelo.getTipo_produccion());
		entidad.setStock(modelo.getStock());
		entidad.setFecha_vencimiento(modelo.getFecha_vencimiento());
		entidad.setContenido(modelo.getContenido());
		entidad.setUnidad_venta(modelo.getUnidad_venta());
		entidad.setPrecio(modelo.getPrecio());
		entidad.setTiempo_preparacion(modelo.getTiempo_preparacion());
		entidad.setOferta(mapeoOferta.mapToEntity(modelo.getOferta()));
		entidad.setActivo(modelo.getActivo());
		return entidad;
	}

	public List<EntidadProductoProductor> mapToEntity(List<ProductoProductor> listaProdProductor) {
		List<EntidadProductoProductor> listaEntidad = new ArrayList<>();

		for (ProductoProductor modelo : listaProdProductor) {
			EntidadProductoProductor entidad = mapToEntity(modelo);
			listaEntidad.add(entidad);
		}
		return listaEntidad;
	}
}
