package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadUsuario;

public interface UsuarioDao extends JpaRepository<EntidadUsuario, Long> {

	@Query("select u from EntidadUsuario u where u.usuario = ?1 and u.contraseña = ?2")
	EntidadUsuario autenticaUsuario(String u, String c);
			
}
