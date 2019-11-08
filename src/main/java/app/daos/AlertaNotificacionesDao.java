package app.daos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadAlertaNotificaciones;

public interface AlertaNotificacionesDao extends JpaRepository<EntidadAlertaNotificaciones, Long >{
	
	@Query(value = "SELECT * From Alerta_Notificaciones WHERE usuario_id = ?1 ORDER BY id DESC LIMIT 4", nativeQuery = true)
	ArrayList<EntidadAlertaNotificaciones> obtenerNotificacionesByUsuario(long id_usuario);
}
