package app.mappers;

import app.clases.Preferencia;
import app.clases.Consumidor;
import app.clases.Producto;
import app.modelos.EntidadPreferencia;
import app.modelos.EntidadConsumidor;
import app.modelos.EntidadProducto;
import java.util.ArrayList;

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
	
	public ArrayList<Preferencia> mapFromEntity (ArrayList<EntidadPreferencia> entidades) {

		ArrayList<Preferencia> mapeoPreferencias = new ArrayList<Preferencia>();
		
		for (EntidadPreferencia unaEntidad : entidades) {
			ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
			Consumidor consumidor =  mapeoConsumidor.mapFromEntity(unaEntidad.getConsumidor());
			
			ProductoMapper  mapeoProducto = new ProductoMapper();
			Producto producto = mapeoProducto.mapFromEntity(unaEntidad.getProducto());
			Preferencia mapeoPreferencia = new Preferencia (unaEntidad.getId(), consumidor, producto);
			mapeoPreferencias.add(mapeoPreferencia);		
		}
		return mapeoPreferencias;
	}
	
	public EntidadPreferencia mapToEntity (Preferencia modelo) {

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
	
	public ArrayList<EntidadPreferencia> mapToEntity (ArrayList<Preferencia> modelos) {
		
		ArrayList<EntidadPreferencia> mapeoDePreferencias = new ArrayList<EntidadPreferencia>();
		
		for(Preferencia unModelo: modelos) {
			ConsumidorMapper mapeoConsumidor = new ConsumidorMapper();
			EntidadConsumidor entidadConsumidor = mapeoConsumidor.mapToEntity(unModelo.getConsumidor());
			
			ProductoMapper  mapeoProducto = new ProductoMapper();
			EntidadProducto entidadProducto = mapeoProducto.maptoEntity(unModelo.getProducto()); 
			
			EntidadPreferencia preferencia = new EntidadPreferencia ();
			preferencia.setId(unModelo.getId());
			preferencia.setConsumidor(entidadConsumidor);
			preferencia.setProducto(entidadProducto);
			mapeoDePreferencias.add(preferencia);			
		}
			
		return mapeoDePreferencias;
	}
}
