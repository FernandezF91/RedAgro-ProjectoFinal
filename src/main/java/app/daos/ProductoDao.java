package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;

import app.modelos.EntidadProducto;
import app.modelos.EntidadProductoProductor;
import app.modelos.EntidadUsuario;

public interface ProductoDao extends JpaRepository<EntidadProducto, Long>{
	
	@Query("select p from EntidadProducto p where p.id = ?1")
	EntidadProducto obtenerProducto(long id);
	
	@Query( value = "Select * From Producto p where p.categoria = ?1",
			nativeQuery = true)
	ArrayList<EntidadProducto> obtenerTipoProductos(String categoria);
	
}
