package app.mappers;

import java.util.ArrayList;
import java.util.List;

import app.clases.AlertaNotificaciones;
import app.modelos.EntidadAlertaNotificaciones;

public class AlertaNotificacionesMapper {
	public AlertaNotificaciones mapFromEntity(EntidadAlertaNotificaciones entidad) {
		AlertaMapper alertaMapper = new AlertaMapper();
		UsuarioMapper usuarioMapper = new UsuarioMapper();
		AlertaNotificaciones alertaNotif = new AlertaNotificaciones(entidad.getId(),
				alertaMapper.mapFromEntity(entidad.getAlerta()), usuarioMapper.mapFromEntity(entidad.getUsuario()),
				entidad.getTipo(), entidad.getTitulo(), entidad.getDescripcion());
		return alertaNotif;
	}

	public List<AlertaNotificaciones> mapFromEntity(List<EntidadAlertaNotificaciones> listaEntidad) {
		List<AlertaNotificaciones> listaAlerta = new ArrayList<>();

		for (EntidadAlertaNotificaciones entidad : listaEntidad) {
			AlertaNotificaciones alerta = mapFromEntity(entidad);
			listaAlerta.add(alerta);
		}
		return listaAlerta;
	}

	public EntidadAlertaNotificaciones mapToEntity(AlertaNotificaciones modelo) {
		AlertaMapper alertaMapper = new AlertaMapper();
		UsuarioMapper usuarioMapper = new UsuarioMapper();

		EntidadAlertaNotificaciones entidad = new EntidadAlertaNotificaciones();
		entidad.setId(modelo.getId());
		entidad.setTipo(modelo.getTipo());
		entidad.setTitulo(modelo.getTitulo());
		entidad.setDescripcion(modelo.getDescripcion());
		entidad.setAlerta(alertaMapper.mapToEntity(modelo.getAlerta()));
		entidad.setUsuario(usuarioMapper.mapToEntity(modelo.getUsuario()));
		return entidad;
	}
}
