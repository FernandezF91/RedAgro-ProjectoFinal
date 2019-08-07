package app.controladores;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadUsuario;

public interface UsuarioRepositorio extends JpaRepository<EntidadUsuario, Integer> {

}
