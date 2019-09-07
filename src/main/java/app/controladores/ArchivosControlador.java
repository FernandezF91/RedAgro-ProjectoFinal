package app.controladores;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import app.daos.ImagenDao;
import app.daos.ProductoProductorDao;

@RestController
public class ArchivosControlador {
	
	@Autowired
	ImagenDao imagenDao;

	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "redAgro/subir_archivos")
	public List<File> procesamientoDeArchivos(@RequestBody List<File> archivos) {
		
		return archivos;
		
		
	}

}
