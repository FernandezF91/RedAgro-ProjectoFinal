package app.daos;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadProductor;
import app.modelos.EntidadPuntoEntrega;

public interface PuntoEntregaDao extends JpaRepository<EntidadPuntoEntrega, Long> {

	@Query("select pe from EntidadPuntoEntrega pe where pe.id = ?1")
	EntidadPuntoEntrega obtenerPuntoEntrega(long id);

	@Query("select p from EntidadPuntoEntrega as p where p.id IN (:productores)")
	List<EntidadPuntoEntrega> obtenerPuntosEntregaProductores(@Param("productores") List<Long> productores);

	@Query("select pe from EntidadPuntoEntrega pe where pe.productor=?1")
	List<EntidadPuntoEntrega> obtenerPuntosEntregaProductor(EntidadProductor productor);

	@Query(value = "SELECT DISTINCT p.* FROM Punto_entrega AS p JOIN Fecha_entrega as F ON p.id = F.punto_entrega_id "
			+ "WHERE F.fecha >= :fecha AND p.productor_id =:id_productor AND p.activo = true ", nativeQuery = true)
	List<EntidadPuntoEntrega> obtenerPuntosEntregaActivos(@Param("fecha") String fecha,
			@Param("id_productor") long id_productor);

	@Query("select pe from EntidadPuntoEntrega pe where pe.activo=1")
	List<EntidadPuntoEntrega> obtenerTodosLosPuntos();

	@Transactional
	@Modifying
	@Query("UPDATE EntidadPuntoEntrega pe SET pe.activo =?2 WHERE pe.id =?1")
	void modificarPunto(long id, boolean accion);

}
