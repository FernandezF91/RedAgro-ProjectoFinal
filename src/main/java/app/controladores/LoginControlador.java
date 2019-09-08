package app.controladores;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Query;

import app.clases.Usuario;
import app.daos.UsuarioDao;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadUsuario;

@RestController
public class LoginControlador {

	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/login")
	@ResponseBody
	public Usuario autenticacion(@RequestParam String u, @RequestParam String c) {

		UsuarioMapper userMapper = new UsuarioMapper();

		EntidadUsuario usuario = usuarioDAO.autenticaUsuario(u, c);

		if (usuario == null) {

			return null;

		}

		return userMapper.mapFromEntity(usuario);

	}
	
}
