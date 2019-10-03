package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadFechaEntrega;
import app.modelos.EntidadProducto;
import app.modelos.EntidadPuntoEntrega;

public interface FechaEntregaDao extends JpaRepository<EntidadFechaEntrega, Long>{
	
	@Query("select fe from EntidadFechaEntrega fe where fe.punto_entrega = ?1")
	List<EntidadFechaEntrega> obtenerFechasDePunto(EntidadPuntoEntrega pe);
	
	
	
}
