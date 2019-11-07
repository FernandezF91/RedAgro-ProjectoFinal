package app.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import app.modelos.EntidadEstadoReserva;
import app.clases.EstadoReserva;
import app.daos.EstadoReservaDao;
import app.mappers.EstadoReservaMapper;

@RestController
public class EstadoReservaControlador {
	
	@Autowired
	EstadoReservaDao EstadoReservaDAO;
	
	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerEstadosReserva")
	@ResponseBody
	public List<EstadoReserva> obtenerEstadosReserva() {

		EstadoReservaMapper mapeoEstados = new EstadoReservaMapper();
		List<EntidadEstadoReserva> listadoEntidad = new ArrayList<>();
		listadoEntidad = EstadoReservaDAO.obtenerEstadosReserva();
		
		List<EstadoReserva> listadoEstadosReserva = mapeoEstados.mapFromEntity(listadoEntidad);
		
		return listadoEstadosReserva;
	}


}
