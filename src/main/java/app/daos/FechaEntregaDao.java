package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadPuntoEntrega;

public interface FechaEntregaDao extends JpaRepository<EntidadFechaEntrega, Long> {

	@Query("select fe from EntidadFechaEntrega fe where fe.punto_entrega = ?1")
	List<EntidadFechaEntrega> obtenerFechasDePunto(EntidadPuntoEntrega pe);

	@Query(value = "SELECT * FROM Fecha_Entrega fe WHERE fe.punto_entrega_id = :id_pto_entrega AND fe.fecha >= :fecha", nativeQuery = true)
	List<EntidadFechaEntrega> obtenerFechasFiltradas(@Param("id_pto_entrega") long id_pto_entrega,
			@Param("fecha") String fecha);
}
