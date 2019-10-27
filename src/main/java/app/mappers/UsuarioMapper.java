package app.mappers;

import app.clases.Usuario;
import app.modelos.EntidadUsuario;

public class UsuarioMapper {

	public Usuario mapFromEntity(EntidadUsuario entidad) {

//		Usuario usuario = new Usuario();
//		
//		List<Alerta> alertas = new ArrayList<>();
//        entidad.getAlertas().forEach(alertaEntity -> alertas.add(AlertaMapper.mapFromEntity(AlertaEntidad)));
//        
//        usuario.setParadas(paradas);
//		
		Usuario usuario = new Usuario(entidad.getId(), null, entidad.getUsuario(), entidad.getContraseña(),
				entidad.getNombre(), entidad.getApellido(), entidad.getFecha_nacimiento(), entidad.getRol(),
				entidad.getTelefono(), entidad.getFecha_creacion(), entidad.getActivo());

		return usuario;
	}

	public EntidadUsuario mapToEntity(Usuario modelo) {

		EntidadUsuario usuario = new EntidadUsuario();
		usuario.setId(modelo.getId());
		usuario.setUsuario(modelo.getUsuario());
		usuario.setContraseña(modelo.getContraseña());
		usuario.setNombre(modelo.getNombre());
		usuario.setApellido(modelo.getApellido());
		usuario.setFecha_nacimiento(modelo.getFecha_nacimiento());
		usuario.setRol(modelo.getRol());
		usuario.setTelefono(modelo.getTelefono());
		usuario.setFecha_creacion(modelo.getFecha_creacion());
		usuario.setAlertas_usuario(null);
		return usuario;

	}

}
