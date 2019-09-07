package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;


import app.modelos.EntidadImagen;

public interface ImagenDao extends JpaRepository<EntidadImagen, Long> {

	
	

}
