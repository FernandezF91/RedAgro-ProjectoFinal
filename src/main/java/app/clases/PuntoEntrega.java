package app.clases;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class PuntoEntrega {

	public PuntoEntrega( Long id, Productor productor, 
			  //List<FechaEntrega> fechas_entrega, 
						String pais, String provincia, 
						 String localidad, int cod_postal, String direccion, double latitud, double longitud) {
		
		this.setId(id);
		this.setProductor(productor);
		//this.setFechas_entrega(fechas_entrega); Lo comento momentaneamente
		this.setPais(pais);
		this.setProvincia(provincia);
		this.setLocalidad(localidad);
		this.setCod_postal(cod_postal);
		this.setDireccion(direccion);
		this.setLatitud(latitud);
		this.setLongitud(longitud);
	}

	private Long id;

	private Productor productor;
	
	private List<FechaEntrega> fechas_entrega;

	private String pais;

	private String provincia;

	private String localidad;

	private int cod_postal;

	private String direccion;
	
	private double latitud;

	private double longitud;

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Productor getProductor() {
		return productor;
	}

	public void setProductor(Productor productor) {
		this.productor = productor;
	}
	
	public List<FechaEntrega> getFechas_entrega() {
		return fechas_entrega;
	}

	public void setFechas_entrega(List<FechaEntrega> fechas_entrega) {
		this.fechas_entrega = fechas_entrega;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public int getCod_postal() {
		return cod_postal;
	}

	public void setCod_postal(int cod_postal) {
		this.cod_postal = cod_postal;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public double getLatitud() {
		return latitud;
	}

	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}

	public double getLongitud() {
		return longitud;
	}

	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}
	
	
}
