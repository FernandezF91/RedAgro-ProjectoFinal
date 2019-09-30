package app.daos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.modelos.EntidadProductor;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadProductor;

public interface PuntoEntregaDao extends JpaRepository<EntidadPuntoEntrega, Long>{

	@Query("select pe from EntidadPuntoEntrega pe where pe.id = ?1 and pe.activo=1")
	EntidadPuntoEntrega obtenerPuntoEntrega(long id);
	
	@Query("select p from EntidadPuntoEntrega as p where p.id IN (:productores)")	
	List<EntidadPuntoEntrega> obtenerPuntosEntregaProductores(@Param("productores") List<Long> productores);

	
}
