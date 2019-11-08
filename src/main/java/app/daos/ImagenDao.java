package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadImagen;

public interface ImagenDao extends JpaRepository<EntidadImagen, Long> {

	@Query("select i from EntidadImagen i where i.id = ?1")
	EntidadImagen obtenerImagen(Long id);	

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Imagen i WHERE i.id = ?1", nativeQuery = true)
	void borrarImagen(long id);
}
