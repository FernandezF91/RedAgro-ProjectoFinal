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
        		entidad.getTelefono(), entidad.getActivo());

        return usuario;
    }

	
//    @Override
//    public EntidadUsuario mapToEntity(Usuario modelo) {
//
//        UsuarioEntity usuario = new UsuarioEntity();
//        usuario.setMail(model.getMail());
//        usuario.setPassword(model.getPassword());
//        usuario.setSalt(model.getSalt());
//        usuario.setUsername(model.getUsername());
//        usuario.setId(model.getId());
//
//        return usuario;
//    }
	
}
