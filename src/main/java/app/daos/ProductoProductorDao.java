package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import app.modelos.EntidadProductoProductor;

public interface ProductoProductorDao extends JpaRepository<EntidadProductoProductor, Long> {

	@Query(value = "SELECT * FROM Producto_Productor p where p.productor_id = ?1", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosByProductor(long id);
}
