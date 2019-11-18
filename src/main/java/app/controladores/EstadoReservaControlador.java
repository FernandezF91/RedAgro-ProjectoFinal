package app.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import app.modelos.EntidadEstadoReserva;
import app.clases.EstadoReserva;
import app.daos.EstadoReservaDao;
import app.mappers.EstadoReservaMapper;

@RestController
@RequestMapping(value="/redAgro")
public class EstadoReservaControlador {
	
	@Autowired
	EstadoReservaDao EstadoReservaDAO;
	
	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/obtenerEstadosReserva", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
	//@GetMapping(path = "redAgro/obtenerEstadosReserva")
	@ResponseBody
	public List<EstadoReserva> obtenerEstadosReserva() {

		EstadoReservaMapper mapeoEstados = new EstadoReservaMapper();
		List<EntidadEstadoReserva> listadoEntidad = new ArrayList<>();
		listadoEntidad = EstadoReservaDAO.obtenerEstadosReserva();
		
		List<EstadoReserva> listadoEstadosReserva = mapeoEstados.mapFromEntity(listadoEntidad);
		
		return listadoEstadosReserva;
	}


}
