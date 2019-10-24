package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Oferta")
public class EntidadOferta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
    @Column(name = "producto_productor_id")
    private long producto_productor_id;

	@OneToOne
	@JoinColumn(name = "producto_productor_id", nullable = false, updatable = false, insertable = false)
	private EntidadProductoProductor producto_productor;

	@Column(name = "porcentaje", nullable = false)
	private float porcentaje;

	@Column(name = "activo", nullable = false)
	private boolean activo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public long getproducto_productor_id() {
		return producto_productor_id;
	}
	
	public void setproducto_productor_id(long producto_productor_id) {
		this.producto_productor_id = producto_productor_id;
	}

	public EntidadProductoProductor getProductoProductor() {
		return producto_productor;
	}

	public void setProductoProductor(EntidadProductoProductor producto_productor) {
		this.producto_productor = producto_productor;
	}

	public float getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(float porcentaje) {
		this.porcentaje = porcentaje;
	}

	public boolean getActivo() {
		return activo;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
	}
}
