package app.clases;

public class Consumidor {

	public Consumidor (Long id) {
		this.setId(id);
	}

	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
