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
@Table(name = "Imagen")
public class EntidadImagen {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
	
	@ManyToOne()
    @JoinColumn(name = "producto_id", nullable = false)
    private EntidadProductoProductor producto_productor;
	
	@Column(name = "ruta")
    private String ruta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntidadProductoProductor getProducto_productor() {
		return producto_productor;
	}

	public void setProducto_productor(EntidadProductoProductor producto_productor) {
		this.producto_productor = producto_productor;
	}

	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}
	

}
