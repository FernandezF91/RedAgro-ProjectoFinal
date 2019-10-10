package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import app.daos.AlertaDao;
import app.modelos.EntidadAlertaUsuario;
import app.mappers.AlertaUsuarioMapper;
import app.clases.AlertaUsuario;

@RestController
public class AlertaControlador {

	@Autowired
	AlertaDao alertaDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerConfiguracionAlertas")
	@ResponseBody
	public ArrayList<AlertaUsuario> obtenerConfiguracionAlertas(@RequestParam Long id_usuario) {
		ArrayList<EntidadAlertaUsuario> resultados = alertaDAO.obtenerConfiguracionAlertas(id_usuario);
		AlertaUsuarioMapper mapeoDeAlertaUsuario = new AlertaUsuarioMapper();
		ArrayList<AlertaUsuario> alertas = mapeoDeAlertaUsuario.mapFromEntity(resultados);
		return alertas;
	}
}
