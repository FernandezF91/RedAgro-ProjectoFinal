package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.modelos.EntidadProductoProductor;

public interface ProductoProductorDao extends JpaRepository<EntidadProductoProductor, Long> {

	@Query(value = "SELECT * FROM Producto_Productor p where p.productor_id = ?1", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosByProductor(long id);
	
	@Query(value = "SELECT * FROM Producto_Productor p where p.titulo LIKE %:titulo%", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductos(@Param("titulo") String titulo);
}
