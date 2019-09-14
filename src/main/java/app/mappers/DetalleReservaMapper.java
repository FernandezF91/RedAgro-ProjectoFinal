package app.mappers;

import app.clases.DetalleReserva;
import app.modelos.EntidadDetalleReserva;
import java.util.List;
import java.util.ArrayList;

public class DetalleReservaMapper {

	public DetalleReserva mapFromEntity(EntidadDetalleReserva entidad) {
		DetalleReserva detalle = new DetalleReserva(entidad.getId_reserva(), entidad.getId_producto(),
				entidad.getCantidad(), entidad.getActivo());
		return detalle;
	}

	public List<DetalleReserva> mapFromEntity(List<EntidadDetalleReserva> listaEntidadReservas) {

		List<DetalleReserva> listaReservas = new ArrayList<DetalleReserva>();

		for (EntidadDetalleReserva entidad : listaEntidadReservas) {
			DetalleReserva detalle = new DetalleReserva(entidad.getId_reserva(), entidad.getId_producto(),
														entidad.getCantidad(), entidad.getActivo());
			listaReservas.add(detalle);			
		}
		return listaReservas;
	}

	public EntidadDetalleReserva mapToEntity(DetalleReserva modelo) {
		EntidadDetalleReserva entidad = new EntidadDetalleReserva();
		entidad.setId_reserva(modelo.getId_reserva());
		entidad.setId_producto(modelo.getId_producto());
		entidad.setCantidad(modelo.getCantidad());
		entidad.setActivo(modelo.getActivo());
		return entidad;
	}
	
	public List<EntidadDetalleReserva> mapToEntity(List<DetalleReserva> listaDetalle) {
		
		List<EntidadDetalleReserva> listaEntidadReservas = new ArrayList<EntidadDetalleReserva>();
		
		for (DetalleReserva modelo : listaDetalle) {
			EntidadDetalleReserva entidad = new EntidadDetalleReserva();
			entidad.setId_reserva(modelo.getId_reserva());
			entidad.setId_producto(modelo.getId_producto());
			entidad.setCantidad(modelo.getCantidad());
			entidad.setActivo(modelo.getActivo());
			listaEntidadReservas.add(entidad);			
		}
		return listaEntidadReservas;
	}
}
