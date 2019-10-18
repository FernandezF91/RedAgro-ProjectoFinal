package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadDetalleReserva;

public interface DetalleReservaDao extends JpaRepository<EntidadDetalleReserva, Long> {

	@Query(value = "SELECT * FROM Detalle_Reserva WHERE id_reserva = ?1", nativeQuery = true)
	List<EntidadDetalleReserva> obtenerDetalleReserva(long id_reserva);
}
