package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.daos.CalificacionDao;
import app.modelos.EntidadCalificacion;

@RestController
public class CalificacionControlador {

	@Autowired
	CalificacionDao calificacionDao;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/guardarCalificacion")
	public ResponseEntity<String> guardarOferta(@RequestParam long reserva_id, @RequestBody EntidadCalificacion calificacionAGuardar) {
		try {
			
//			CalificacionMapper mapeoCalificacion = new CalificacionMapper();
//			EntidadCalificacion calificacion = mapeoCalificacion.mapToEntity(calificacionAGuardar);
			EntidadCalificacion calificacion = new EntidadCalificacion();
			calificacion.setReservaId(reserva_id);
			calificacion.setValor(calificacionAGuardar.getValor());
			calificacion.setComentario(calificacionAGuardar.getComentario());
			calificacionDao.save(calificacion);

			return new ResponseEntity<>("Calificación guardada correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al guardar la calificación. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
