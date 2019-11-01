package app.daos;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadAlertasNotificaciones;

public interface AlertaNotificacionesDao extends JpaRepository<EntidadAlertasNotificaciones, Long >{
	
	@Query(value = "SELECT * From Alerta_Notificaciones WHERE usuario_id = ?1", nativeQuery = true)
	ArrayList<EntidadAlertasNotificaciones> obtenerNotificacionesByUsuario(long id_usuario);
}
