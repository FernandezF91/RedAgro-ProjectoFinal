package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import app.modelos.EntidadDetalleReserva;

public interface DetalleReservaDao extends JpaRepository<EntidadDetalleReserva, Long> {

}
