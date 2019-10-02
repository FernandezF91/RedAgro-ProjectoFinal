package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import app.daos.PreferenciaDao;
import app.daos.ProductoDao;
import app.daos.UsuarioDao;
import app.modelos.EntidadPreferencia;
import app.modelos.EntidadProducto;
import app.mappers.PreferenciaMapper;
import app.mappers.UsuarioMapper;
import app.clases.Consumidor;
import app.clases.Preferencia;
import app.clases.Producto;

@RestController
public class PreferenciaControlador {

	@Autowired
	PreferenciaDao preferenciaDAO;
	@Autowired
	ProductoDao productoDAO;
	@Autowired
	UsuarioDao usuarioDAO;

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
	public boolean guardarPreferencias(@RequestParam long id, @RequestBody ArrayList<Preferencia> Preferencias) {

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

		for (Preferencia prefe : Preferencias) {
			productosNuevosId.add(prefe.getProducto().getId());
			productosACrearId.add(prefe.getProducto().getId());
		}

		productosACrearId.removeAll(productosActualesId);
		productosActualesId.removeAll(productosNuevosId);

		if (productosActualesId.size() > 0) {
//			Tengo que borrar las prefencias que sacó
			for (Long productoId : productosActualesId) {
				preferenciaDAO.borrarPreferenciaConsumidor(id, productoId);
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
				return true;
			} catch (Exception e) {
				return false;
			}
		}

		return true;
	}
}
