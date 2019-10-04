package app.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Planificador;
import smile.*;

@RestController

public class PlanificacionControlador {
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerResultados")
	public List<String> obtenerPlanificacion(@RequestParam String periodo, @RequestParam String provincia){
		
		List<String> lista = new ArrayList<String>();
		Planificador p = new Planificador(periodo, provincia);
		
				lista = p.obtenerResultados();
		
		return lista;
	}
}
//	
//	HistoricoDao historicoDao;
//	
//	
//	public void submit(@RequestParam("file") MultipartFile file) throws IOException {
//	HistoricoMapper mapper = new HistoricoMapper();
//	ArrayList<EntidadHistorico> historicos = mapper.mapToEntity(file);
//	historicos.forEach(h -> historicoDao.save(h));
//	//insertarHistorico(h.getCantidad_vendida(), h.getTipo_certificacion(), h.getTipo_produccion(), h.getProducto().getId(), h.getProductor().getId()));
//	}
