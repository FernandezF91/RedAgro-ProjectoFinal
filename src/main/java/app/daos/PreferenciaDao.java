package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;

import app.modelos.EntidadPreferencia;

public interface PreferenciaDao extends JpaRepository<EntidadPreferencia, Long> {

	@Query(value = "SELECT * From Preferencia p where p.consumidor_id = ?1", nativeQuery = true)
	ArrayList<EntidadPreferencia> obtenerPreferenciasConsumidor(long id);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Preferencia p where p.consumidor_id = ?1 and producto_id = ?2", nativeQuery = true)
	void borrarPreferenciaConsumidor(long id, long id_Producto);

}
