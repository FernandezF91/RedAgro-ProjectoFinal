package app.mappers;

import app.clases.PuntoEntrega;
import app.clases.Productor;
import app.clases.FechaEntrega;
import app.modelos.EntidadPuntoEntrega;
import app.modelos.EntidadProductor;
import java.util.List;
import java.util.ArrayList;

public class PuntoEntregaMapper {

	public PuntoEntrega mapFromEntity(EntidadPuntoEntrega entidad) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		Productor productor = mapeoProductor.mapFromEntity(entidad.getProductor());
		
		PuntoEntrega entrega = new PuntoEntrega(entidad.getId(), productor,  entidad.getPais(), entidad.getProvincia(), 
												entidad.getLocalidad(), entidad.getCod_postal(), entidad.getDireccion(), entidad.getLatitud(), entidad.getLongitud(), entidad.getActivo());

		return entrega;
	}

	public List<PuntoEntrega> mapFromEntity(List<EntidadPuntoEntrega> listaEntidad) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		List<PuntoEntrega> entregas = new ArrayList<PuntoEntrega>();

		for (EntidadPuntoEntrega entidad : listaEntidad) {

			Productor productor = mapeoProductor.mapFromEntity(entidad.getProductor());
			PuntoEntrega entrega = new PuntoEntrega(entidad.getId(), productor, entidad.getPais(),
					entidad.getProvincia(), entidad.getLocalidad(), entidad.getCod_postal(), entidad.getDireccion(),
					entidad.getLatitud(), entidad.getLongitud(),entidad.getActivo());
			entregas.add(entrega);
		}

		return entregas;
	}

	public EntidadPuntoEntrega mapToEntity(PuntoEntrega modelo) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		EntidadProductor entidadProductor = mapeoProductor.mapToEntity(modelo.getProductor());

		EntidadPuntoEntrega entidad = new EntidadPuntoEntrega();

		entidad.setId(modelo.getId());
		entidad.setProductor(entidadProductor);
		entidad.setPais(modelo.getPais());
		entidad.setProvincia(modelo.getProvincia());
		entidad.setLocalidad(modelo.getLocalidad());
		entidad.setCod_postal(modelo.getCod_postal());
		entidad.setDireccion(modelo.getDireccion());
		entidad.setLatitud(modelo.getLatitud());
		entidad.setLongitud(modelo.getLongitud());
		entidad.setActivo(modelo.getActivo());

		return entidad;
	}

	public List<EntidadPuntoEntrega> mapToEntity(List<PuntoEntrega> listaModelo) {

		ProductorMapper mapeoProductor = new ProductorMapper();
		List<EntidadPuntoEntrega> listaEntidad = new ArrayList<EntidadPuntoEntrega>();

		for (PuntoEntrega modelo : listaModelo) {
			EntidadProductor entidadProductor = mapeoProductor.mapToEntity(modelo.getProductor());
			EntidadPuntoEntrega entidad = new EntidadPuntoEntrega();
			entidad.setId(modelo.getId());
			entidad.setProductor(entidadProductor);
			entidad.setPais(modelo.getPais());
			entidad.setProvincia(modelo.getProvincia());
			entidad.setLocalidad(modelo.getLocalidad());
			entidad.setCod_postal(modelo.getCod_postal());
			entidad.setDireccion(modelo.getDireccion());
			entidad.setLatitud(modelo.getLatitud());
			entidad.setLongitud(modelo.getLongitud());
			listaEntidad.add(entidad);
		}

		return listaEntidad;
	}
}
