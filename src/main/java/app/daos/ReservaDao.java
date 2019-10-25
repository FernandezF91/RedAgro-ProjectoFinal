package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadReserva;

public interface ReservaDao extends JpaRepository<EntidadReserva, Long> {

	@Query(value = "SELECT * FROM Reserva WHERE id = ?1", nativeQuery = true)
	EntidadReserva obtenerReservaById(long id);

	@Query(value = "SELECT * FROM Reserva WHERE consumidor_id = ?1 ORDER BY fecha_creacion DESC, id DESC", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByConsumidor(long id);

	@Query(value = "SELECT * FROM Reserva WHERE productor_id = ?1 ORDER BY fecha_creacion DESC, id DESC", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByProductor(long id);

	@Query(value = "SELECT ER.nombre, count(r.id) AS contador FROM Reserva R JOIN Estado_Reserva ER "
			+ "		ON R.estado_id = ER.Id "
			+ "WHERE (R.Fecha > DATE_ADD(CURDATE(), INTERVAL -90 DAY) OR R.Fecha IS NULL) AND R.productor_id =?1 "
			+ "GROUP BY ER.nombre", nativeQuery = true)
	List<Object[]> obtenerMetricasReservasPorEstado(long usuario_id);

	@Query(value = "SELECT P.tipo, SUM(DR.cantidad) AS contador FROM producto P "
			+ " JOIN producto_productor pp ON P.id = PP.producto_id "
			+ " JOIN detalle_reserva DR ON PP.id = DR.id_producto "
			+ " JOIN reserva R ON DR.id_reserva = R.id JOIN estado_reserva ER ON R.estado_id = ER.id "
			+ " WHERE R.Fecha > DATE_ADD(CURDATE(), INTERVAL -90 DAY) "
			+ " AND ER.nombre = 'Finalizado' AND R.productor_id = ?1 GROUP BY P.tipo ", nativeQuery = true)
	List<Object[]> obtenerMetricasProductosVendidos(long usuario_id);

	// @Query(value = " SELECT ER.nombre AS estado, Month(R.fecha) AS mes,
	// count(R.id) AS cantidad "
	@Query(value = " SELECT Month(R.fecha) AS mes, count(R.id) AS cantidad "
			+ " FROM reserva R JOIN estado_reserva ER ON R.estado_id = ER.id "
			+ " WHERE R.Fecha > DATE_ADD(CURDATE(), INTERVAL -180 DAY) "
			+ " AND ER.nombre = ('Finalizado') AND R.productor_id = ?1 "
			+ " GROUP BY Month(R.fecha) ORDER BY Month(R.fecha) ", nativeQuery = true)
	List<Object[]> obtenerMetricasReservasPorMes(long usuario_id);

	@Transactional
	@Modifying
	@Query(value = "UPDATE Reserva R SET R.estado_id = ?2 WHERE R.id =?1", nativeQuery = true)
	void actualizarEstadoReserva(long id_reserva, long id_estado);

	@Query(value = " SELECT COUNT(1) AS cantidad FROM Reserva R JOIN Estado_Reserva ER ON R.estado_id = ER.id "
			+ "WHERE R.consumidor_id = ?1 AND ER.Nombre = \"Disponible\" GROUP BY ER.id", nativeQuery = true)
	Long obtenerCantidadReservasDisponiblesConsumidor(Long id_consumidor);

	@Query(value = " SELECT COUNT(1) AS cantidad FROM Reserva R JOIN Estado_Reserva ER ON R.estado_id = ER.id "
			+ "WHERE R.productor_id = ?1 AND ER.Nombre = \"Pendiente\" GROUP BY ER.id", nativeQuery = true)
	Long obtenerCantidadReservasPendientesProductor(Long id_Productor);

	@Transactional
	@Modifying
	@Query(value = "UPDATE Reserva R SET R.fecha = CURDATE() WHERE R.id =?1", nativeQuery = true)
	void actualizarFechaAlFinalizar(long id_reserva);
}
