package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadCalificacion;

public interface CalificacionDao extends JpaRepository<EntidadCalificacion, Long> {

	@Query(value = " SELECT c.id, c.fecha_calificacion, c.reserva_id, e.nombre as estado, c.valor, c.comentario, u.nombre, u.apellido FROM Calificacion c "
			+ " JOIN reserva r on c.reserva_id = r.id JOIN usuario u ON r.consumidor_id = u.id JOIN estado_reserva e ON e.id = r.estado_id "
			+ " WHERE r.productor_id = ?1 " + " ORDER BY c.fecha_calificacion DESC", nativeQuery = true)
	List<Object[]> obtenerCalificaciones(long productor_id);

	@Query(value = " SELECT AVG(c.valor) FROM Calificacion c JOIN Reserva R ON c.reserva_id = r.id "
			+ " WHERE r.productor_id = ?1 ", nativeQuery = true)
	String obtenerPromedioCalificaciones(long productor_id);

	@Query(value = " SELECT c.* FROM Calificacion c JOIN Reserva r ON c.reserva_id = r.id "
			+ "WHERE r.productor_id = ?1 ORDER BY c.id DESC LIMIT 0, 5", nativeQuery = true)
	List<EntidadCalificacion> obtenerUltimasCalificacionesPorProductor(long productor_id);
}
