package app.controladores;

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
import app.daos.FechaEntregaDao;
import app.daos.ProductorDao;
import app.daos.PuntoEntregaDao;
import app.mappers.PuntoEntregaMapper;
import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadPuntoEntrega;

@RestController
public class FechaEntregaControlador {
	
	
	@Autowired
	PuntoEntregaDao puntoEntregaDAO;
	

	@Autowired
	FechaEntregaDao fechaEntregaDAO;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/subir_fecha_entrega")
	public void obtenerPuntosDeEntregaProductores(@RequestBody EntidadFechaEntrega entidad, @RequestParam long id_punto_entrega) {
		
		EntidadFechaEntrega ef = new EntidadFechaEntrega();

		ef.setFecha(entidad.getFecha());
		ef.setHora_fin(entidad.getHora_fin());
		ef.setHora_inicio(entidad.getHora_inicio());
		ef.setPunto_entrega(puntoEntregaDAO.obtenerPuntoEntrega(id_punto_entrega));
		
		fechaEntregaDAO.save(ef);
	
	}


}
