package app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadProductoProductor;

public interface ProductoProductorDao extends JpaRepository<EntidadProductoProductor, Long> {

	@Query(value = "SELECT * FROM Producto_Productor p where p.productor_id = ?1 ", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosByProductor(long id);

	@Query(value = "SELECT * FROM Producto_Productor p where p.productor_id = ?1 AND p.stock > 0 "
			+ " AND (p.fecha_vencimiento >= CURDATE() OR p.fecha_vencimiento IS NULL) "
			+ " AND p.activo = true", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosProductorBusqueda(long id);

	@Query(value = "SELECT DISTINCT p.* FROM Producto_Productor p JOIN Producto po ON p.producto_id = po.id "
			+ " WHERE (p.titulo LIKE %:titulo% OR po.tipo LIKE %:titulo%) AND p.stock > 0 AND p.activo = true "
			+ " AND (p.fecha_vencimiento >= CURDATE() OR p.fecha_vencimiento IS NULL) "
			+ " UNION DISTINCT SELECT DISTINCT p.* FROM Producto_Productor p "
			+ " JOIN Productor pr ON P.Productor_id = pr.usuario_id "
			+ " WHERE pr.razon_social LIKE %:titulo% AND p.stock > 0 "
			+ " AND (p.fecha_vencimiento >= CURDATE() OR p.fecha_vencimiento IS NULL) "
			+ " AND p.activo = true ", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductos(@Param("titulo") String titulo);

	@Query(value = "SELECT p.stock FROM Producto_Productor p where p.id = ?1 AND p.activo = true", nativeQuery = true)
	int obtenerStock(long id);

	@Query(value = "SELECT * FROM Producto_Productor p where p.id = ?1 AND p.activo = true", nativeQuery = true)
	EntidadProductoProductor obtenerProductoById(long id);

	@Query(value = "SELECT p.* FROM Producto_Productor p JOIN Producto po ON p.producto_id = po.id "
			+ "WHERE po.tipo=:tipo_categoria AND p.activo = true", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosTipo(@Param("tipo_categoria") String busqueda);

	@Transactional
	@Modifying
	@Query(value = "UPDATE Producto_Productor P SET P.stock = ?2 WHERE P.id =?1", nativeQuery = true)
	void actualizarStockProducto(long id_producto, int stock);

	@Query(value = "SELECT * FROM Producto_productor p WHERE (stock = 0 OR fecha_vencimiento <= CURDATE()) "
			+ " AND productor_id = ?1 AND p.activo = true ORDER BY p.id DESC LIMIT 0, 10", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosARevisar(long id_productor);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE Producto_productor p SET p.activo = ?2 WHERE p.id =?1", nativeQuery = true)
	void actualizarEstadoProducto(long id_producto, boolean activo);
	
	@Query(value = "SELECT * FROM Producto_Productor p where p.producto_id = ?1 AND active = true and stock > 0", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosByProductoId(long id);
	
	@Query(value = "SELECT * FROM Producto_Productor WHERE stock > 0 AND (fecha_vencimiento >= CURDATE()) AND active = true ORDER BY id DESC LIMIT 30 ", nativeQuery = true)
	List<EntidadProductoProductor> obtenerProductosPantallaSinLogin();
}
