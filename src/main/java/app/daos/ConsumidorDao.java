package app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import app.modelos.EntidadConsumidor;

public interface ConsumidorDao extends JpaRepository<EntidadConsumidor, Long> {


}
