package app.daos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadAlertaUsuario;

public interface AlertaDao extends JpaRepository<EntidadAlertaUsuario, Long> {
	
	@Query(value = "SELECT * From Alerta_Usuario a where a.usuario_id = ?1", nativeQuery = true)
	ArrayList<EntidadAlertaUsuario> obtenerConfiguracionAlertas(long id_usuario);
}
