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
import app.daos.AlertaNotificacionesDao;
import app.daos.CalificacionDao;
import app.daos.ReservaDao;
import app.mappers.ReservaMapper;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadAlerta;
import app.modelos.EntidadAlertaNotificaciones;
import app.modelos.EntidadCalificacion;
import app.modelos.EntidadUsuario;

@RestController
public class CalificacionControlador {

	@Autowired
	CalificacionDao calificacionDao;

	@Autowired
	ReservaDao reservaDao;

	@Autowired
	AlertaNotificacionesDao alertaNotiDAO;

	@CrossOrigin(origins = "*")
	@PostMapping(path = "redAgro/guardarCalificacion")
	public ResponseEntity<String> guardarCalificacion(@RequestParam long reserva_id,
			@RequestBody EntidadCalificacion calificacionAGuardar) {

		UsuarioMapper mapeoUsuario = new UsuarioMapper();

		try {
			EntidadCalificacion calificacion = new EntidadCalificacion();

			String comentario = null;
			if (calificacionAGuardar.getComentario() != "") {
				comentario = calificacionAGuardar.getComentario().substring(0, 1).toUpperCase()
						+ calificacionAGuardar.getComentario().substring(1);
			}

			calificacion.setReservaId(reserva_id);
			calificacion.setValor(calificacionAGuardar.getValor());
			calificacion.setComentario(comentario);
			calificacionDao.save(calificacion);

			try {
				ReservaMapper mapeoReservas = new ReservaMapper();
				Reserva reserva = mapeoReservas.mapFromEntity(reservaDao.obtenerReservaById(reserva_id));
				MailNuevaCalificacion mailConsumidor = new MailNuevaCalificacion(
						reserva.getProductor().getUsuario().getUsuario(), reserva);

				mailConsumidor.enviarMail();

				// Guardo alerta en la base
				EntidadAlertaNotificaciones alertaNoti = new EntidadAlertaNotificaciones();
				EntidadAlerta alertas = new EntidadAlerta();
				EntidadUsuario productor = mapeoUsuario.mapToEntity(reserva.getProductor().getUsuario());
				alertas.setId(1);
				alertaNoti.setTipo("Web");
				alertaNoti.setTitulo("Nueva Calificación");
				alertaNoti.setDescripcion(
						"Felicitaciones! El/La consumidor/a " + reserva.getConsumidor().getUsuario().getNombre()
								+ " te calificó por la atención brindada durante la reserva #" + reserva.getId()
								+ ". Accedé a la sección de Calificaciones para ver el detalle.");
				alertaNoti.setUsuario(productor);
				alertaNoti.setAlerta(alertas);
				alertaNotiDAO.save(alertaNoti);

			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return new ResponseEntity<>("Calificación guardada correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al guardar la calificación. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
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

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerPromedioCalificaciones")
	public ResponseEntity<Object> obtenerPromedioCalificaciones(@RequestParam long id_productor) {
		try {
			String resultado = calificacionDao.obtenerPromedioCalificaciones(id_productor);
			if (resultado != null) {
				return new ResponseEntity<>(resultado, HttpStatus.OK);
			}
			return new ResponseEntity<>("Aún no hay calificaciones", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al calcular el promedio de las calificaciones. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerUltimasCalificacionesPorProductor")
	public ResponseEntity<Object> obtenerUltimasCalificacionesPorProductor(@RequestParam long id_productor) {
		try {
			List<EntidadCalificacion> listadoCalificacione = calificacionDao
					.obtenerUltimasCalificacionesPorProductor(id_productor);
			return new ResponseEntity<>(listadoCalificacione, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al buscar las últimas calificaciones. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerCantidadDeReservasCalificadas")
	public ResponseEntity<Object> obtenerCantidadDeReservasCalificadas(@RequestParam long id_productor) {
		try {
			String resultado = calificacionDao.obtenerCantidadDeReservasCalificadas(id_productor);
			if (resultado != null && Integer.valueOf(resultado) > 0) {
				String respuesta = "Promedio realizado en base a ";
				if (Integer.valueOf(resultado) == 1) {
					respuesta = respuesta + "1 reserva calificada";
					return new ResponseEntity<>("Promedio realizado en base a 1 reserva calificada", HttpStatus.OK);
				} else {
					respuesta = respuesta + resultado + " reservas calificadas";
				}
				return new ResponseEntity<>(respuesta, HttpStatus.OK);
			}
			return new ResponseEntity<>("Aún no hay calificaciones", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al calcular el promedio de las calificaciones. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
