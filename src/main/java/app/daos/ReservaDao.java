package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import app.modelos.EntidadReserva;

public interface ReservaDao extends JpaRepository<EntidadReserva, Long> {

	@Query(value = "SELECT * FROM Reserva WHERE consumidor_id = ?1", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByConsumidor(long id);

	@Query(value = "SELECT * FROM Reserva WHERE productor_id = ?1", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByProductor(long id);

	@Query(value = "SELECT ER.nombre, count(r.id) AS contador FROM Reserva R JOIN Estado_Reserva ER "
			+ "		ON R.estado_id = ER.Id "
			+ "WHERE R.Fecha BETWEEN DATE_ADD(CURDATE(), INTERVAL -90 DAY) AND CURDATE() AND R.productor_id =?1 "
			+ "GROUP BY ER.nombre", nativeQuery = true)
	List<Object[]> obtenerMetricasReservasPorEstado(long usuario_id);

	@Query(value = "SELECT P.tipo, count(DR.cantidad) AS contador FROM producto P JOIN detalle_reserva DR "
			+ "	ON P.id = DR.id_producto JOIN reserva R ON DR.id_reserva = R.id "
			+ " JOIN estado_reserva ER ON R.estado_id = ER.id "
			+ " WHERE R.Fecha BETWEEN DATE_ADD(CURDATE(), INTERVAL -90 DAY) AND CURDATE()  "
			+ " AND ER.nombre = 'Finalizado' AND R.productor_id = ?1 GROUP BY P.tipo ", nativeQuery = true)
	List<Object[]> obtenerMetricasProductosVendidos(long usuario_id);

	@Query(value = " SELECT ER.nombre AS estado, Month(R.fecha) AS mes, count(R.id) AS cantidad "
			+ " FROM reserva R JOIN estado_reserva ER ON R.estado_id = ER.id "
			+ " WHERE R.Fecha BETWEEN DATE_ADD(CURDATE(), INTERVAL -365 DAY) AND CURDATE() "
			+ " AND ER.nombre IN ('Finalizado', 'Cancelado') AND R.productor_id = ?1 "
			+ " GROUP BY ER.nombre, Month(r.fecha) ", nativeQuery = true)
	List<Object[]> obtenerMetricasReservasPorMes(long usuario_id);
}
