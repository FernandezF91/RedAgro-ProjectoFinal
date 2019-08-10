package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import app.modelos.EntidadUsuario;

import java.util.ArrayList;
import java.util.List;


@RestController
public class UsuarioControlador {
	
	@Autowired
	UsuarioRepositorio usuarioRepositorio;

	    @CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping(path = "redAgro/usuarios")
	    public List<EntidadUsuario> getAllusuarios(){
	        List<EntidadUsuario> usuarios = new ArrayList<>();
	        usuarioRepositorio.findAll().forEach(usuarios :: add);
	        return usuarios;
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping(path = "redAgro/usuario")
	    public EntidadUsuario addItem(@RequestBody EntidadUsuario usuario){
	        usuarioRepositorio.save(usuario);
	        return usuario;
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @DeleteMapping(path = "redAgro/borrar_usuario/{id}")
	    public void deleteItem(@PathVariable int id){
	    	usuarioRepositorio.deleteById(id);
	    }

}