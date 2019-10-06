package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.modelos.EntidadProductoProductor;

public interface ProductoProductorDao extends JpaRepository<EntidadProductoProductor, Long> {

	@Query(value = "SELECT * FROM Producto_Productor p where p.productor_id = ?1", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosByProductor(long id);

	@Query(value = "SELECT distinct p.* FROM Producto_Productor p JOIN Producto po ON p.producto_id = po.id "
			+ " WHERE (p.titulo LIKE %:titulo% OR po.tipo LIKE %:titulo%) UNION DISTINCT "
			+ " SELECT distinct p.* FROM Producto_Productor p JOIN Productor pr ON P.Productor_id = pr.usuario_id "
			+ " WHERE pr.razon_social LIKE %:titulo%", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductos(@Param("titulo") String titulo);

	@Query(value = "SELECT p.stock FROM Producto_Productor p where p.id = ?1", nativeQuery = true)
	int obtenerStock(long id);
	
	@Query(value = "SELECT p.* FROM Producto_Productor p JOIN Producto po ON p.producto_id = po.id "
			+ "WHERE po.tipo=:tipo_categoria", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosTipo(@Param("tipo_categoria") String busqueda);
}
