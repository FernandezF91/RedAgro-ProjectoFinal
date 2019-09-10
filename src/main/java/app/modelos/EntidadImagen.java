package app.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
    @JoinColumn(name = "producto_id", nullable = true)
    private EntidadProductoProductor producto_productor;
	
	@Column(name = "image",nullable=true)
	@Lob
	private byte[] image;
	
	@Column(name = "nombre",nullable=false)
	private String nombre;
	
	@Column(name = "tipo_contenido",nullable=false)
	private String tipo_contenido;

	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

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

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getTipo_contenido() {
		return tipo_contenido;
	}

	public void setTipo_contenido(String tipo_contenido) {
		this.tipo_contenido = tipo_contenido;
	}
		

}
