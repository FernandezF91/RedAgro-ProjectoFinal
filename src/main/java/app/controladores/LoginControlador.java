package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/login/usuario")
	@ResponseBody
	public ResponseEntity<Object> loginUsuario(@RequestParam String u, @RequestParam String c) {

		try {
			UsuarioMapper userMapper = new UsuarioMapper();

			EntidadUsuario usuario = usuarioDAO.obtenerUsuarioByLogin(u, c);

			if (usuario == null) {

				return new ResponseEntity<>(
						"Ups... La cuenta que ingresaste es inexistente o los datos son incorrectos",
						HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				if (usuario.getActivo() != true) {
					return new ResponseEntity<>(
							"Hey! Tu usuario no está activo. Revisá tu mail para confirmar la cuenta.",
							HttpStatus.INTERNAL_SERVER_ERROR);
				} else {
					return new ResponseEntity<>(userMapper.mapFromEntity(usuario), HttpStatus.OK);
				}
			}

		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al obtener los datos de tu usuario. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
