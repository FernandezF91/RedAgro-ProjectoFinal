package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/usuario/obtenerUsuarioByMail")
	public Productor obtenerUsuarioByMail(@RequestParam String usuario) {
		ProductorMapper mapeo = new ProductorMapper();
		usuario = usuario + "#@%";
		EntidadUsuario u = usuarioDAO.obtenerProductorByUsuario(usuario);
		EntidadProductor p = productorDAO.obtenerProductor(u.getId());
		
		return mapeo.mapFromEntity(p);
	}
	
}
