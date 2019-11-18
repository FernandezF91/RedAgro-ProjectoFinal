package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Productor;
import app.daos.ProductorDao;
import app.daos.UsuarioDao;
import app.mappers.ProductorMapper;
import app.modelos.EntidadProductor;
import app.modelos.EntidadUsuario;

@RestController
public class ProductorControlador {

	@Autowired
	ProductorDao productorDAO;

	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/usuario/obtenerUsuarioByMail")
	public Productor obtenerUsuarioByMail(@RequestParam String usuario) {
		ProductorMapper mapeo = new ProductorMapper();
		usuario = usuario + "#@%";
		EntidadUsuario u = usuarioDAO.obtenerProductorByUsuario(usuario);
		EntidadProductor p = productorDAO.obtenerProductor(u.getId());

		return mapeo.mapFromEntity(p);
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/productor/obtenerRazonSocial")
	public ResponseEntity<Object> obtenerRazonSocial(@RequestParam Long id) {
		try {
			EntidadProductor p = productorDAO.obtenerProductor(id);
			ProductorMapper mapeo = new ProductorMapper();

			return new ResponseEntity<>(mapeo.mapFromEntity(p), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al obtener la razon social del productor.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping(path = "redAgro/productor/actualizarRazonSocial")
	public ResponseEntity<Object> updateRazonSocial(@RequestParam Long id, @RequestParam String razon_social) {
		try {
			productorDAO.actualizarRazonSocial(razon_social, id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al actualizar el Productor. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
