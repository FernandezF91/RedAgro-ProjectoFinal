package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadEstadoReserva;

public interface EstadoReservaDao extends JpaRepository<EntidadEstadoReserva, Long> {

	@Query("select nombre from EntidadEstadoReserva where id = ?1")
	EntidadEstadoReserva obtenerNombreReserva(String nombre);

}
