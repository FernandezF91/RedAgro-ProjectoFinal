package app.controladores;

import org.hibernate.transform.ToListResultTransformer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import app.clases.MailConfirmacion;
import app.clases.MailRecuperarContraseña;
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
import java.util.function.ToIntFunction;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

@RestController
public class UsuarioControlador {

//Los controladores son los que van a recibir la petición del front, es decir del fetch.
//El path especificado en el fetch va a matchear con el metodo del controlador que tengan definida la misma URL.
//Los controladores van a hablar con los dao, que son los que tienen los metodos para guardar, eliminar, modificar, borrar datos de las tablas, etc.
//Yo lo que voy a guardar son las "entidades" que modelamos. Los modelos..
//El @requestBody lo que define es que yo lo que paso desde el front va a ser un JSON, por eso yo en los body de los fetch lo defino.
//El @requestParam lo que me dice es que en la url voy a especificar ciertos parametros. Por ejemplo en el caso de productor,
//que aparte de todos los datos de un usuario, también tiene la razón social. Por eso se pasa como parámetro en la URL.
//van a haber casos en los que yo voy a tener que hacer logica de negocio con los datos que mis controladores reciben,
//y de eso se van a encargar las CLASES.
//En el caso que yo quiera traer datos, necesito mappear esas entidades que yo recibo a una clase normal,
//para luego yo poder devolver un JSON. Por eso estan los mappers que se encargan de mappear de una clase a una entidad,
//y viceversa.

	@Autowired
	UsuarioDao usuarioDAO;

	@Autowired
	ConsumidorDao consumidorDAO;

	@Autowired
	ProductorDao productorDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/usuario_consumidor")
	public void agregarUsuarioConsumidor(@RequestBody EntidadUsuario usuario) {

		usuario.setActivo(false);
		EntidadUsuario userNuevo = usuarioDAO.save(usuario);

		EntidadConsumidor entidadConsumidor = new EntidadConsumidor();

		entidadConsumidor.setId(userNuevo.getId());
		entidadConsumidor.setUsuario(userNuevo);

		consumidorDAO.save(entidadConsumidor);

		MailConfirmacion mc = new MailConfirmacion(userNuevo.getUsuario(), userNuevo.getId());

		try {
			mc.enviarMail();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/usuario_productor")
	public void agregarUsuarioProductor(@RequestBody EntidadUsuario usuario, @RequestParam String razon_social) {

		EntidadUsuario userNuevo = new EntidadUsuario();
		EntidadProductor entidadProductor = new EntidadProductor();

		usuario.setActivo(false);

		userNuevo = usuarioDAO.save(usuario);

		entidadProductor.setId(userNuevo.getId());
		entidadProductor.setUsuario(userNuevo);
		entidadProductor.setRazon_social(razon_social);

		productorDAO.save(entidadProductor);

		MailConfirmacion mc = new MailConfirmacion(userNuevo.getUsuario(), userNuevo.getId());

		try {
			mc.enviarMail();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path = "redAgro/update_usuario")
	public void updateUsuario(@RequestBody EntidadUsuario usuario, @RequestParam Long id) {

		usuarioDAO.actualizaUsuario(usuario.getNombre(), usuario.getApellido(), usuario.getTelefono(),
				usuario.getFecha_nacimiento(), id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/validar_usuario_duplicado")
	public ResponseEntity<String> validarUsuarioDuplicado(@RequestParam String mail) {
		UsuarioMapper userMapper = new UsuarioMapper();
		EntidadUsuario usuario = usuarioDAO.validarUsuarioDuplicado(mail);

		if (usuario == null) {
			return new ResponseEntity<>("", HttpStatus.OK);
		}

		userMapper.mapFromEntity(usuario);
		String rol = usuario.getRol();

		if (rol.equals("Productor")) {
			return new ResponseEntity<>("Ya existe un usuario productor registrado con este mail",
					HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>("Ya existe un usuario consumidor registrado con este mail",
					HttpStatus.BAD_REQUEST);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path = "redAgro/modificar_contraseña")
	public void modificacionContraseña(@RequestParam String c, @RequestParam Long id) {

		usuarioDAO.modificarContraseña(c, id);

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/get_tipo_usuario")
	public String obtenerTipoUsuario(@RequestParam long id) {
		String tipoUsuario = usuarioDAO.obtenerTipoUsuario(id);
		return tipoUsuario;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping(path = "redAgro/borrar_usuario/{id}")
	public void deleteItem(@PathVariable long id) {
		usuarioDAO.deleteById(id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path = "redAgro/confirmar_cuenta")
	public void confirmarCuenta(@RequestParam Long id) {

		usuarioDAO.confirmarCuenta(id);

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/recuperar_email")

	public Long confirmarCuenta(@RequestParam String email) {

		EntidadUsuario eu = new EntidadUsuario();

		eu = usuarioDAO.validarUsuarioDuplicado(email);

		if (eu != null) {

			MailRecuperarContraseña mrc = new MailRecuperarContraseña(email, eu.getId());

			try {
				mrc.enviarMail();
			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return eu.getId();
		}

		return 0L;
	}

}
