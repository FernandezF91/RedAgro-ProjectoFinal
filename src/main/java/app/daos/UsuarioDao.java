package app.daos;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadUsuario;

public interface UsuarioDao extends JpaRepository<EntidadUsuario, Long> {

	@Query("select u from EntidadUsuario u where u.usuario = ?1 and u.contraseña = ?2 and u.activo=true")
	EntidadUsuario autenticaUsuario(String u, String c);
	
	@Query("select u from EntidadUsuario u where u.usuario = ?1 and u.contraseña = ?2")
	EntidadUsuario obtenerUsuarioByLogin(String u, String c);
	
	@Transactional
	@Modifying
	@Query("update EntidadUsuario u set u.nombre = ?1, u.apellido= ?2, u.telefono= ?3, u.fecha_nacimiento= ?4  where u.id = ?5")
	void actualizaUsuario(String nombre, String apellido, String telefono, Date fecha_nac, long id);
	
	@Transactional
	@Modifying
	@Query("UPDATE EntidadUsuario u SET u.contraseña =?1 WHERE u.id =?2")
	void modificarContraseña(String c, Long id);
	
	@Transactional
	@Modifying
	@Query("UPDATE EntidadUsuario u SET u.activo=true WHERE u.id =?1")
	void confirmarCuenta(Long id);
	
	@Query("SELECT u FROM EntidadUsuario u WHERE u.usuario = ?1")
	EntidadUsuario validarUsuarioDuplicado(String mail);
	
	@Query(value="SELECT rol FROM Usuario  WHERE id = ?1", nativeQuery = true)
	String obtenerTipoUsuario(long id);
	
	@Query(value="SELECT * FROM Usuario  WHERE id = ?1", nativeQuery = true)
	EntidadUsuario obtenerDatosUsuario(long id);
	
	@Query(value="SELECT * FROM Usuario WHERE rol='Productor' AND usuario LIKE :nombreUsuario ESCAPE '#'", nativeQuery = true)
	EntidadUsuario obtenerProductorByUsuario(@Param("nombreUsuario") String usuario);
	

}