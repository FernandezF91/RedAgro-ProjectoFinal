package app.controladores;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {

}
