package app.controladores;

import java.io.IOException;
import java.net.URI;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import app.clases.Imagen;
import app.daos.ImagenDao;
import app.mappers.ImagenMapper;
import app.modelos.EntidadImagen;
import app.modelos.EntidadProductoProductor;

@RestController
public class ArchivosControlador {

	@Autowired
	ImagenDao imagenDao;

	@CrossOrigin(origins = "*")
	@PostMapping(path = "redAgro/subir_archivos")
	public ResponseEntity<Void> procesamientoDeArchivos(@NotNull @RequestParam("file") MultipartFile multipartFile,
			@RequestParam("producto_productor") EntidadProductoProductor producto_productor) throws IOException {

		EntidadImagen imagenEntidad = new EntidadImagen();
		imagenEntidad.setProducto_productor(producto_productor);
		imagenEntidad.setNombre(multipartFile.getOriginalFilename());
		imagenEntidad.setTipo_contenido(multipartFile.getContentType());
		imagenEntidad.setImage(multipartFile.getBytes());
		imagenDao.save(imagenEntidad);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
		return ResponseEntity.created(location).build();

	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtener_imagen")
	public ResponseEntity<byte[]> obtenerImagen(@RequestParam Long id) {

		EntidadImagen i = new EntidadImagen();
		ImagenMapper ip = new ImagenMapper();

		i = imagenDao.obtenerImagen(id);

		Imagen img = ip.mapFromEntity(i);

		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.valueOf(img.getTipo_contenido()));
		header.setContentLength(img.getImage().length);
		header.set("Content-Disposition", "attachment; filename=" + img.getNombre());

		return new ResponseEntity<>(i.getImage(), header, HttpStatus.OK);

	}

}
