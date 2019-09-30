package app.daos;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import app.modelos.EntidadEstadoReserva;
import app.modelos.EntidadHistorico;

public interface HistoricoDao extends JpaRepository<EntidadHistorico, Long>{

//	@Transactional
//	@Modifying
//	@Query("INSERT INTO historico_venta OPEN h set h.cantidad_vendida = ?1, h.tipo_certificacion= ?2,- h.tipo_producto= ?3, h.Producto_id= ?4 , h.productor_id=?5")
//	void insertarHistorico(long cantidad, String tipo_certificacion, String tipo_producto, long id_producto, long id_productor);
}
