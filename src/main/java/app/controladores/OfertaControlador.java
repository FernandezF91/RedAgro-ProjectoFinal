package app.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.daos.OfertaDao;
import app.daos.ProductoProductorDao;
import app.modelos.EntidadOferta;

@RestController
public class OfertaControlador {

	@Autowired
	OfertaDao ofertaDao;

	@Autowired
	ProductoProductorDao productoProductorDao;

	@CrossOrigin(origins = "*")
	@PutMapping(path = "redAgro/guardarOferta")
	public ResponseEntity<String> guardarOferta(@RequestParam long id_producto_productor,
			@RequestParam int porcentaje, @RequestParam boolean activo, @RequestParam long id_oferta) {
		try {
			EntidadOferta oferta = new EntidadOferta();

			if (id_oferta != 0) {
				oferta.setId(id_oferta);
			}
			oferta.setProductoProductorId(id_producto_productor);
			oferta.setPorcentaje(porcentaje);
			oferta.setActivo(activo);
			ofertaDao.save(oferta);

			return new ResponseEntity<>("Oferta guardada correctamente!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Ocurrió un error al guardar la oferta. Reintentá en unos minutos.",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
