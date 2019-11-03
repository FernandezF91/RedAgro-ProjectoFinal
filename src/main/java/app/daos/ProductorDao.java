package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadProductor;

public interface ProductorDao extends JpaRepository<EntidadProductor, Long> {

	@Query("select p from EntidadProductor p where p.id = ?1")
	EntidadProductor obtenerProductor(long id);
	
	@Transactional
	@Modifying
	@Query("UPDATE EntidadProductor u SET u.razon_social =?1 WHERE u.id =?2")
	void actualizarRazonSocial(String razon_social, Long id);
	
}
