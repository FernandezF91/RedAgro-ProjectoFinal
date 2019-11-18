package app.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Planificador;
import smile.*;

@RestController
@RequestMapping(value="/redAgro")
public class PlanificacionControlador {
	
	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/obtenerResultados", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
	//@GetMapping(path = "redAgro/obtenerResultados")
	public List<String> obtenerPlanificacion(@RequestParam String periodo, @RequestParam String provincia){
		
		List<String> lista = new ArrayList<String>();
		Planificador p = new Planificador(periodo, provincia);
		
		if(p.crearRed() == true) {
				
		lista = p.obtenerResultados();
				
				return lista;
		
		}
		lista.add("No hay suficiente información para generar una planificación");
		return lista;
	}
}