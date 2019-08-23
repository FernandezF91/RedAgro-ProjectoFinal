package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadProductoProductor;

public interface ProductoProductorDao extends JpaRepository<EntidadProductoProductor, Long>{

}
