package app.controladores;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import app.daos.HistoricoDao;
import app.mappers.HistoricoMapper;
import app.modelos.EntidadHistorico;
import app.modelos.EntidadImagen;
import app.modelos.EntidadProductoProductor;
@RestController
public class HistoricoControlador {
	
	@Autowired
	HistoricoDao historicoDao;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/uploadFile")
	public void submit(@RequestParam("file") MultipartFile file) throws IOException {
	HistoricoMapper mapper = new HistoricoMapper();
	ArrayList<EntidadHistorico> historicos = mapper.mapToEntity(file);
	historicos.forEach(h -> historicoDao.save(h));
	//insertarHistorico(h.getCantidad_vendida(), h.getTipo_certificacion(), h.getTipo_produccion(), h.getProducto().getId(), h.getProductor().getId()));
	}
}