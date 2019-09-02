package app.controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import app.daos.PreferenciaDao;
import app.modelos.EntidadPreferencia;
import app.mappers.PreferenciaMapper;
import app.clases.Preferencia;

@RestController
public class PreferenciaControlador {
	
	@Autowired
	PreferenciaDao preferenciaDao;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/preferencia_consumidor")
	
	@ResponseBody
	public ArrayList<Preferencia> verDetallePreferencia(@RequestParam Long id) {
		ArrayList<EntidadPreferencia> resultados = preferenciaDao.obtenerPreferenciaDeUsuario(id);
		PreferenciaMapper mapeoDePreferencia = new PreferenciaMapper();	
		ArrayList<Preferencia> preferencias = new ArrayList<Preferencia>();
		
		for(EntidadPreferencia unaEntidad :resultados) {
			preferencias.add(mapeoDePreferencia.mapFromEntity(unaEntidad));
		}
		
		return preferencias;
	}	
}
