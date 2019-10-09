package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;
import app.modelos.EntidadProducto;

public interface ProductoDao extends JpaRepository<EntidadProducto, Long> {

	@Query("select p from EntidadProducto p where p.id = ?1")
	EntidadProducto obtenerProducto(long id);

	@Query("select p from EntidadProducto p where p.categoria = ?1")
	List<EntidadProducto> obtenerTiposProducto(String categoria_producto);

	@Query(value = "Select * From Producto p where p.categoria = ?1", nativeQuery = true)
	ArrayList<EntidadProducto> obtenerTipoProductos(String categoria);

	@Query("select p from EntidadProducto p")
	List<EntidadProducto> obtenerCategoriasSubtipos();

}
