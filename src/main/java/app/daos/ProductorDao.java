package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadProductor;

public interface ProductorDao extends JpaRepository<EntidadProductor, Long> {


}
