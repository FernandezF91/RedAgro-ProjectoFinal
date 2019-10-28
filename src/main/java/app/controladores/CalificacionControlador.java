package app.controladores;

import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.ListadoCalificaciones;
import app.clases.MailNuevaCalificacion;
import app.clases.Reserva;
import app.daos.CalificacionDao;
import app.daos.ReservaDao;
import app.mappers.ReservaMapper;
import app.modelos.EntidadCalificacion;

@RestController
public class CalificacionControlador {

	@Autowired
	CalificacionDao calificacionDao;

	@Autowired
	ReservaDao reservaDao;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/guardarCalificacion")
	public ResponseEntity<String> guardarCalificacion(@RequestParam long reserva_id,
			@RequestBody EntidadCalificacion calificacionAGuardar) {

		try {
			EntidadCalificacion calificacion = new EntidadCalificacion();
			calificacion.setReservaId(reserva_id);
			calificacion.setValor(calificacionAGuardar.getValor());
			calificacion.setComentario(calificacionAGuardar.getComentario());
			calificacionDao.save(calificacion);

			try {
				ReservaMapper mapeoReservas = new ReservaMapper();
				Reserva reserva = mapeoReservas.mapFromEntity(reservaDao.obtenerReservaById(reserva_id));
				MailNuevaCalificacion mailConsumidor = new MailNuevaCalificacion(
						reserva.getProductor().getUsuario().getUsuario(), reserva);

				mailConsumidor.enviarMail();

			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return new ResponseEntity<>("Calificación guardada correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al guardar la calificación. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerCalificaciones")
	public List<ListadoCalificaciones> obtenerCalificaciones(@RequestParam long id_productor) {

		List<Object[]> resultados = calificacionDao.obtenerCalificaciones(id_productor);
		List<ListadoCalificaciones> listaCalificaciones = new ArrayList<>();

		if (resultados != null && !resultados.isEmpty()) {
			for (Object[] object : resultados) {
				listaCalificaciones.add(new ListadoCalificaciones((BigInteger) object[0], (Date) object[1],
						(BigInteger) object[2], (String) object[3], (int) object[4], (String) object[5],
						(String) object[6], (String) object[7]));
			}
		}
		return listaCalificaciones;
	}
}
