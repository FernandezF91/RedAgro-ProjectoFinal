package app.mappers;

import app.clases.Imagen;
import app.modelos.EntidadImagen;
import java.util.List;
import java.util.ArrayList;

public class ImagenMapper {

// Falta agregar ProductoProductor -> Revisar!

	public Imagen mapFromEntity(EntidadImagen entidad) {
		Imagen estado = new Imagen(entidad.getId(), entidad.getImage(), entidad.getNombre(),
				entidad.getTipo_contenido());
		return estado;
	}

	public List<Imagen> mapFromEntity(List<EntidadImagen> listaEntidadImagen) {
		
		List<Imagen> listaImagenes = new ArrayList<>();
		
		for (EntidadImagen entidad : listaEntidadImagen) {
			Imagen imagen = new Imagen(entidad.getId(), entidad.getImage(), entidad.getNombre(),
					entidad.getTipo_contenido());
			listaImagenes.add(imagen);
		}
		return listaImagenes;
	}

	public EntidadImagen mapToEntity(Imagen modelo) {
		EntidadImagen entidad = new EntidadImagen();
		entidad.setId(modelo.getId());
		entidad.setImage(modelo.getImage());
		entidad.setNombre(modelo.getNombre());
		entidad.setTipo_contenido(entidad.getTipo_contenido());
		return entidad;
	}

	public List<EntidadImagen> mapToEntity(List<Imagen> listaImagen) {
		
		List<EntidadImagen> listaEntidadImagen = new ArrayList<>();
		
		for (Imagen modelo : listaImagen) {
			EntidadImagen entidad = new EntidadImagen();
			entidad.setId(modelo.getId());
			entidad.setImage(modelo.getImage());
			entidad.setNombre(modelo.getNombre());
			entidad.setTipo_contenido(entidad.getTipo_contenido());
			listaEntidadImagen.add(entidad);
		}
		return listaEntidadImagen;
	}
}
