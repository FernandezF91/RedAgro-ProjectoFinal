package app.controladores;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import java.math.BigInteger;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.clases.MailNuevaReserva;
import app.clases.MailActualizacionReserva;
import app.clases.Reserva;
import app.clases.ResultadosEstadisticas;
import app.daos.ProductoProductorDao;
import app.daos.PuntoEntregaDao;
import app.daos.ReservaDao;
import app.daos.DetalleReservaDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadReserva;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadDetalleReserva;
import app.modelos.EntidadProductoProductor;
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

	@Autowired
	PuntoEntregaDao puntoEntregaDAO;

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

		EntidadPuntoEntrega entregas = puntoEntregaDAO.obtenerPuntoEntrega((reserva.getPunto_entrega().getId()));
		ReservaMapper mapeo = new ReservaMapper();
		List<EntidadProductoProductor> productos = new ArrayList<EntidadProductoProductor>();
		List<EntidadDetalleReserva> detalles = reserva.getDetallesReserva();
		String usuario;

		reserva.setPunto_entrega(entregas);
		reserva.setConsumidor(usuarioDAO.obtenerDatosUsuario(reserva.getConsumidor().getId()).getConsumidor());
		reserva.setProductor(usuarioDAO.obtenerDatosUsuario(reserva.getProductor().getId()).getProductor());
		reserva.getEstado_reserva();

		// Validación Stock
		for (EntidadDetalleReserva unDetalle : detalles) {
			EntidadProductoProductor producto = productoProductorDao.obtenerProductoById(unDetalle.getId_producto());
			if (producto.getOferta() != null) {
				if (producto.getOferta().getActivo()) {
					float precioConOferta = producto.getPrecio()
							- (producto.getPrecio() * producto.getOferta().getPorcentaje() / 100);
					unDetalle.setPrecio_por_unidad(precioConOferta);
				}
			}
			unDetalle.setProducto(producto);
			int stockProducto = producto.getStock();
			if (unDetalle.getCantidad() > stockProducto) {
				return new ResponseEntity<>("Hey! En este momento no hay stock del producto: " + producto.getTitulo()
						+ ". Reintentá disminuyendo la cantidad elegida.", HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				producto.setStock(stockProducto - unDetalle.getCantidad());
				productos.add(producto);
			}
		}

		try {
			EntidadReserva nuevaReserva = reservaDao.save(reserva);
			Long idReserva = nuevaReserva.getId();

			for (EntidadDetalleReserva unDetalle : detalles) {
				unDetalle.setId_reserva(idReserva);
			}
			// Guardo el detalle y actualizo stock
			detalleReservaDao.saveAll(detalles);
			productoProductorDao.saveAll(productos);

			try {
				usuario = mapeo.mapFromEntity(nuevaReserva).getConsumidor().getUsuario().getUsuario();
				MailNuevaReserva mailConsumidor = new MailNuevaReserva(usuario, mapeo.mapFromEntity(nuevaReserva));

				mailConsumidor.enviarMail();

			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String id_reserva = idReserva.toString();

			return new ResponseEntity<>("Reserva #" + id_reserva + " creada correctamente!", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al crear tu reserva. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path = "redAgro/actualizarEstadoReserva")
	public ResponseEntity<String> actualizarEstadoReserva(@RequestParam long id_reserva, @RequestParam long id_estado) {
		ReservaMapper mapeo = new ReservaMapper();
		try {
			reservaDao.actualizarEstadoReserva(id_reserva, id_estado);
			if (id_estado == 5) {
				List<EntidadDetalleReserva> detalles = detalleReservaDao.obtenerDetalleReserva(id_reserva);

				Date today = new Date();
				for (EntidadDetalleReserva item : detalles) {
					if (item.getProducto().getFecha_vencimiento() == null
							|| (item.getProducto().getFecha_vencimiento() != null
									&& today.before(item.getProducto().getFecha_vencimiento()))) {
						int nuevoStock = item.getCantidad() + item.getProducto().getStock();
						productoProductorDao.actualizarStockProducto(item.getId_producto(), nuevoStock);
					}
				}
			}
			// Genero los mails de alertas
			Reserva reserva = mapeo.mapFromEntity(reservaDao.obtenerReservaById(id_reserva));
			String mailConsumidor = reserva.getConsumidor().getUsuario().getUsuario();
			String mailProductor = reserva.getProductor().getUsuario().getUsuario();
			try {

				MailActualizacionReserva mensajeConsumidor = new MailActualizacionReserva(mailConsumidor,
						reserva.getConsumidor().getUsuario(), reserva);
				MailActualizacionReserva mensajeProductor = new MailActualizacionReserva(mailProductor,
						reserva.getProductor().getUsuario(), reserva);

				mensajeConsumidor.enviarMail();
				mensajeProductor.enviarMail();

			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (id_estado == 4) {
				reservaDao.actualizarFechaAlFinalizar(id_reserva);
			}

			return new ResponseEntity<>("Reserva #" + id_reserva + " actualizada!", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al actualizar tu reserva. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "redAgro/obtenerCantidadReservasDisponiblesConsumidor", method = RequestMethod.GET)
	public ResponseEntity<String> obtenerCantidadReservasDisponiblesConsumidor(@RequestParam Long id_consumidor) {
		try {
			Long cantidad = reservaDao.obtenerCantidadReservasDisponiblesConsumidor(id_consumidor);
			return new ResponseEntity<>(String.valueOf(cantidad), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ups!", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value = "redAgro/obtenerCantidadReservasPendientesProductor", method = RequestMethod.GET)
	public ResponseEntity<String> obtenerCantidadReservasPendientesProductor(@RequestParam Long id_productor) {
		try {
			Long cantidad = reservaDao.obtenerCantidadReservasPendientesProductor(id_productor);
			return new ResponseEntity<>(String.valueOf(cantidad), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ups!", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
