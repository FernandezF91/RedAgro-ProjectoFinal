package app.controladores;

import java.util.ArrayList;
import java.util.List;

import java.math.BigInteger;
import java.math.BigDecimal;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.clases.Reserva;
import app.clases.ResultadosEstadisticas;
import app.daos.ProductoProductorDao;
import app.daos.ReservaDao;
import app.daos.DetalleReservaDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadReserva;
import app.modelos.EntidadDetalleReserva;
import app.mappers.ReservaMapper;

@RestController
public class ReservaControlador {

	@Autowired
	ReservaDao reservaDao;
	
	@Autowired
	DetalleReservaDao detalleReservaDao;

	@Autowired
	UsuarioDao usuarioDAO;

	@Autowired
	ProductoProductorDao productoProductorDao;

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

	// Solo contabiliza los ultimos 3 meses
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "redAgro/obtenerMetricasProductosVendidos", method = RequestMethod.GET)
	public List<ResultadosEstadisticas> obtenerMetricasProductosVendidos(@RequestParam Long id_usuario) {
		List<Object[]> resultados = reservaDao.obtenerMetricasProductosVendidos(id_usuario);
		List<ResultadosEstadisticas> estadisticas = new ArrayList<>();

		if (resultados != null && !resultados.isEmpty()) {
			for (Object[] object : resultados) {
				estadisticas.add(new ResultadosEstadisticas((String) object[0], (BigDecimal) object[1]));
			}
		}
		return estadisticas;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "redAgro/obtenerMetricasReservasPorMes", method = RequestMethod.GET)
	public List<ResultadosEstadisticas> obtenerMetricasReservasPorMes(@RequestParam Long id_usuario) {
		List<Object[]> resultados = reservaDao.obtenerMetricasReservasPorMes(id_usuario);
		List<ResultadosEstadisticas> estadisticas = new ArrayList<>();

		if (resultados != null && !resultados.isEmpty()) {
			for (Object[] object : resultados) {
				String mes = "";
				switch ((int) object[0]) {
				case 1:
					mes = "Enero";
					break;
				case 2:
					mes = "Febrero";
					break;
				case 3:
					mes = "Marzo";
					break;
				case 4:
					mes = "Abril";
					break;
				case 5:
					mes = "Mayo";
					break;
				case 6:
					mes = "Junio";
					break;
				case 7:
					mes = "Julio";
					break;
				case 8:
					mes = "Agosto";
					break;
				case 9:
					mes = "Septiembre";
					break;
				case 10:
					mes = "Octubre";
					break;
				case 11:
					mes = "Noviembre";
					break;
				case 12:
					mes = "Diciembre";
					break;
				}
				estadisticas.add(new ResultadosEstadisticas(mes, (BigInteger) object[1]));
				/*
				 * estadisticas.add( new ResultadosEstadisticas((String) object[0], (int)
				 * object[1], (BigInteger) object[2]));
				 */
			}
		}
		return estadisticas;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/generarReserva")
	public ResponseEntity<String> generarReserva(@RequestBody EntidadReserva reserva) {

		List<EntidadDetalleReserva> detalles = reserva.getDetallesReserva();

		// Chequeo Stock
		for (EntidadDetalleReserva unDetalle : detalles) {
			int stockProducto = productoProductorDao.obtenerStock(unDetalle.getId_producto());
			if (unDetalle.getCantidad() > stockProducto) {
				return new ResponseEntity<>("En este momento no hay stock del producto seleccionado",
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		try {
			EntidadReserva nuevaReserva = reservaDao.save(reserva);
			Long idReserva = nuevaReserva.getId();

			for (EntidadDetalleReserva unDetalle : detalles) {
				unDetalle.setId_reserva(idReserva);
			}
			detalleReservaDao.saveAll(detalles);

			String id_reserva = idReserva.toString();
			return new ResponseEntity<>("Reserva " + id_reserva + " creada correctamente!", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrio un error crear la reserva. Reintente más tarde",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
