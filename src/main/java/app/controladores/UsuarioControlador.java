package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Consumidor;
import app.clases.Usuario;
import app.daos.ConsumidorDao;
import app.daos.ProductorDao;
import app.daos.UsuarioDao;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadConsumidor;
import app.modelos.EntidadProductor;
import app.modelos.EntidadUsuario;
import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;

import java.util.ArrayList;
import java.util.List;


@RestController
public class UsuarioControlador {
	
	@Autowired
	UsuarioDao usuarioDao;
	
	@Autowired
	ConsumidorDao consumidorDao;
	
	@Autowired
	ProductorDao productorDao;

	    @CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping(path = "redAgro/usuarios")
	    public List<EntidadUsuario> getAllusuarios(){
	        List<EntidadUsuario> usuarios = new ArrayList<>();
	        usuarioDao.findAll().forEach(usuarios :: add);
	        return usuarios;
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping(path = "redAgro/usuario")
	    public EntidadUsuario agregarUsuario(@RequestBody EntidadUsuario usuario, @RequestParam(required = false) String razon_social){
	    	
	    	EntidadUsuario userNuevo = usuarioDao.save(usuario);
	    	
	    	if(razon_social==null) {
	    		
			EntidadConsumidor entidadConsumidor = new EntidadConsumidor();
			
			entidadConsumidor.setId(userNuevo.getId());
			entidadConsumidor.setUsuario(userNuevo);
	  	    	
	    	consumidorDao.save(entidadConsumidor);
	    	
	    	return userNuevo;
	    	
	    	}
    		
	    	
	    	EntidadProductor entidadProductor = new EntidadProductor();
	    	entidadProductor.setId(userNuevo.getId());
	    	entidadProductor.setUsuario(userNuevo);
	    	entidadProductor.setRazon_social(razon_social);
	    	
	    	productorDao.save(entidadProductor);
	    	
	    	return userNuevo;
	    	
	    	
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @DeleteMapping(path = "redAgro/borrar_usuario/{id}")
	    public void deleteItem(@PathVariable long id){
	    	usuarioDao.deleteById(id);
	    }

}
