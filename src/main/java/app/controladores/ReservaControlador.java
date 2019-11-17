package app.controladores;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import java.math.BigInteger;
import java.math.BigDecimal;

import app.firebase.PushNotificationService;
import app.modelos.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import app.daos.AlertaDao;
import app.daos.AlertaNotificacionesDao;
import app.daos.AlertaUsuarioDao;
import app.daos.DetalleReservaDao;
import app.daos.UsuarioDao;
import app.mappers.ReservaMapper;
import app.mappers.UsuarioMapper;

//"Nuevas reservas"
// "Actualización de reservas"

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

	@Autowired
	AlertaDao alertaDAO;

	@Autowired
	AlertaNotificacionesDao alertaNotiDAO;

	@Autowired
	AlertaUsuarioDao alertaUsuarioDAO;

	@Autowired
	private PushNotificationService pushNotificationService;
	private Logger logger = LoggerFactory.getLogger(ReservaControlador.class);

	@CrossOrigin(origins = "*")
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
	@CrossOrigin(origins = "*")
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
	@CrossOrigin(origins = "*")
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

	@CrossOrigin(origins = "*")
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
			}
		}
		return estadisticas;
	}

	@CrossOrigin(origins = "*")
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

		reserva.setCalificacion(null);

		try {
			EntidadReserva nuevaReserva = reservaDao.save(reserva);
			Long idReserva = nuevaReserva.getId();

			for (EntidadDetalleReserva unDetalle : detalles) {
				unDetalle.setId_reserva(idReserva);
			}
			// Guardo el detalle y actualizo stock
			detalleReservaDao.saveAll(detalles);
			productoProductorDao.saveAll(productos);

			// Guardo las notificaciones de Web y Mobile
			EntidadAlertaNotificaciones alertaNoti = new EntidadAlertaNotificaciones();
			EntidadAlerta alertas = new EntidadAlerta();
			alertas.setId(1);
			alertaNoti.setTipo("Web");
			alertaNoti.setTitulo("Nueva Reserva");
			alertaNoti.setDescripcion(
					"Felicitaciones! Tu consumidor, " + nuevaReserva.getConsumidor().getUsuario().getNombre() + " "
							+ nuevaReserva.getConsumidor().getUsuario().getApellido() + ", generó la reserva # "
							+ nuevaReserva.getId() + ". Accedé a la sección de Reservas para ver el detalle.");
			alertaNoti.setUsuario(nuevaReserva.getProductor().getUsuario());
			alertaNoti.setAlerta(alertas);
			alertaNotiDAO.save(alertaNoti);

			
			notificarUsuario(reserva.getProductor().getUsuario(), "Nuevas reservas");

			try {
				usuario = mapeo.mapFromEntity(nuevaReserva).getConsumidor().getUsuario().getUsuario();
				MailNuevaReserva mailConsumidor = new MailNuevaReserva(usuario, mapeo.mapFromEntity(nuevaReserva),
						"Consumidor");
				mailConsumidor.enviarMail();

				usuario = mapeo.mapFromEntity(nuevaReserva).getProductor().getUsuario().getUsuario();
				MailNuevaReserva mailProductor = new MailNuevaReserva(usuario, mapeo.mapFromEntity(nuevaReserva),
						"Productor");
				mailProductor.enviarMail();

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

	@CrossOrigin(origins = "*")
	@PutMapping(path = "redAgro/actualizarEstadoReserva")
	public ResponseEntity<String> actualizarEstadoReserva(@RequestParam long id_reserva, @RequestParam long id_estado,
			@RequestParam(required = false) String rol) {
		ReservaMapper mapeo = new ReservaMapper();
		UsuarioMapper mapeoUsuario = new UsuarioMapper();
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
			EntidadReserva entidadReserva = reservaDao.obtenerReservaById(id_reserva);
			Reserva reserva = mapeo.mapFromEntity(entidadReserva);
			String mailConsumidor = reserva.getConsumidor().getUsuario().getUsuario();
			String mailProductor = reserva.getProductor().getUsuario().getUsuario();

			// Guardo alerta en la base
			List<EntidadAlertaNotificaciones> listaAlertas = new ArrayList<EntidadAlertaNotificaciones>();
			EntidadAlertaNotificaciones alertaNoti = new EntidadAlertaNotificaciones();
			EntidadUsuario productor = mapeoUsuario.mapToEntity(reserva.getProductor().getUsuario());
			EntidadUsuario consumidor = mapeoUsuario.mapToEntity(reserva.getConsumidor().getUsuario());
			EntidadAlerta alertas = new EntidadAlerta();
			alertas.setId(1);

			int estado = Math.toIntExact(id_estado);
			switch (estado) {
			case 3: {
				alertaNoti.setDescripcion("Tu reserva #" + reserva.getId() + " se encuentra disponible para retirar!");
				break;
			}
			case 4: {
				alertaNoti.setDescripcion("Tu reserva #" + reserva.getId()
						+ " está finalizada! Accedé a la sección de Reservas para ver el detalle.");
				break;
			}
			case 5: {
				alertaNoti.setDescripcion("Tu reserva #" + reserva.getId()
						+ " ha sido cancelada. Accedé a la sección de Reservas para ver el detalle.");

				break;
			}
			default: {
				alertaNoti.setDescripcion("Tu reserva #" + reserva.getId()
						+ " cambió de estado. Accedé a la sección de Reservas para ver el detalle.");
			}
			}

			if (estado == 4 || estado == 5) {
				EntidadAlertaNotificaciones alertaNoti2 = new EntidadAlertaNotificaciones();
				alertaNoti2.setTipo("Web");
				alertaNoti2.setTitulo("Actualización de Reserva");
				alertaNoti2.setDescripcion(alertaNoti.getDescripcion());
				alertaNoti2.setAlerta(alertas);
				alertaNoti2.setUsuario(productor);
				listaAlertas.add(alertaNoti2);
			}
			alertaNoti.setTipo("Web");
			alertaNoti.setTitulo("Actualización de Reserva");
			alertaNoti.setUsuario(consumidor);
			alertaNoti.setAlerta(alertas);
			listaAlertas.add(alertaNoti);

			alertaNotiDAO.saveAll(listaAlertas);

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

			if (reserva.getFecha() == null && (id_estado == 4 || id_estado == 5)) {
				reservaDao.actualizarFechaAlFinalizar(id_reserva);
			}

			if (rol.equals("Productor")) {

				notificarUsuario(entidadReserva.getConsumidor().getUsuario(), "Actualización de reservas");

			} else {

				notificarUsuario(entidadReserva.getProductor().getUsuario(), "Actualización de reservas");

			}

			return new ResponseEntity<>("Reserva #" + id_reserva + " actualizada!", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al actualizar tu reserva. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "redAgro/obtenerCantidadReservasDisponiblesConsumidor")
	public ResponseEntity<Object> obtenerCantidadReservasDisponiblesConsumidor(@RequestParam Long id_consumidor) {
		try {
			Long cantidad = reservaDao.obtenerCantidadReservasDisponiblesConsumidor(id_consumidor);
			return new ResponseEntity<>(cantidad, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al buscar las reservas pendientes. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "redAgro/obtenerCantidadReservasPendientesProductor")
	public ResponseEntity<Object> obtenerCantidadReservasPendientesProductor(@RequestParam Long id_productor) {
		try {
			Long cantidad = reservaDao.obtenerCantidadReservasPendientesProductor(id_productor);
			return new ResponseEntity<>(cantidad, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al buscar las reservas.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private void notificarUsuario(EntidadUsuario usuario, String nombreAlerta) {
		logger.info("Por enviar notification...");
		ArrayList<EntidadAlertaUsuario> alertas = alertaUsuarioDAO.obtenerConfiguracionAlertas(usuario.getId());
		boolean notificationEnabled = alertas.stream()
				.anyMatch(alerta -> alerta.getAlerta().getNombre().equals(nombreAlerta));
		if (!notificationEnabled) {
			return;
		}

		String title = "Actualización de reserva";
		String message = "Se ha actualizado una de tus reservas!";

		if (nombreAlerta.equals("Nuevas reservas")) {
			title = "Nuevas reserva";
			message = "Recibiste una reserva por uno de tus productos!";
		}

		PushNotificationRequest notificationRequest = new PushNotificationRequest(title, message);
		String deviceToken = usuario.getDeviceToken();
		if (deviceToken != null && !deviceToken.isEmpty()) {
			notificationRequest.setToken(deviceToken);
			pushNotificationService.sendPushNotificationToToken(notificationRequest);
		}
	}
}