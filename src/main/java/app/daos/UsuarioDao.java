package app.daos;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadUsuario;
import app.clases.Usuario;

public interface UsuarioDao extends JpaRepository<EntidadUsuario, Long> {

	@Query("select u from EntidadUsuario u where u.usuario = ?1 and u.contraseña = ?2")
	EntidadUsuario autenticaUsuario(String u, String c);
	
	@Query("update EntidadUsuario u set u.nombre = ?1, u.apellido= ?2, u.telefono= ?3, u.fecha_nacimiento= ?4 where u.id = ?5")
	void actualizaUsuario(String nombre, String apellido, String telefono, Date fecha_nac, long id);
	
	@Query("SELECT u FROM EntidadUsuario u WHERE u.usuario = ?1")
	EntidadUsuario validarUsuarioDuplicado(String mail);
	
	@Query(value="SELECT rol FROM Usuario  WHERE id = ?1", nativeQuery = true)
	String obtenerTipoUsuario(long id);
	
	@Query(value="SELECT * FROM Usuario  WHERE id = ?1", nativeQuery = true)
	Usuario obtenerDatosUsuario(long id);
}

