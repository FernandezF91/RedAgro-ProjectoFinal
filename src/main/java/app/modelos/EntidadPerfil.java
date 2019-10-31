package app.modelos;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Perfil_usuario")
public class EntidadPerfil {

	@Id
	@Column(name = "id")
	private long id;

	@OneToOne
	@MapsId
	private EntidadProductor productor;

	@Column(name = "url", nullable = false)
	private String url;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}

	public String getRuta() {
		return url;
	}

	public void setRuta(String url) {
		this.url = url;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
