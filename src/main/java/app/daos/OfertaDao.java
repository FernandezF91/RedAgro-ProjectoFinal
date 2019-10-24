package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadOferta;

public interface OfertaDao extends JpaRepository<EntidadOferta, Long> {
	
	@Query(value = "SELECT * FROM Oferta o where o.producto_productor_id = ?1", nativeQuery = true)
	EntidadOferta obtenerOferta(long id);

}
