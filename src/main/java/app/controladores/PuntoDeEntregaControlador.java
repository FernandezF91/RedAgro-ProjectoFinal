package app.controladores;

import java.sql.Date;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import app.clases.PuntoEntrega;
import app.clases.Usuario;
import app.daos.FechaEntregaDao;
import app.clases.Productor;
import app.daos.ProductorDao;
import app.daos.PuntoEntregaDao;
import app.mappers.PuntoEntregaMapper;
import app.mappers.UsuarioMapper;
import app.mappers.ProductorMapper;
import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadProductor;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadUsuario;

@RestController
public class PuntoDeEntregaControlador {

	@Autowired
	PuntoEntregaDao puntoEntregaDAO;

	@Autowired
	ProductorDao productorDAO;

	@Autowired
	FechaEntregaDao fechaEntregaDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/puntos_entrega_productor")
	public List<PuntoEntrega> obtenerPuntosDeEntregaProductores() {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();

		entidad_puntos = puntoEntregaDAO.findAll();

		puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad))
				.collect(Collectors.toList());

		return puntos_entrega;

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/ptos_entrega_productores")
	public List<Productor> getProductoresConPtosEntrega(@RequestParam List<Long> productores) {

		UsuarioMapper user_mapper = new UsuarioMapper();
		PuntoEntregaMapper entregas = new PuntoEntregaMapper();
		List<Productor> listaProductores = new ArrayList<Productor>();

		for (Long id : productores) {
			EntidadProductor entidad = productorDAO.obtenerProductor(id);
			Productor productor = new Productor(entidad.getId(), entidad.getRazon_social(),
					user_mapper.mapFromEntity(entidad.getUsuario()),
					entregas.mapFromEntity(entidad.getPuntos_entrega()));
			listaProductores.add(productor);
		}

		return listaProductores;
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
}
