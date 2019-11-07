package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import app.clases.PuntoEntrega;
import app.daos.FechaEntregaDao;
import app.daos.ProductorDao;
import app.daos.PuntoEntregaDao;
import app.mappers.PuntoEntregaMapper;
import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadProductor;
import app.modelos.EntidadPuntoEntrega;

@RestController
public class PuntoDeEntregaControlador {

	@Autowired
	PuntoEntregaDao puntoEntregaDAO;

	@Autowired
	ProductorDao productorDAO;

	@Autowired
	FechaEntregaDao fechaEntregaDAO;

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/puntos_productor")
	public List<PuntoEntrega> listadoPuntosDeEntregaProductor(@RequestParam long id) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();
		EntidadProductor productor = new EntidadProductor();

		productor = productorDAO.obtenerProductor(id);

		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaProductor(productor);

		puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad))
				.collect(Collectors.toList());

		return puntos_entrega;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/puntos_entrega_productor")
	public List<PuntoEntrega> obtenerPuntosDeEntregaProductores() {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();

		entidad_puntos = puntoEntregaDAO.obtenerTodosLosPuntos();

		puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad))
				.collect(Collectors.toList());

		return puntos_entrega;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/puntos_productor_activos")
	public List<PuntoEntrega> listadoPuntosDeEntregaActivos(@RequestParam String fecha, @RequestParam long id) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();

		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaActivos(fecha, id);

		puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad))
				.collect(Collectors.toList());

		return puntos_entrega;
	}

	@CrossOrigin(origins = "*")
	@PostMapping(path = "redAgro/subir_punto_entrega")
	public ResponseEntity<Object> subirPuntoDeEntrega(@RequestBody EntidadPuntoEntrega punto_entrega,
			@RequestParam long id_productor, @RequestParam String descripcion, @RequestParam String fecha_entrega,
			@RequestParam String hora_inicio, @RequestParam String hora_fin) {

		EntidadProductor productor = new EntidadProductor();
		EntidadFechaEntrega fechaEntrega = new EntidadFechaEntrega();
		EntidadPuntoEntrega puntoEntrega = new EntidadPuntoEntrega();
		List<EntidadFechaEntrega> fechas = new ArrayList<EntidadFechaEntrega>();

		puntoEntrega = puntoEntregaDAO.obtenerPuntosEntregaPorLatitud(punto_entrega.getLatitud(),
				punto_entrega.getLongitud());
		productor = productorDAO.obtenerProductor(id_productor);

		if (puntoEntrega == null) {
			String descripcionCap = descripcion.substring(0, 1).toUpperCase() + descripcion.substring(1);

			punto_entrega.setActivo(true);
			punto_entrega.setProductor(productor);
			punto_entrega.setDescripcion(descripcionCap);
			puntoEntrega = puntoEntregaDAO.save(punto_entrega);
		} else {
			fechas = fechaEntregaDAO.obtenerHorariosDeUnaFecha(puntoEntrega.getId(), fecha_entrega);
		}

		for (EntidadFechaEntrega f : fechas) {

			int horaInicio = Integer.parseInt((hora_inicio.replaceAll(":", "")));
			int horaFin = Integer.parseInt((hora_fin.replaceAll(":", "")));
			int horaInicioGuardada = Integer.parseInt((f.getHora_inicio().replaceAll(":", "")));
			int horaFinGuardada = Integer.parseInt((f.getHora_fin().replaceAll(":", "")));
			if (horaFinGuardada >= horaInicio) {
				return new ResponseEntity<>(
						"Hey! Para la fecha de entrega elegida, ya existe un horario de entrega que inicia a las "
								+ f.getHora_inicio() + " y termina a las " + f.getHora_fin()
								+ ". Reintentá con otro horario ;)",
						HttpStatus.INTERNAL_SERVER_ERROR);
			} else {

				if (horaFin >= horaInicioGuardada) {
					return new ResponseEntity<>(
							"Hey!  Para la fecha de entrega elegida, ya existe un horario de entrega que inicia a las "
									+ f.getHora_inicio() + " y termina a las " + f.getHora_fin()
									+ ". Reintentá con otro horario ;)",
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		}

		fechaEntrega.setPunto_entrega(puntoEntrega);
		fechaEntrega.setFecha(fecha_entrega);
		fechaEntrega.setHora_inicio(hora_inicio);
		fechaEntrega.setHora_fin(hora_fin);
		fechaEntregaDAO.save(fechaEntrega);
		long id = puntoEntrega.getId();

		return new ResponseEntity<>(id, HttpStatus.OK);

	}

	@CrossOrigin(origins = "*")
	@PutMapping(path = "redAgro/modificar_punto")
	public void modificarEstadoDePunto(@RequestParam long id, @RequestParam String accion) {

		if (accion.equals("Alta")) {

			puntoEntregaDAO.modificarPunto(id, true);

			return;

		}
		puntoEntregaDAO.modificarPunto(id, false);
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/listadoPuntosEntregaProductor")
	public List<PuntoEntrega> listadoPuntosEntregaProductor(@RequestParam long productor_id) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();
		EntidadProductor productor = new EntidadProductor();

		productor = productorDAO.obtenerProductor(productor_id);

		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaProductor(productor);

		puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntityWithFechas(entidad))
				.collect(Collectors.toList());

		return puntos_entrega;
	}
}
