package app.controladores;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import app.daos.PreferenciaDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadPreferencia;
import app.mappers.PreferenciaMapper;
import app.mappers.UsuarioMapper;
import app.clases.Consumidor;
import app.clases.Preferencia;
import app.clases.Producto;

@RestController
public class PreferenciaControlador {

	@Autowired
	PreferenciaDao preferenciaDao;
	@Autowired
	UsuarioDao usuarioDAO;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "redAgro/preferencia_consumidor")

	@ResponseBody
	public ArrayList<Preferencia> obtenerPreferencias(@RequestParam Long id) {
		ArrayList<EntidadPreferencia> resultados = preferenciaDao.obtenerPreferenciasConsumidor(id);
		PreferenciaMapper mapeoDePreferencia = new PreferenciaMapper();
		ArrayList<Preferencia> preferencias = mapeoDePreferencia.mapFromEntity(resultados);
		return preferencias;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "redAgro/preferencias_consumidor")
	public boolean guardarPreferencias(@RequestParam long id, @RequestBody ArrayList<Producto> productos) {
		
		ArrayList<Preferencia> preferenciasActuales = this.obtenerPreferencias(id);
		ArrayList<Preferencia> newPreferencias = new ArrayList<Preferencia>();
		PreferenciaMapper mapeoDePreferencia = new PreferenciaMapper();
		UsuarioMapper mapeoDeUsuario = new UsuarioMapper();
		ArrayList<Producto> productosActuales = new ArrayList<Producto>();
		
		for (Preferencia prefe : preferenciasActuales) {
			productosActuales.add(prefe.getProducto());
		}
		
		if (productos.size() < productosActuales.size()) {
//			Tengo que borrar las prefencias que sacó
			ArrayList<Producto> productoABorrar = productosActuales;
			productoABorrar.removeAll(productos);
			ArrayList<Preferencia> preferenciasABorrar = new ArrayList<Preferencia>();
			for (Producto producto : productoABorrar) {
				Consumidor consumidor = new Consumidor(id, mapeoDeUsuario.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id)));
				Preferencia preferenciaAborrar = new Preferencia(0, consumidor, producto);
				preferenciasABorrar.add(preferenciaAborrar);
			}
			ArrayList<EntidadPreferencia> aBorrar = mapeoDePreferencia.mapToEntity(preferenciasABorrar);
			preferenciaDao.deleteAll(aBorrar);
		}
		
		productos.removeAll(productosActuales);
		for (Producto producto : productos) {
			Consumidor consumidor = new Consumidor(id, mapeoDeUsuario.mapFromEntity(usuarioDAO.obtenerDatosUsuario(id)));
			Preferencia preferencia = new Preferencia(0, consumidor, producto);
			newPreferencias.add(preferencia);
		}
		
		ArrayList<EntidadPreferencia> preferenciasAGuardar = mapeoDePreferencia.mapToEntity(newPreferencias);
		
		try {
			preferenciaDao.saveAll(preferenciasAGuardar);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
