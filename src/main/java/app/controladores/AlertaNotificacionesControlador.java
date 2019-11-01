package app.controladores;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.daos.AlertaNotificacionesDao;
import app.modelos.EntidadAlertasNotificaciones;

@RestController
public class AlertaNotificacionesControlador {

	@Autowired
	AlertaNotificacionesDao alertaDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/AlertaNotificaciones/obtenerAlertasByUsuario")
	public ArrayList<EntidadAlertasNotificaciones> obtenerAlertasByUsuario(@RequestParam long id_usuario) {
		ArrayList<EntidadAlertasNotificaciones> alertas = alertaDAO.obtenerNotificacionesByUsuario(id_usuario);
		return alertas;
	}
}
