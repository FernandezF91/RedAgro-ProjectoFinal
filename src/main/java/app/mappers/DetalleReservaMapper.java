package app.mappers;

import app.clases.DetalleReserva;
import app.modelos.EntidadDetalleReserva;
import java.util.List;
import java.util.ArrayList;

public class DetalleReservaMapper {

	public DetalleReserva mapFromEntity(EntidadDetalleReserva entidad) {
		ProductoProductorMapper mapeoProducto = new ProductoProductorMapper();
		mapeoProducto.mapFromEntity(entidad.getProducto());
		DetalleReserva detalle = new DetalleReserva(entidad.getId_reserva(), entidad.getId_producto(),
				entidad.getCantidad(), entidad.getPrecio_por_unidad(), entidad.getActivo(), 
				mapeoProducto.mapFromEntity(entidad.getProducto()));
		return detalle;
	}

	public List<DetalleReserva> mapFromEntity(List<EntidadDetalleReserva> listaEntidadReservas) {

		List<DetalleReserva> listaReservas = new ArrayList<DetalleReserva>();
		ProductoProductorMapper mapeoProducto = new ProductoProductorMapper();
		
		for (EntidadDetalleReserva entidad : listaEntidadReservas) {
			DetalleReserva detalle = new DetalleReserva(entidad.getId_reserva(), entidad.getId_producto(),
					entidad.getCantidad(), entidad.getPrecio_por_unidad(), entidad.getActivo(),
					mapeoProducto.mapFromEntity(entidad.getProducto()));
			listaReservas.add(detalle);
		}
		return listaReservas;
	}

	public EntidadDetalleReserva mapToEntity(DetalleReserva modelo) {
		ProductoProductorMapper mapeoProducto = new ProductoProductorMapper();
		EntidadDetalleReserva entidad = new EntidadDetalleReserva();
		entidad.setId_reserva(modelo.getId_reserva());
		entidad.setId_producto(modelo.getId_producto());
		entidad.setCantidad(modelo.getCantidad());
		entidad.setPrecio_por_unidad(modelo.getPrecio_por_unidad());
		entidad.setActivo(modelo.getActivo());
		entidad.setProducto(mapeoProducto.mapToEntity(modelo.getProducto()));
		return entidad;
	}

	public List<EntidadDetalleReserva> mapToEntity(List<DetalleReserva> listaDetalle) {

		List<EntidadDetalleReserva> listaEntidadReservas = new ArrayList<EntidadDetalleReserva>();
		ProductoProductorMapper mapeoProducto = new ProductoProductorMapper();

		for (DetalleReserva modelo : listaDetalle) {
			EntidadDetalleReserva entidad = new EntidadDetalleReserva();
			entidad.setId_reserva(modelo.getId_reserva());
			entidad.setId_producto(modelo.getId_producto());
			entidad.setCantidad(modelo.getCantidad());
			entidad.setPrecio_por_unidad(modelo.getPrecio_por_unidad());
			entidad.setActivo(modelo.getActivo());
			entidad.setProducto(mapeoProducto.mapToEntity(modelo.getProducto()));
			listaEntidadReservas.add(entidad);
		}
		return listaEntidadReservas;
	}
}
