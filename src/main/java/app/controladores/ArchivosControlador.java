package app.controladores;

import java.io.File;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import app.daos.ImagenDao;
import app.daos.ProductoProductorDao;
import app.modelos.EntidadImagen;
import app.modelos.EntidadProductoProductor;
import app.modelos.EntidadProductor;

@RestController
public class ArchivosControlador {
	
	@Autowired
	ImagenDao imagenDao;

	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "redAgro/subir_archivos")
	public ResponseEntity<Void> procesamientoDeArchivos(@NotNull @RequestParam("file") MultipartFile multipartFile, @RequestParam("producto_productor") EntidadProductoProductor producto_productor) throws IOException {
	
		EntidadImagen imagenEntidad = new EntidadImagen();
				imagenEntidad.setProducto_productor(producto_productor);
				imagenEntidad.setNombre(multipartFile.getOriginalFilename());
			    imagenEntidad.setTipo_contenido(multipartFile.getContentType());
			    imagenEntidad.setImage(multipartFile.getBytes());
			  imagenDao.save(imagenEntidad);
			  URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
			  return ResponseEntity.created(location).build();
 	
	}
	
//	@GetMapping
//	public ResponseEntity<byte[]> getRandomFile() {
//	  long amountOfFiles = fileEntityRepository.count();
//	  Long randomPrimaryKey;
//	  if (amountOfFiles == 0) {
//	     return ResponseEntity.ok(new byte[0]);
//	   } else if (amountOfFiles == 1) {
//	     randomPrimaryKey = 1L;
//	   } else {
//	     randomPrimaryKey = ThreadLocalRandom.current().nextLong(1, amountOfFiles + 1);
//	   }
//	   FileEntity fileEntity = fileEntityRepository.findById(randomPrimaryKey).get();
//	   HttpHeaders header = new HttpHeaders();
//	   header.setContentType(MediaType.valueOf(fileEntity.getContentType()));
//	   header.setContentLength(fileEntity.getData().length);
//	   header.set("Content-Disposition", "attachment; filename=" + fileEntity.getFileName());
//	   return new ResponseEntity<>(fileEntity.getData(), header, HttpStatus.OK);
//	}

}
