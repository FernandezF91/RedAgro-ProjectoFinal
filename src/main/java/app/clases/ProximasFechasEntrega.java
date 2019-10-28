package app.clases;

public class ProximasFechasEntrega {
	private String fechaEntrega;
	private String localidad;
	private String direccion;

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(String fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	public ProximasFechasEntrega(String fechaEntrega, String localidad, String direccion) {
		super();
		this.fechaEntrega = fechaEntrega;
		this.localidad = localidad;
		this.direccion = direccion;
	}
}