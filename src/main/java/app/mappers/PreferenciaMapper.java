package app.mappers;

import app.clases.Preferencia;
import app.clases.Consumidor;
import app.clases.Producto;
import app.modelos.EntidadPreferencia;
import app.modelos.EntidadConsumidor;
import app.modelos.EntidadProducto;

public class PreferenciaMapper {
	
	public Preferencia mapFromEntity (EntidadPreferencia entidad) {

		/* Mapeo la entidad del consumidor con la clase */
		ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
		Consumidor consumidor =  mapeoConsumidor.mapFromEntity(entidad.getConsumidor());
		/* Mapeo la entidad del producto con la clase */
		ProductoMapper  mapeoProducto = new ProductoMapper();
		Producto producto = mapeoProducto.mapFromEntity(entidad.getProducto()); 
		
		Preferencia mapeoPreferencia = new Preferencia (entidad.getId(), consumidor, producto);
		return mapeoPreferencia;
		
	}
	
	public EntidadPreferencia mapToEntity (Preferencia modelo) {

		/* Mapeo la clase con la entidad */
		ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
		EntidadConsumidor entidadConsumidor = mapeoConsumidor.mapToEntity(modelo.getConsumidor());
		
		ProductoMapper  mapeoProducto = new ProductoMapper();
		EntidadProducto entidadProducto = mapeoProducto.maptoEntity(modelo.getProducto()); 
		
		EntidadPreferencia mapeoAPreferencia = new EntidadPreferencia ();
		mapeoAPreferencia.setId(modelo.getId());
		mapeoAPreferencia.setConsumidor(entidadConsumidor);
		mapeoAPreferencia.setProducto(entidadProducto);
		return mapeoAPreferencia;
	}
}
