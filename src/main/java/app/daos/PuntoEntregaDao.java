package app.daos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadProductor;
import app.modelos.EntidadPuntoEntrega;

public interface PuntoEntregaDao extends JpaRepository<EntidadPuntoEntrega, Long>{

	@Query("select pe from EntidadPuntoEntrega pe where pe.id = ?1")
	EntidadPuntoEntrega obtenerPuntoEntrega(long id);
	
	@Query("select p from EntidadPuntoEntrega as p where p.id IN (:productores)")	
	List<EntidadPuntoEntrega> obtenerPuntosEntregaProductores(@Param("productores") List<Long> productores);
	
	@Query("select pe from EntidadPuntoEntrega pe where pe.productor=?1")
	List<EntidadPuntoEntrega> obtenerPuntosEntregaProductor(EntidadProductor productor);
	
	@Query("select pe from EntidadPuntoEntrega pe where pe.productor=?1")
	List<EntidadPuntoEntrega> obtenerPuntosEntregaActivos(EntidadProductor productor);
	
	@Query("select pe from EntidadPuntoEntrega pe where pe.activo=1")
	List<EntidadPuntoEntrega> obtenerTodosLosPuntos();
	
	@Transactional
	@Modifying
	@Query("UPDATE EntidadPuntoEntrega pe SET pe.activo =?2 WHERE pe.id =?1")
	void modificarPunto(long id, boolean accion);
	
}
