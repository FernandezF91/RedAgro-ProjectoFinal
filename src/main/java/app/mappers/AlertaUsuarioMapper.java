package app.mappers;

import java.util.ArrayList;

import app.clases.Alerta;
import app.clases.AlertaFrecuencia;
import app.clases.AlertaUsuario;
import app.clases.Usuario;
import app.modelos.EntidadAlerta;
import app.modelos.EntidadAlertaFrecuencia;
import app.modelos.EntidadAlertaUsuario;
import app.modelos.EntidadUsuario;

public class AlertaUsuarioMapper {
	public AlertaUsuario mapFromEntity (EntidadAlertaUsuario entidad) {

		UsuarioMapper mapeoUsuario = new UsuarioMapper();
		Usuario usuario =  mapeoUsuario.mapFromEntity(entidad.getUsuario());

		AlertaFrecuenciaMapper mapeoAlertaFrecuencia = new AlertaFrecuenciaMapper();
		AlertaFrecuencia alertaFrecuencia =  mapeoAlertaFrecuencia.mapFromEntity(entidad.getAlertaFrecuencia());
		
		AlertaMapper mapeoAlerta = new AlertaMapper();
		Alerta alerta =  mapeoAlerta.mapFromEntity(entidad.getAlerta());
		
		AlertaUsuario mapeoAlertaUsuario = new AlertaUsuario (entidad.getId(), alerta, alertaFrecuencia, usuario);
		return mapeoAlertaUsuario;
	}
	
	public ArrayList<AlertaUsuario> mapFromEntity (ArrayList<EntidadAlertaUsuario> entidades) {

		ArrayList<AlertaUsuario> listaAlertaUsuario = new ArrayList<AlertaUsuario>();
		AlertaUsuarioMapper mapeoUsuario = new AlertaUsuarioMapper();
		
		for (EntidadAlertaUsuario entidad : entidades) {
			AlertaUsuario mapeoAlertaUsuario = mapeoUsuario.mapFromEntity(entidad);
			listaAlertaUsuario.add(mapeoAlertaUsuario);		
		}
		return listaAlertaUsuario;
	}
	
	public EntidadAlertaUsuario mapToEntity (AlertaUsuario alertaUsuario) {
		
		UsuarioMapper mapeoUsuario = new UsuarioMapper();
		EntidadUsuario usuario =  mapeoUsuario.mapToEntity(alertaUsuario.getUsuario());

		AlertaFrecuenciaMapper mapeoAlertaFrecuencia = new AlertaFrecuenciaMapper();
		EntidadAlertaFrecuencia alertaFrecuencia =  mapeoAlertaFrecuencia.mapToEntity(alertaUsuario.getFrecuencia());
		
		AlertaMapper mapeoAlerta = new AlertaMapper();
		EntidadAlerta alerta =  mapeoAlerta.mapToEntity(alertaUsuario.getAlerta());
		
		EntidadAlertaUsuario mapeoAlertaUsuario = new EntidadAlertaUsuario ();
		mapeoAlertaUsuario.setId(alertaUsuario.getId());
		mapeoAlertaUsuario.setAlertaFrecuencia(alertaFrecuencia);
		mapeoAlertaUsuario.setAlerta(alerta);
		mapeoAlertaUsuario.setUsuario(usuario);
		return mapeoAlertaUsuario;
	}
	
	public ArrayList<EntidadAlertaUsuario> mapToEntity (ArrayList<AlertaUsuario> listaAlertaUsuario) {
		
		ArrayList<EntidadAlertaUsuario> mapeoDePreferencias = new ArrayList<EntidadAlertaUsuario>();
		AlertaUsuarioMapper mapeoUsuario = new AlertaUsuarioMapper();
		
		for(AlertaUsuario alerta: listaAlertaUsuario) {
			EntidadAlertaUsuario mapeoAlertaUsuario = mapeoUsuario.mapToEntity(alerta);
			mapeoDePreferencias.add(mapeoAlertaUsuario);
		}
			
		return mapeoDePreferencias;
	}
}
