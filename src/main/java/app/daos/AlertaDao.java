package app.daos;

import java.util.ArrayList;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import app.modelos.EntidadAlerta;
import app.modelos.EntidadAlertaFrecuencia;
import app.modelos.EntidadAlertaUsuario;

public interface AlertaDao extends JpaRepository<EntidadAlertaUsuario, Long> {

	@Query(value = "SELECT * From Alerta_Usuario a where a.usuario_id = ?1", nativeQuery = true)
	ArrayList<EntidadAlertaUsuario> obtenerConfiguracionAlertas(long id_usuario);

	@Query("SELECT a From EntidadAlerta a where a.nombre = ?1")
	EntidadAlerta obtenerAlertaTipo(String tipo);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Alerta_Usuario where id = ?1", nativeQuery = true)
	void borrarAlertaPorIDAlerta(long id_Alerta);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Alerta_Usuario where usuario_id = ?1", nativeQuery = true)
	void borrarAlertaPorUsuario(long id_usuario);

	@Query("SELECT a From EntidadAlertaFrecuencia a where a.frecuencia = ?1")
	EntidadAlertaFrecuencia obtenerFrecuencia(String frecuencia);
}
