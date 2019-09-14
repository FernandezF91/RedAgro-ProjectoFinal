package app.mappers;

import app.modelos.EntidadProductoProductor;
import app.clases.ProductoProductor;
import java.util.List;
import java.util.ArrayList;

public class ProductoProductorMapper {

	public ProductoProductor mapFromEntity(EntidadProductoProductor entidad) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();

		ProductoProductor producto = new ProductoProductor(entidad.getId(),
				mapeoProductor.mapFromEntity(entidad.getProductor()),
				mapeoProducto.mapFromEntity(entidad.getProducto()), entidad.getTitulo(), entidad.getDescripcion(),
				mapeoImagen.mapFromEntity(entidad.getImagenes()), entidad.getTipo_unidad(),
				entidad.getTipo_produccion(), entidad.getStock(), entidad.getFecha_vencimiento(), entidad.getPrecio(),
				entidad.getTiempo_preparacion());
		return producto;
	}

	public List<ProductoProductor> mapFromEntity(List<EntidadProductoProductor> listaEntidad) {

		List<ProductoProductor> listaProdProductor = new ArrayList<>();
		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();

		for (EntidadProductoProductor entidad : listaEntidad) {
			ProductoProductor producto = new ProductoProductor(entidad.getId(),
					mapeoProductor.mapFromEntity(entidad.getProductor()),
					mapeoProducto.mapFromEntity(entidad.getProducto()), entidad.getTitulo(), entidad.getDescripcion(),
					mapeoImagen.mapFromEntity(entidad.getImagenes()), entidad.getTipo_unidad(),
					entidad.getTipo_produccion(), entidad.getStock(), entidad.getFecha_vencimiento(),
					entidad.getPrecio(), entidad.getTiempo_preparacion());
			listaProdProductor.add(producto);
		}
		return listaProdProductor;
	}
	
	public EntidadProductoProductor mapToEntity(ProductoProductor modelo) {
		EntidadProductoProductor entidad = new EntidadProductoProductor();
		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();
		
		entidad.setId(modelo.getId());
		entidad.setProductor(mapeoProductor.mapToEntity(modelo.getProductor()));
		entidad.setProducto(mapeoProducto.mapToEntity(modelo.getProducto()));
		entidad.setTitulo(modelo.getTitulo());
		entidad.setDescripcion(modelo.getDescripcion());
		entidad.setImagenes(mapeoImagen.mapToEntity(modelo.getImagenes()));
		entidad.setTipo_unidad(modelo.getTipo_unidad());
		entidad.setTipo_produccion(modelo.getTipo_produccion());
		entidad.setStock(modelo.getStock());
		entidad.setFecha_vencimiento(modelo.getFecha_vencimiento());
		entidad.setPrecio(modelo.getPrecio());
		entidad.setTiempo_preparacion(modelo.getTiempo_preparacion());
		return entidad;		
	}
	
	public List<EntidadProductoProductor> mapToEntity(List<ProductoProductor> listaProdProductor) {
		List<EntidadProductoProductor> listaEntidad = new ArrayList<>();
		ProductorMapper mapeoProductor = new ProductorMapper();
		ProductoMapper mapeoProducto = new ProductoMapper();
		ImagenMapper mapeoImagen = new ImagenMapper();
		
		for(ProductoProductor modelo: listaProdProductor) {
			EntidadProductoProductor entidad = new EntidadProductoProductor();
			entidad.setId(modelo.getId());
			entidad.setProductor(mapeoProductor.mapToEntity(modelo.getProductor()));
			entidad.setProducto(mapeoProducto.mapToEntity(modelo.getProducto()));
			entidad.setTitulo(modelo.getTitulo());
			entidad.setDescripcion(modelo.getDescripcion());
			entidad.setImagenes(mapeoImagen.mapToEntity(modelo.getImagenes()));
			entidad.setTipo_unidad(modelo.getTipo_unidad());
			entidad.setTipo_produccion(modelo.getTipo_produccion());
			entidad.setStock(modelo.getStock());
			entidad.setFecha_vencimiento(modelo.getFecha_vencimiento());
			entidad.setPrecio(modelo.getPrecio());
			entidad.setTiempo_preparacion(modelo.getTiempo_preparacion());
			listaEntidad.add(entidad);
		}
		return listaEntidad;		
	}
}
