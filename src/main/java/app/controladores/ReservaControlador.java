package app.controladores;

import java.util.ArrayList;
import java.util.List;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.clases.Reserva;
import app.clases.ResultadosEstadisticas;
import app.daos.ReservaDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadReserva;
import app.mappers.ReservaMapper;

@RestController
public class ReservaControlador {

	@Autowired
	ReservaDao reservaDao;

	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/get_reservas_usuario")
	@ResponseBody
	public List<Reserva> obtenerReservasByUsuario(@RequestParam Long id) {

		String tipoUsuario = usuarioDAO.obtenerTipoUsuario(id);
		ReservaMapper mapeoReservas = new ReservaMapper();
		List<EntidadReserva> resultados = new ArrayList<>();

		if (tipoUsuario.equals("Consumidor")) {
			resultados = reservaDao.obtenerReservasByConsumidor(id);
		} else {
			if (tipoUsuario.equals("Productor")) {
				resultados = reservaDao.obtenerReservasByProductor(id);
			}
		}
		List<Reserva> reservas = mapeoReservas.mapFromEntity(resultados);
		return reservas;
	}

	// Solo contabiliza los ultimos 3 meses
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "redAgro/obtenerMetricasReservasPorEstado", method = RequestMethod.GET)
	public List<ResultadosEstadisticas> obtenerMetricasReservasPorEstado(@RequestParam Long id_usuario) {	
		List<Object[]> resultados = reservaDao.obtenerMetricasReservasPorEstado(id_usuario);
		List<ResultadosEstadisticas> estadisticas = new ArrayList<>();

		if (resultados != null && !resultados.isEmpty()) {
			for (Object[] object : resultados) {
				estadisticas.add(new ResultadosEstadisticas((String) object[0], (BigInteger) object[1]));
			}
		}
		return estadisticas;
	}
}
