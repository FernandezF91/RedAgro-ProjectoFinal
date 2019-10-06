package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import app.modelos.EntidadEstadoReserva;

public interface EstadoReservaDao extends JpaRepository<EntidadEstadoReserva, Long> {

	@Query(value = "SELECT * FROM Estado_Reserva", nativeQuery = true)
	List<EntidadEstadoReserva> obtenerEstadosReserva();
}
