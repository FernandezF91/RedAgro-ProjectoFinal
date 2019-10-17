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

	@Column(name = "ruta", nullable = false)
	private String ruta;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;

	public EntidadProductor getProductor() {
		return productor;
	}

	public void setProductor(EntidadProductor productor) {
		this.productor = productor;
	}

	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
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
