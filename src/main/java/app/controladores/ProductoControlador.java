package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.daos.ProductoDao;
import app.modelos.EntidadProductoProductor;

@RestController
public class ProductoControlador {
	
	@Autowired
	ProductoDao productoDao;
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "redAgro/usuario_productor/nuevo_producto")
    public EntidadProductoProductor agregarUsuario(@RequestBody EntidadProductoProductor producto){   	
    
    	return productoDao.save(producto);
    	
    	
    }
	
	
	

}
