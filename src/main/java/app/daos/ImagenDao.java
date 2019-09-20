package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadImagen;
import app.modelos.EntidadProducto;

public interface ImagenDao extends JpaRepository<EntidadImagen, Long> {

	@Query("select i from EntidadImagen i where i.id = ?1")
	EntidadImagen obtenerImagen(Long id);
	

}
