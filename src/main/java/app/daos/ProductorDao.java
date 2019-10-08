package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadProductor;

public interface ProductorDao extends JpaRepository<EntidadProductor, Long> {

	@Query("select p from EntidadProductor p where p.id = ?1")
	EntidadProductor obtenerProductor(long id);

}
