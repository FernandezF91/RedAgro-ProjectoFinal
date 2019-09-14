package app.controladores;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import javax.persistence.Query;

import app.clases.Reserva;
import app.daos.ReservaDao;
import app.modelos.EntidadReserva;
import app.mappers.ReservaMapper;

@RestController
public class ReservaControlador {
	
	@Autowired
	ReservaDao reservaDao;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/get_reservas_consumidor")
	
	@ResponseBody
	public List<Reserva> obtenerReservasByConsumidor(@RequestParam Long id){
		
		ReservaMapper mapeoReservas = new ReservaMapper();		
		List<EntidadReserva> resultados = reservaDao.obtenerReservasByConsumidor(id);
		List<Reserva> reservas = mapeoReservas.mapFromEntity(resultados);
		return reservas;		
	}
}
