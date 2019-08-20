package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadProductoProductor;

public interface ProductoDao extends JpaRepository<EntidadProductoProductor, Long>{

}
