package app.clases;

public class Productor {

	public Productor(long id, String razon_social) {
		this.setId(id);
		this.setRazon_social(razon_social);
	}

	private long id;
	private String razon_social;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRazon_social() {
		return razon_social;
	}

	public void setRazon_social(String razon_social) {
		this.razon_social = razon_social;
	}

}
