package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Producto;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.mappers.ProductoMapper;
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
    public EntidadProductoProductor agregarProducto(@RequestBody EntidadProductoProductor producto, @RequestParam long id_productor, @RequestParam long id_producto){   	
    

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
		productoNuevo.setTipo_unidad(producto.getTipo_unidad());
		productoNuevo.setProducto(prod);
	    productoNuevo.setProductor(productor);
	    
	    return productoProductorDao.save(productoNuevo);
						 	
    	
    }

}
