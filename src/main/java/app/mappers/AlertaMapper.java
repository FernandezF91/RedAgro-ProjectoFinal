package app.mappers;

import java.util.ArrayList;
import java.util.List;

import app.clases.Alerta;
import app.modelos.EntidadAlerta;

public class AlertaMapper {
	public Alerta mapFromEntity(EntidadAlerta entidad) {
		Alerta alerta = new Alerta(entidad.getId(), entidad.getNombre());
		return alerta;
	}

	public List<Alerta> mapFromEntity(List<EntidadAlerta> listaEntidad) {
		List<Alerta> listaAlerta = new ArrayList<>();

		for (EntidadAlerta entidad : listaEntidad) {
			Alerta alerta = mapFromEntity(entidad);
			listaAlerta.add(alerta);
		}
		return listaAlerta;
	}

	public EntidadAlerta mapToEntity(Alerta modelo) {
		EntidadAlerta entidad = new EntidadAlerta();
		entidad.setId(modelo.getId());
		entidad.setNombre(modelo.getNombre());
		return entidad;
	}
}
