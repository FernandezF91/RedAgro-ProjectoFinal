package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.transform.ToListResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

import app.clases.Producto;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.mappers.ProductoMapper;
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
    @GetMapping(path = "redAgro/obtenerTiposProducto")
    public List<Producto> obtenerTiposdeProducto(@RequestParam String categoria_producto){   	
    
		List<EntidadProducto> tipos_de_producto = new ArrayList<EntidadProducto>();
		List<Producto> productosMapeados = new ArrayList<Producto>();
		ProductoMapper productoMapper = new ProductoMapper();
		
		tipos_de_producto = productoDao.obtenerTiposProducto(categoria_producto);
		
		productosMapeados = tipos_de_producto.stream().map(entidadProducto -> productoMapper.mapFromEntity(entidadProducto)).collect(Collectors.toList());
								
        return productosMapeados;
		
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
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtener_productos")
	public List<Producto> obtenerProductos() {

		List<EntidadProducto> ep = new ArrayList<EntidadProducto>();
		List<Producto> p = new ArrayList<Producto>();
		ProductoMapper pm = new ProductoMapper();
		
		ep = productoDao.obtenerCategoriasSubtipos();
		
		p = ep.stream().map(eprod -> pm.mapFromEntity(eprod)).collect(Collectors.toList());
		
		return p;
		
	}
}
