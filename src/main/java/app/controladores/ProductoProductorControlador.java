package app.controladores;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.MailProductoInteres;
import app.clases.ProductoProductor;
import app.daos.PreferenciaDao;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.daos.UsuarioDao;
import app.mappers.ProductoProductorMapper;
import app.modelos.EntidadPreferencia;
import app.modelos.EntidadProducto;
import app.modelos.EntidadProductoProductor;
import app.modelos.EntidadProductor;

@RestController
public class ProductoProductorControlador {

	@Autowired
	ProductoProductorDao productoProductorDao;

	@Autowired
	ProductoDao productoDao;

	@Autowired
	ProductorDao productorDao;

	@Autowired
	PreferenciaDao preferenciaDAO;

	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "*")
	@PostMapping(path = "redAgro/usuario_productor/nuevo_producto")
	public Long agregarProducto(@RequestBody EntidadProductoProductor producto, @RequestParam long id_productor,
			@RequestParam long id_producto) {

		EntidadProducto prod = productoDao.obtenerProducto(id_producto);
		EntidadProductor productor = productorDao.obtenerProductor(id_productor);

		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		EntidadProductoProductor productoNuevo = new EntidadProductoProductor();

		String titulo = producto.getTitulo().substring(0, 1).toUpperCase() + producto.getTitulo().substring(1);
		String descripcion = producto.getDescripcion().substring(0, 1).toUpperCase() + producto.getDescripcion().substring(1);

		productoNuevo.setTitulo(titulo);
		productoNuevo.setDescripcion(descripcion);
		productoNuevo.setFecha_vencimiento(producto.getFecha_vencimiento());
		productoNuevo.setPrecio(producto.getPrecio());
		productoNuevo.setStock(producto.getStock());
		productoNuevo.setImagenes(null);
		productoNuevo.setTiempo_preparacion(producto.getTiempo_preparacion());
		productoNuevo.setTipo_produccion(producto.getTipo_produccion());

		String contenido = producto.getContenido();
		if (contenido == "") {
			productoNuevo.setContenido(null);
		} else {
			productoNuevo.setContenido(contenido);
		}

		productoNuevo.setUnidad_venta(producto.getUnidad_venta());
		productoNuevo.setProducto(prod);
		productoNuevo.setProductor(productor);
		productoNuevo.setOferta(null);
		productoNuevo.setActivo(true);

		Long id = productoProductorDao.save(productoNuevo).getId();
		ProductoProductor prodProductor = productoMapper.mapFromEntity(productoProductorDao.obtenerProductoById(id));

		// Chequeo las preferencias de los usuarios
		ArrayList<EntidadPreferencia> preferencias = preferenciaDAO.obtenerPreferenciasPorProducto(id_producto);
		for (EntidadPreferencia p : preferencias) {
			String mailUsuario = p.getConsumidor().getUsuario().getUsuario();
			String nombre = p.getConsumidor().getUsuario().getNombre();

			try {
				MailProductoInteres mail = new MailProductoInteres(mailUsuario, nombre, prodProductor);
				mail.enviarMail();
			} catch (AddressException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return id;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProductosProductor")
	public List<ProductoProductor> obtenerProductosProductor(@RequestParam long id) {

		List<EntidadProductoProductor> listaProductos = productoProductorDao.obtenerProductosByProductor(id);
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(listaProductos);
		return productosMapeados;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProductosProductorBusqueda")
	public List<ProductoProductor> obtenerProductosProductorBusqueda(@RequestParam long id) {

		List<EntidadProductoProductor> listaProductos = productoProductorDao.obtenerProductosProductorBusqueda(id);
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(listaProductos);
		return productosMapeados;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProductos")
	public List<ProductoProductor> obtenerProductos(@RequestParam String busqueda) {

		List<EntidadProducto> p = new ArrayList<EntidadProducto>();
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		List<EntidadProductoProductor> listaProductos;
		p = productoDao.obtenerCategoriasSubtipos();

		if (p.stream().anyMatch(prod -> prod.getTipo().equals(busqueda))) {

			listaProductos = productoProductorDao.obtenerProductosTipo(busqueda);

			List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(listaProductos);

			return productosMapeados;

		}

		listaProductos = productoProductorDao.obtenerProductos(busqueda);
		List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(listaProductos);
		return productosMapeados;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProductosPorLista")
	public List<ProductoProductor> obtenerProductosPorLista(@RequestParam List<Long> idProducto) {

		List<ProductoProductor> listado = new ArrayList<ProductoProductor>();
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();

		for (Long id : idProducto) {
			EntidadProductoProductor entidad = productoProductorDao.obtenerProductoById(id);
			ProductoProductor producto = productoMapper.mapFromEntity(entidad);
			listado.add(producto);
		}

		return listado;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProducto/{id}")
	public ProductoProductor obtenerProductosPorId(@PathVariable Long id) {

		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		EntidadProductoProductor entidad = productoProductorDao.obtenerProductoById(id);
		ProductoProductor producto = productoMapper.mapFromEntity(entidad);
		return producto;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "redAgro/obtenerProductosARevisar")
	public ResponseEntity<Object> obtenerProductosARevisar(@RequestParam long id_productor) {
		try {
			List<EntidadProductoProductor> resultados = productoProductorDao.obtenerProductosARevisar(id_productor);
			ProductoProductorMapper productoMapper = new ProductoProductorMapper();
			List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(resultados);

			return new ResponseEntity<>(productosMapeados, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al buscar los productos.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin("*")
	@GetMapping(path = "redAgro/ProductosProductor/obtenerProductosPantallaInicial")
	public ResponseEntity<Object> obtenerProductosPantallaInicial() {
		try {
			List<EntidadProductoProductor> resultados = productoProductorDao.obtenerProductosPantallaSinLogin();
			ProductoProductorMapper productoMapper = new ProductoProductorMapper();
			List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(resultados);

			return new ResponseEntity<>(productosMapeados, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al buscar los productos.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@PutMapping(path = "redAgro/actualizarEstadoProducto")
	public ResponseEntity<String> actualizarEstadoProducto(@RequestParam long id_producto_productor,
			@RequestParam boolean activo) {
		try {
			productoProductorDao.actualizarEstadoProducto(id_producto_productor, activo);
			return new ResponseEntity<>("El estado del producto se actualizó correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					"Ocurrió un error al actualizar el estado del producto. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin(origins = "*")
	@PostMapping(path = "redAgro/actualizarProductoProductor")
	public ResponseEntity<String> actualizarProductoProductor(@RequestBody EntidadProductoProductor producto,
			@RequestParam long id_producto_productor) {
		try {
			EntidadProductoProductor productoAActualizar = productoProductorDao
					.obtenerProductoById(id_producto_productor);

			String titulo = producto.getTitulo().substring(0, 1).toUpperCase() + producto.getTitulo().substring(1);
			String descripcion = producto.getDescripcion().substring(0, 1).toUpperCase() + producto.getDescripcion().substring(1);
			
			productoAActualizar.setTitulo(titulo);
			productoAActualizar.setDescripcion(descripcion);
			productoAActualizar.setFecha_vencimiento(producto.getFecha_vencimiento());
			productoAActualizar.setPrecio(producto.getPrecio());
			productoAActualizar.setStock(producto.getStock());
			productoAActualizar.setTiempo_preparacion(producto.getTiempo_preparacion());
			productoAActualizar.setContenido(producto.getContenido());
			// productoAActualizar.setImagenes(null);

			productoProductorDao.save(productoAActualizar).getId();

			return new ResponseEntity<>("Producto actualizado correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al actualizar el producto. Por favor, reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
