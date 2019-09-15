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

	@Query(value = "SELECT ER.nombre, count(r.id) as contador FROM Reserva R JOIN Estado_Reserva ER "
			+ "		ON R.estado_id = ER.Id "
			+ "WHERE R.Fecha BETWEEN DATE_ADD(CURDATE(), INTERVAL -90 DAY) AND CURDATE() AND R.productor_id =?1 "
			+ "GROUP BY ER.nombre", nativeQuery = true)
	List<Object[]> obtenerMetricasReservasPorEstado(long usuario_id);
}
