package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.hash.Hashing;

import app.clases.MailConfirmacion;
import app.clases.MailRecuperarContrasena;
import app.daos.ConsumidorDao;
import app.daos.ProductorDao;
import app.daos.UsuarioDao;
import app.mappers.UsuarioMapper;
import app.modelos.EntidadConsumidor;
import app.modelos.EntidadProductor;
import app.modelos.EntidadUsuario;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping(value="/redAgro")
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

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/usuario_consumidor", 
			  produces = "application/json", 
			  method = {RequestMethod.POST, RequestMethod.PUT})
	//@PostMapping(path = "redAgro/usuario_consumidor")
	public void agregarUsuarioConsumidor(@RequestBody EntidadUsuario usuario) {

		String nombre = usuario.getNombre().substring(0, 1).toUpperCase() + usuario.getNombre().substring(1);
		String apellido = usuario.getApellido().substring(0, 1).toUpperCase() + usuario.getApellido().substring(1);

		usuario.setNombre(nombre);
		usuario.setApellido(apellido);
		usuario.setActivo(false);
		// Hasheo contraseña
		String passwordHasheada = Hashing.sha256().hashString(usuario.getContraseña(), StandardCharsets.UTF_8)
				.toString();
		usuario.setContraseña(passwordHasheada);

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

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/registrar_token", 
			  produces = "application/json", 
			  method = {RequestMethod.POST, RequestMethod.PUT})
	//@PostMapping(path = "redAgro/registrar_token")
	public void registrarToken(@RequestBody EntidadUsuario usuario) {
		Optional<EntidadUsuario> optionalUser = usuarioDAO.findById(usuario.getId());
		optionalUser.map(user -> {
			user.setDeviceToken(usuario.getDeviceToken());
			return usuarioDAO.save(user);
		});
	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/usuario_productor", 
			  produces = "application/json", 
			  method = {RequestMethod.POST, RequestMethod.PUT})
	//@PostMapping(path = "redAgro/usuario_productor")
	public void agregarUsuarioProductor(@RequestBody EntidadUsuario usuario, @RequestParam String razon_social) {

		EntidadUsuario userNuevo = new EntidadUsuario();
		EntidadProductor entidadProductor = new EntidadProductor();

		String nombre = usuario.getNombre().substring(0, 1).toUpperCase() + usuario.getNombre().substring(1);
		String apellido = usuario.getApellido().substring(0, 1).toUpperCase() + usuario.getApellido().substring(1);

		usuario.setNombre(nombre);
		usuario.setApellido(apellido);
		usuario.setActivo(false);
		// Hasheo contraseña
		String passwordHasheada = Hashing.sha256().hashString(usuario.getContraseña(), StandardCharsets.UTF_8)
				.toString();
		usuario.setContraseña(passwordHasheada);

		userNuevo = usuarioDAO.save(usuario);

		entidadProductor.setId(userNuevo.getId());
		entidadProductor.setUsuario(userNuevo);

		String razonSocialCap = razon_social.substring(0, 1).toUpperCase() + razon_social.substring(1);
		entidadProductor.setRazon_social(razonSocialCap);

		productorDAO.save(entidadProductor);

		MailConfirmacion mc = new MailConfirmacion(userNuevo.getUsuario(), userNuevo.getId());

		try {
			mc.enviarMail();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/update_usuario", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT})
	//@PutMapping(path = "redAgro/update_usuario")
	public void updateUsuario(@RequestBody EntidadUsuario usuario, @RequestParam Long id) {

		usuarioDAO.actualizaUsuario(usuario.getNombre(), usuario.getApellido(), usuario.getTelefono(),
				usuario.getFecha_nacimiento(), id);
	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/validar_usuario_duplicado", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
	//@GetMapping(path = "redAgro/validar_usuario_duplicado")
	public ResponseEntity<String> validarUsuarioDuplicado(@RequestParam String mail) {
		UsuarioMapper userMapper = new UsuarioMapper();
		EntidadUsuario usuario = usuarioDAO.validarUsuarioDuplicado(mail);

		if (usuario == null) {
			return new ResponseEntity<>("", HttpStatus.OK);
		}

		userMapper.mapFromEntity(usuario);
		String rol = usuario.getRol();

		if (rol.equals("Productor")) {
			return new ResponseEntity<>("Ya existe un usuario productor registrado con este email",
					HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>("Ya existe un usuario consumidor registrado con este email",
					HttpStatus.BAD_REQUEST);
		}
	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/modificar_contraseña", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT})
	//@PutMapping(path = "redAgro/modificar_contraseña")
	public void modificacionContraseña(@RequestParam String c, @RequestParam Long id) {

		// Hasheo contraseña
		String passwordHasheada = Hashing.sha256().hashString(c, StandardCharsets.UTF_8).toString();
		usuarioDAO.modificarContraseña(passwordHasheada, id);

	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/usuario/modificar_contraseña", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT})
	//@PutMapping(path = "redAgro/usuario/modificar_contraseña")
	public ResponseEntity<Object> modificarContraseña(@RequestParam String u, @RequestParam String ca, @RequestParam String cn) {
		
		String passwordHasheada = Hashing.sha256().hashString(ca, StandardCharsets.UTF_8).toString();
		EntidadUsuario usuario = usuarioDAO.obtenerUsuarioByLogin(u, passwordHasheada);
		if (usuario == null)
			return new ResponseEntity<>("La contraseña actual que ingresaste es inválida. Reintentá nuevamente. ",
					HttpStatus.INTERNAL_SERVER_ERROR);
		else
		{	try {
			    passwordHasheada = Hashing.sha256().hashString(cn, StandardCharsets.UTF_8).toString();
				usuarioDAO.modificarContraseña(passwordHasheada, usuario.getId());
				return new ResponseEntity<>("Tu contraseña fue actualizada correctamente!", HttpStatus.OK);
			
			}catch(Exception e) {
				return new ResponseEntity<>(
						"Ocurrió un error al actualizar la contraseña. Por favor, reintentá en unos minutos.",
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/usuario/get_tipo_usuario", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT, RequestMethod.GET })
	//@GetMapping(path = "redAgro/get_tipo_usuario")
	public String obtenerTipoUsuario(@RequestParam long id) {
		String tipoUsuario = usuarioDAO.obtenerTipoUsuario(id);
		return tipoUsuario;
	}
	


	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/borrar_usuario/{id}", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT, RequestMethod.DELETE })
	//@DeleteMapping(path = "redAgro/borrar_usuario/{id}")
	public void deleteItem(@PathVariable long id) {
		usuarioDAO.deleteById(id);
	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/confirmar_cuenta", 
			  produces = "application/json", 
			  method = {RequestMethod.PUT })
	//@PutMapping(path = "redAgro/confirmar_cuenta")
	public void confirmarCuenta(@RequestParam Long id) {

		usuarioDAO.confirmarCuenta(id);

	}

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/recuperar_email", 
			  produces = "application/json", 
			  method = {RequestMethod.GET })
	//@GetMapping(path = "redAgro/recuperar_email")
	public ResponseEntity<Object> confirmarCuenta(@RequestParam String email) {

		EntidadUsuario eu = new EntidadUsuario();

		eu = usuarioDAO.validarUsuarioDuplicado(email);

		if (eu != null) {

			MailRecuperarContrasena mrc = new MailRecuperarContrasena(email, eu.getId());

			try {
				mrc.enviarMail();
			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<>("Ocurrió un error al recuperar tu email. Por favor, reintentá en unos minutos. ",
						HttpStatus.INTERNAL_SERVER_ERROR);
			}

			long id = eu.getId();
			return new ResponseEntity<>(id, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(
					"Hey! El email ingresado no existe en nuestro sistema. Comprobá si esta bien escrito y reintentá :) ",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
