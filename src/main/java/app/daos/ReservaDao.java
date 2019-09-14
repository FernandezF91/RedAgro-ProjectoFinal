package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import app.modelos.EntidadReserva;

public interface ReservaDao extends JpaRepository<EntidadReserva, Long> {

	@Query(value="SELECT * FROM Reserva WHERE consumidor_id = ?1", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByConsumidor(long id);

	@Query(value="SELECT * FROM Reserva WHERE productor_id = ?1", nativeQuery = true)
	List<EntidadReserva> obtenerReservasByProductor(long id);

}
