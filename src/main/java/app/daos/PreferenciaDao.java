package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;

import app.modelos.EntidadPreferencia;

public interface PreferenciaDao extends JpaRepository<EntidadPreferencia, Long>{
	
	@Query( value = "SELECT * From Preferencia p where p.consumidor_id = ?1",
			nativeQuery = true)
	ArrayList<EntidadPreferencia> obtenerPreferenciasConsumidor (long id);

    @Modifying
    @Transactional
	@Query( value = "DELETE From Preferencia p where p.consumidor_id = ?1",
			nativeQuery = true)
	void deleteByConsumidorId (long id);
}
