package app.controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.modelos.EntidadProducto;
import app.modelos.EntidadProductoProductor;
import app.modelos.EntidadProductor;
import app.mappers.ProductoMapper;
import app.clases.Producto;

@RestController
public class ProductoControlador {

	@Autowired
	ProductoProductorDao productoProductorDao;

	@Autowired
	ProductoDao productoDao;

	@Autowired
	ProductorDao productorDao;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/usuario_productor/nuevo_producto")
	public EntidadProductor agregarProducto(@RequestBody EntidadProductoProductor producto,
			@RequestParam long id_productor, @RequestParam long id_producto) {

		EntidadProducto prod = productoDao.obtenerProducto(id_producto);

		EntidadProductor productor = productorDao.obtenerProductor(id_productor);

//		EntidadProductoProductor productoNuevo = new EntidadProductoProductor();
//		productoNuevo.setTitulo(producto.getTitulo());
//		productoNuevo.setDescripcion(producto.getDescripcion());
//		productoNuevo.setFecha_vencimiento(producto.getFecha_vencimiento());
//		productoNuevo.setPrecio(producto.getPrecio());
//		productoNuevo.setStock(producto.getStock());
//		productoNuevo.setTiempo_preparacion(producto.getTiempo_preparacion());
//		productoNuevo.setTipo_produccion(producto.getTipo_produccion());
//		productoNuevo.setTipo_unidad(producto.getTipo_unidad());
//		productoNuevo.setProducto(prod);
//		productoNuevo.setProductor(productor);
//						
		return productor;

//		productoProductorDao.save(productoNuevo);

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtener_tipo_productos")
	public ArrayList<Producto> obtenerTipoProducto(@RequestParam String categoria) {

		ArrayList<EntidadProducto> entidadProductos = productoDao.obtenerTipoProductos(categoria);
		ProductoMapper mapeoDeProducto = new ProductoMapper();
		ArrayList<Producto> productos = new ArrayList<Producto>();

		for (EntidadProducto prod : entidadProductos) {
			productos.add(mapeoDeProducto.mapFromEntity(prod));
		}
		
		return productos;
	}
}
