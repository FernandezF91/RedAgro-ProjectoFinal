package app.controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.ProductoProductor;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.mappers.ProductoProductorMapper;
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

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/usuario_productor/nuevo_producto")
	public Long agregarProducto(@RequestBody EntidadProductoProductor producto, @RequestParam long id_productor,
			@RequestParam long id_producto) {

		EntidadProducto prod = productoDao.obtenerProducto(id_producto);

		EntidadProductor productor = productorDao.obtenerProductor(id_productor);

		EntidadProductoProductor productoNuevo = new EntidadProductoProductor();
		productoNuevo.setTitulo(producto.getTitulo());
		productoNuevo.setDescripcion(producto.getDescripcion());
		productoNuevo.setFecha_vencimiento(producto.getFecha_vencimiento());
		productoNuevo.setPrecio(producto.getPrecio());
		productoNuevo.setStock(producto.getStock());
		productoNuevo.setImagenes(null);
		productoNuevo.setTiempo_preparacion(producto.getTiempo_preparacion());
		productoNuevo.setTipo_produccion(producto.getTipo_produccion());
		productoNuevo.setContenido(producto.getContenido());
		productoNuevo.setUnidad_venta(producto.getUnidad_venta());
		productoNuevo.setProducto(prod);
		productoNuevo.setProductor(productor);

		return productoProductorDao.save(productoNuevo).getId();
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerProductosProductor")
	public List<ProductoProductor> obtenerProductosProductor(@RequestParam long id) {

		List<EntidadProductoProductor> listaProductos = productoProductorDao.obtenerProductosByProductor(id);
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();
		List<ProductoProductor> productosMapeados = productoMapper.mapFromEntity(listaProductos);
		return productosMapeados;
	}

	@CrossOrigin(origins = "http://localhost:3000")
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

	@CrossOrigin(origins = "http://localhost:3000")
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
}
