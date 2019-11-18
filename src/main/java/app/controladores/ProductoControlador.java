package app.controladores;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.clases.Producto;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.ProductorDao;
import app.mappers.ProductoMapper;
import app.modelos.EntidadProducto;

@RestController
@RequestMapping(value="/redAgro")
public class ProductoControlador {

	@Autowired
	ProductoProductorDao productoProductorDao;

	@Autowired
	ProductoDao productoDao;

	@Autowired
	ProductorDao productorDao;

	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/obtenerTiposProducto", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
   // @GetMapping(path = "redAgro/obtenerTiposProducto")
    public List<Producto> obtenerTiposdeProducto(@RequestParam String categoria_producto){   	
    
		List<EntidadProducto> tipos_de_producto = new ArrayList<EntidadProducto>();
		List<Producto> productosMapeados = new ArrayList<Producto>();
		ProductoMapper productoMapper = new ProductoMapper();
		
		tipos_de_producto = productoDao.obtenerTiposProducto(categoria_producto);
		
		productosMapeados = tipos_de_producto.stream().map(entidadProducto -> productoMapper.mapFromEntity(entidadProducto)).collect(Collectors.toList());
								
        return productosMapeados;
		
    }
	
	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/obtener_tipo_productos", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
	//@GetMapping(path = "redAgro/obtener_tipo_productos")
	public ArrayList<Producto> obtenerTipoProducto(@RequestParam String categoria) {

		ArrayList<EntidadProducto> entidadProductos = productoDao.obtenerTipoProductos(categoria);
		ProductoMapper mapeoDeProducto = new ProductoMapper();
		ArrayList<Producto> productos = new ArrayList<Producto>();

		for (EntidadProducto prod : entidadProductos) {
			productos.add(mapeoDeProducto.mapFromEntity(prod));
		}
		
		return productos;
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(
			  value = "/obtener_productos", 
			  produces = "application/json", 
			  method = {RequestMethod.GET, RequestMethod.PUT})
	//@GetMapping(path = "redAgro/obtener_productos")
	public List<Producto> obtenerProductos() {

		List<EntidadProducto> ep = new ArrayList<EntidadProducto>();
		List<Producto> p = new ArrayList<Producto>();
		ProductoMapper pm = new ProductoMapper();
		
		ep = productoDao.obtenerCategoriasSubtipos();
		
		p = ep.stream().map(eprod -> pm.mapFromEntity(eprod)).collect(Collectors.toList());
		
		return p;
		
	}
}
