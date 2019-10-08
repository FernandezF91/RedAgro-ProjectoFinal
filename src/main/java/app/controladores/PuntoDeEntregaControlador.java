package app.controladores;

import java.sql.Date;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/puntos_productor")
	public List<PuntoEntrega> listadoPuntosDeEntregaProductor(@RequestParam long id) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();
		EntidadProductor productor = new EntidadProductor();

		productor = productorDAO.obtenerProductor(id);

		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaProductor(productor);

		puntos_entrega = entidad_puntos.stream().map(entidad ->

		punto_entrega_mapper.mapFromEntity(entidad)).collect(Collectors.toList());

		return puntos_entrega;
	}

	@CrossOrigin(origins = "http://localhost:3000")
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

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/puntos_productor_activos")
	public List<PuntoEntrega> listadoPuntosDeEntregaActivos(@RequestParam String fecha, @RequestParam long id) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();

		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaActivos(fecha, id);

		puntos_entrega = entidad_puntos.stream().map(entidad ->

		punto_entrega_mapper.mapFromEntity(entidad)).collect(Collectors.toList());

		return puntos_entrega;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/subir_punto_entrega")
	public long subirPuntoDeEntrega(@RequestBody EntidadPuntoEntrega punto_entrega, @RequestParam long id_productor,
			@RequestParam String fecha_entrega, @RequestParam int hora_inicio, @RequestParam int hora_fin) {

		EntidadProductor p = new EntidadProductor();
		EntidadFechaEntrega fe = new EntidadFechaEntrega();
		EntidadPuntoEntrega pe = new EntidadPuntoEntrega();

		p = productorDAO.obtenerProductor(id_productor);

		punto_entrega.setActivo(true);
		punto_entrega.setProductor(p);
		pe = puntoEntregaDAO.save(punto_entrega);
		fe.setPunto_entrega(pe);
		fe.setFecha(fecha_entrega);
		fe.setHora_inicio(hora_inicio);
		fe.setHora_fin(hora_fin);
		fechaEntregaDAO.save(fe);

		return pe.getId();
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path = "redAgro/modificar_punto")
	public void modificarEstadoDePunto(@RequestParam long id, @RequestParam String accion) {

		if (accion.equals("Alta")) {

			puntoEntregaDAO.modificarPunto(id, true);

			return;

		}
		puntoEntregaDAO.modificarPunto(id, false);
	}
}
