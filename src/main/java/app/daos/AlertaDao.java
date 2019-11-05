package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadAlerta;

public interface AlertaDao extends JpaRepository<EntidadAlerta, Long> {
	
	@Query(value= "SELECT * From Alerta a WHERE a.id = ?1", nativeQuery = true)
	EntidadAlerta obtenerAlertaById(long id);
}
