package app.mappers;

import app.clases.Calificacion;
import app.modelos.EntidadCalificacion;

public class CalificacionMapper {
	public Calificacion mapFromEntity(EntidadCalificacion entidad) {

		Calificacion mapeoCalificacion = new Calificacion(entidad.getId(), entidad.getReservaId(), entidad.getValor(),
				entidad.getComentario());
		return mapeoCalificacion;
	}

	public EntidadCalificacion mapToEntity(Calificacion calificacion) {
		EntidadCalificacion mapeoCalificacion = new EntidadCalificacion();
		mapeoCalificacion.setId(calificacion.getId());
		mapeoCalificacion.setReservaId(calificacion.getReservaId());
		mapeoCalificacion.setValor(calificacion.getValor());
		mapeoCalificacion.setComentario(calificacion.getComentario());

		return mapeoCalificacion;
	}

}
