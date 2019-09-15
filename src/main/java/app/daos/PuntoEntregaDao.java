package app.daos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.modelos.EntidadPuntoEntrega;

public interface PuntoEntregaDao extends JpaRepository<EntidadPuntoEntrega, Long>{
	
	
}
