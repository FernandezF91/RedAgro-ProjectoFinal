package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadFechaEntrega;

public interface FechaEntregaDao extends JpaRepository<EntidadFechaEntrega, Long>{
	
	
}
