package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.PuntoEntrega;
import app.clases.Usuario;
import app.clases.Productor;
import app.daos.ProductorDao;
import app.daos.PuntoEntregaDao;
import app.mappers.PuntoEntregaMapper;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadUsuario;


@RestController
public class PuntoDeEntregaControlador {
	
	@Autowired
	PuntoEntregaDao puntoEntregaDAO;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/puntos_entrega_productor")
	public List<PuntoEntrega> obtenerPuntosDeEntregaProductores() {
		
		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();
	
		entidad_puntos = puntoEntregaDAO.findAll();
		
        puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad)).collect(Collectors.toList());
		
		return puntos_entrega;		
	
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/ptos_entrega_productores")
	public List<PuntoEntrega> obtenerListadoPuntosEntrega(@RequestParam List<Long> productores) {

		PuntoEntregaMapper punto_entrega_mapper = new PuntoEntregaMapper();
		List<EntidadPuntoEntrega> entidad_puntos = new ArrayList<EntidadPuntoEntrega>();
		List<PuntoEntrega> puntos_entrega = new ArrayList<PuntoEntrega>();
		
		entidad_puntos = puntoEntregaDAO.obtenerPuntosEntregaProductores(productores);
        puntos_entrega = entidad_puntos.stream().map(entidad -> punto_entrega_mapper.mapFromEntity(entidad)).collect(Collectors.toList());
		
		return puntos_entrega;		
	}

}
