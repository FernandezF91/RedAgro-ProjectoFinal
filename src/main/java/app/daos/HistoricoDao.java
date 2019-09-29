package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import app.modelos.EntidadEstadoReserva;
import app.modelos.EntidadHistorico;

public interface HistoricoDao extends JpaRepository<EntidadHistorico, Long>{
	
}
