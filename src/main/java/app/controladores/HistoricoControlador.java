package app.controladores;

import java.io.IOException;
import java.net.URI;

import javax.validation.constraints.NotNull;

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

import app.modelos.EntidadImagen;
import app.modelos.EntidadProductoProductor;
@RestController
public class HistoricoControlador {
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/uploadFile")
	public void submit(@RequestParam("file") MultipartFile file) {
	
	}
}