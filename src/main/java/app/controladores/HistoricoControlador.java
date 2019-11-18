package app.controladores;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import app.daos.HistoricoDao;
import app.mappers.HistoricoMapper;
import app.modelos.EntidadHistorico;

@RestController
@RequestMapping(value="/redAgro")
public class HistoricoControlador {

	@Autowired
	HistoricoDao historicoDao;
	@RequestMapping(
			  value = "/uploadFile", 
			  produces = "application/json", 
			  method = {RequestMethod.POST, RequestMethod.PUT})
	@CrossOrigin(origins = "*")	
	//@PostMapping(path = "redAgro/uploadFile")
	public void submit(@RequestParam("file") MultipartFile file) throws IOException {
		HistoricoMapper mapper = new HistoricoMapper();
		ArrayList<EntidadHistorico> historicos = mapper.mapToEntity(file);
		historicos.forEach(h -> historicoDao.save(h));
		mapper.escribirCsv(historicoDao.findAll());
		// insertarHistorico(h.getCantidad_vendida(), h.getTipo_certificacion(),
		// h.getTipo_produccion(), h.getProducto().getId(), h.getProductor().getId()));
	}
}