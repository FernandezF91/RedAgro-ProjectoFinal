package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import app.daos.AlertaDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadAlertaUsuario;
import app.mappers.AlertaFrecuenciaMapper;
import app.mappers.AlertaMapper;
import app.mappers.AlertaUsuarioMapper;
import app.mappers.UsuarioMapper;
import app.clases.Alerta;
import app.clases.AlertaFrecuencia;
import app.clases.AlertaUsuario;
import app.clases.AlertaConfiguracion;
import app.clases.Usuario;
import app.clases.MailMensajes;

@RestController
public class AlertaControlador {

	@Autowired
	AlertaDao alertaDAO;

	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerConfiguracionAlertas")
	@ResponseBody
	public ArrayList<AlertaUsuario> obtenerConfiguracionAlertas(@RequestParam long id_usuario) {
		ArrayList<EntidadAlertaUsuario> resultados = alertaDAO.obtenerConfiguracionAlertas(id_usuario);
		AlertaUsuarioMapper mapeoDeAlertaUsuario = new AlertaUsuarioMapper();
		ArrayList<AlertaUsuario> alertas = mapeoDeAlertaUsuario.mapFromEntity(resultados);
		return alertas;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/guardarConfiguracionAlertas")
	public ResponseEntity<String> guardarConfiguracionAlertas(@RequestParam long id_usuario,
			@RequestBody ArrayList<AlertaConfiguracion> alertasAGuardar) {

		try {
			ArrayList<EntidadAlertaUsuario> nuevasAlertas = new ArrayList<EntidadAlertaUsuario>();
			ArrayList<AlertaUsuario> alertasActuales = this.obtenerConfiguracionAlertas(id_usuario);
			if (alertasActuales.size() > 0) {
				alertaDAO.borrarAlertaPorUsuario(id_usuario);
			}

			AlertaMapper mapeoDeAlerta = new AlertaMapper();
			UsuarioMapper mapeoDeUsuario = new UsuarioMapper();
			AlertaUsuarioMapper mapeoDeAlertaUsuario = new AlertaUsuarioMapper();
			AlertaFrecuenciaMapper mapeoDeFrecuencia = new AlertaFrecuenciaMapper();

			for (AlertaConfiguracion alertaConf : alertasAGuardar) {

				Alerta alerta = mapeoDeAlerta.mapFromEntity(alertaDAO.obtenerAlertaTipo(alertaConf.getAlertaNombre()));
				AlertaFrecuencia frecuencia = mapeoDeFrecuencia
						.mapFromEntity(alertaDAO.obtenerFrecuencia(alertaConf.getFrecuencia()));
				Usuario usuario = mapeoDeUsuario.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id_usuario));
				AlertaUsuario alertaUsuario = new AlertaUsuario(0, alerta, frecuencia, usuario);

				EntidadAlertaUsuario nueva = mapeoDeAlertaUsuario.mapToEntity(alertaUsuario);
				nuevasAlertas.add(nueva);
			}

			alertaDAO.saveAll(nuevasAlertas);
			return new ResponseEntity<>("Alertas actualizadas correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al guardar las alertas. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/Alertas/NuevoMensaje")
	public ResponseEntity<String> notificarNuevoMensaje(@RequestParam long id_Emisor, @RequestParam long id_Receptor) {

		UsuarioMapper userMapper = new UsuarioMapper();
		Usuario usuarioEmisor = userMapper.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id_Emisor));
		// ACÁ HABRIA QUE VALIDAR SI EL EMISOR TIENE CONFIGURADO EL ENVIO DE MAILS.
		Usuario usuarioReceptor = userMapper.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id_Receptor));
		String mail = usuarioReceptor.getUsuario();

		try {
			MailMensajes nuevoMensaje = new MailMensajes(mail, usuarioEmisor, usuarioReceptor);
			nuevoMensaje.enviarMail();
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>("Ocurrió un error en el envio del mail.", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>("Mail enviado correctamente!", HttpStatus.OK);
	}
}