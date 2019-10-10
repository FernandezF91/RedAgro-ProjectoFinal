package app.mappers;

import java.util.ArrayList;
import java.util.List;

import app.clases.AlertaFrecuencia;
import app.modelos.EntidadAlertaFrecuencia;

public class AlertaFrecuenciaMapper {
	public AlertaFrecuencia mapFromEntity(EntidadAlertaFrecuencia entidad) {
		AlertaFrecuencia frecuencia = new AlertaFrecuencia(entidad.getId(), entidad.getFrecuencia());
		return frecuencia;
	}

	public List<AlertaFrecuencia> mapFromEntity(List<EntidadAlertaFrecuencia> listaEntidad) {
		List<AlertaFrecuencia> listaFrecuencia = new ArrayList<>();

		for (EntidadAlertaFrecuencia entidad : listaEntidad) {
			AlertaFrecuencia frecuencia = mapFromEntity(entidad);
			listaFrecuencia.add(frecuencia);
		}
		return listaFrecuencia;
	}

	public EntidadAlertaFrecuencia mapToEntity(AlertaFrecuencia modelo) {
		EntidadAlertaFrecuencia entidad = new EntidadAlertaFrecuencia();
		entidad.setId(modelo.getId());
		entidad.setFrecuencia(modelo.getFrecuencia());
		return entidad;
	}
}
