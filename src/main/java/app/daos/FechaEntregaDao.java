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

	@Query(value = "SELECT * FROM Fecha_Entrega fe WHERE fe.punto_entrega_id = :id_pto_entrega AND (STR_TO_DATE(fe.fecha,'%d-%m-%Y')) >= (STR_TO_DATE(:fecha,'%d-%m-%Y')) ORDER BY (STR_TO_DATE(fe.fecha,'%d-%m-%Y')) ASC", nativeQuery = true)
	List<EntidadFechaEntrega> obtenerFechasFiltradas(@Param("id_pto_entrega") long id_pto_entrega,
			@Param("fecha") String fecha);

	@Query(value = "SELECT * FROM Fecha_Entrega fe WHERE fe.punto_entrega_id = :id_pto_entrega AND fe.fecha = :fecha", nativeQuery = true)
	List<EntidadFechaEntrega> obtenerHorariosDeUnaFecha(@Param("id_pto_entrega") long id_pto_entrega,
			@Param("fecha") String fecha);

	@Query(value = "SELECT f.fecha, p.descripcion, p.localidad, p.direccion FROM fecha_entrega f JOIN punto_entrega p "
			+ " ON f.punto_entrega_id = p.id "
			+ " WHERE STR_TO_DATE(fecha,'%d-%m-%Y') < DATE_ADD(CURDATE(), INTERVAL 30 DAY) "
			+ " AND STR_TO_DATE(fecha,'%d-%m-%y') >= CURDATE() AND p.productor_id = ?1 "
			+ " GROUP BY f.fecha, p.descripcion, p.localidad, p.direccion "
			+ " ORDER BY f.fecha, p.descripcion, p.localidad, p.direccion ASC LIMIT 0, 10", nativeQuery = true)
	List<Object[]> obtenerEntregasProximoMes(long productor_id);
}
