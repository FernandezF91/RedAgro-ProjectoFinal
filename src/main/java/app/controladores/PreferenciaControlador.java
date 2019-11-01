package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import app.daos.PreferenciaDao;
import app.daos.ProductoDao;
import app.daos.ProductoProductorDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadPreferencia;
import app.modelos.EntidadProducto;
import app.modelos.EntidadProductoProductor;
import app.mappers.PreferenciaMapper;
import app.mappers.ProductoProductorMapper;
import app.mappers.UsuarioMapper;
import app.clases.Consumidor;
import app.clases.Preferencia;
import app.clases.Producto;
import app.clases.ProductoProductor;

@RestController
public class PreferenciaControlador {

	@Autowired
	PreferenciaDao preferenciaDAO;
	@Autowired
	ProductoDao productoDAO;
	@Autowired
	UsuarioDao usuarioDAO;

	@Autowired
	ProductoProductorDao productoProductorDao;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/obtenerPreferencias")
	@ResponseBody
	public ArrayList<Preferencia> obtenerPreferencias(@RequestParam Long id) {
		ArrayList<EntidadPreferencia> resultados = preferenciaDAO.obtenerPreferenciasConsumidor(id);
		PreferenciaMapper mapeoDePreferencia = new PreferenciaMapper();
		ArrayList<Preferencia> preferencias = mapeoDePreferencia.mapFromEntity(resultados);
		return preferencias;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/guardarPreferencias")
	public ResponseEntity<String> guardarPreferencias(@RequestParam long id,
			@RequestBody ArrayList<Producto> ProductosSeleccionados) {

		ArrayList<Preferencia> preferenciasActuales = this.obtenerPreferencias(id);
		ArrayList<Preferencia> newPreferencias = new ArrayList<Preferencia>();
		PreferenciaMapper mapeoDePreferencia = new PreferenciaMapper();
		UsuarioMapper mapeoDeUsuario = new UsuarioMapper();
		ArrayList<Long> productosActualesId = new ArrayList<Long>();
		ArrayList<Long> productosNuevosId = new ArrayList<Long>();
		ArrayList<Long> productosACrearId = new ArrayList<Long>();

		for (Preferencia prefe : preferenciasActuales) {
			productosActualesId.add(prefe.getProducto().getId());
		}

		for (Producto prod : ProductosSeleccionados) {
			productosNuevosId.add(prod.getId());
			productosACrearId.add(prod.getId());
		}

		productosACrearId.removeAll(productosActualesId);
		productosActualesId.removeAll(productosNuevosId);

		if (productosActualesId.size() > 0) {
			// Tengo que borrar las prefencias que sacó
			for (Long productoId : productosActualesId) {
				try {
					preferenciaDAO.borrarPreferenciaConsumidor(id, productoId);
				} catch (Exception e) {
					return new ResponseEntity<>("Ocurrio un error al borrar las preferencias",
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		}

		if (productosACrearId.size() > 0) {
			for (Long productoId : productosACrearId) {
				EntidadProducto prod = productoDAO.obtenerProducto(id);
				Producto prodN = new Producto(productoId, prod.getTipo(), prod.getTipo());
				Consumidor consumidor = new Consumidor(id,
						mapeoDeUsuario.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id)));
				Preferencia preferencia = new Preferencia(0, consumidor, prodN);
				newPreferencias.add(preferencia);
			}
			ArrayList<EntidadPreferencia> preferenciasAGuardar = mapeoDePreferencia.mapToEntity(newPreferencias);

			try {
				preferenciaDAO.saveAll(preferenciasAGuardar);
				return new ResponseEntity<>("Prefencias guardadas", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>("Ocurrio un error al guardar las nuevas preferencias",
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		return new ResponseEntity<>("No hubo cambios", HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/preferencias/obtenerProductos")
	public List<ProductoProductor> obtenerProductosDePreferencias(@RequestParam Long id) {
		ArrayList<Preferencia> preferencias = this.obtenerPreferencias(id);
		List<ProductoProductor> productos = new ArrayList<ProductoProductor>();
		List<EntidadProductoProductor> entidadProductos = new ArrayList<EntidadProductoProductor>();
		ProductoProductorMapper productoMapper = new ProductoProductorMapper();

		for (Preferencia p : preferencias) {
			entidadProductos.addAll(productoProductorDao.obtenerProductosByProductoId(p.getProducto().getId()));
		}
		productos = entidadProductos.stream().map(entidad -> productoMapper.mapFromEntity(entidad))
				.collect(Collectors.toList());
		return productos;
	}

}
