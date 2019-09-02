package app.mappers;

import app.modelos.EntidadProducto;
import app.clases.Producto;

public class ProductoMapper {

	public Producto mapFromEntity(EntidadProducto entidad) {

		Producto mapeoDeProducto = new Producto(entidad.getId(), entidad.getCategoria(), entidad.getTipo());
		return mapeoDeProducto;
	}

	public EntidadProducto maptoEntity(Producto modelo) {

		EntidadProducto mapeoAProducto = new EntidadProducto();
		mapeoAProducto.setId(modelo.getId());
		mapeoAProducto.setCategoria(modelo.getCategoria());
		mapeoAProducto.setTipo(modelo.getTipo());
		return mapeoAProducto;
	}
}
