package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadCalificacion;

public interface CalificacionDao extends JpaRepository<EntidadCalificacion, Long> {

}
