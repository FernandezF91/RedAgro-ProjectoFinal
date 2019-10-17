package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Calificacion")
public class EntidadCalificacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name = "consumidor_id", nullable = false)
	private EntidadConsumidor consumidor;

	@ManyToOne()
	@JoinColumn(name = "productor_id", nullable = false)
	private EntidadProductor productor;

	@Column(name = "valor", nullable = false)
	private int valor;

	@Column(name = "comentario", nullable = false)
	private String comentario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadConsumidor getConsumidor() {
		return consumidor;
	}

	public void setConsumidor(EntidadConsumidor consumidor) {
		this.consumidor = consumidor;
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

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}
}
