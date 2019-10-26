package app.clases;

public class Calificacion {
	public Calificacion(long id, long reservaId, int valor, String comentario) {
		this.setId(id);
		this.setReservaId(reservaId);
		this.setValor(valor);
		this.setComentario(comentario);
	}
	
	private long id;
	private long reservaId;
	private int valor;
	private String comentario;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getReservaId() {
		return reservaId;
	}
	
	public void setReservaId(long reservaId) {
		this.reservaId = reservaId;
	}

	public int getValor() {
		return valor;
	}

	public void setValor(int valor) {
		this.valor = valor;
	}

	public String getComentario() {
		return comentario;
	}
	
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
}
