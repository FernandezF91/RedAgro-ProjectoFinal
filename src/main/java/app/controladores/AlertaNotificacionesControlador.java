package app.controladores;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.daos.AlertaDao;
import app.daos.AlertaNotificacionesDao;
import app.modelos.EntidadAlerta;
import app.modelos.EntidadAlertaNotificaciones;
import app.modelos.EntidadReserva;

@RestController
public class AlertaNotificacionesControlador {

	@Autowired
	AlertaDao alertaDAO;

	@Autowired
	AlertaNotificacionesDao alertaNotificacionDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/AlertaNotificaciones/obtenerAlertasByUsuario")
	public ArrayList<EntidadAlertaNotificaciones> obtenerAlertasByUsuario(@RequestParam long id_usuario) {
		ArrayList<EntidadAlertaNotificaciones> alertas = alertaNotificacionDAO
				.obtenerNotificacionesByUsuario(id_usuario);
		return alertas;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/AlertaNotificaciones/guardarAlertaReserva")
	public boolean guardarAlertaNuevaReserva(@RequestParam String tipoApp, @RequestBody EntidadReserva reserva) {
		try {
			EntidadAlertaNotificaciones alertaNoti = new EntidadAlertaNotificaciones();
			EntidadAlerta alerta = new EntidadAlerta(); //alertaDAO.obtenerAlertaById(1);
			alerta.setId(1);

			alertaNoti.setTipo(tipoApp);
			alertaNoti.setTitulo("Nueva Reserva");
			alertaNoti.setDescripcion("El consumidor " + reserva.getConsumidor().getUsuario().getNombre() + " "
					+ reserva.getConsumidor().getUsuario().getApellido() + " generó la reserva #" + reserva.getId());
			alertaNoti.setUsuario(reserva.getProductor().getUsuario());
			alertaNoti.setAlerta(alerta);
			alertaNotificacionDAO.save(alertaNoti);
			return true;

		} catch (Exception e) {
			return false;
		}
	}
}
